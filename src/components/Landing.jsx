const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// A collage of bucket-list moments deliberately unrelated to the
// twelve editions — diving, canyons, lost cities, big waves.
const tiles = [
  img('photo-1437622368342-7a3d73a34c8f'), // sea turtle underwater
  img('photo-1505521377774-103a8cc2f735'), // antelope canyon
  img('photo-1495612778264-627cd2e6dfb3'), // moraine lake canoes
  img('photo-1579606032821-4e6161c81bd3'), // petra, jordan
  img('photo-1559627755-42212e5c5fdf'), // big-wave surfer
  img('photo-1523906834658-6e24ef2386f9'), // venice canal
  img('photo-1608037521277-154cd1b89191'), // great wall of china
  img('photo-1592208128295-5aaa34f1d72b'), // paragliding at sunset
  img('photo-1518639192441-8fce0a366e2e'), // christ the redeemer
  img('photo-1602002418679-43121356bf41'), // overwater bungalow
  img('photo-1502602898657-3e91760cbb34'), // paris
  img('photo-1476610182048-b716b8518aae'), // iceland highlands
]

const columns = [tiles.slice(0, 4), tiles.slice(4, 8), tiles.slice(8, 12)]

export default function Landing({ leaving, onEnter }) {
  return (
    <div className={`landing${leaving ? ' is-leaving' : ''}`}>
      <div className="landing__collage" aria-hidden="true">
        {columns.map((col, i) => (
          <div className="landing__col" key={i}>
            {/* duplicated so the slow drift never shows an empty edge */}
            {[...col, ...col].map((src, j) => (
              <img src={src} alt="" key={j} loading="eager" />
            ))}
          </div>
        ))}
      </div>
      <div className="landing__veil" aria-hidden="true" />

      <main className="landing__content">
        <h1 className="landing__title serif">
          Bucket <em>List</em>
        </h1>
        <p className="landing__by">by Go Holidays</p>
        <p className="landing__tagline serif">
          Not all journeys are measured in miles.
          <br />
          <em>Some are measured in moments.</em>
        </p>
        <button type="button" className="landing__cta" onClick={onEnter}>
          Explore the List <span aria-hidden="true">→</span>
        </button>
      </main>
    </div>
  )
}
