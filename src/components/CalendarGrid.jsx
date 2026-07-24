import { useState } from 'react'
import { m } from 'framer-motion'
import { months } from '../lib/months.js'

const EASE = [0.16, 1, 0.3, 1]

/**
 * The full year, all at once — every month/destination laid out in a
 * static grid. No swiping or paging required to see them all; clicking
 * a card opens that month's itinerary.
 */
export default function CalendarGrid() {
  const [navigatingSlug, setNavigatingSlug] = useState(null)

  // a quick zoom-in on the clicked card, then navigate — rather than
  // cutting straight to the itinerary page with no transition at all.
  // Scale gets its own (fast, no-delay) transition, kept separate from
  // the reveal-on-scroll transition below so the two don't fight.
  const handleClick = (e, slug) => {
    e.preventDefault()
    if (navigatingSlug) return
    setNavigatingSlug(slug)
    setTimeout(() => {
      window.location.href = `?itinerary=${slug}`
    }, 200)
  }

  return (
    <section className="bucketgrid">
      <div className="wrap">
        <div className="bucketgrid__head">
          <p className="eyebrow">Twelve Months, Twelve Journeys</p>
          <h2>
            Our Bucket List <em className="gold-grad">Calendar</em>
          </h2>
        </div>

        <div className="bucketgrid__grid">
          {months.map((mo, i) => (
            <m.a
              className="bucketgrid__card"
              key={mo.slug}
              href={`?itinerary=${mo.slug}`}
              style={{ backgroundImage: `url(${mo.image})` }}
              onClick={(e) => handleClick(e, mo.slug)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              animate={{ scale: navigatingSlug === mo.slug ? 1.08 : 1 }}
              transition={{
                opacity: { duration: 0.8, ease: EASE, delay: (i % 4) * 0.06 },
                y: { duration: 0.8, ease: EASE, delay: (i % 4) * 0.06 },
                scale: { duration: 0.2, ease: EASE },
              }}
            >
              <span className="bucketgrid__cardveil" aria-hidden="true" />
              <span className="bucketgrid__cardmonth">{mo.short} · {mo.edition}</span>
              <span className="bucketgrid__cardplace serif">{mo.place}</span>
              <span className="bucketgrid__cardcountry">{mo.country}</span>
              <span className="bucketgrid__cardlink">
                View the Itinerary <span aria-hidden="true">→</span>
              </span>
            </m.a>
          ))}
        </div>
      </div>
    </section>
  )
}
