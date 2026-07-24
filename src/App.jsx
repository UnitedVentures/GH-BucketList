import { useState } from 'react'
import Story from './components/Story.jsx'
import Nav from './components/Nav.jsx'
import Calendar from './components/Calendar.jsx'
import Manifesto from './components/Manifesto.jsx'
import Band from './components/Band.jsx'
import Footer from './components/Footer.jsx'
import Itinerary from './components/Itinerary.jsx'
import CalendarPage from './components/CalendarPage.jsx'
import TestimonialsPage from './components/TestimonialsPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import WhatsAppWidget from './components/WhatsAppWidget.jsx'
import useReveal from './hooks/useReveal.js'
import useLenis from './hooks/useLenis.js'
import useButtonShimmer from './hooks/useButtonShimmer.js'

const STORY_KEY = 'bucketlist:storySeenAt'
const STORY_TTL = 24 * 60 * 60 * 1000 // the intro reappears after a while, not on every refresh

function hasRecentlySeenStory() {
  try {
    const seenAt = Number(localStorage.getItem(STORY_KEY))
    return seenAt > 0 && Date.now() - seenAt < STORY_TTL
  } catch {
    // localStorage unavailable (private browsing, etc.) — fail open to
    // showing the story once rather than throwing
    return false
  }
}

export default function App() {
  // The story overlay owns the screen until the destination is revealed.
  // Persisted in localStorage so it only plays on a first visit, or
  // again after STORY_TTL has passed — not on every refresh/back nav.
  const [revealed, setRevealed] = useState(hasRecentlySeenStory)

  useReveal(revealed)
  // Smooth-scrolls the main page only. The Story overlay is a fixed,
  // non-scrolling screen with its own gesture-driven stepper — Lenis
  // has nothing to do there, so it's only mounted once revealed.
  useLenis(revealed)
  useButtonShimmer()

  // Tiny query-param router: "?itinerary=<slug>" and "?page=<name>"
  // render directly (deep links keep working). Everything else starts
  // at the story intro (or straight at the homepage, per above).
  const params = new URLSearchParams(window.location.search)
  const slug = params.get('itinerary')
  const page = params.get('page')

  const onReveal = () => {
    try {
      localStorage.setItem(STORY_KEY, String(Date.now()))
    } catch {
      // ignore — worst case the story just plays again next time
    }
    setRevealed(true)
  }

  if (!revealed && !slug && !page) return <Story onReveal={onReveal} />

  let content
  if (slug) content = <Itinerary slug={slug} />
  else if (page === 'calendar') content = <CalendarPage />
  else if (page === 'testimonials') content = <TestimonialsPage />
  else if (page === 'about') content = <AboutPage />
  else
    content = (
      <>
        <Nav />
        <main>
          <Calendar />
          <Manifesto />
          <Band />
        </main>
        <Footer />
      </>
    )

  return (
    <>
      {content}
      <WhatsAppWidget />
    </>
  )
}
