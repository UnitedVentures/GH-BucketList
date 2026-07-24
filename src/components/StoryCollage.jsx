import { useMemo } from 'react'
import { AnimatePresence, m } from 'framer-motion'

const img = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// A pool of bucket-list moments deliberately unrelated to the twelve
// monthly editions — pure mood/texture behind the story text.
const POOL = [
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

// Deterministic pseudo-random scatter — looks organic but is stable for
// a given (seed), so the same step always reproduces the same layout,
// while different steps land on genuinely different picks/positions.
function scatter(count, seed) {
  const rand = (n) => {
    const x = Math.sin(seed * 999 + n * 97.13) * 10000
    return x - Math.floor(x)
  }
  return Array.from({ length: count }, (_, i) => ({
    src: POOL[(i + seed * 3) % POOL.length],
    top: `${(rand(i * 2 + 1) * 88).toFixed(1)}%`,
    left: `${(rand(i * 2 + 2) * 88).toFixed(1)}%`,
    size: Math.round(120 + rand(i * 2 + 3) * 130),
  }))
}

// the outgoing set keeps scrolling up and fully off the top of the
// frame, the incoming set scrolls up into place from below — a real
// physical hand-off, no cross-fade, so nothing ever "disappears" and
// pops back in; it just keeps travelling in one direction, in sync
// with the text slide. travel is per-layer so the two depth layers
// move at different speeds (true parallax against each other and the
// text) instead of both sliding at the same rate.
const makeTileSetVariants = (travel) => ({
  enter: { y: travel },
  center: { y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.34, 1] } },
  exit: { y: -travel, transition: { duration: 0.85, ease: [0.4, 0, 1, 1] } },
})

function Layer({ step, count, seedBase, className, driftDuration, travel, y }) {
  // recomputed only when the step actually changes — stable positions
  // for as long as a given step is showing
  const tiles = useMemo(() => scatter(count, step + seedBase), [step, count, seedBase])
  const tileSetVariants = useMemo(() => makeTileSetVariants(travel), [travel])

  return (
    <div
      className={`story__collage ${className}`}
      style={{ animationDuration: `${driftDuration}s` }}
      aria-hidden="true"
    >
      <m.div className="story__collage-track" style={{ y }}>
        {/* no mode="wait": the new set scrolls up into place while the
            old one is still scrolling out, so the layer never empties */}
        <AnimatePresence>
          <m.div
            className="story__collage-set"
            key={step}
            variants={tileSetVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {tiles.map((t, i) => (
              <img
                key={i}
                src={t.src}
                alt=""
                loading="lazy"
                style={{ top: t.top, left: t.left, width: t.size, height: t.size }}
              />
            ))}
          </m.div>
        </AnimatePresence>
      </m.div>
    </div>
  )
}

/**
 * Two depth layers of scattered destination photos behind the story
 * text. Each layer drifts upward continuously (pure CSS) and nudges in
 * response to scroll gestures (yA/yB, spring-driven from Story.jsx) —
 * and on every step change, its whole picture set scrolls up and out,
 * replaced by a freshly-scattered set scrolling up into place, in sync
 * with the text transition.
 */
export default function StoryCollage({ step, yA, yB }) {
  return (
    <>
      <Layer
        step={step}
        count={5}
        seedBase={20}
        className="story__collage--b"
        driftDuration={140}
        travel="34vh"
        y={yB}
      />
      <Layer
        step={step}
        count={6}
        seedBase={10}
        className="story__collage--a"
        driftDuration={95}
        travel="58vh"
        y={yA}
      />
    </>
  )
}
