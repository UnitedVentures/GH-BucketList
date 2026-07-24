import { useEffect, useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { months } from '../lib/months.js'

// "./" (not "/") throughout: the site is hosted under a sub-path on
// GitHub Pages, so an absolute root path would resolve to the wrong
// origin. Contact and About Us are plain hash/query links (not "./"
// prefixed) since Footer and every page live alongside this Nav —
// no need to force a trip home first.
const LINKS = [
  { href: '?page=testimonials', label: 'Client Testimonials' },
  { href: '?page=about', label: 'About Us' },
  { href: '#contact', label: 'Contact' },
]

const chevron = <IconChevronDown />

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close the mobile drawer (and its calendar accordion) on any in-page navigation
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeAll = () => {
    setOpen(false)
    setCalendarOpen(false)
  }

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="wrap nav__inner">
        <a className="nav__brand" href="./" onClick={closeAll}>
          <img
            src={`${import.meta.env.BASE_URL}images/Logo.svg`}
            alt="Bucket List by Go Holidays"
          />
        </a>
        <nav>
          <ul className="nav__links">
            <li className="nav__item nav__item--calendar">
              <a href="?page=calendar">
                Calendar
                <span className="nav__chevron" aria-hidden="true">{chevron}</span>
              </a>
              <div className="nav__dropdown">
                <div className="nav__dropdowngrid">
                  {months.map((mo) => (
                    <a key={mo.slug} href={`?itinerary=${mo.slug}`}>
                      <span className="nav__dropdownmonth">{mo.short}</span>
                      <span className="nav__dropdownplace">{mo.place}</span>
                    </a>
                  ))}
                </div>
              </div>
            </li>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="nav__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="nav__drawer">
        <ul className="nav__drawerlinks">
          <li className={`nav__drawercalendar${calendarOpen ? ' is-open' : ''}`}>
            <div className="nav__drawercalendarrow">
              <a href="?page=calendar" onClick={closeAll}>Calendar</a>
              <button
                type="button"
                className="nav__drawertoggle"
                aria-label={calendarOpen ? 'Hide months' : 'Show months'}
                aria-expanded={calendarOpen}
                onClick={() => setCalendarOpen((o) => !o)}
              >
                {chevron}
              </button>
            </div>
            <div className="nav__drawermonths">
              {months.map((mo) => (
                <a key={mo.slug} href={`?itinerary=${mo.slug}`} onClick={closeAll}>
                  <span>{mo.short}</span> {mo.place}
                </a>
              ))}
            </div>
          </li>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={closeAll}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
