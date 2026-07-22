import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import Story from './components/Story.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import ItineraryFlow from './components/ItineraryFlow.jsx'
import Features from './components/Features.jsx'
import Footer from './components/Footer.jsx'
import Itinerary from './components/Itinerary.jsx'
import useLenis from './hooks/useLenis.js'
import { monthIndexForSlug } from './lib/months.js'

const getSlugFromUrl = () => new URLSearchParams(window.location.search).get('itinerary')

const SLIDE_SECONDS = 0.6

// x-only slide: transform naturally carries fixed-position descendants
// (the header, month strip) along with the page during the transition.
// Once settled, the page swaps out of the motion wrapper entirely (see
// the sliding/static render branch below) so no inline transform is
// ever left behind to hijack position:fixed for the pinned hero.
const slideVariants = {
  enter: (dir) => ({ x: dir >= 0 ? '100%' : '-100%' }),
  center: { x: 0, transition: { duration: SLIDE_SECONDS, ease: [0.65, 0, 0.35, 1] } },
  exit: (dir) => ({ x: dir >= 0 ? '-100%' : '100%', transition: { duration: SLIDE_SECONDS, ease: [0.65, 0, 0.35, 1] } }),
}

export default function App() {
  // The story overlay owns the screen until the destination is revealed.
  // Not persisted: every refresh starts the story again.
  const [revealed, setRevealed] = useState(false)
  const [slug, setSlug] = useState(getSlugFromUrl)
  const [sliding, setSliding] = useState(false)
  const directionRef = useRef(1)
  const settleTimer = useRef(null)

  // Smooth-scrolls the main page only. The Story overlay above is a
  // fixed, non-scrolling screen with its own gesture-driven stepper —
  // Lenis has nothing to do there, so it's only mounted once revealed.
  useLenis(revealed)

  // A plain timer (not an animation-completion callback) drives when a
  // transition is considered "settled" — reliable even if a second
  // navigation interrupts the first before Framer fires its own
  // completion event, which would otherwise leave the page stuck mid-slide.
  const startSlide = () => {
    setSliding(true)
    clearTimeout(settleTimer.current)
    settleTimer.current = setTimeout(() => setSliding(false), SLIDE_SECONDS * 1000 + 60)
  }

  // Back/forward keeps working since every client-side navigate() below
  // still pushes a real history entry.
  useEffect(() => {
    const onPop = () => {
      directionRef.current = 0
      setSlug(getSlugFromUrl())
      setRevealed(true)
      startSlide()
    }
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      clearTimeout(settleTimer.current)
    }
  }, [])

  // Shared navigation used by the month strip/drawer and every
  // "back to the collection" link — swaps the page in place with a
  // horizontal slide instead of a full reload, direction-aware by
  // calendar position (later month = slides in from the right).
  const navigate = (newSlug) => {
    if (newSlug === slug) return
    directionRef.current = monthIndexForSlug(newSlug) - monthIndexForSlug(slug) >= 0 ? 1 : -1
    const url = newSlug ? `?itinerary=${newSlug}` : window.location.pathname
    window.history.pushState({}, '', url)
    startSlide()
    window.scrollTo(0, 0)
    setSlug(newSlug)
    // any client-side navigation (including "back to the collection")
    // means we're past the story phase — never replay it over a slide
    setRevealed(true)
  }

  if (!slug && !revealed) return <Story onReveal={() => setRevealed(true)} />

  const pageKey = slug ?? 'home'
  const page = slug ? (
    <Itinerary slug={slug} onNavigate={navigate} />
  ) : (
    <>
      <Nav onNavigate={navigate} />
      <main id="top">
        <Hero />
        <ItineraryFlow />
        <Features />
      </main>
      <Footer />
    </>
  )

  return (
    <div className={`page-stage${sliding ? ' is-sliding' : ''}`}>
      {sliding ? (
        <AnimatePresence initial={false}>
          <m.div
            key={pageKey}
            custom={directionRef.current}
            className="page-slide is-absolute"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {page}
          </m.div>
        </AnimatePresence>
      ) : (
        <div key={pageKey} className="page-slide">
          {page}
        </div>
      )}
    </div>
  )
}
