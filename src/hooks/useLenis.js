import { useEffect } from 'react'
import Lenis from 'lenis'
import { frame, cancelFrame } from 'framer-motion'

/**
 * Drives smooth scrolling for the main page (Hero → itinerary → footer)
 * via Lenis, synced onto Framer Motion's own frame loop so the two never
 * fight over rAF scheduling. Lenis still animates the *real* window
 * scroll position (not a virtual one), so `window.scrollY` and Framer
 * Motion's `useScroll()` keep working everywhere unchanged.
 *
 * Pass `enabled={false}` (e.g. during the Story overlay, which is a
 * fixed, non-scrolling screen with its own gesture-driven step logic —
 * not a document to smooth-scroll) to skip initializing it.
 */
export default function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    const update = ({ timestamp }) => lenis.raf(timestamp)
    frame.update(update, true)

    return () => {
      cancelFrame(update)
      lenis.destroy()
    }
  }, [enabled])
}
