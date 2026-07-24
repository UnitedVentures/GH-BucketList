import { m } from 'framer-motion'
import Icon from './Icon.jsx'
import { testimonials } from '../data/testimonials.js'
import { reveal } from '../lib/motion.js'

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="wrap">
        <m.div {...reveal()}>
          <p className="eyebrow">Client Testimonials</p>
          <h2>
            Told <em className="gold-grad">in their words</em>
          </h2>
        </m.div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <m.figure
              className={`testimonial${t.featured ? ' testimonial--featured' : ''}`}
              key={t.name}
              {...reveal({ delay: i * 0.08 })}
            >
              <Icon name="quote" className="testimonial__mark" />
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="testimonial__name">{t.name}</span>
                <span className="testimonial__trip">{t.trip}</span>
              </figcaption>
            </m.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
