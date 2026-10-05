import { useEffect } from 'react'
import { itineraries } from '../data/itineraries.js'
import { track, setPageContext } from '../lib/metaPixel.js'

const VIEW_EVENTS = {
  home: 'ViewHome',
  calendar: 'ViewCalendar',
  about: 'ViewAbout',
  testimonials: 'ViewTestimonials',
}

const SCROLL_DEPTHS = [25, 50, 75, 90]

// mirrors App.jsx's tiny query-param router
function pageTypeFor({ slug, page }) {
  if (slug) return 'itinerary'
  if (page === 'calendar' || page === 'testimonials' || page === 'about') return page
  return 'home'
}

/**
 * Tells Meta which page is actually on screen.
 *
 * The base snippet's PageView fires on every load, but this is a
 * query-param site and the homepage sits behind the intro Story, so the
 * URL alone can't say which "page" was really seen. `ready` is false
 * while the Story owns the screen — the homepage view is only logged once
 * it's revealed.
 *
 * Also sets the page_type / page_slug context attached to every other
 * event, and fires ScrollDepth milestones for the page being read.
 */
export default function usePageTracking({ slug, page, ready }) {
  const pageType = pageTypeFor({ slug, page })

  useEffect(() => {
    if (!ready) {
      setPageContext({ page_type: 'story' })
      return
    }

    setPageContext({ page_type: pageType, ...(slug && { page_slug: slug }) })

    if (pageType === 'itinerary') {
      const itin = itineraries[slug]
      if (itin) {
        track('ViewContent', {
          content_name: itin.title,
          content_ids: [slug],
          content_type: 'product',
          content_category: 'Itinerary',
        })
      } else {
        track('ViewComingSoon', { content_ids: [slug] })
      }
    } else {
      track(VIEW_EVENTS[pageType])
    }
  }, [ready, pageType, slug])

  useEffect(() => {
    if (!ready) return
    const fired = new Set()

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percent = (window.scrollY / scrollable) * 100
      for (const depth of SCROLL_DEPTHS) {
        if (percent >= depth && !fired.has(depth)) {
          fired.add(depth)
          track('ScrollDepth', { percent: depth })
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ready, pageType, slug])
}
