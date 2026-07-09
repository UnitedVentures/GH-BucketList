import { useEffect, useRef } from 'react'

/**
 * Returns a ref for a full-bleed background layer. The layer is translated
 * at `speed` × the distance its section has scrolled, producing the
 * parallax drift. Runs inside requestAnimationFrame to stay off the
 * scroll-handler hot path.
 */
export default function useParallax(speed = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const section = el.parentElement
      const rect = section.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      el.style.transform = `translate3d(0, ${rect.top * -speed}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [speed])

  return ref
}
