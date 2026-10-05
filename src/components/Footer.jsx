import { useState } from 'react'
import { IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp } from '@tabler/icons-react'
import { whatsapp } from '../data/editions.js'
import { track, trackOnClick } from '../lib/metaPixel.js'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  // Posts to subscribe.php (copied from /public into the build), which
  // appends the address to a CSV stored outside the web root.
  const submit = async (e) => {
    e.preventDefault()
    const value = email.trim()
    if (!value || sending) return
    setSending(true)
    setError('')
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}subscribe.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: value,
          website: e.currentTarget.elements.website?.value || '',
          source: 'footer',
        }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.ok) {
        setSent(true)
        track('CompleteRegistration', { content_name: 'Newsletter Signup', placement: 'footer' })
      } else {
        setError(data?.error || 'Something went wrong. Please try again.')
        track('NewsletterError', { status: res.status })
      }
    } catch {
      setError('Something went wrong. Please try again.')
      track('NewsletterError', { status: 'network' })
    } finally {
      setSending(false)
    }
  }

  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer__invite reveal">
          <p className="eyebrow">Contact</p>
          <h2>
            Let's start <em className="gold-grad">planning</em>
          </h2>
          <p>
            Speak to our concierge directly, or sign up for new editions,
            full itineraries and reservation openings, delivered to your
            inbox. Start ticking off your bucket list, one extraordinary
            journey at a time.
          </p>
          <a
            className="btn btn--ghost footer__whatsapp"
            href={whatsapp('Hello Go Holidays! I\'d like to know more about the Bucket List Collection.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackOnClick('Contact', { content_name: 'Footer WhatsApp CTA', content_category: 'WhatsApp', placement: 'footer_button' })}
          >
            Message Us on WhatsApp
          </a>
          {sent ? (
            <p className="footer__sent">Thank you — you’ll hear from us soon.</p>
          ) : (
            <form className="footer__form" onSubmit={submit}>
              {/* honeypot — hidden from people, bots tend to fill it */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="footer__hp"
              />
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn--solid" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Sign Up'}
              </button>
            </form>
          )}
          {error && <p className="footer__error" role="alert">{error}</p>}
        </div>

        <div className="footer__base">
          <div className="footer__brands">
            <a
              className="footer__brand"
              href="./"
              onClick={trackOnClick('NavClick', { label: 'Logo', placement: 'footer' })}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/Logo.svg`}
                alt="Bucket List by Go Holidays"
              />
            </a>
            <a
              className="footer__partner"
              href="https://goholidays.lk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Go Holidays"
              onClick={trackOnClick('OutboundClick', { destination: 'goholidays.lk', placement: 'footer_logo' })}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/gh_logo.png`}
                alt="Go Holidays"
              />
            </a>
          </div>
          <p>© Bucket List by Go Holidays · One extraordinary journey at a time</p>
          <div className="footer__social">
            <a
              href="https://www.instagram.com/goholidays_srilanka/"
              aria-label="Instagram"
              onClick={trackOnClick('OutboundClick', { destination: 'instagram', placement: 'footer_social' })}
            >
              <IconBrandInstagram />
            </a>
            <a
              href="https://www.facebook.com/goholidays.srilanka"
              aria-label="Facebook"
              onClick={trackOnClick('OutboundClick', { destination: 'facebook', placement: 'footer_social' })}
            >
              <IconBrandFacebook />
            </a>
            <a
              href="https://wa.me/94772211600"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              onClick={trackOnClick('Contact', { content_name: 'Footer Social WhatsApp Icon', content_category: 'WhatsApp', placement: 'footer_icon' })}
            >
              <IconBrandWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
