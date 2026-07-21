import { useEffect, useRef } from 'react'
import { featured, upcoming } from '../data/editions.js'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// calendar-ordered (Jan → Dec), independent of the Sep→Aug edition cycle
const months = [featured, ...upcoming]
  .map((d) => ({
    slug: d.slug,
    place: d.place,
    short: MONTH_NAMES[
      MONTH_NAMES.findIndex((m) => d.month.startsWith(m))
    ].slice(0, 3).toUpperCase(),
    monthIndex: MONTH_NAMES.findIndex((m) => d.month.startsWith(m)),
  }))
  .sort((a, b) => a.monthIndex - b.monthIndex)

/**
 * Fixed vertical month rail, desktop only. The active month (the one
 * currently being viewed) is highlighted and, on mount or whenever it
 * changes, the rail scrolls itself so that item sits centered in view.
 */
export default function MonthRail({ activeSlug = featured.slug }) {
  const listRef = useRef(null)
  const itemRefs = useRef({})

  useEffect(() => {
    const el = itemRefs.current[activeSlug]
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [activeSlug])

  return (
    <nav className="monthrail" aria-label="Browse the year by month">
      <div className="monthrail__list" ref={listRef}>
        {months.map((m) => (
          <a
            key={m.slug}
            ref={(el) => {
              itemRefs.current[m.slug] = el
            }}
            href={`?itinerary=${m.slug}`}
            className={`monthrail__item${m.slug === activeSlug ? ' is-active' : ''}`}
            title={m.place}
          >
            {m.short}
          </a>
        ))}
      </div>
    </nav>
  )
}
