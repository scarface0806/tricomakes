$filePath = "d:\Santhosh\tricomakes-master\tricomakes-master\index.html"
$content = Get-Content $filePath -Raw -Encoding UTF8

# Define the GA4 base script
$ga4Base = @"
    <!-- GA4: Replace GA_MEASUREMENT_ID with your 
         actual Measurement ID from Google Analytics -->

    <!-- Google Analytics 4 -->
    <script async 
      src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID">
    </script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });
    </script>

    <!-- GA4 Event Tracking for index.html -->
    <script>
    // Track WhatsApp CTA clicks
    document.addEventListener('DOMContentLoaded', function() {

      // Track all WhatsApp button clicks
      document.querySelectorAll('a[href*="wa.me"]')
        .forEach(function(btn) {
          btn.addEventListener('click', function() {
            gtag('event', 'whatsapp_click', {
              event_category: 'CTA',
              event_label: this.innerText.trim() 
                || 'WhatsApp Button',
              page_location: window.location.href
            });
          });
        });

      // Track "Get Started" button clicks
      document.querySelectorAll(
        'a[href*="contact"], a[href="#contact"]'
      ).forEach(function(btn) {
        btn.addEventListener('click', function() {
          gtag('event', 'get_started_click', {
            event_category: 'CTA',
            event_label: this.innerText.trim(),
            page_location: window.location.href
          });
        });
      });

      // Track service card clicks
      document.querySelectorAll(
        'a[href*="service-"]'
      ).forEach(function(link) {
        link.addEventListener('click', function() {
          gtag('event', 'service_click', {
            event_category: 'Services',
            event_label: this.href,
            page_location: window.location.href
          });
        });
      });

      // Track portfolio clicks
      document.querySelectorAll(
        'a[href*="project"]'
      ).forEach(function(link) {
        link.addEventListener('click', function() {
          gtag('event', 'portfolio_click', {
            event_category: 'Portfolio',
            event_label: this.href
          });
        });
      });

      // Track scroll depth
      let scrolled25 = false;
      let scrolled50 = false;
      let scrolled75 = false;
      let scrolled90 = false;

      window.addEventListener('scroll', function() {
        const scrollPercent = Math.round(
          (window.scrollY / 
          (document.body.scrollHeight - window.innerHeight)) 
          * 100
        );
        if (!scrolled25 && scrollPercent >= 25) {
          scrolled25 = true;
          gtag('event', 'scroll_depth', 
            {event_category: 'Engagement', 
             event_label: '25%'});
        }
        if (!scrolled50 && scrollPercent >= 50) {
          scrolled50 = true;
          gtag('event', 'scroll_depth', 
            {event_category: 'Engagement', 
             event_label: '50%'});
        }
        if (!scrolled75 && scrollPercent >= 75) {
          scrolled75 = true;
          gtag('event', 'scroll_depth', 
            {event_category: 'Engagement', 
             event_label: '75%'});
        }
        if (!scrolled90 && scrollPercent >= 90) {
          scrolled90 = true;
          gtag('event', 'scroll_depth', 
            {event_category: 'Engagement', 
             event_label: '90%'});
        }
      });

      // Track time on page (30s, 60s, 120s)
      setTimeout(function() {
        gtag('event', 'time_on_page', 
          {event_category: 'Engagement', 
           event_label: '30 seconds'});
      }, 30000);

      setTimeout(function() {
        gtag('event', 'time_on_page', 
          {event_category: 'Engagement', 
           event_label: '60 seconds'});
      }, 60000);

      setTimeout(function() {
        gtag('event', 'time_on_page', 
          {event_category: 'Engagement', 
           event_label: '120 seconds'});
      }, 120000);

    });
    </script>

"@

# Find and replace the pattern before </head>
# Pattern: "    </script>" + whitespace + "</head>"
$findPattern = '    </script>' + [Environment]::NewLine + [Environment]::NewLine + '</head>'
$replaceWith = $ga4Base + [Environment]::NewLine + '</head>'
$newContent = $content.Replace($findPattern, $replaceWith)

# Write the updated content back
Set-Content $filePath -Value $newContent

# Write the updated content back
Set-Content $filePath -Value $newContent

Write-Host "Updated index.html successfully"
