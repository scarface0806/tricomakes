#!/usr/bin/env python3
import os

# Change to the project directory
os.chdir(r"d:\Santhosh\tricomakes-master\tricomakes-master")

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the GA4 scripts
ga4_base = '''    <!-- GA4: Replace GA_MEASUREMENT_ID with your 
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

'''

# Replace the pattern
# Find "    </script>" followed by blank lines, then "</head>"
import re
pattern = r'(    \</script\>)\s+(</head>)'
replacement = ga4_base + r'\2'
new_content = re.sub(pattern, replacement, content)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("index.html updated successfully")

# Also do free-audit.html and pricing.html

# Free-audit form submit tracking
free_audit_script = '''    <!-- GA4 Form Tracking for free-audit.html -->
    <script>
    document.addEventListener('DOMContentLoaded', 
      function() {
        const form = document.querySelector('form') 
          || document.getElementById('audit-form');
        if (form) {
          form.addEventListener('submit', function() {
            gtag('event', 'audit_form_submit', {
              event_category: 'Lead',
              event_label: 'Free Audit Request',
              value: 1
            });
          });
        }
      }
    );
    </script>

'''

# Read free-audit.html
with open('free-audit.html', 'r', encoding='utf-8') as f:
    fa_content = f.read()

# Find the already-added GA4 base script and add the form tracking after it
# Look for the end of the GA4 base script (after config)
pattern_fa = r'(gtag\(\'config\', \'GA_MEASUREMENT_ID\'.*?\n    \</script\>)\s+(</head>)'
replacement_fa = r'\1\n\n' + free_audit_script + r'\2'
new_fa_content = re.sub(pattern_fa, replacement_fa, fa_content, flags=re.DOTALL)

with open('free-audit.html', 'w', encoding='utf-8') as f:
    f.write(new_fa_content)

print("free-audit.html updated successfully")

# Pricing page view tracking
pricing_script = '''    <!-- GA4 Pricing Page Tracking for pricing.html -->
    <script>
    gtag('event', 'pricing_page_view', {
      event_category: 'High Intent',
      event_label: 'Pricing Page Visited',
      value: 1
    });
    </script>

'''

# Read pricing.html
with open('pricing.html', 'r', encoding='utf-8') as f:
    p_content = f.read()

# Find the end of the GA4 base script and add the pricing tracking
pattern_p = r'(gtag\(\'config\', \'GA_MEASUREMENT_ID\'.*?\n    \</script\>)\s+(</head>)'
replacement_p = r'\1\n\n' + pricing_script + r'\2'
new_p_content = re.sub(pattern_p, replacement_p, p_content, flags=re.DOTALL)

with open('pricing.html', 'w', encoding='utf-8') as f:
    f.write(new_p_content)

print("pricing.html updated successfully")
