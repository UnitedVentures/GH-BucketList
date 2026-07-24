import { useState } from 'react'
import { m } from 'framer-motion'
import { IconChevronRight } from '@tabler/icons-react'
import { months } from '../lib/months.js'
import { reveal } from '../lib/motion.js'

const chevron = <IconChevronRight />

const CARD_GAP = 150 // px between adjacent card centers
const ROTATE_STEP = 8 // deg per step away from center
const ACTIVE_SCALE = 1.18 // the front card reads as visibly larger, not just less-shrunk
const SCALE_STEP = 0.12
const Y_STEP = 16
const VISIBLE_RADIUS = 2 // cards shown on either side of the active one

// shortest-path offset around the 12-month cycle, so stepping past
// December back to January always spins the short way
function circularOffset(i, active, total) {
  let diff = i - active
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

/**
 * Homepage hero: a fanned deck of the twelve months/destinations.
 * Swipe (drag) on mobile, chevrons on desktop — either steps the deck
 * one card at a time. Clicking a side card brings it to the front;
 * clicking the front card (or the panel's link) opens its itinerary.
 */
export default function Calendar() {
  const [active, setActive] = useState(0)
  const [navigatingSlug, setNavigatingSlug] = useState(null)
  const total = months.length
  const activeMonth = months[active]

  const step = (dir) => setActive((a) => (a + dir + total) % total)

  const onDragEnd = (_, info) => {
    if (info.offset.x < -60 || info.velocity.x < -400) step(1)
    else if (info.offset.x > 60 || info.velocity.x > 400) step(-1)
  }

  // a quick zoom-in on the clicked card, then navigate — rather than
  // cutting straight to the itinerary page with no transition at all
  const goToItinerary = (slug) => {
    if (navigatingSlug) return
    setNavigatingSlug(slug)
    setTimeout(() => {
      window.location.href = `?itinerary=${slug}`
    }, 220)
  }

  return (
    <section className="calendar" id="calendar">
      <div className="wrap calendar__head">
        <m.h2 {...reveal({ amount: 0.15 })}>
          <em className="gold-grad">Our Bucket List</em>
        </m.h2>
        {/* <p className="calendar__count serif" aria-live="polite">
          {String(active + 1).padStart(2, '0')}
          <span> / {String(total).padStart(2, '0')}</span>
        </p> */}
      </div>

      <div className="calendar__stackwrap">
        <button
          type="button"
          className="calendar__chevron calendar__chevron--prev"
          onClick={() => step(-1)}
          aria-label="Previous month"
        >
          {chevron}
        </button>

        <m.div
          className="calendar__stack"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {months.map((mo, i) => {
            const offset = circularOffset(i, active, total)
            const abs = Math.abs(offset)
            if (abs > VISIBLE_RADIUS) return null
            const isActive = offset === 0
            const isNavigating = navigatingSlug === mo.slug
            return (
              <m.div
                key={mo.slug}
                className={`calendar__card${isActive ? ' is-active' : ''}`}
                style={{ backgroundImage: `url(${mo.image})`, zIndex: 20 - abs }}
                animate={{
                  x: offset * CARD_GAP,
                  y: isActive ? -14 : abs * Y_STEP,
                  rotate: offset * ROTATE_STEP,
                  scale: isNavigating ? ACTIVE_SCALE * 1.14 : isActive ? ACTIVE_SCALE : 1 - abs * SCALE_STEP,
                }}
                transition={{ type: 'spring', stiffness: isNavigating ? 400 : 260, damping: 30 }}
                onClick={() => (isActive ? goToItinerary(mo.slug) : setActive(i))}
                aria-label={`${mo.place}, ${mo.month}`}
              >
                <span className="calendar__cardveil" aria-hidden="true" />
              </m.div>
            )
          })}
        </m.div>

        <button
          type="button"
          className="calendar__chevron calendar__chevron--next"
          onClick={() => step(1)}
          aria-label="Next month"
        >
          {chevron}
        </button>
      </div>

      <div className="calendar__panel">
        <p className="calendar__panelmonth">
          {activeMonth.short} · {activeMonth.edition} · {activeMonth.country}
        </p>
        <h3 className="calendar__panelplace serif">{activeMonth.place}</h3>
        <a className="calendar__panellink" href={`?itinerary=${activeMonth.slug}`}>
          View the Itinerary <span aria-hidden="true">→</span>
        </a>
      </div>

      <p className="calendar__hint" aria-hidden="true">
        Swipe to explore the year · or use the arrows
      </p>
    </section>
  )
}
