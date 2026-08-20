#!/usr/bin/env bash

set -euo pipefail

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: cwebp is not installed. Install it with 'brew install webp' on macOS or 'choco install webp' on Windows." >&2
  exit 1
fi

images=(
  "assets/img/Kaliammal-College-Redesign.png"
  "assets/img/sarvarish-saii-academy-home.jpg"
  "assets/img/textail-card.png"
  "assets/img/oz.png"
  "assets/img/banner/trico-facebook.png"
)

for image in "${images[@]}"; do
  output="${image%.*}.webp"
  cwebp -q 82 "$image" -o "$output"
done

echo "Converted ${#images[@]} images to WebP. Original files were kept."
