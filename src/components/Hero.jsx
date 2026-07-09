import { useLayoutEffect, useRef, useState } from 'react'
import useParallax from '../hooks/useParallax.js'
import { heroTours, whatsapp } from '../data/editions.js'

export default function Hero() {
  const bgRef = useParallax(0.3)
  const titleRef = useRef(null)
  const [index, setIndex] = useState(0)
  const tour = heroTours[index]

  // Fit the title to its container on a single line: start from the CSS
  // size, measure the overflow, and scale down proportionally.
  useLayoutEffect(() => {
    const el = titleRef.current
    if (!el) return
    const fit = () => {
      el.style.fontSize = ''
      const base = parseFloat(getComputedStyle(el).fontSize)
      if (el.scrollWidth > el.clientWidth) {
        el.style.fontSize = `${base * (el.clientWidth / el.scrollWidth) * 0.97}px`
      }
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [index])

  const step = (dir) =>
    setIndex((i) => (i + dir + heroTours.length) % heroTours.length)

  const reserveUrl = whatsapp(
    `Hello Go Holidays! I'd like to reserve the ${tour.month} Bucket List experience — ${tour.place}.`,
  )

  return (
    <section className="hero" id="top">
      <div ref={bgRef} className="hero__bgs" aria-hidden="true">
        {heroTours.map((t, i) => (
          <div
            key={t.edition}
            className={`hero__bg${i === index ? ' is-active' : ''}`}
            style={{ backgroundImage: `url(${t.image})` }}
          />
        ))}
      </div>
      <div className="hero__veil" />

      <div className="wrap hero__content" key={tour.edition}>
        <p className="hero__edition">
          The {tour.month} Edition · {tour.edition}
        </p>
        <h1 className="hero__place" ref={titleRef}>
          {tour.heroTitle || tour.place}
        </h1>
        <p className="hero__country">{tour.country}</p>
        <p className="hero__tagline">{tour.tagline}</p>
        <div className="hero__actions">
          <a
            className="btn btn--solid"
            href={reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve the Experience
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll to Discover</span>
        <span />
      </div>

      <div className="wrap hero__foot">
        <p className="hero__blurb" key={`blurb-${tour.edition}`}>
          {tour.description}
        </p>
        <nav className="hero__months" aria-label="Upcoming tours">
          <button
            type="button"
            className="hero__month-arrow"
            onClick={() => step(-1)}
            aria-label="Previous tour"
          >
            ←
          </button>
          {heroTours.map((t, i) => (
            <button
              type="button"
              key={t.edition}
              className={`hero__month${i === index ? ' is-active' : ''}`}
              onClick={() => setIndex(i)}
            >
              {t.month.split(' ')[0]} · {t.place}
            </button>
          ))}
          <button
            type="button"
            className="hero__month-arrow"
            onClick={() => step(1)}
            aria-label="Next tour"
          >
            →
          </button>
        </nav>
      </div>

      <button
        type="button"
        className="hero__chevron"
        onClick={() => step(1)}
        aria-label="View next month's tour"
      >
        <svg viewBox="0 0 24 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 L20 30 L4 56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  )
}
