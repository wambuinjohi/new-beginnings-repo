## Plan: Day-0/2/7 Email Drip + Real HACH Images + GA4 Wiring

### 1. Wire Google Analytics 4 (G-SFBEDQ56Q0, Stream 13364169625)

- Add `VITE_GA_ID=G-SFBEDQ56Q0` to `.env` and `.env.example`.
- Call `initializeGoogleAnalytics()` and `initializeMetaPixel()` from `src/main.tsx` so GA fires on every page load.
- Add a route-change `trackPageView()` listener in `App.tsx` so SPA navigations report to GA4.
- Leave `VITE_META_PIXEL_ID` blank — Pixel init is a no-op until the user supplies an ID.

### 2. Embed Real HACH Product Images

- Generate clean studio product images via `imagegen` (white background) for each of the 8 HACH SKUs in `src/data/hachProducts.ts`: DR3900, DR6000, DR1900, DR1010, HT200S, DRB200, DR300 ClO2, DR300 Ozone.
- Save to `src/assets/hach/<id>.jpg` and import as ES6 modules.
- Replace the `PLACEHOLDER` URL on each product entry with the imported asset.
- `HachInstruments.tsx` and `HachProductDetail.tsx` already render `product.image` — just verify `loading="lazy"` and use `imageAlt`.
- Add `og:image` per product detail page via `use-page-meta`.

Note: We use AI-generated representative imagery, not HACH's copyrighted catalog photos. If you'd rather use official press photos, upload them and we'll swap them in.

### 3. Day-0 / Day-2 / Day-7 Drip on the Existing PHP EmailService

Reuse `public/EmailService.php` + the `email_queue` and `campaigns` tables — no new infra, just a sequence keyed off lead creation.

#### 3a. Schema (`public/migrations.sql`)

New `lead_drip_schedule` table:
```text
id, lead_id (FK leads.id), step (0|2|7),
scheduled_at, status (pending|sent|skipped), sent_at, created_at
UNIQUE (lead_id, step)
```

#### 3b. Enrollment in `public/LeadHandler.php::create()`

After inserting a new lead:
- Render Day-0 "Thanks for your inquiry" template with `{{name}}` and `{{product_interest}}`.
- Send via `EmailService::sendCampaignEmail()` so it gets the tracking pixel.
- Insert two `lead_drip_schedule` rows: step=2 at `NOW()+2 days`, step=7 at `NOW()+7 days`.
- Skip enrollment when the lead already exists (current dedupe path).

#### 3c. Templates in `public/email-templates/`

- `drip-day0.html` — Welcome + WhatsApp CTA + featured product.
- `drip-day2.html` — Curated HACH/Palintest picks tied to `product_interest`.
- `drip-day7.html` — Case study + quotation nudge with WhatsApp CTA.

Rendered through `EmailService::renderTemplate()`.

#### 3d. Cron worker `public/cron/process-drip.php`

- Selects pending rows where `scheduled_at <= NOW()`.
- For each: load lead, render the matching template, call `sendCampaignEmail`, mark row `sent`.
- Skip leads with `status='converted'` or `unsubscribed`.
- Cron line in `DEPLOYMENT.md`: `*/5 * * * * php /path/to/process-drip.php`.
- Existing `EmailService::processQueue()` keeps draining `email_queue`.

#### 3e. Tracking → retargeting

- Pixel on every drip email already feeds `tracking_pixels` + `LeadScorer`.
- Score >70 auto-tags `hot` (already implemented).

### Files to add/edit

- `.env`, `.env.example`
- `src/main.tsx`, `src/App.tsx`
- `src/assets/hach/*.jpg` (8 new), `src/data/hachProducts.ts`
- `src/pages/products/HachInstruments.tsx`, `HachProductDetail.tsx`
- `public/migrations.sql`
- `public/LeadHandler.php`
- `public/email-templates/drip-day0.html|day2.html|day7.html`
- `public/cron/process-drip.php`
- `DEPLOYMENT.md`
