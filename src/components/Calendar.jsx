import { useRef, useState } from 'react'
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
  // live pointer offset while a swipe is in progress — fed straight into
  // each card's own x, rather than dragging the stack as a separate
  // element. That used to layer two independent springs (the stack
  // snapping back to center, each card animating to its new slot) which
  // visibly resolved one after the other instead of as one motion — on
  // mobile this read as "the whole deck swipes, then the card switches".
  // Driving x from a single source removes the seam: it tracks the
  // finger 1:1 while dragging, then that same value eases into the new
  // resting position, so the handoff is continuous.
  const [dragging, setDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  // distance travelled by the current gesture — read by each card's
  // onClick to tell a tap from a swipe, since onPan (unlike Framer's
  // `drag` prop) doesn't suppress taps on its own
  const dragDistanceRef = useRef(0)
  const total = months.length
  const activeMonth = months[active]

  const step = (dir) => setActive((a) => (a + dir + total) % total)

  const onPanStart = () => setDragging(true)

  const onPan = (_, info) => {
    dragDistanceRef.current = info.offset.x
    setDragX(info.offset.x)
  }

  const onPanEnd = (_, info) => {
    setDragging(false)
    setDragX(0)
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
          <em className="gold-grad">Scroll through our bucket list</em>
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
          onPointerDown={() => { dragDistanceRef.current = 0 }}
          onPanStart={onPanStart}
          onPan={onPan}
          onPanEnd={onPanEnd}
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
                  x: offset * CARD_GAP + (dragging ? dragX : 0),
                  y: isActive ? -14 : abs * Y_STEP,
                  rotate: offset * ROTATE_STEP,
                  scale: isNavigating ? ACTIVE_SCALE * 1.14 : isActive ? ACTIVE_SCALE : 1 - abs * SCALE_STEP,
                }}
                transition={
                  dragging
                    ? { type: 'tween', duration: 0 }
                    : { type: 'spring', stiffness: isNavigating ? 400 : 260, damping: 30 }
                }
                onClick={() => {
                  if (Math.abs(dragDistanceRef.current) > 8) return
                  isActive ? goToItinerary(mo.slug) : setActive(i)
                }}
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
          {activeMonth.full} · {activeMonth.place}
        </p>
        <h3 className="calendar__panelplace serif">{activeMonth.country}</h3>
        <a className="calendar__panellink" href={`?itinerary=${activeMonth.slug}`}>
          View Itinerary <span aria-hidden="true">→</span>
        </a>
      </div>

      <p className="calendar__hint" aria-hidden="true">
        Swipe or use the arrow to browse our collection
      </p>
    </section>
  )
}
