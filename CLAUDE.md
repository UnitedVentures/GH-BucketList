# Bucket List — Go Holidays

Luxury travel one-pager: one destination per month, Sep 2026 → Aug 2027.
React 18 + Vite. No router lib, no CSS framework, no state lib.

## Commands
- `npm run dev` — dev server (port 5173; preview panel launch config: `bucketlist-dev`)
- `npm run build` — production build to `dist/`
- Deploy: push to `main` → `.github/workflows/deploy.yml` builds and publishes
  to GitHub Pages (source = GitHub Actions). Live at
  https://unitedventures.github.io/GH-BucketList/ (repo UnitedVentures/GH-BucketList;
  razzy23/BucketList redirects there). Pages CDN caches HTML ~10 min — brief
  white-screen window right after each deploy is normal (stale HTML → old asset 404).

## Architecture
- `vite.config.js` — `base: './'` (required for Pages sub-path; keep relative URLs)
- Routing: query param only. `?itinerary=<slug>` → `Itinerary.jsx`; anything else
  runs the story flow. In-page anchors: `#destination`, `#editions`, `#announcements`.
- `src/App.jsx` — `Story` overlay until revealed → then `Nav + Hero + Band + Upcoming + Footer`.
  Story state is NOT persisted: refresh restarts it (intentional).
- `src/components/Story.jsx` — fixed full-screen stepped narrative (wheel/touch/key,
  debounced ~1s per step, FORWARD-ONLY by design). Steps: logo landing → 3 statements
  → destination tease → fade into Hero reveal. Shader gradient bg (lazy-loaded).
- `src/components/ShaderBg.jsx` — `@shadergradient/react` (NOT the old `shadergradient`
  package — it bundles a duplicate React and crashes) + @react-three/fiber@8 + three;
  lazy import (three.js is heavy). `Loader.jsx` (plane-on-arc SVG) is the Suspense fallback.
- `src/components/Hero.jsx` — destination reveal: STICKY (pinned) video hero
  (`public/videos/south-africa.mp4`, 30s 1080p muted loop, 15MB, faststart;
  still image shows until the `playing` event fires — real autoplay-block
  fallback; retries on first interaction/visibilitychange). No buttons.
  Scroll sets `--heroExit` (content lifts/fades) while `ItineraryFlow` slides
  over it and Nav docks: wordmark logo shrinks into the Favicon icon,
  destination name centers, Reserve button appears (`.nav.is-docked`).
  NOTE: the embedded preview pane force-suspends <video> playback — verify
  video on a real browser/deployed site, not the pane.
- `src/components/ItineraryFlow.jsx` — the featured itinerary inline on the main
  page (facts → overview → days → inclusions/rates → Kruger alt).
- `Footer.jsx` — Bucket List signup: POST https://formsubmit.co/ajax/<inbox>
  (currently test inbox ravzeex0@gmail.com — swap before launch; form needed
  one-time activation link clicked in that inbox). Autoresponse emails the
  subscriber a link to the itinerary page.
- `src/components/Upcoming.jsx` / `Band.jsx` — currently UNUSED (removed from the
  main flow when the page became destination+itinerary only). Files kept.
- `src/components/Itinerary.jsx` — full page for slugs in `itineraries.js`, else
  "available soon" page. PDF download via `html2pdf.js` (dynamic import) rendering
  `src/lib/itineraryDocument.js` (light mode, dark green #22371f on #faf8ee, gold frames).
- Hooks: `useScramble` (text scramble on change), `useParallax`, `useReveal`
  (scroll-reveal; timestamp-throttled — do NOT use rAF or IntersectionObserver here,
  both break in embedded/background contexts).

## Data (edit these for monthly content — no component changes needed)
- `src/data/editions.js` — `featured` (hero + tease), `upcoming[11]`, `whatsapp(msg)`
  → wa.me/94772211600 (Go Holidays). Every entry: slug, month, edition Nº, tagline
  (must hint the ideal travel month), image (verified Unsplash ID).
- `src/data/itineraries.js` — full itinerary content keyed by slug (currently
  only `south-africa`, sourced from the client's docx).

## Design system (all in src/index.css, single file)
- Palette (CSS vars): ink #0f120a, coal #171b0f (olive darks), cream #f2efe2,
  gold #bfa04a, gold-soft #e2d194. NO brown/coffee tones (user migrated away).
- Overlay/veil rgba values are hard-coded olive: rgba(15,18,10,…) and rgba(23,27,15,…).
- Type: display = 'Great Vibes' calligraphy (titles, logo contexts); serif =
  Cormorant Garamond (taglines, quotes, day titles); body = Poppins. Script titles
  need line-height ≥1.1 and no letter-spacing.
- Brand assets: `public/images/Logo.svg` (wordmark, used in nav + story landing),
  `Favicon.svg` + `Favicon-512.png`. Reference via `import.meta.env.BASE_URL + 'images/…'`
  in JSX, `./images/…` in index.html (never `/images/…` — breaks on Pages).
- Images: Unsplash only, IDs verified via `https://unsplash.com/napi/search/photos?query=…`
  (avoid `premium_photo-` IDs; always confirm the chosen ID returns 200).

## Token efficiency (rtk)
`rtk` is installed (/opt/homebrew/bin/rtk) — a proxy that compacts CLI output
before it reaches the model. Prefer it for noisy commands:
- `rtk git status` / `rtk git log` / `rtk diff` instead of raw git
- `rtk err npm run build` — show only errors/warnings from a build
- `rtk ls <dir>`, `rtk tree`, `rtk find`, `rtk grep`, `rtk read <file>` for exploration
- `rtk json` to compact JSON output (e.g. curl | rtk json)
Plain commands are fine when full output is genuinely needed (e.g. exact error
context); default to rtk for routine checks.

## Gotchas
- The embedded preview panel's screenshot capture freezes routinely (stale frames,
  ignored scrollTo). Verify via DOM checks (elementFromPoint, getBoundingClientRect)
  before assuming the site is broken; restart the preview server to recover.
- User edits files directly between sessions (copy tweaks, commented-out code) —
  always respect current file state, don't revert.
- Client details: Go Holidays, Sri Lanka. WhatsApp +94 77 221 1600.
  Socials: instagram.com/goholidays_srilanka, facebook.com/goholidays.srilanka.
