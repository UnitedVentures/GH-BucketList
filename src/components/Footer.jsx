import { useState } from 'react'
import { IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp } from '@tabler/icons-react'
import { whatsapp } from '../data/editions.js'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (email.trim()) setSent(true)
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
            Speak to our concierge directly, or sign up for announcements —
            new editions, full itineraries and reservation openings,
            delivered to your inbox. Start ticking off your bucket list,
            one extraordinary journey at a time.
          </p>
          <a
            className="btn btn--ghost footer__whatsapp"
            href={whatsapp('Hello Go Holidays! I\'d like to know more about the Bucket List Collection.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Message Us on WhatsApp
          </a>
          {sent ? (
            <p className="footer__sent">Thank you — you’ll hear from us soon.</p>
          ) : (
            <form className="footer__form" onSubmit={submit}>
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn--solid" type="submit">
                Sign Up
              </button>
            </form>
          )}
        </div>

        <div className="footer__base">
          <a className="footer__brand" href="./">
            <img
              src={`${import.meta.env.BASE_URL}images/Logo.svg`}
              alt="Bucket List by Go Holidays"
            />
          </a>
          <p>© 2026 Bucket List by Go Holidays · One extraordinary journey at a time</p>
          <div className="footer__social">
            <a href="https://www.instagram.com/goholidays_srilanka/" aria-label="Instagram">
              <IconBrandInstagram />
            </a>
            <a href="https://www.facebook.com/goholidays.srilanka" aria-label="Facebook">
              <IconBrandFacebook />
            </a>
            <a
              href="https://wa.me/94772211600"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <IconBrandWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
