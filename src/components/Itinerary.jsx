import { useState } from 'react'
import { itineraries } from '../data/itineraries.js'
import { featured, upcoming, whatsapp } from '../data/editions.js'
import { renderItineraryElement } from '../lib/itineraryDocument.js'

const allDestinations = [featured, ...upcoming]

/* thin compass-rose divider, drawn as lineart */
function Ornament() {
  return (
    <svg
      className="itin__ornament"
      viewBox="0 0 240 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <line x1="0" y1="14" x2="96" y2="14" />
      <line x1="144" y1="14" x2="240" y2="14" />
      <circle cx="120" cy="14" r="6.5" />
      <path d="M120 2 L123 11 L132 14 L123 17 L120 26 L117 17 L108 14 L117 11 Z" />
    </svg>
  )
}

function ItineraryHeader({ onDownload, downloading }) {
  return (
    <header className="nav is-scrolled">
      <div className="wrap nav__inner">
        <a className="nav__brand" href="./">
          Bucket <em>List</em>
        </a>
        <div className="itin__navactions">
          {onDownload && (
            <button
              type="button"
              className="btn btn--solid nav__cta"
              onClick={onDownload}
              disabled={downloading}
            >
              {downloading ? 'Preparing your PDF…' : 'Download the Itinerary'}
            </button>
          )}
          <a className="btn btn--ghost nav__cta" href="./">
            ← Back to the Collection
          </a>
        </div>
      </div>
    </header>
  )
}

function ComingSoon({ destination }) {
  return (
    <div className="itin itin--soon">
      <ItineraryHeader />
      <div
        className="itin__soonbg"
        style={destination ? { backgroundImage: `url(${destination.image})` } : undefined}
        aria-hidden="true"
      />
      <div className="itin__soonveil" aria-hidden="true" />
      <main className="itin__soon wrap">
        {destination && (
          <p className="eyebrow">
            {destination.edition} · {destination.month}
          </p>
        )}
        <h1 className="itin__soontitle serif">
          The itinerary is <em>in the making</em>
        </h1>
        <p className="itin__soontext">
          {destination
            ? `The full ${destination.place} itinerary will be available soon.`
            : 'This itinerary will be available soon.'}{' '}
          Sign up for announcements or speak to our concierge to be the
          first to receive it.
        </p>
        <div className="itin__soonactions">
          <a className="btn btn--solid" href="./">
            Explore the Collection
          </a>
          {destination && (
            <a
              className="btn btn--ghost"
              href={whatsapp(
                `Hello Go Holidays! I'd like to know more about the ${destination.month} Bucket List experience — ${destination.place}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask the Concierge
            </a>
          )}
        </div>
      </main>
    </div>
  )
}

export default function Itinerary({ slug }) {
  const itin = itineraries[slug]
  const destination = allDestinations.find((d) => d.slug === slug)
  const [downloading, setDownloading] = useState(false)

  if (!itin) return <ComingSoon destination={destination} />

  const reserveUrl = whatsapp(
    `Hello Go Holidays! I'd like to reserve "${itin.title}" — the ${destination?.month ?? ''} Bucket List experience.`,
  )

  const download = async () => {
    if (downloading) return
    setDownloading(true)
    const host = renderItineraryElement(itin)
    document.body.appendChild(host)
    try {
      // wait for photographs and webfonts before snapshotting
      await Promise.allSettled(
        [...host.querySelectorAll('img')].map((i) => i.decode()),
      )
      await document.fonts?.ready
      const html2pdf = (await import('html2pdf.js')).default
      await html2pdf()
        .set({
          margin: [10, 0, 12, 0],
          filename: `Bucket-List-${slug}-Itinerary.pdf`,
          image: { type: 'jpeg', quality: 0.92 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4' },
          pagebreak: { mode: ['css', 'legacy'] },
        })
        .from(host.querySelector('.bldoc'))
        .save()
    } finally {
      host.remove()
      setDownloading(false)
    }
  }

  return (
    <div className="itin">
      <ItineraryHeader onDownload={download} downloading={downloading} />

      <section className="itin__hero">
        <div
          className="itin__herobg"
          style={{ backgroundImage: `url(${itin.heroImage})` }}
          role="img"
          aria-label={itin.title}
        />
        <div className="itin__heroveil" aria-hidden="true" />
        <div className="wrap itin__herocontent">
          <p className="hero__edition">{itin.edition}</p>
          <h1 className="itin__title serif">{itin.title}</h1>
          <p className="hero__country">{itin.location}</p>
        </div>
      </section>

      <section className="itin__body">
        <div className="wrap">
          <div className="itin__facts reveal">
            {itin.facts.map((f) => (
              <div className="itin__fact" key={f.label}>
                <p className="itin__factlabel">{f.label}</p>
                <p className="itin__factvalue">{f.value}</p>
              </div>
            ))}
          </div>

          <p className="itin__overview serif reveal">{itin.overview}</p>
          <Ornament />

          <div className="itin__days">
            <p className="eyebrow reveal">Day by Day</p>
            {itin.days.map((d) => (
              <article className="itin__day reveal" key={d.day}>
                <div className="itin__daytext">
                  <p className="itin__daynum">{d.day}</p>
                  <h3 className="itin__daytitle serif">{d.title}</h3>
                  <p className="itin__daybody">{d.text}</p>
                </div>
                {d.image && (
                  <div className="itin__dayimage">
                    <img src={d.image} alt={d.imageAlt || d.title} loading="lazy" />
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="itin__grid">
            <div className="itin__inclusions reveal">
              <p className="eyebrow">The Experience Includes</p>
              <ul>
                {itin.inclusions.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
            </div>

            <div className="itin__rates reveal" data-delay="1">
              <p className="eyebrow">The Investment</p>
              <table>
                <thead>
                  <tr>
                    <th>Stay</th>
                    <th>Twin Sharing</th>
                    <th>Single</th>
                  </tr>
                </thead>
                <tbody>
                  {itin.rates.rows.map((r) => (
                    <tr key={r.tier}>
                      <td>{r.tier}</td>
                      <td>{r.twin}</td>
                      <td>{r.single}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="itin__ratenote">{itin.rates.note}</p>
            </div>
          </div>

          {itin.alternative && (
            <div className="itin__alt reveal">
              <div className="itin__altimage">
                <img
                  src={itin.alternative.image}
                  alt={itin.alternative.imageAlt}
                  loading="lazy"
                />
              </div>
              <div>
                <p className="eyebrow">{itin.alternative.eyebrow}</p>
                <h3 className="itin__alttitle serif">{itin.alternative.title}</h3>
                <p className="itin__altbody">{itin.alternative.text}</p>
                <p className="itin__altdetail">{itin.alternative.detail}</p>
              </div>
            </div>
          )}

          <Ornament />

          <div className="itin__cta reveal">
            <h2 className="serif">
              Ready to <em>tick this one off?</em>
            </h2>
            <div className="itin__ctaactions">
              <a
                className="btn btn--solid"
                href={reserveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reserve the Experience
              </a>
              <a className="btn btn--ghost" href="./">
                Back to the Collection
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
