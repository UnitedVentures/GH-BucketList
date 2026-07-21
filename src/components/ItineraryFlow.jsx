import { itineraries } from '../data/itineraries.js'
import { featured, whatsapp } from '../data/editions.js'
import ItineraryBody from './ItineraryBody.jsx'

/**
 * The featured destination's full itinerary, inline on the main page.
 * Scrolling rearranges the experience: this slides up over the pinned
 * video hero while the destination name docks into the nav.
 */
export default function ItineraryFlow() {
  const itin = itineraries[featured.slug]
  if (!itin) return null

  const reserveUrl = whatsapp(
    `Hello Go Holidays! I'd like to reserve "${itin.title}" — the ${featured.month} Bucket List experience.`,
  )

  return (
    <section className="itinflow itin__body" id="itinerary">
      <ItineraryBody itin={itin} reserveUrl={reserveUrl} showBackLink={false} />
    </section>
  )
}
