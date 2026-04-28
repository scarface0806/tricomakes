# Google Search Console Setup — Trico Makes

## Step 1: Add Property
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click "**Add Property**" (top left)
4. Choose "**URL prefix**" option
5. Enter: `https://trico-makes.vercel.app`
6. Click "**Continue**"

---

## Step 2: Verify Ownership (HTML Tag Method)

Search Console will show 5 verification options. Choose **"HTML tag"**:

1. Copy the entire meta tag from Search Console
   - It will look like:  
   ```html
   <meta name="google-site-verification" content="abc123xyz456...">
   ```

2. Open `index.html` in your code editor

3. Find the line:
   ```html
   <meta name="google-site-verification" 
     content="SEARCH_CONSOLE_VERIFICATION_CODE">
   ```

4. Replace `SEARCH_CONSOLE_VERIFICATION_CODE` with **only the content value** from Step 1
   - Example: Change `SEARCH_CONSOLE_VERIFICATION_CODE` to `abc123xyz456...`
   - Keep the tag structure the same

5. Save the file and **deploy to Vercel**
   - Push your changes to your repository
   - Vercel will auto-deploy within minutes

6. Return to Search Console and click "**Verify**"
   - Status should change to "Verified" instantly

---

## Step 3: Submit Sitemap

1. In Search Console left menu → Click **"Sitemaps"**

2. In the text field, enter: `sitemap.xml` (without the domain)

3. Click "**Submit**"

4. You'll see the status:
   - Success ✓ (usually appears within 24 hours)
   - Pending (checking URLs in the sitemap)

**Note:** The sitemap includes all 33 pages of your website with proper priorities:
- Homepage: Priority 1.0 (weekly updates)
- High-intent pages (pricing, free audit): Priority 0.9
- Service pages: Priority 0.8–0.9
- Portfolio/blog pages: Priority 0.6–0.8

---

## Step 4: What to Monitor Weekly

### Performance Dashboard
Check **"Performance"** for:
- **Total clicks** — How many times your pages appeared in search results AND were clicked
- **Total impressions** — How many times your pages appeared in search results
- **Average position** — Your current ranking position (lower is better)
- **CTR** — Click-through rate (target: improve from 2% to 4%+)

### Coverage Tab
Check for indexing issues:
- **Crawlable pages** — How many pages Google can access
- **Errors** — Pages that couldn't be indexed (block any redirects)
- **Valid with warnings** — Pages indexed but with issues (e.g., missing meta tags)

### Core Web Vitals Tab
Monitor page experience scores:
- **Good** — Meets Google's standards ✓
- **Needs improvement** — Optimize images/lazy load
- **Poor** — Performance issues (unlikely, Vercel is fast)

### Mobile Usability Tab
- Should show "No issues" after deployment
- If there are issues, fix responsive design breakpoints

---

## What to Expect: Data Timeline

| Timeline | What Happens |
|----------|--------------|
| **Immediately** | Verification is confirmed |
| **Within 1 hour** | Sitemap is crawled |
| **2–5 days** | First organic traffic data appears in Performance tab |
| **2–4 weeks** | Full keyword data, CTR data, and ranking data becomes visible |
| **4–12 weeks** | SEO improvements from better content/structure become visible |

---

## Sample Dashboard View After 4 Weeks

```
Performance Summary
├─ Total Clicks: 350 (from Google Search)
├─ Impressions: 4,200 (appeared in results)
├─ Average Position: 12.5 (need 1-3 for visibility)
├─ CTR: 8.3% (good!)
│
Coverage
├─ Indexed Pages: 33/33 ✓
├─ Errors: 0
├─ Warnings: 0
│
Core Web Vitals (Last 28 days)
├─ Good: 95%
├─ Needs Improvement: 5%
└─ Poor: 0%
```

---

## Common Issues & Fixes

### Issue: Verification Failed
**Fix:**
- Make sure you replaced `SEARCH_CONSOLE_VERIFICATION_CODE` with the actual code
- Ensure the file was saved and deployed to Vercel
- Wait 24 hours and try again
- Clear browser cache (Ctrl+Shift+Del)

### Issue: No Data Appearing After 1 Week
**Fix:**
- Check Coverage tab for errors
- Verify sitemap was submitted
- Check robots.txt is allowing Google (`Allow: /`)
- Make sure site is publicly accessible (not behind authentication)
- Check Core Web Vitals — if poor, Google crawls less frequently

### Issue: Pages Not Indexed
**Fix:**
- Verify they're in sitemap.xml
- Check Coverage tab for specific error (e.g., "Excluded by noindex tag")
- Submit URL for indexing manually (URL Inspection tool)
- Check if `/assets/` folder has `Disallow` rule (it does, which is correct)

### Issue: Low CTR from Search Results
**Fix:**
- Improve meta titles (currently generic like "Page Title")
- Write better meta descriptions (40–160 chars)
- Add [schema markup](https://schema.org) for rich snippets
- Check if title/description is being shown correctly

---

## Key Checklist

- [x] **index.html** has Google Search Console verification meta tag
- [x] **sitemap.xml** includes all 33 pages with proper priorities
- [x] **robots.txt** allows Google crawling
- [x] All pages include sitemap link tag in `<head>`
- [x] GA4 event tracking is configured
- [x] Site deployed to Vercel with HTTPS
- [x] Canonical tags point to HTTPS versions
- [x] Mobile responsive design verified
- [ ] **YOU:** Add Google Search Console verification code to index.html
- [ ] **YOU:** Deploy to Vercel
- [ ] **YOU:** Submit sitemap in Search Console
- [ ] **YOU:** Monitor data after 2–4 weeks

---

## Important Notes

🔔 **Without verification code:** Search Console shows "Not verified" but crawling still happens

🔔 **Robots.txt location:** Must be in website root (`https://trico-makes.vercel.app/robots.txt`)

🔔 **Sitemap URL:** Google automatically looks for `/sitemap.xml` but manually submitting it speeds up crawling

🔔 **Data appears in this order:**
1. Clicks & impressions data (first)
2. Keyword data (takes longer)
3. Performance recommendations (after 2 weeks)

🔔 **Updates:** Changes you make (new pages, title changes) can take 2–14 days to reflect in Search Console

---

## Next Steps

1. ✅ Already done: Added verification meta tag & sitemap links to all pages
2. ✅ Already done: Created proper sitemap.xml with all URLs
3. 👉 **You do:** Replace `SEARCH_CONSOLE_VERIFICATION_CODE` in index.html with real code
4. 👉 **You do:** Deploy to Vercel
5. 👉 **You do:** Go to Search Console and verify
6. 👉 **You do:** Submit sitemap
7. Monitor performance after 2–4 weeks

---

**Questions?** Check the [Google Search Console Help Center](https://support.google.com/webmasters)

**Last Updated:** April 28, 2026
