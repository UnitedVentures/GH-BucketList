import { useEffect, useState } from 'react'
import { whatsapp } from '../data/editions.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#top">
          Bucket <em>List</em>
        </a>
        <nav>
          <ul className="nav__links">
            <li><a href="#initiative">The Collection</a></li>
            <li><a href="#editions">Upcoming Journeys</a></li>
            <li><a href="#announcements">Announcements</a></li>
          </ul>
        </nav>
        <a
          className="btn btn--ghost nav__cta"
          href={whatsapp('Hello Go Holidays! I would like to know more about the Bucket List Collection.')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enquire
        </a>
      </div>
    </header>
  )
}
