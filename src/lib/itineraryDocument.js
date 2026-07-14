/**
 * Renders the downloadable itinerary — dark green text on warm paper,
 * gold accents, framed photographs — as a detached DOM element that
 * html2pdf snapshots into a paginated A4 PDF. Styles are scoped under
 * .bldoc so nothing leaks into (or from) the app while rendering.
 */

const CSS = `
  .bldoc {
    background: #faf8ee;
    color: #22371f;
    font-family: 'Poppins', 'Helvetica Neue', sans-serif;
    font-weight: 300;
    line-height: 1.75;
    padding: 40px 34px 48px;
    width: 794px;
  }
  .bldoc * { margin: 0; padding: 0; box-sizing: border-box; }
  .bldoc .sheet { max-width: 700px; margin: 0 auto; }
  .bldoc .brand {
    font-family: 'Great Vibes', cursive;
    font-size: 40px;
    text-align: center;
    color: #16250f;
  }
  .bldoc .brand span { color: #a1832f; }
  .bldoc .byline {
    text-align: center;
    font-size: 10px;
    letter-spacing: 0.45em;
    text-transform: uppercase;
    color: #a1832f;
    margin-top: 4px;
  }
  .bldoc h1 {
    font-family: 'Great Vibes', cursive;
    font-weight: 400;
    font-size: 52px;
    line-height: 1.3;
    text-align: center;
    color: #16250f;
    margin-top: 36px;
  }
  .bldoc .location {
    text-align: center;
    font-size: 11px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #a1832f;
    margin-top: 10px;
  }
  .bldoc .eyebrow {
    font-size: 10px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #a1832f;
    margin-top: 42px;
  }
  .bldoc h2 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 500;
    font-size: 28px;
    color: #16250f;
    margin-top: 8px;
  }
  .bldoc h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 500;
    font-size: 22px;
    color: #16250f;
  }
  .bldoc p { font-size: 13.5px; }
  .bldoc .overview {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 18px;
    text-align: center;
    margin: 32px auto 0;
    max-width: 58ch;
  }
  .bldoc table { width: 100%; border-collapse: collapse; margin-top: 18px; font-size: 13px; }
  .bldoc th, .bldoc td {
    text-align: left;
    padding: 9px 8px;
    border-bottom: 1px solid rgba(161, 131, 47, 0.35);
    vertical-align: top;
  }
  .bldoc th { font-weight: 500; color: #16250f; white-space: nowrap; width: 32%; }
  .bldoc .day { margin-top: 34px; }
  .bldoc .daynum {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 15px;
    color: #a1832f;
  }
  .bldoc figure {
    margin-top: 18px;
    padding: 6px;
    border: 1px solid rgba(161, 131, 47, 0.6);
  }
  .bldoc figure img { display: block; width: 100%; }
  .bldoc ul { margin: 14px 0 0 18px; font-size: 13.5px; }
  .bldoc li { margin-top: 7px; }
  .bldoc .rule { border: none; border-top: 1px solid rgba(161, 131, 47, 0.4); margin: 40px 0 0; }
  .bldoc .detail {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 16px;
    color: #a1832f;
    margin: 10px 0 14px;
  }
  .bldoc .contact {
    margin-top: 40px;
    padding: 22px;
    border: 1px solid rgba(161, 131, 47, 0.5);
    text-align: center;
  }
  .bldoc .contact a { color: #16250f; font-weight: 500; text-decoration: none; border-bottom: 1px solid #a1832f; }
  .bldoc .footnote {
    text-align: center;
    font-size: 10.5px;
    color: #a1832f;
    margin-top: 34px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .bldoc .note { font-size: 11px; color: #5c6b4f; margin-top: 10px; }
  /* keep blocks whole across PDF pages */
  .bldoc .day, .bldoc figure, .bldoc table, .bldoc .contact, .bldoc ul {
    break-inside: avoid;
    page-break-inside: avoid;
  }
`

export function renderItineraryElement(itin) {
  const esc = (s = '') =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const facts = itin.facts
    .map((f) => `<tr><th>${esc(f.label)}</th><td>${esc(f.value)}</td></tr>`)
    .join('')

  const days = itin.days
    .map(
      (d) => `
      <section class="day">
        <p class="daynum">${esc(d.day)}</p>
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.text)}</p>
        ${d.image ? `<figure><img src="${d.image}" alt="" crossorigin="anonymous" /></figure>` : ''}
      </section>`,
    )
    .join('')

  const inclusions = itin.inclusions.map((i) => `<li>${esc(i)}</li>`).join('')

  const rates = itin.rates.rows
    .map(
      (r) =>
        `<tr><td>${esc(r.tier)}</td><td>${esc(r.twin)}</td><td>${esc(r.single)}</td></tr>`,
    )
    .join('')

  const alternative = itin.alternative
    ? `
    <hr class="rule" />
    <section class="day">
      <p class="eyebrow">${esc(itin.alternative.eyebrow)}</p>
      <h2>${esc(itin.alternative.title)}</h2>
      <p>${esc(itin.alternative.text)}</p>
      <p class="detail">${esc(itin.alternative.detail)}</p>
      <figure><img src="${itin.alternative.image}" alt="" crossorigin="anonymous" /></figure>
    </section>`
    : ''

  const host = document.createElement('div')
  host.style.cssText =
    'position:absolute; left:-10000px; top:0; width:794px; z-index:-1;'
  host.innerHTML = `
    <style>${CSS}</style>
    <div class="bldoc">
      <div class="sheet">
        <p class="brand">Bucket <span>List</span></p>
        <p class="byline">by Go Holidays</p>

        <h1>${esc(itin.title)}</h1>
        <p class="location">${esc(itin.location)} · ${esc(itin.edition)}</p>

        <p class="overview">${esc(itin.overview)}</p>

        <p class="eyebrow">At a Glance</p>
        <table>${facts}</table>

        <p class="eyebrow">Day by Day</p>
        ${days}

        <hr class="rule" />
        <p class="eyebrow">The Experience Includes</p>
        <ul>${inclusions}</ul>

        <p class="eyebrow">The Investment</p>
        <table>
          <tr><th>Stay</th><th>Twin Sharing</th><th>Single</th></tr>
          ${rates}
        </table>
        <p class="note">${esc(itin.rates.note)}</p>

        ${alternative}

        <div class="contact">
          <p>Ready to tick this one off? Reserve the experience with our concierge on
          <a href="https://wa.me/94772211600">WhatsApp · +94 77 221 1600</a></p>
        </div>

        <p class="footnote">Bucket List by Go Holidays · One extraordinary journey at a time</p>
      </div>
    </div>`
  return host
}
