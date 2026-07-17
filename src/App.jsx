import { useState } from 'react'
import Landing from './components/Landing.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Manifesto from './components/Manifesto.jsx'
import Band from './components/Band.jsx'
import Upcoming from './components/Upcoming.jsx'
import Footer from './components/Footer.jsx'
import Itinerary from './components/Itinerary.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  // Landing state is deliberately not persisted: every refresh returns
  // to the Bucket List landing screen.
  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useReveal(entered)

  // Tiny query-param router: "?itinerary=<slug>" renders the itinerary
  // page directly (deep links keep working). Everything else starts at
  // the landing screen.
  const slug = new URLSearchParams(window.location.search).get('itinerary')
  if (slug) return <Itinerary slug={slug} />

  if (!entered) {
    return (
      <Landing
        leaving={leaving}
        onEnter={() => {
          setLeaving(true)
          setTimeout(() => setEntered(true), 850)
        }}
      />
    )
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Band />
        <Upcoming />
      </main>
      <Footer />
    </>
  )
}
