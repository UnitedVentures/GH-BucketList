# Bucket List — Go Holidays

Luxury travel one-pager: one destination per month, Sep 2026 → Aug 2027.
React 18 + Vite. No router lib, no CSS framework, no state lib.

## Commands
- `npm run dev` — dev server (port 5173; preview panel launch config: `bucketlist-dev`)
- `npm run build` — production build to `dist/`
- Deploy: push to `main` → `.github/workflows/deploy.yml` builds and publishes to
  GitHub Pages. Live at https://unitedventures.github.io/GH-BucketList/. Pages CDN
  caches HTML ~10 min — a brief white-screen right after deploy is normal.

## Architecture
- `vite.config.js` — `base: './'` (required for the Pages sub-path; keep relative URLs)
- Routing: query param only. `?itinerary=<slug>` → `Itinerary.jsx`; otherwise the
  story flow runs. In-page anchors: `#destination`, `#editions`, `#announcements`.
- `src/App.jsx` — Story overlay until revealed, then Nav + Hero + ItineraryFlow +
  Footer + MonthRail. Story state is not persisted (refresh restarts it).
- One component per concern — read each file's own comments for behavior detail
  before changing it:
  - `Story.jsx` / `StoryCollage.jsx` / `ShaderBg.jsx` — fixed full-screen intro narrative
  - `Hero.jsx` — sticky video hero for the featured destination
  - `ItineraryBody.jsx` — shared facts/overview/days/inclusions/CTA markup, used by
    both `ItineraryFlow.jsx` (homepage) and `Itinerary.jsx` (standalone page) — edit once
  - `MonthRail.jsx` — fixed vertical month nav, desktop only
  - `Itinerary.jsx` — standalone `?itinerary=` page + PDF download (`html2pdf.js`
    rendering `src/lib/itineraryDocument.js`)
  - `Footer.jsx` — local-only signup form, not wired to a backend yet
  - `Upcoming.jsx` / `Band.jsx` — currently unused, kept for later
  - Hooks: `useScramble`, `useParallax`, `useReveal`, `useLenis`

## Data (edit these for monthly content — no component changes needed)
- `src/data/editions.js` — `featured`, `upcoming[11]`, `whatsapp(msg)` helper
- `src/data/itineraries.js` — full itinerary content keyed by slug (currently only `south-africa`)

## Design system (all in src/index.css)
- Palette: ink `#0f120a`, coal `#171b0f`, cream `#f2efe2`, gold `#bfa04a`,
  gold-soft `#e2d194`
- Type: display = 'Great Vibes' script, serif = Cormorant Garamond, body = Poppins
- Brand assets: `public/images/Logo.svg`, `Favicon.svg` / `Favicon-512.png` —
  reference via `import.meta.env.BASE_URL + 'images/…'` in JSX, `./images/…` in
  index.html (never `/images/…` — breaks on Pages)
- Images: Unsplash only, verify chosen IDs return 200 before using

## Token efficiency (rtk)
`rtk` is installed (/opt/homebrew/bin/rtk) — a proxy that compacts CLI output
before it reaches the model. Prefer it for noisy commands: `rtk git status`,
`rtk git log`, `rtk diff`, `rtk err npm run build`, `rtk ls/tree/find/grep/read`.
Plain commands are fine when full output is genuinely needed.

## Gotchas
- The embedded preview panel's screenshot capture freezes routinely, and
  programmatic scrolling doesn't stick while Lenis is active. Verify via DOM
  checks (elementFromPoint, getBoundingClientRect, computed styles) before
  concluding something is visually broken; restart the preview server if stuck.
- The user edits files directly between sessions — always check current file
  state before acting, and don't revert changes you didn't make.
- Large visual/structural changes have been tried and rolled back before —
  confirm scope before large-scale rewrites; prefer incremental, reversible steps.
- Client details: Go Holidays, Sri Lanka. WhatsApp +94 77 221 1600.
  Socials: instagram.com/goholidays_srilanka, facebook.com/goholidays.srilanka.
