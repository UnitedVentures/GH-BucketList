# Bucket List

Luxury travel — one destination, every month, like no other.

A React + Vite landing site. The upcoming month's destination is the face of
the page; scroll for the initiative manifesto and the next four editions.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing the monthly content

All destination content lives in [`src/data/editions.js`](src/data/editions.js):

- `featured` — the hero destination (month, tagline, image, prev/next months)
- `upcoming` — the eleven following monthly editions (Sep 2026 → Aug 2027)
- `bandImage` — the full-bleed parallax quote band image
- `whatsapp(message)` — builds the "Reserve the Experience" chat link to the
  Go Holidays WhatsApp business line (+94 77 221 1600)

Images are served from Unsplash at 2000–2400px.

## Type & palette

- Display: `Lavish` (falls back to Cormorant Garamond if not installed)
- Body: Poppins
- Palette: warm ink `#14100c`, cream `#f4eee4`, champagne gold `#c9a35f`
