import Nav from './Nav.jsx'
import CalendarGrid from './CalendarGrid.jsx'
import BespokeCta from './BespokeCta.jsx'
import Footer from './Footer.jsx'

export default function CalendarPage() {
  return (
    <>
      <Nav />
      <main>
        <CalendarGrid />
        <section className="bespoke-cta-section">
          <div className="wrap">
            <BespokeCta />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
