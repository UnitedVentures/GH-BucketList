import { whatsapp } from '../data/editions.js'
import Icon from './Icon.jsx'

/**
 * Persistent floating chat CTA — replaces the old nav-bar Enquire
 * button, but reachable from every page instead of just the ones with
 * a Nav.
 */
export default function WhatsAppWidget() {
  return (
    <a
      className="whatsapp-widget"
      href={whatsapp('Hello Go Holidays! I would like to know more about the Bucket List Collection.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <Icon name="whatsapp" className="whatsapp-widget__icon" />
    </a>
  )
}
