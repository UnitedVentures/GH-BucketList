import { m } from 'framer-motion'
import Icon from './Icon.jsx'
import { reveal } from '../lib/motion.js'

// If the four pillars below don't match how the business actually
// operates, edit freely; nothing here is wired to other data.
const FEATURES = [
  { icon: 'users', title: 'Small Groups', text: 'Intimate groups. Deeper connections.' },
  { icon: 'bed', title: 'Curated Stays', text: 'Handpicked stays with soul and story.' },
  { icon: 'route', title: 'Seamless Planning', text: 'Every detail handled. All you have to do is go.' },
  { icon: 'sparkle', title: 'Rare Experiences', text: 'Beyond the ordinary. Moments that last.' },
]

const BRANDS = [
  {
    name: 'Go Holidays',
    href: 'https://goholidays.lk',
    logo: 'images/gh_logo.png',
    alt: 'Go Holidays',
  },
  {
    name: 'United Ventures',
    href: 'https://unitedventuressl.com',
    logo: 'images/uv_logo.png',
    alt: 'United Ventures',
  },
]

export default function AboutUs() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about__grid">
          <m.div {...reveal()}>
            <p className="eyebrow">About Us</p>
            <h2>
              Two names, <em className="gold-grad">one journey</em>
            </h2>
          </m.div>
          <m.div className="about__copy" {...reveal({ delay: 0.1 })}>
            <p>
              The Bucket List Collection is brought to you by Go Holidays, a
              Sri Lankan specialist in curated, small-group luxury travel —
              in partnership with United Ventures, distilled into twelve
              editions a year, each one built around a single destination,
              in its single best season.
            </p>
            <p>
              We work in small numbers on purpose: fewer travellers per
              departure, closer relationships with the guides and properties
              we trust, and a level of care that scales down instead of up.
            </p>
          </m.div>
        </div>

        <div className="about__features">
          {FEATURES.map((f, i) => (
            <m.div
              className="about__feature"
              key={f.title}
              {...reveal({ delay: i * 0.08 })}
            >
              <Icon name={f.icon} />
              <h3 className="serif">{f.title}</h3>
              <p>{f.text}</p>
            </m.div>
          ))}
        </div>

        <m.div className="about__brands" {...reveal({ delay: 0.2 })}>
          {BRANDS.map((b) => (
            <a
              key={b.name}
              className="about__brand"
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`${import.meta.env.BASE_URL}${b.logo}`} alt={b.alt} />
              <span>Visit {b.href.replace('https://', '')} →</span>
            </a>
          ))}
        </m.div>
      </div>
    </section>
  )
}
