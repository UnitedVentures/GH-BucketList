import { m } from 'framer-motion'
import { reveal } from '../lib/motion.js'

/**
 * "None of these on your bucket list?" — the bespoke-trip nudge shared
 * between Manifesto (homepage) and any standalone page that wants it
 * as its own section (e.g. CalendarPage). Callers own the surrounding
 * spacing/wrap; this is just the centered text + CTA.
 */
export default function BespokeCta() {
  return (
    <m.div className="bespoke-cta" {...reveal()}>
      <p className="serif">
        None of these on your <em className="gold-grad">bucket list?</em>
        <br />
        We can still make it happen.
      </p>
      <a className="btn btn--solid" href="#contact">
        Talk to Us <span aria-hidden="true">→</span>
      </a>
    </m.div>
  )
}
