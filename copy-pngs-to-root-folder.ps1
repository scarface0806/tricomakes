param(
    [string]$ProjectRoot = (Get-Location).Path,
    [string]$TargetFolderName = "PNG"
)

$ErrorActionPreference = "Stop"

$ignoredDirs = @("node_modules", ".git", "dist", "build", ".next", "coverage")
$projectRootResolved = (Resolve-Path -LiteralPath $ProjectRoot).Path
$targetFolder = Join-Path $projectRootResolved $TargetFolderName

New-Item -ItemType Directory -Path $targetFolder -Force | Out-Null

Add-Type -AssemblyName PresentationCore

function Test-IsIgnoredPath {
    param(
        [string]$Path,
        [string[]]$Ignored
    )

    $segments = $Path -split "[\\/]"
    foreach ($segment in $segments) {
        if ($Ignored -contains $segment) {
            return $true
        }
    }
    return $false
}

function Test-PngReadable {
    param([string]$FilePath)

    try {
        $stream = [System.IO.File]::Open($FilePath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::Read)
        try {
            $decoder = New-Object System.Windows.Media.Imaging.PngBitmapDecoder($stream, [System.Windows.Media.Imaging.BitmapCreateOptions]::PreservePixelFormat, [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad)
            $null = $decoder.Frames.Count
            return $true
        }
        finally {
            $stream.Dispose()
        }
    }
    catch {
        return $false
    }
}

function Get-UniqueTargetPath {
    param(
        [string]$DestinationFolder,
        [string]$BaseName,
        [string]$Extension
    )

    $candidate = Join-Path $DestinationFolder ($BaseName + $Extension)
    if (-not (Test-Path -LiteralPath $candidate)) {
        return $candidate
    }

    $index = 1
    while ($true) {
        $nextName = "{0}-{1}{2}" -f $BaseName, $index, $Extension
        $candidate = Join-Path $DestinationFolder $nextName
        if (-not (Test-Path -LiteralPath $candidate)) {
            return $candidate
        }
        $index++
    }
}

$allPng = Get-ChildItem -LiteralPath $projectRootResolved -Recurse -File -Filter *.png -ErrorAction SilentlyContinue | Where-Object {
    -not (Test-IsIgnoredPath -Path $_.FullName -Ignored $ignoredDirs)
}

$totalFound = $allPng.Count
$totalCopied = 0
$totalSkipped = 0

Write-Host "Scanning: $projectRootResolved"
Write-Host "Target folder: $targetFolder"
Write-Host "Total PNG files found: $totalFound"

foreach ($file in $allPng) {
    try {
        if (-not (Test-PngReadable -FilePath $file.FullName)) {
            $totalSkipped++
            Write-Host "SKIPPED (unreadable/corrupted): $($file.FullName)" -ForegroundColor Yellow
            continue
        }

        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
        $extension = [System.IO.Path]::GetExtension($file.Name)
        $destinationPath = Get-UniqueTargetPath -DestinationFolder $targetFolder -BaseName $baseName -Extension $extension

        Copy-Item -LiteralPath $file.FullName -Destination $destinationPath -Force
        $totalCopied++
        Write-Host "COPIED: $($file.FullName) -> $destinationPath" -ForegroundColor Green
    }
    catch {
        $totalSkipped++
        Write-Host "SKIPPED (error): $($file.FullName) | $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "===== SUMMARY =====" -ForegroundColor Cyan
Write-Host "Total PNG files found: $totalFound"
Write-Host "Total copied: $totalCopied"
Write-Host "Total skipped: $totalSkipped"
Write-Host "Final PNG folder path: $targetFolder"
