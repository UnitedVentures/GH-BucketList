import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { featured } from '../data/editions.js'
import { months } from '../lib/months.js'

/**
 * Browse-the-year month nav. Rendered as the second row inside the site
 * header (Nav.jsx / ItineraryHeader in Itinerary.jsx) so it reads as one
 * joined navigation section rather than a separate floating bar.
 * Desktop: an in-flow horizontal strip. Mobile: a compact edge tab (its
 * only interactive surface, so it can't be triggered by an accidental
 * scroll-tap) that opens an interactive vertical drawer on tap or swipe.
 *
 * onNavigate, when provided, is called with the clicked slug instead of
 * letting the browser do a full-page navigation — the caller is
 * responsible for updating the URL/route in place (see App.jsx).
 */
export default function MonthRail({ activeSlug = featured.slug, onNavigate }) {
  const itemRefs = useRef({})
  const [expanded, setExpanded] = useState(false)
  const swipeStartX = useRef(null)

  useEffect(() => {
    itemRefs.current[activeSlug]?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
    })
  }, [activeSlug])

  // edge-swipe open: a touch starting within ~24px of the right edge
  // that drags left past a threshold opens the drawer, mirroring the
  // hand-rolled touch handling already used in Story.jsx
  useEffect(() => {
    const onTouchStart = (e) => {
      const x = e.touches[0].clientX
      swipeStartX.current = window.innerWidth - x < 24 ? x : null
    }
    const onTouchMove = (e) => {
      if (swipeStartX.current == null) return
      if (swipeStartX.current - e.touches[0].clientX > 36) {
        setExpanded(true)
        swipeStartX.current = null
      }
    }
    const onTouchEnd = () => {
      swipeStartX.current = null
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  const go = (e, slug) => {
    if (!onNavigate) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    setExpanded(false)
    onNavigate(slug)
  }

  return (
    <>
      <div className="monthrail__list" id="editions">
        {months.map((mo) => (
          <a
            key={mo.slug}
            ref={(el) => {
              itemRefs.current[mo.slug] = el
            }}
            href={`?itinerary=${mo.slug}`}
            className={`monthrail__item${mo.slug === activeSlug ? ' is-active' : ''}`}
            title={mo.place}
            onClick={(e) => go(e, mo.slug)}
          >
            {mo.short}
          </a>
        ))}
      </div>

      <button
        type="button"
        className={`monthrail__tab${expanded ? ' is-hidden' : ''}`}
        onClick={() => setExpanded(true)}
        aria-label="Browse the year by month"
        aria-expanded={expanded}
      >
        <span /><span /><span />
      </button>

      <AnimatePresence>
        {expanded && (
          <m.div
            key="scrim"
            className="monthrail__scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setExpanded(false)}
            role="presentation"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <m.div
            key="drawer"
            className="monthrail__drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              className="monthrail__close"
              onClick={() => setExpanded(false)}
              aria-label="Close month list"
            >
              ×
            </button>
            <div className="monthrail__drawerlist">
              {months.map((mo) => (
                <a
                  key={mo.slug}
                  href={`?itinerary=${mo.slug}`}
                  className={`monthrail__drawitem${mo.slug === activeSlug ? ' is-active' : ''}`}
                  onClick={(e) => go(e, mo.slug)}
                >
                  <span className="monthrail__drawmonth">{mo.short}</span>
                  <span className="monthrail__drawplace serif">{mo.place}</span>
                </a>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
