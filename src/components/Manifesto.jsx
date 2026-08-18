import BespokeCta from './BespokeCta.jsx'

export default function Manifesto() {
  return (
    <section className="manifesto" id="project">
      <div className="wrap">
        <div className="manifesto__grid">
          <div className="reveal">
            <h2>
              Not all journeys are measured in miles.{' '}<br/>
              <em className="gold-grad">Some are measured in moments.</em>
            </h2>
          </div>
          <div className="manifesto__copy reveal" data-delay="1">
            <p>
              Welcome to a new era of exploration. Introducing the Go
              Holidays Bucket List — a curated 12-month calendar of
              extraordinary destinations designed for those who seek more
              than just a vacation. Each month, we unlock a
              once-in-a-lifetime journey to the world’s most iconic and
              elusive wonderlands, crafted with an emphasis on seamless
              luxury, privacy, and bespoke elegance.
            </p>
            <div className="manifesto__rule" />
            <p>
              Each itinerary is thoughtfully designed around authentic local
              encounters, breathtaking landscapes, and unforgettable moments.
              We take you beyond the ordinary — into the heart and soul of
              every destination, through immersive cultural experiences,
              unique adventures, and meaningful connections with local
              communities.
            </p>
            <p>
              Our portfolio of extraordinary journeys is for the discerning
              traveller, small private groups, families, and thrill seekers
              who believe travel should be about experiences, not just
              destinations.
            </p>
          </div>
        </div>

        <div className="stats reveal" data-delay="2">
          <div className="stat">
            <div className="stat__num serif gold-grad">12</div>
            <div className="stat__label">Unforgettable Experiences</div>
          </div>
          <div className="stat">
            <div className="stat__num serif gold-grad">1</div>
            <div className="stat__label">Ideal Season</div>
          </div>
          <div className="stat">
            <div className="stat__num serif gold-grad">∞</div>
            <div className="stat__label">Memories to Last a Lifetime</div>
          </div>
        </div>

        <div className="manifesto__ctawrap">
          <BespokeCta />
        </div>
      </div>
    </section>
  )
}
