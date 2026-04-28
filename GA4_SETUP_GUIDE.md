# Google Analytics 4 Setup Guide — Trico Makes

## Step 1: Create GA4 Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. Click Admin (gear icon, bottom left)
4. Click "Create Property"
5. Property name: `Trico Makes`
6. Timezone: India (IST)
7. Currency: Indian Rupee (INR)
8. Click Next → fill business details → Create

## Step 2: Get Your Measurement ID
1. In your new property → Admin
2. Click "Data Streams" → Add Stream → Web
3. Website URL: `https://trico-makes.vercel.app`
4. Stream name: `Trico Makes Web`
5. Click Create Stream
6. **Copy the Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 3: Add to Website
1. Open **ALL HTML files** in the project (located in the root directory)
2. Find: `GA_MEASUREMENT_ID` (appears in two places in each file's GA4 script)
3. Replace **BOTH instances** with your actual `G-XXXXXXXXXX` ID
4. Save and deploy to Vercel

### Quick Find & Replace
- **Search for:** `GA_MEASUREMENT_ID`
- **Replace with:** Your actual ID (e.g., `G-ABC123XYZ`)
- **Apply to:** All files in the project

## Step 4: Verify Installation
1. Open [trico-makes.vercel.app](https://trico-makes.vercel.app) in Chrome
2. Go to Google Analytics 4 dashboard
3. Navigate to Reports → Realtime
4. You should see **1 active user**
5. If visible — GA4 is working correctly ✓

## Step 5: Check Events Tracking
In your GA4 property, go to **Reports → Events**. You should see:
- `first_visit` — automatic, triggered on first page load
- `page_view` — automatic, tracked on every page
- `whatsapp_click` — when WhatsApp buttons are clicked
- `get_started_click` — when CTA buttons are clicked
- `service_click` — when service pages are visited
- `portfolio_click` — when project details are viewed
- `scroll_depth` — at 25%, 50%, 75%, 90% scroll
- `time_on_page` — at 30s, 60s, 120s milestones
- `audit_form_submit` — when free audit form is submitted (free-audit.html only)
- `pricing_page_view` — when pricing page is visited (pricing.html only)

---

## Events Being Tracked

### Global (All Pages)
- **whatsapp_click** → WhatsApp button clicks
  - Category: `CTA`
  - Label: Button text or "WhatsApp Button"
  
- **get_started_click** → Call-to-action clicks
  - Category: `CTA`
  - Label: Link text

### Service/Portfolio Pages
- **service_click** → Service page visits
  - Category: `Services`
  - Label: Full service page URL
  
- **portfolio_click** → Project detail views
  - Category: `Portfolio`
  - Label: Full project page URL

### Engagement Metrics
- **scroll_depth** → Scroll milestones
  - Category: `Engagement`
  - Labels: `25%`, `50%`, `75%`, `90%`
  - Fires once per milestone per session
  
- **time_on_page** → Time milestones
  - Category: `Engagement`
  - Labels: `30 seconds`, `60 seconds`, `120 seconds`
  - Fires at each milestone once per session

### Page-Specific Events
- **audit_form_submit** (free-audit.html only)
  - Category: `Lead`
  - Label: `Free Audit Request`
  - Value: `1`
  - Fires when the audit form is submitted
  
- **pricing_page_view** (pricing.html only)
  - Category: `High Intent`
  - Label: `Pricing Page Visited`
  - Value: `1`
  - Fires once when pricing page loads

---

## Files Updated with GA4
GA4 base scripts have been added to all 39 HTML files in the project:

**Blog Pages:** blog.html, blog-branding-guide.html, blog-marketing-types.html, blog-seo-guide.html, blog-single-with-sidebar.html, blog-social-media-planning.html, blog-uiux-explained.html, blog-website-conversion.html, blog-with-sidebar.html

**Main Pages:** 404.html, index.html, contact.html, free-audit.html, pricing.html, resume.html

**Service Pages:** service.html, service-branding-rebranding.html, service-digital-marketing.html, service-lead-generation.html, service-logo-design.html, service-mobile-app-design.html, service-poster-social-media-design.html, service-reels-video-editing.html, service-seo.html, service-social-media-marketing.html, service-ui-ux-design.html, service-vector-art-design.html, service-website-design-development.html, services-details.html

**Portfolio Pages:** projects.html, project-astera-campaign.html, project-bloom-studio.html, project-details.html, project-fynlo-finance.html, project-luma-cafe.html, project-northline-clinics.html, project-pulsefit-app.html

**Other:** whatsapp-catalog.html

---

## Troubleshooting

### GA4 Not Showing Data
- ✓ Did you replace `GA_MEASUREMENT_ID` with your actual ID?
- ✓ Did you deploy the changes to production (Vercel)?
- ✓ Are you viewing the correct GA4 property?
- ✓ Wait 24-48 hours for events to fully populate

### Events Not Firing
- Check browser console (F12 → Console tab)
- Verify `gtag` function is defined
- Check that JavaScript isn't blocked by adblockers
- Verify page URLs match GA4 data stream settings

### Questions?
Contact support or review [GA4 Documentation](https://support.google.com/analytics/answer/10089681)

---

## Important Notes

⚠️ **CRITICAL:** Replace `GA_MEASUREMENT_ID` with your real Measurement ID **BEFORE deploying**.
- Without the real ID, **NO data will be collected**
- The placeholder is just for setup purposes
- Each HTML file has this placeholder in **2 locations** (both must be replaced)

📊 **Real-time Dashboard:**
- GA4 shows real-time data in the Realtime report
- Other reports may take 24-48 hours to update
- Test events should appear in Realtime within seconds

🔍 **Data Privacy:**
- GA4 collects anonymized user behavior
- No personal data (names, emails) is collected
- Complies with GDPR and privacy regulations

---

*Last Updated: April 28, 2026*
