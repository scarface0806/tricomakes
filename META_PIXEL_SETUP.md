# Meta Pixel Setup Guide — Trico Makes

## Overview

Meta Pixel (Facebook Pixel) tracks visitor behavior on your website so you can:
- **Retarget** visitors with ads on Facebook & Instagram
- **Build audiences** based on page visits and actions
- **Measure conversions** from your ads
- **Optimize ads** toward specific audiences

**Status:** Meta Pixel base code is installed on all 39 pages ✓

---

## Step 1: Create Meta Pixel

1. Go to [business.facebook.com](https://business.facebook.com)
2. Sign in with your Facebook account
3. Go to **Events Manager** (top menu)
4. Click **"Connect Data Sources"** button
5. Select **"Web"** as your platform
6. Click **"Connect"**
7. Name your pixel: `Trico Makes Website`
8. Enter website URL: `https://trico-makes.vercel.app`
9. Click **"Create Pixel"**

Facebook will generate your **Pixel ID** (a 15-16 digit number).

---

## Step 2: Add Your Pixel ID to ALL HTML Files

Your Pixel ID needs to replace `YOUR_PIXEL_ID` in every HTML file.

### Quick Find & Replace:
1. Open VS Code
2. Press **Ctrl+H** (Find & Replace)
3. Find: `YOUR_PIXEL_ID`
4. Replace with: Your actual Pixel ID (e.g., `123456789012345`)
5. Click **"Replace All"**

### Files affected:
- ✓ All 39 HTML pages
- 2 instances per file (script tag + noscript tag)

**Result:** 78 replacements total

---

## Step 3: Deploy to Vercel

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add Meta Pixel tracking"
   git push
   ```

2. Vercel will auto-deploy within seconds
3. Once deployed, Meta Pixel will start tracking

---

## Step 4: Verify Pixel is Working

### Method 1: Meta Pixel Helper Extension (Easiest)
1. Install **"Meta Pixel Helper"** from [Chrome Web Store](https://chrome.google.com/webstore)
2. Visit: `https://trico-makes.vercel.app`
3. Click the extension icon (puzzle piece) → Meta Pixel Helper
4. Should show: **"1 Pixel Found"**
5. Green checkmark = Working ✓

### Method 2: Events Manager
1. Go to Events Manager → Your Pixel
2. Navigate to **"Overview"** tab
3. You should see activity after 5-10 minutes
4. Check **"Events"** section for:
   - PageView
   - Lead (from form submissions)
   - ViewContent (from service clicks)

---

## Step 5: Create Retargeting Audiences

Now you can create audiences to retarget visitors with ads.

### Audience 1: All Website Visitors (Last 30 Days)
1. Go to **Meta Ads Manager** → **Audiences**
2. Click **"Create Audience"** → **"Custom Audience"** → **"Web"**
3. Select: **"Website visitors (Pixel)"**
4. Choose pixel: Your Trico Pixel
5. Event: **"Any event"**
6. Time window: **"Last 30 days"**
7. Name: `"Trico Makes — All Visitors 30d"`
8. Click Create

**Use case:** Retarget anyone who visited your site

### Audience 2: High Intent (Pricing Page Visitors)
1. Create Custom Audience → Website → Pixel
2. Event: **"ViewContent"**
3. Filter: **"content_name contains Pricing Page"**
4. Time: **"Last 14 days"**
5. Name: `"Trico Makes — Pricing Visitors"`

**Use case:** Target people actively considering your services

### Audience 3: Leads (Audit Form + WhatsApp Clickers)
1. Create Custom Audience → Website → Pixel
2. Event: **"Lead"**
3. Time: **"Last 30 days"**
4. Name: `"Trico Makes — WhatsApp & Form Leads"`

**Use case:** Target people already showing buying intent

### Audience 4: High-Value Actions (Lookalike Audiences)
1. Create Lookalike Audience
2. Source: `"Trico Makes — WhatsApp & Form Leads"`
3. Country: **India**
4. Size: **1% (most similar)**
5. Name: `"Trico Makes — Lookalike (1%)"`

**Use case:** Find new people similar to your leads

---

## Events Being Tracked

All events are automatically captured when Pixel ID is added:

| Event | Triggered By | Category | Value |
|-------|--------------|----------|-------|
| **PageView** | Every page visit | Auto | — |
| **Lead** | WhatsApp click (index.html) | Contact CTA | 1 INR |
| **Lead** | Audit form submission (free-audit.html) | Lead Magnet | 10 INR |
| **ViewContent** | Service page click | Services | — |
| **ViewContent** | Pricing page visit | High Intent | 5 INR |

---

## Running Your First Retargeting Ad

### Example Campaign:
**Goal:** Bring back site visitors who didn't contact you

**Setup:**
1. Go to Meta Ads Manager
2. Create new campaign → **"Conversions"**
3. Select conversion event: **"Landing Page View"** (free-audit.html)
4. Choose audience: **"Trico Makes — All Visitors 30d"**
5. Ad creative:
   - Headline: "Still thinking about it?"
   - Description: "Get a free website audit to see where you're losing leads"
   - Image: Free audit landing page screenshot
   - Link: `trico-makes.vercel.app/free-audit.html`
6. Budget: ₹100–200/day to start
7. Duration: 7–14 days

**Expected result:**
- Visitors who left without contacting you see your ad on Facebook/Instagram
- Higher conversion rate than cold traffic
- Cost per click: ₹5–15 (vs ₹20+ for cold traffic)

---

## Timeline: When Data Appears

| Time | What Happens |
|------|--------------|
| **Immediately** | Pixel fires on page loads |
| **5–10 minutes** | Data appears in Events Manager |
| **24 hours** | Audiences have min 100 people |
| **48 hours** | Lookalike audiences created |
| **48–72 hours** | Full event data + optimization data available |

---

## Troubleshooting

### Issue: "Pixel Not Found" in Helper Extension
**Fix:**
- Make sure `YOUR_PIXEL_ID` was replaced with actual ID
- Verify site is deployed to Vercel (not localhost)
- Clear browser cache (Ctrl+Shift+Del)
- Wait 5-10 minutes for data to sync
- Check browser console for JavaScript errors

### Issue: No Events in Events Manager After 1 Hour
**Fix:**
- Verify Pixel ID is correct in Events Manager settings
- Install Meta Pixel Helper to confirm it's working
- Check your ad blocker (might block Pixel)
- Try in Incognito mode
- Wait up to 24 hours for initial data

### Issue: Audiences Won't Create (Need Min 100 People)
**Fix:**
- Wait 24-48 hours for pixel data to accumulate
- Make sure you have active traffic to the site
- Check that event is being tracked (use Helper extension)
- Pixel needs minimum of 100 matching users in last 30 days

### Issue: Form Submission Not Tracked as Lead
**Fix:**
- Verify form exists and uses standard `<form>` tag OR has ID `"audit-form"`
- Check that form actually submits (doesn't have JavaScript errors)
- Verify fbq() function exists in console: `fbq`
- Check browser dev tools → Network → look for facebook.com requests

---

## Important Notes

🔔 **Pixel ID Format:** 15-16 digit number (no dashes or special characters)

🔔 **Placement:** Must be in `<head>` section and before `</head>` tag (already done ✓)

🔔 **Cookie Consent:** If you later add a cookie banner, wrap Pixel in consent check:
```html
<script>
if (localStorage.getItem('cookie-consent') === 'accepted') {
  fbq('track', 'PageView');
}
</script>
```

🔔 **Data Delay:** Events have a 24-48 hour delay before they're processed by Facebook. This is normal.

🔔 **GDPR Compliance:** Meta Pixel sends data to Facebook servers. Ensure your Privacy Policy mentions this.

🔔 **Test Events:** Events Manager has a Test Events feature to verify Pixel in real-time:
1. Copy "Test Event Code" from Events Manager
2. Paste in browser console
3. Refresh page
4. Should see "Test" label on events

---

## Next Steps Checklist

- [ ] Create Meta Pixel in Events Manager
- [ ] Copy your Pixel ID
- [ ] Find & Replace `YOUR_PIXEL_ID` with actual ID (replace all)
- [ ] Deploy to Vercel (git push)
- [ ] Verify with Meta Pixel Helper extension
- [ ] Wait 24 hours for event data to populate
- [ ] Create audiences (All Visitors, Pricing, Leads)
- [ ] Create first retargeting campaign
- [ ] Monitor conversions & optimize ad creative
- [ ] Scale budget if cost-per-lead is profitable

---

## Support

- **Meta Pixel Docs:** [facebook.com/business/help](https://facebook.com/business/help)
- **Pixel Helper FAQ:** Meta Pixel Helper extension → "FAQ" button
- **Audience Creation Guide:** Meta Ads Manager → Help → "Create Audience"
- **Troubleshooting:** Events Manager → Diagnostics tab

---

**Last Updated:** April 28, 2026

**Questions?** Check the events in Events Manager → Diagnostics for detailed error messages.
