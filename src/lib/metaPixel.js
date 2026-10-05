/**
 * Meta Pixel helpers — and the single source of truth for what this site
 * sends to Meta. The inline snippet in index.html defines fbq
 * synchronously (it queues calls until fbevents.js has loaded) and fires
 * the automatic PageView; everything else goes through here, so ad
 * blockers stripping fbq never throw.
 *
 * ── STANDARD events (usable for ad optimisation / custom conversions) ──
 *   ViewContent          an itinerary page was opened
 *   Lead                 high-intent: "Reserve the Experience" (hero/bottom)
 *                        and "Ask the Concierge" on an unpublished itinerary
 *   Contact              any other WhatsApp chat open (floating widget,
 *                        widget greeting, footer button, footer icon)
 *   CompleteRegistration newsletter signup saved successfully
 *
 * ── CUSTOM events (diagnostics — each shows as its own row in Events Manager)
 *   ViewHome / ViewCalendar / ViewAbout / ViewTestimonials   fixed pages
 *   ViewComingSoon       itinerary slug with no published content
 *   StoryComplete        visitor got through the intro to the homepage
 *   SelectItinerary      clicked through to an itinerary (placement says from where)
 *   DeckBrowse           moved the homepage month deck (chevron/swipe/card)
 *   NavClick             header, drawer, logo and back-link navigation
 *   BespokeCtaClick      "Talk to Us" bespoke-trip button
 *   OutboundClick        social icons and goholidays.lk / unitedventuressl.com links
 *   DownloadItinerary    "Download the Itinerary" (PDF) clicked
 *   ThemeToggle          light/dark switch
 *   ScrollDepth          25 / 50 / 75 / 90 % of the page scrolled
 *   NewsletterError      signup form failed (spots a broken subscribe.php)
 *
 * Every event automatically carries page_type and page_slug (see
 * setPageContext), so e.g. a Contact click can be tied to the itinerary
 * page it happened on. Never put personal data (emails, names) in params.
 */

// Meta's full standard-event list: anything in here goes out via
// fbq('track'), everything else via fbq('trackCustom').
const STANDARD_EVENTS = new Set([
  'AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'CompleteRegistration',
  'Contact', 'CustomizeProduct', 'Donate', 'FindLocation', 'InitiateCheckout',
  'Lead', 'Purchase', 'Schedule', 'Search', 'StartTrial', 'SubmitApplication',
  'Subscribe', 'ViewContent',
])

let pageContext = {}

/** Set by usePageTracking; merged into the params of every later event. */
export function setPageContext(context) {
  pageContext = context
}

export function track(name, params) {
  if (typeof window.fbq !== 'function') return
  window.fbq(
    STANDARD_EVENTS.has(name) ? 'track' : 'trackCustom',
    name,
    { ...pageContext, ...params },
  )
}

/** Convenience for JSX: onClick={trackOnClick('NavClick', { label: 'About Us' })} */
export const trackOnClick = (name, params) => () => track(name, params)
