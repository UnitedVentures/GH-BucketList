import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { featured, whatsapp } from '../data/editions.js'
import MonthRail from './MonthRail.jsx'

export default function Nav({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [docked, setDocked] = useState(false)
  // useScroll's scrollY is rAF-batched by Framer's own frame loop (which
  // Lenis is synced onto — see useLenis.js), so this stays smooth and
  // accurate without a raw scroll listener or the old setInterval
  // fallback for webviews that drop scroll events.
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
    // once the itinerary takes over, the destination docks into the bar
    setDocked(latest > window.innerHeight * 0.55)
  })

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${docked ? ' is-docked' : ''}`}>
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#top">
          {/* wordmark shrinks into the icon once the itinerary docks */}
          <img
            className="nav__logo"
            src={`${import.meta.env.BASE_URL}images/Logo.svg`}
            alt="Bucket List by Go Holidays"
          />
          <img
            className="nav__logoicon"
            src={`${import.meta.env.BASE_URL}images/Favicon.svg`}
            alt=""
            aria-hidden="true"
          />
        </a>

        <nav className="nav__links">
          <a href="#top">Destinations</a>
          <a href="#itinerary">The Year</a>
        </nav>

        <div className="nav__right">
          <span className="nav__destination serif" aria-hidden={!docked}>
            {featured.place}
          </span>

          <a
            className="btn nav__cta nav__reserve"
            href={whatsapp(
              `Hello Go Holidays! I'd like to reserve the ${featured.month} Bucket List experience — ${featured.place}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve the Experience
          </a>
        </div>
      </div>

      <MonthRail activeSlug={featured.slug} onNavigate={onNavigate} />
    </header>
  )
}
