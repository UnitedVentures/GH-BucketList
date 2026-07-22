import { m } from 'framer-motion'
import Icon from './Icon.jsx'

const REVEAL = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
}

const FEATURES = [
  { icon: 'users', title: 'Small Groups', text: 'Intimate groups. Deeper connections.' },
  { icon: 'bed', title: 'Curated Stays', text: 'Handpicked stays with soul and story.' },
  { icon: 'route', title: 'Seamless Planning', text: 'Every detail handled. All you have to do is go.' },
  { icon: 'sparkle', title: 'Rare Experiences', text: 'Beyond the ordinary. Moments that last.' },
]

export default function Features() {
  return (
    <section className="features wrap">
      <m.p className="eyebrow" {...REVEAL}>
        What Makes Us Different
      </m.p>
      <div className="features__grid">
        {FEATURES.map((f, i) => (
          <m.div
            className="features__item"
            key={f.title}
            {...REVEAL}
            transition={{ ...REVEAL.transition, delay: i * 0.08 }}
          >
            <Icon name={f.icon} />
            <h3 className="serif">{f.title}</h3>
            <p>{f.text}</p>
          </m.div>
        ))}
      </div>
    </section>
  )
}
