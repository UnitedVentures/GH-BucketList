import { useState } from 'react'
import Story from './components/Story.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import ItineraryFlow from './components/ItineraryFlow.jsx'
import Footer from './components/Footer.jsx'
import Itinerary from './components/Itinerary.jsx'
import MonthRail from './components/MonthRail.jsx'
import useLenis from './hooks/useLenis.js'
import { featured } from './data/editions.js'

export default function App() {
  // The story overlay owns the screen until the destination is revealed.
  // Not persisted: every refresh starts the story again.
  const [revealed, setRevealed] = useState(false)

  // Smooth-scrolls the main page only. The Story overlay above is a
  // fixed, non-scrolling screen with its own gesture-driven stepper —
  // Lenis has nothing to do there, so it's only mounted once revealed.
  useLenis(revealed)

  // Tiny query-param router: "?itinerary=<slug>" renders the itinerary
  // page directly (deep links keep working).
  const slug = new URLSearchParams(window.location.search).get('itinerary')
  if (slug) return <Itinerary slug={slug} />

  if (!revealed) return <Story onReveal={() => setRevealed(true)} />

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ItineraryFlow />
      </main>
      <Footer />
      <MonthRail activeSlug={featured.slug} />
    </>
  )
}
