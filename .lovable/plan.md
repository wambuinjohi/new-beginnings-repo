
## Goal

1. Add a new **HACH Instruments** product page modeled after https://www.hiyilab.com/hach-instruments.html (re-themed for Moris One Enterprises — not a visual clone).
2. Make sure the new page (and the rest of the site) is properly set up for Google Search.
3. Activate the automated marketing layer already scaffolded in the code so visits → leads → customers, with target/retarget tracking.

---

## 1. New Page: HACH Instruments

**Route:** `/products/hach-instruments`
**File:** `src/pages/products/HachInstruments.tsx` (new)
**Registered in:** `src/App.tsx`
**Linked from:** Water Analysis category card and main product navigation.

Page sections:
- Hero: "HACH Water Quality Instruments" + short intro (lab + portable spectrophotometers, COD/ammonia/phosphorus/nitrogen/heavy metal/disinfection residue analysis).
- Sub-category chips: HACH Instruments, COD Determination, Ammonia Nitrogen, Total Phosphorus, Total Nitrogen, Heavy Metal, Disinfection Residue, Refractometer, Other Testing.
- Product grid (8 starter items pulled from the source page, re-described in our voice):
  - HACH DR3900 Laboratory VIS Spectrophotometer
  - HACH DR6000 UV-Visible Spectrophotometer
  - HACH DR1900 Portable Spectrophotometer
  - HACH DR1010 COD Rapid Determination Instrument
  - HACH HT200S COD High-Temperature Dissolver
  - HACH DRB200 Heating Digester
  - HACH DR300 Chlorine Dioxide Pocket Colorimeter
  - HACH DR300 Pocket Ozone Colorimeter
- Each card → existing `ProductDetail` route pattern (`/products/hach-instruments/:productId`) with a new `hachProducts.ts` data file matching the shape of `automobileProducts.ts`.
- Inquiry CTA block (WhatsApp + "Request quote" form) reusing existing `Contact` patterns — every submit fires `trackFormSubmission` + `trackLeadCreated`.

Reuses existing primitives: `ProductPageLayout`, `Navigation`, `Footer`, `Breadcrumb`, `use-page-meta`.

## 2. Google Search readiness

Per-page (HACH Instruments + audit existing product pages):
- Unique `<title>` ≤60 chars with primary keyword (e.g. "HACH Water Quality Instruments | Moris One Enterprises").
- `<meta name="description">` ≤160 chars.
- Single `<h1>`, semantic `<section>`/`<article>` markup, descriptive `alt` on all product images.
- Canonical tag via `use-page-meta`.
- JSON-LD: `Product` schema per item, `BreadcrumbList` per page, `Organization` site-wide.
- Open Graph + Twitter Card tags.

Site-wide:
- Add `/products/hach-instruments` and child product URLs to `public/sitemap.xml` and confirm `public/robots.txt` allows them.
- Verify `scripts/prerender.js` includes the new routes so crawlers get static HTML.
- Provide a short checklist for the user: submit sitemap in Google Search Console, verify domain, request indexing.

> Note: I'll treat "check Google search" as **on-page SEO + indexability**. If you actually meant a live Google search-results lookup or a Google Site Search widget, tell me and I'll adjust.

## 3. Automated Marketing — Lead Generation & Target/Retarget

Code already has `src/lib/retargeting.ts`, a `LeadHandler`, `CampaignHandler`, `TrackingHandler`, and a `LeadScorer` — they just need to be wired end-to-end and configured.

**Tracking activation (frontend):**
- Initialize Meta Pixel + Google Analytics on app boot in `src/main.tsx` using `initializeMetaPixel()` / `initializeGoogleAnalytics()`.
- Add `VITE_META_PIXEL_ID` and `VITE_GA_ID` to `.env.example` and request the real values from you.
- Fire `trackPageView` on every route change (extend `useAnalyticsPageTracking`).
- Fire `trackProductView` on every product detail page (HACH + existing).
- Fire `trackLeadCreated` / `trackFormSubmission` on every quote/contact submit.

**Lead capture surfaces:**
- Inline "Request quote" form on each HACH product card and detail page → POSTs to `/api/leads` (existing `LeadHandler`).
- Sticky WhatsApp CTA already present (`src/lib/whatsapp.ts`) — augment to log a `whatsapp_click` lead event.
- Exit-intent / scroll-depth prompt on product pages offering a downloadable HACH catalogue PDF in exchange for email.

**Retargeting & nurture:**
- Server-side: confirm `LeadScorer` is invoked on lead create; high-score leads (>70) auto-tagged `hot` and surfaced in `LeadsManager`.
- Build a daily audience export from `tracking_pixels` table → CSV ready for Meta Custom Audiences / Google Customer Match (admin button in `CampaignManager`).
- Email drip via existing `EmailService`: 3-step sequence (Day 0 thank-you, Day 2 product spec sheet, Day 7 special-offer) triggered when a lead is created.
- UTM capture: persist `utm_source/medium/campaign` from URL into the lead record so campaign ROI is measurable in `AnalyticsDashboard`.

**Admin visibility:**
- `AnalyticsDashboard`: add tiles for Pixel events (24h), top product views, lead → customer conversion rate, campaign attribution.

---

## Technical Notes

- **Stack constraints:** React 18 + Vite + Tailwind + TypeScript. PHP backend (`public/*.php`) handles persistence; no new server framework.
- **Type errors flagged in last build** (`Property 'type' does not exist on type 'Element'` in `Contact.tsx`, `Partners.tsx`, `ProductPageLayout.tsx`, `use-page-meta.ts`, `ProductDetail.tsx`) will be fixed in the same pass — they block compilation of the new page anyway.
- **Secrets needed before full rollout:** `VITE_META_PIXEL_ID`, `VITE_GA_ID`, optional SMTP creds for `EmailService` if not already set.
- **Images:** I will use placeholder product images (or generate generic instrument shots) and wire them so you can swap in real HACH product photos via `ProductManager` later.

---

## Open Questions (please answer before I implement)

1. Should the HACH page be **standalone** (just a product listing under Water Analysis) or also seed the **sub-categories** (COD, Ammonia, Phosphorus, etc.) as their own routes now?
2. Do you already have **Google Analytics 4** and **Meta Pixel** IDs I should plug in, or do you want me to add the env placeholders and you fill them in later?
3. For the email drip, should I use the existing `EmailService` (SMTP) or wire in a dedicated transactional provider (Resend, etc.)?
