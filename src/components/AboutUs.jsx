import { m } from 'framer-motion'
import Icon from './Icon.jsx'
import { reveal } from '../lib/motion.js'

// PLACEHOLDER COPY — swap in the real Go Holidays "About Us" narrative
// and, if the four pillars below don't match how the business actually
// operates, edit freely; nothing here is wired to other data.
const FEATURES = [
  { icon: 'users', title: 'Small Groups', text: 'Intimate groups. Deeper connections.' },
  { icon: 'bed', title: 'Curated Stays', text: 'Handpicked stays with soul and story.' },
  { icon: 'route', title: 'Seamless Planning', text: 'Every detail handled. All you have to do is go.' },
  { icon: 'sparkle', title: 'Rare Experiences', text: 'Beyond the ordinary. Moments that last.' },
]

export default function AboutUs() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about__grid">
          <m.div {...reveal()}>
            <p className="eyebrow">About Us</p>
            <h2>
              A small team, <em className="gold-grad">a singular focus</em>
            </h2>
          </m.div>
          <m.div className="about__copy" {...reveal({ delay: 0.1 })}>
            <p>
              Go Holidays has spent years designing journeys for travellers
              who want more than a checklist of sights — the Bucket List
              Collection is that philosophy distilled into twelve editions
              a year, each one built around a single destination, in its
              single best season.
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
      </div>
    </section>
  )
}
