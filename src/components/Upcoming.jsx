import { useEffect, useRef, useState } from 'react'
import { upcoming, whatsapp } from '../data/editions.js'

// Vertical scroll distance (in vh) that advances the gallery by one journey.
const STEP_VH = 55

export default function Upcoming() {
  const sectionRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = sectionRef.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.min(
        1,
        Math.max(0, -el.getBoundingClientRect().top / scrollable),
      )
      setIndex(
        Math.min(upcoming.length - 1, Math.floor(progress * upcoming.length)),
      )
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      className="journeys"
      id="editions"
      ref={sectionRef}
      style={{ height: `calc(${upcoming.length * STEP_VH}vh + 100vh)` }}
    >
      <div className="journeys__sticky">
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

        <div
          className="journeys__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {upcoming.map((e, i) => (
            <article
              className="jslide"
              key={e.edition}
              aria-hidden={i !== index}
            >
              <div className="wrap jslide__grid">
                <div className="jslide__media" data-edition={`Edition ${e.edition}`}>
                  <img
                    src={e.image}
                    alt={`${e.place} — ${e.country}`}
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="jslide__body">
                  <p className="jslide__month">{e.month}</p>
                  <h3 className="jslide__place serif">{e.place}</h3>
                  <p className="jslide__country">{e.country}</p>
                  <p className="jslide__tagline">{e.tagline}</p>
                  {e.description && (
                    <p className="jslide__detail">{e.description}</p>
                  )}
                  <a
                    className="jslide__link"
                    href={whatsapp(
                      `Hello Go Holidays! I'd like to reserve the ${e.month} Bucket List experience — ${e.place}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={i === index ? 0 : -1}
                  >
                    Reserve the Experience <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="journeys__hint" aria-hidden="true">
          Keep scrolling to travel the year
        </div>
      </div>
    </section>
  )
}
