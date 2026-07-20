import { useEffect, useState } from 'react'
import { featured, whatsapp } from '../data/editions.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [docked, setDocked] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // once the itinerary takes over, the destination docks into the bar
      setDocked(window.scrollY > window.innerHeight * 0.55)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    // some embedded webviews drop scroll events — reconcile periodically
    const tick = setInterval(onScroll, 400)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(tick)
    }
  }, [])

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

        <span className="nav__destination serif" aria-hidden={!docked}>
          {featured.place}
        </span>

        <a
          className="btn btn--solid nav__cta nav__reserve"
          href={whatsapp(
            `Hello Go Holidays! I'd like to reserve the ${featured.month} Bucket List experience — ${featured.place}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={docked ? 0 : -1}
        >
          Reserve the Experience
        </a>
      </div>
    </header>
  )
}
