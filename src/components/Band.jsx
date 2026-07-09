import useParallax from '../hooks/useParallax.js'
import { bandImage } from '../data/editions.js'

export default function Band() {
  const bgRef = useParallax(0.22)

  return (
    <section className="band">
      <div
        ref={bgRef}
        className="band__bg"
        style={{ backgroundImage: `url(${bandImage})` }}
        role="img"
        aria-label="A lone acacia tree on the savannah at dusk"
      />
      <div className="band__veil" />
      <div className="wrap reveal">
        <p className="eyebrow">The Philosophy</p>
        <blockquote>
          “Travel deeper. Travel differently.”
          <cite>— The Bucket List Collection</cite>
        </blockquote>
      </div>
    </section>
  )
}
