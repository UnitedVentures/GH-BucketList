import { useState } from 'react'
import { itineraries } from '../data/itineraries.js'
import { featured, upcoming, whatsapp } from '../data/editions.js'
import { renderItineraryElement } from '../lib/itineraryDocument.js'
import ItineraryBody from './ItineraryBody.jsx'
import MonthRail from './MonthRail.jsx'

const allDestinations = [featured, ...upcoming]

function ItineraryHeader({ onDownload, downloading }) {
  return (
    <header className="nav is-scrolled">
      <div className="wrap nav__inner">
        <a className="nav__brand" href="./">
          <img
            className="nav__logo"
            src={`${import.meta.env.BASE_URL}images/Logo.svg`}
            alt="Bucket List by Go Holidays"
          />
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
      <MonthRail activeSlug={destination?.slug} />
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
        <ItineraryBody itin={itin} reserveUrl={reserveUrl} />
      </section>

      <MonthRail activeSlug={slug} />
    </div>
  )
}
