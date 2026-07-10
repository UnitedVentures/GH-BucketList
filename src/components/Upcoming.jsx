import { useState } from 'react'
import useScramble from '../hooks/useScramble.js'
import { upcoming, whatsapp } from '../data/editions.js'

export default function Upcoming() {
  const [index, setIndex] = useState(0)
  const journey = upcoming[index]

  const step = (dir) =>
    setIndex((i) => (i + dir + upcoming.length) % upcoming.length)

  const month = useScramble(journey.month, 700)
  const place = useScramble(journey.place, 950)
  const country = useScramble(journey.country, 800)
  const tagline = useScramble(journey.tagline, 1150)

  const chevron = (
    <svg viewBox="0 0 24 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 4 L20 30 L4 56"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <section className="journeys" id="editions">
      <div
        className="journeys__bgs"
        style={{ transform: `translateX(-${index * 100}%)` }}
        aria-hidden="true"
      >
        {upcoming.map((j) => (
          <div
            key={j.edition}
            className="journeys__bg"
            style={{ backgroundImage: `url(${j.image})` }}
            role="img"
            aria-label={`${j.place} — ${j.country}`}
          />
        ))}
      </div>
      <div className="journeys__blur" aria-hidden="true" />
      <div className="journeys__scrim" aria-hidden="true" />

      <div className="wrap journeys__head">
        <div>
          <p className="eyebrow">The Year Ahead</p>
          <h2>
            Upcoming <em>Journeys</em>
          </h2>
        </div>
        <p className="journeys__count serif" aria-live="polite">
          {String(index + 1).padStart(2, '0')}
          <span> / {String(upcoming.length).padStart(2, '0')}</span>
        </p>
      </div>

      <div className="wrap journeys__panelwrap">
        <div className="journeys__panel">
          <p className="jslide__month">
            {journey.edition} · {month}
          </p>
          <h3 className="jslide__place serif">{place}</h3>
          <p className="jslide__country">{country}</p>
          <p className="jslide__tagline">{tagline}</p>
          {journey.description && (
            <p className="jslide__detail" key={journey.edition}>
              {journey.description}
            </p>
          )}
          <div className="jslide__links">
            <a
              className="jslide__link"
              href={whatsapp(
                `Hello Go Holidays! I'd like to reserve the ${journey.month} Bucket List experience — ${journey.place}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserve the Experience <span aria-hidden="true">→</span>
            </a>
            <a
              className="jslide__link jslide__link--muted"
              href={`?itinerary=${journey.slug}`}
            >
              View the Itinerary <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="journeys__hint" aria-hidden="true">
        Use the arrows to travel the year
      </div>

      <button
        type="button"
        className="journeys__chevron journeys__chevron--prev"
        onClick={() => step(-1)}
        aria-label="Previous journey"
      >
        {chevron}
      </button>
      <button
        type="button"
        className="journeys__chevron journeys__chevron--next"
        onClick={() => step(1)}
        aria-label="Next journey"
      >
        {chevron}
      </button>
    </section>
  )
}
