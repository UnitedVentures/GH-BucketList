import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Manifesto from './components/Manifesto.jsx'
import Band from './components/Band.jsx'
import Upcoming from './components/Upcoming.jsx'
import Footer from './components/Footer.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  useReveal()

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
