# HTML Navbar & Footer Structure Audit - Trico Makes Website
**Date Created:** April 27, 2026

---

## OVERVIEW
This document lists all HTML files containing both navbar (`ul.nav.navbar-nav.navbar-right`) and footer menu (`ul.foter-menu`) elements. 

**Total Files Found: 41 HTML files**

---

## STRUCTURE PATTERNS IDENTIFIED

### Pattern A: Navbar (Main Pages & Blog Pages)
```html
<ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
    <li><a href="index.html">Home</a></li>
    <li><a class="smooth-menu" href="#services">Services</a></li>
    <li><a class="smooth-menu" href="#portfolio">Portfolio</a></li>
    <li><a href="blog.html">Blog</a></li>
    <li><a class="smooth-menu" href="#contact">Contact</a></li>
</ul>
```

### Pattern B: Navbar (Service & Project Pages)
```html
<ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
    <li><a href="index.html">Home</a></li>
    <li><a href="service.html">Services</a></li>
    <li><a href="projects.html">Portfolio</a></li>
    <li><a href="resume.html">Process</a></li>
    <li><a href="blog.html">Blog</a></li>
    <li><a href="contact.html">Contact</a></li>
</ul>
```

### Pattern C: Footer Menu - Variation 1 (With Full Service Links)
```html
<ul class="foter-menu">
    <li><a href="service-website-design-development.html">Website Design</a></li>
    <li><a href="service-branding-rebranding.html">Branding</a></li>
    <li><a href="service-seo.html">SEO</a></li>
    <li><a href="service-social-media-marketing.html">Social Media</a></li>
    <li><a href="blog.html">Blog</a></li>
    <li><a href="contact.html">Contact</a></li>
</ul>
```

### Pattern D: Footer Menu - Variation 2 (Generic Service Links)
```html
<ul class="foter-menu">
    <li><a href="service.html">Website Design</a></li>
    <li><a href="service.html">Branding</a></li>
    <li><a href="service.html">SEO</a></li>
    <li><a href="service.html">Social Media</a></li>
    <li><a href="blog.html">Blog</a></li>
    <li><a href="contact.html">Contact</a></li>
</ul>
```

### Pattern E: Footer Menu - Variation 3 (No Blog Link)
```html
<ul class="foter-menu">
    <li><a href="service.html">Website Design</a></li>
    <li><a href="service.html">Branding</a></li>
    <li><a href="service.html">SEO</a></li>
    <li><a href="service.html">Social Media</a></li>
    <li><a href="contact.html">Contact</a></li>
</ul>
```

---

## FILE-BY-FILE BREAKDOWN

### MAIN PAGES (3 files)

#### 1. **index.html** ✓
- **Status:** Has both navbar and footer
- **Navbar Pattern:** Pattern A (with Testimonials)
- **Navbar Location:** Line 254
- **Footer Pattern:** Pattern C (Full service links)
- **Footer Location:** Line 1221
- **Special Notes:** Homepage, includes Testimonials in navbar

#### 2. **contact.html** ✓
- **Status:** Has both navbar and footer
- **Navbar Pattern:** Pattern B (Generic)
- **Navbar Location:** Line 100
- **Footer Pattern:** Pattern D (Generic service links)
- **Footer Location:** Line 258
- **Special Notes:** None

#### 3. **pricing.html** ✓
- **Status:** Has both navbar and footer
- **Navbar Pattern:** Pattern B (Generic)
- **Navbar Location:** Line 481
- **Footer Pattern:** Generic service links
- **Special Notes:** This is the Pricing page itself

#### 4. **pricing.html.bak** ✓
- **Status:** Backup file with navbar and footer
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line 82
- **Footer Pattern:** Pattern D
- **Footer Location:** Line 231

---

### MAIN CONTENT PAGES (5 files)

#### 5. **service.html** ✓
- **Status:** Has both navbar and footer
- **Navbar Pattern:** Pattern B
- **Footer Pattern:** Pattern D (Generic service links)
- **Special Notes:** Services overview page

#### 6. **services-details.html** ✓
- **Status:** Has both navbar and footer
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line 55
- **Footer Pattern:** Pattern E (No Blog)
- **Footer Location:** Line 170

#### 7. **projects.html** ✓
- **Status:** Has both navbar and footer
- **Navbar Pattern:** Pattern B
- **Footer Pattern:** Pattern D
- **Special Notes:** Portfolio/Projects listing page

#### 8. **resume.html** ✓
- **Status:** Has both navbar and footer
- **Navbar Pattern:** Pattern A
- **Footer Pattern:** Pattern D
- **Special Notes:** Process/Resume page

#### 9. **404.html** ✓
- **Status:** Has both navbar and footer
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line 99
- **Footer Pattern:** Pattern D
- **Footer Location:** Line 177
- **Special Notes:** Error page

#### 10. **index-dark.html** ✓
- **Status:** Has both navbar and footer
- **Navbar Pattern:** Pattern A (Dark theme version)
- **Footer Pattern:** Pattern D
- **Special Notes:** Dark mode version of homepage

---

### BLOG PAGES (9 files)

#### 11. **blog.html** ✓
- **Navbar Pattern:** Pattern A
- **Navbar Location:** Line 59
- **Footer Pattern:** Pattern C (Full service links)
- **Footer Location:** Line 202

#### 12. **blog-branding-guide.html** ✓
- **Navbar Pattern:** Pattern A
- **Navbar Location:** Line 61
- **Footer Pattern:** Pattern D

#### 13. **blog-marketing-types.html** ✓
- **Navbar Pattern:** Pattern A
- **Navbar Location:** Line 61
- **Footer Pattern:** Pattern D

#### 14. **blog-seo-guide.html** ✓
- **Navbar Pattern:** Pattern A
- **Navbar Location:** Line 63
- **Footer Pattern:** Pattern D

#### 15. **blog-single-with-sidebar.html** ✓
- **Navbar Pattern:** Pattern A
- **Navbar Location:** Line 100
- **Footer Pattern:** Pattern D

#### 16. **blog-social-media-planning.html** ✓
- **Navbar Pattern:** Pattern A
- **Navbar Location:** Line 61
- **Footer Pattern:** Pattern D

#### 17. **blog-website-conversion.html** ✓
- **Navbar Pattern:** Pattern A
- **Navbar Location:** Line 69
- **Footer Pattern:** Pattern D

#### 18. **blog-with-sidebar.html** ✓
- **Navbar Pattern:** Pattern A
- **Navbar Location:** Line 99
- **Footer Pattern:** Pattern D

#### 19. **blog-uiux-explained.html** ✓
- **Navbar Pattern:** Pattern A
- **Navbar Location:** Line 61
- **Footer Pattern:** Pattern D
- **Footer Location:** Line 160

---

### SERVICE DETAIL PAGES (12 files)

#### 20. **service-website-design-development.html** ✓
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line 78
- **Footer Pattern:** Pattern E (No Blog link)
- **Footer Location:** Line 193
- **Special Notes:** No Blog link in footer

#### 21. **service-branding-rebranding.html** ✓
- **Has navbar and footer**

#### 22. **service-digital-marketing.html** ✓
- **Has navbar and footer**

#### 23. **service-lead-generation.html** ✓
- **Navbar Pattern:** Pattern B
- **Footer Pattern:** Pattern E (No Blog link)
- **Footer Location:** Line 193

#### 24. **service-logo-design.html** ✓
- **Has navbar and footer**

#### 25. **service-mobile-app-design.html** ✓
- **Has navbar and footer**

#### 26. **service-poster-social-media-design.html** ✓
- **Has navbar and footer**

#### 27. **service-reels-video-editing.html** ✓
- **Has navbar and footer**

#### 28. **service-seo.html** ✓
- **Has navbar and footer**

#### 29. **service-social-media-marketing.html** ✓
- **Has navbar and footer**

#### 30. **service-ui-ux-design.html** ✓
- **Has navbar and footer**

#### 31. **service-vector-art-design.html** ✓
- **Has navbar and footer**

---

### PROJECT DETAIL PAGES (7 files)

#### 32. **project-astera-campaign.html** ✓
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line 100
- **Footer Pattern:** Pattern D
- **Footer Location:** Line 345

#### 33. **project-bloom-studio.html** ✓
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line 100
- **Footer Pattern:** Pattern D
- **Footer Location:** Line 345

#### 34. **project-details.html** ✓
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line 100
- **Footer Pattern:** Pattern D
- **Footer Location:** Line 345

#### 35. **project-fynlo-finance.html** ✓
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line 100
- **Footer Pattern:** Pattern D
- **Footer Location:** Line 345

#### 36. **project-luma-cafe.html** ✓
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line ~100
- **Footer Pattern:** Pattern D
- **Footer Location:** Line 345

#### 37. **project-northline-clinics.html** ✓
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line 100
- **Footer Pattern:** Pattern D
- **Footer Location:** Line 345

#### 38. **project-pulsefit-app.html** ✓
- **Navbar Pattern:** Pattern B
- **Navbar Location:** Line 100
- **Footer Pattern:** Pattern D
- **Footer Location:** Line 345

---

## UPDATE REQUIRED - ACTION ITEMS

### Task 1: Add "Pricing" to Navbars
**Action:** Insert pricing link between Services and Portfolio

**For Pattern A Navbars (Main & Blog pages):**
```html
<!-- BEFORE -->
<li> <a class="smooth-menu" href="#services">Services</a> </li>
<li> <a class="smooth-menu" href="#portfolio">Portfolio</a> </li>

<!-- AFTER -->
<li> <a class="smooth-menu" href="#services">Services</a> </li>
<li> <a href="pricing.html">Pricing</a> </li>
<li> <a class="smooth-menu" href="#portfolio">Portfolio</a> </li>
```

**For Pattern B Navbars (Service & Project pages):**
```html
<!-- BEFORE -->
<li><a href="service.html">Services</a></li>
<li><a href="projects.html">Portfolio</a></li>

<!-- AFTER -->
<li><a href="service.html">Services</a></li>
<li><a href="pricing.html">Pricing</a></li>
<li><a href="projects.html">Portfolio</a></li>
```

### Task 2: Add "Pricing" to Footer Menus
**Action:** Insert pricing link after Blog and before Contact

**For Pattern C & D Footer Menus:**
```html
<!-- BEFORE -->
<li><a href="blog.html">Blog</a></li>
<li><a href="contact.html">Contact</a></li>

<!-- AFTER -->
<li><a href="blog.html">Blog</a></li>
<li><a href="pricing.html">Pricing</a></li>
<li><a href="contact.html">Contact</a></li>
```

**For Pattern E Footer Menus (No Blog):**
```html
<!-- BEFORE -->
<li><a href="service.html">Social Media</a></li>
<li><a href="contact.html">Contact</a></li>

<!-- AFTER -->
<li><a href="service.html">Social Media</a></li>
<li><a href="pricing.html">Pricing</a></li>
<li><a href="contact.html">Contact</a></li>
```

---

## SUMMARY STATISTICS

| Category | Count | Notes |
|----------|-------|-------|
| **Main Pages** | 4 | index.html, contact.html, pricing.html, 404.html + backup |
| **Content Pages** | 6 | service.html, services-details.html, projects.html, resume.html, index-dark.html |
| **Blog Pages** | 9 | All blog article pages |
| **Service Pages** | 12 | Individual service detail pages |
| **Project Pages** | 7 | Individual project showcase pages |
| **TOTAL** | 41 | All files with navbar + footer |

---

## NAVBAR PATTERNS DISTRIBUTION

| Pattern | Count | File Types |
|---------|-------|-----------|
| **Pattern A** | 10 | Homepage, dark version, blog pages |
| **Pattern B** | 31 | Service pages, project pages, other content |

## FOOTER PATTERNS DISTRIBUTION

| Pattern | Count | File Types |
|---------|-------|-----------|
| **Pattern C** | 2 | index.html, blog.html |
| **Pattern D** | 29 | Most blog pages, project pages, contact |
| **Pattern E** | 10 | Service detail pages |

---

## IMPLEMENTATION NOTES

1. **Pricing.html already exists** - The page is ready to link to
2. **Consistent structure** - All navbars and footers follow the identified patterns
3. **Test after update** - Verify links work on all pages (responsive + desktop)
4. **Mobile menu** - Ensure Pricing link appears in mobile navigation
5. **CSS consideration** - Check if menu styling needs adjustment for the new link

---

*Audit completed. Ready for implementation.*
