import { m } from 'framer-motion'
import Icon from './Icon.jsx'

const FACT_ICONS = {
  Duration: 'calendar',
  Stay: 'bed',
  'Meal Plan': 'meal',
  Validity: 'shield',
}

// shared scroll-reveal: fades + lifts into place once ~20% of the
// element is in view, and only ever plays once per element
const REVEAL = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
}
const revealDelay = (seconds) => ({
  ...REVEAL,
  transition: { ...REVEAL.transition, delay: seconds },
})

/* thin compass-rose divider, drawn as lineart */
export function Ornament() {
  return (
    <svg
      className="itin__ornament"
      viewBox="0 0 240 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <line x1="0" y1="14" x2="96" y2="14" />
      <line x1="144" y1="14" x2="240" y2="14" />
      <circle cx="120" cy="14" r="6.5" />
      <path d="M120 2 L123 11 L132 14 L123 17 L120 26 L117 17 L108 14 L117 11 Z" />
    </svg>
  )
}

/**
 * The full itinerary — facts through the closing CTA. Shared between
 * the standalone `?itinerary=` page and the homepage's inline scroll
 * (where Hero.jsx already plays the role of the page header/hero).
 */
export default function ItineraryBody({ itin, reserveUrl, showBackLink = true, onBack }) {
  return (
    <div className="wrap">
      <m.div className="itin__facts card" {...REVEAL}>
        {itin.facts.map((f) => (
          <div className="itin__fact" key={f.label}>
            {/* <Icon name={FACT_ICONS[f.label] || 'sparkle'} /> */}
            <div>
              <p className="itin__factlabel">{f.label}</p>
              <p className="itin__factvalue">{f.value}</p>
            </div>
          </div>
        ))}
        {/* <a className="btn btn--solid itin__factscta" href={reserveUrl} target="_blank" rel="noopener noreferrer">
          Reserve Your Spot
        </a> */}
      </m.div>

      <m.p className="itin__overview" {...REVEAL}>
        {itin.overview}
      </m.p>
      <Ornament />

      <div className="itin__days">
        <m.p className="eyebrow" {...REVEAL}>
          Day by Day
        </m.p>
        {itin.days.map((d) => (
          <m.article className="itin__day" key={d.day} {...REVEAL}>
            <div className="itin__daytext">
              <p className="itin__daynum">{d.day}</p>
              <h3 className="itin__daytitle serif">{d.title}</h3>
              <p className="itin__daybody">{d.text}</p>
            </div>
            {d.image && (
              <div className="itin__dayimage">
                <img src={d.image} alt={d.imageAlt || d.title} loading="lazy" />
              </div>
            )}
          </m.article>
        ))}
      </div>

      <div className="itin__grid">
        <m.div className="itin__inclusions" {...REVEAL}>
          <p className="eyebrow">The Experience Includes</p>
          <ul>
            {itin.inclusions.map((inc) => (
              <li key={inc}>
                <Icon name="check" />
                {inc}
              </li>
            ))}
          </ul>
        </m.div>

        <m.div className="itin__rates" {...revealDelay(0.15)}>
          <p className="eyebrow">The Investment</p>
          <table>
            <thead>
              <tr>
                <th>Stay</th>
                <th>Twin Sharing</th>
                <th>Single</th>
              </tr>
            </thead>
            <tbody>
              {itin.rates.rows.map((r) => (
                <tr key={r.tier}>
                  <td>{r.tier}</td>
                  <td>{r.twin}</td>
                  <td>{r.single}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="itin__ratenote">{itin.rates.note}</p>
        </m.div>
      </div>

      {itin.alternative && (
        <m.div className="itin__alt" {...REVEAL}>
          <div className="itin__altimage">
            <img
              src={itin.alternative.image}
              alt={itin.alternative.imageAlt}
              loading="lazy"
            />
          </div>
          <div>
            <p className="eyebrow">{itin.alternative.eyebrow}</p>
            <h3 className="itin__alttitle serif">{itin.alternative.title}</h3>
            <p className="itin__altbody">{itin.alternative.text}</p>
            <p className="itin__altdetail">{itin.alternative.detail}</p>
          </div>
        </m.div>
      )}

      <Ornament />

      <m.div className="itin__cta" {...REVEAL}>
        <h2 className="serif">
          Ready to <em>tick this one off?</em>
        </h2>
        <div className="itin__ctaactions">
          <a
            className="btn btn--solid"
            href={reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve the Experience
          </a>
          {showBackLink && (
            <a
              className="btn btn--ghost"
              href="./"
              onClick={(e) => {
                if (!onBack) return
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
                e.preventDefault()
                onBack()
              }}
            >
              Back to the Collection
            </a>
          )}
        </div>
      </m.div>
    </div>
  )
}
