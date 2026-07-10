import { useEffect } from 'react'

/**
 * Adds .is-visible to every .reveal element once it enters the viewport
 * (top edge above 88% of the screen). Throttled by timestamp rather than
 * requestAnimationFrame so it keeps working even when rendering frames
 * are suspended (background tabs, embedded previews).
 */
export default function useReveal(refreshKey) {
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal')]
    let last = 0

    const check = () => {
      els.forEach((el) => {
        if (el.classList.contains('is-visible')) return
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
          el.classList.add('is-visible')
        }
      })
    }
    const onScroll = () => {
      const now = Date.now()
      if (now - last > 80) {
        last = now
        check()
      }
    }

    check()
    const initial = setTimeout(check, 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      clearTimeout(initial)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [refreshKey])
}
