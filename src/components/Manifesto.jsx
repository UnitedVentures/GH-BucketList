export default function Manifesto() {
  return (
    <section className="manifesto" id="initiative">
      <div className="wrap">
        <div className="manifesto__grid">
          <div className="reveal">
            <p className="eyebrow">The Bucket List Collection</p>
            <h2>
              Not all journeys are measured in miles.{' '}<br/>
              <em>Some are measured in moments.</em>
            </h2>
          </div>
          <div className="manifesto__copy reveal" data-delay="1">
            <p>
              Welcome to the Bucket List Collection — a carefully curated
              portfolio of extraordinary journeys for discerning travellers,
              private groups, families and adventure seekers who believe
              travel should be about experiences, not just destinations.
            </p>
            <div className="manifesto__rule" />
            <p>
              Each itinerary is thoughtfully designed around authentic local
              encounters, breathtaking landscapes and unforgettable moments.
              We take you beyond the ordinary — into the heart and soul of
              every destination, through immersive cultural experiences,
              unique adventures and meaningful connections with local
              communities.
            </p>
            <p>
              Every journey is scheduled for the ideal time of year —
              balancing the best weather and seasonal highlights while
              avoiding the crowds, and ensuring once-in-a-lifetime
              experiences remain accessible without compromise on quality.
            </p>
          </div>
        </div>

        <div className="stats reveal" data-delay="2">
          <div className="stat">
            <div className="stat__num serif">12</div>
            <div className="stat__label">Extraordinary Journeys a Year</div>
          </div>
          <div className="stat">
            <div className="stat__num serif">1</div>
            <div className="stat__label">Ideal Season, Every Time</div>
          </div>
          <div className="stat">
            <div className="stat__num serif">∞</div>
            <div className="stat__label">Memories That Last a Lifetime</div>
          </div>
        </div>
      </div>
    </section>
  )
}
