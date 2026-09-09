# services-ops · Laundry management landing page

A Vietnamese product website built with Next.js 16 App Router, React 19, strict TypeScript, and Tailwind CSS 4. The page uses server components with small client components for navigation, the illustrative product preview, and order dialogs.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Product configuration

Copy `.env.example` to `.env.local` and set the values that are available. Public variables are compiled into the site at build time; rebuild after changing them.

| Variable                    | Purpose                                                                        |
| --------------------------- | ------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_PRODUCT_NAME`  | Product name, defaults to `services-ops`                                       |
| `NEXT_PUBLIC_SITE_URL`      | Absolute public origin, used for canonical and social URLs; enables indexing   |
| `NEXT_PUBLIC_ADMIN_URL`     | Absolute URL of the separate admin app; enables login and product-access links |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Real contact inbox; enables email links                                        |

There is no invented contact address, registration flow, or backend. Without an admin URL, the closing action opens a sample order. Without a contact inbox, contact links are omitted. Local builds use localhost for social metadata and remain unindexed until a public URL is configured.

**Replaceable content:** All product previews are labeled illustrations with sample data, not screenshots of the existing admin application. Replace these with the real product UI or screenshots when available. The preview is a presentation and does not read or change real store data.

## Structure

```text
src/
  app/                    Page composition, global styles, metadata, icons
  assets/fonts/           Self-hosted Be Vietnam Pro fonts and OFL license
  components/
    layout/               Reusable header and footer
    sections/             Hero, benefits, features, workflow, pricing, closing CTA
    product/              Interactive product preview and order presentation
    ui/                   Buttons, brand, icons, status badge
  data/                   Site copy, navigation, configuration, sample records
  lib/                    Currency, order totals, URL validation
  types/                  Shared product types
tests/                    Browser interaction, responsive, and accessibility checks
public/images/            Local, optimized imagery
```

`src/app/page.tsx` only composes the sections. Reorder or remove sections there. Edit marketing copy in `src/data/site.ts` and sample records in `src/data/product.ts`. Edit the two planned packages and their pending prices in `src/data/pricing.ts`. Add future FAQ, product updates, or contact sections as independent section components. Add future pages with App Router folders and reuse the existing header/footer.

## Design and accessibility

The design uses one light theme, the supplied logo's electric-blue and navy palette, self-hosted Vietnamese typography, restrained CSS motion, and a consistent radius scale. Marketing content and the interactive preview adapt separately for mobile. Buttons, links, disclosure controls, and dialogs have keyboard support; reduced motion is respected. No animation or state management library is required.

The supplied `public/images/logo.png` is used in the header, footer, product preview, CTA, favicon, and social image. Phosphor supplies the interface icons. Font files are stored locally so production builds do not depend on Google Fonts requests. The Open Graph image is generated at build time with the same local font and product identity.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite runs against the production build on port 3100. It covers page metadata, local image loading, section links, preview tabs, search and status filters, empty-state recovery, customer balances, order-dialog focus and dismissal, mobile navigation, workflow disclosures, overflow at 320/390/768/1024/1440px, and automated WCAG AA checks. Browser checks emulate mobile Chromium; they do not replace device or screen-reader testing.

## Image asset

`public/images/laundry-studio.webp` is the final 1448 × 1086 supporting image (approximately 125 KB), generated with the built-in image tool and locally encoded as WebP. Its role is an illustrative shop photograph, not customer evidence.

Generation prompt:

> Use case: photorealistic-natural. Asset type: supporting photograph for a refined Vietnamese laundry management SaaS landing page. Create one editorial interior photograph of a small, beautiful, believable neighborhood laundry shop in daylight. Foreground: a neat stack of fluffy white towels with one pale sage green towel on a clean light-oak folding counter, a simple cream cotton laundry basket next to it. Background: two white front-loading washing machines, quiet pale sage tiled wall, a small sunlit window with soft shadows. Frame as an intimate architectural still life, 4:3 landscape composition, camera at counter height, towels in left foreground and washing machines in right midground. Warm natural daylight, realistic material texture, gentle film grain, restrained whites, pale sage green, natural oak. The room should feel useful and welcoming, uncluttered, not a luxury bathroom. No people, no text, no logos, no overlays, no watermarks. High-quality natural photography, not 3D render.
# services-ops-landing-page
