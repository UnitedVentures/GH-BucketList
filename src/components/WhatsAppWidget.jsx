import { AnimatePresence, m } from 'framer-motion'
import { whatsapp } from '../data/editions.js'
import { trackEvent } from '../lib/metaPixel.js'
import useWhatsAppGreeting from '../hooks/useWhatsAppGreeting.js'
import Icon from './Icon.jsx'

const GREETING_HREF = whatsapp(
  'Hello Go Holidays! I would like to know more about the Bucket List Collection.',
)

/**
 * Persistent floating chat CTA — replaces the old nav-bar Enquire
 * button, but reachable from every page instead of just the ones with
 * a Nav. The greeting pill (see useWhatsAppGreeting) slides out from
 * behind the icon when the visitor goes idle, and back in ~2s later.
 */
export default function WhatsAppWidget() {
  const greetingVisible = useWhatsAppGreeting()

  return (
    <div className="whatsapp-widget-wrap">
      <AnimatePresence>
        {greetingVisible && (
          <m.a
            className="whatsapp-widget__bubble"
            href={GREETING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('Lead', { content_name: 'WhatsApp Widget Greeting' })}
            initial={{ opacity: 0, x: 24, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Hi there, need any help?
          </m.a>
        )}
      </AnimatePresence>
      <a
        className="whatsapp-widget"
        href={GREETING_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onClick={() => trackEvent('Lead', { content_name: 'WhatsApp Widget' })}
      >
        <Icon name="whatsapp" className="whatsapp-widget__icon" />
      </a>
    </div>
  )
}
