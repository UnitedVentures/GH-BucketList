import { useState } from 'react'
import { m } from 'framer-motion'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (email.trim()) setSent(true)
  }

  return (
    <footer className="footer" id="announcements">
      <div className="wrap">
        <m.div
          className="footer__invite"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Announcements</p>
          <h2>
            Be the <em>first</em> to know
          </h2>
          <p>
            Sign up for upcoming announcements — new editions, full
            itineraries and reservation openings, delivered to your inbox.
            Start ticking off your bucket list, one extraordinary journey
            at a time.
          </p>
          {sent ? (
            <p style={{ color: 'var(--gold-soft)', marginTop: '2.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
              Thank you — you’ll hear from us soon.
            </p>
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
        </m.div>

        <div className="footer__base">
          <a className="footer__brand" href="#top">
            Bucket <em>List</em>
          </a>
          <p>© 2026 Bucket List by Go Holidays · One extraordinary journey at a time</p>
          <div className="footer__social">
            <a href="https://www.instagram.com/goholidays_srilanka/" aria-label="Instagram">Instagram</a>
            <a href="https://www.facebook.com/goholidays.srilanka" aria-label="Facebook">Facebook</a>
            <a
              href="https://wa.me/94772211600"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
