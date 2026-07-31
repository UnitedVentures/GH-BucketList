import { useEffect, useState } from 'react'

// Each trigger is independently toggleable — flip either flag to false
// to disable it without touching the timer/listener logic below.
const ENABLE_SCROLL_STOP_TRIGGER = true
const ENABLE_INACTIVITY_TRIGGER = true

const SCROLL_STOP_DELAY = 4000 // ms of no scrolling before the scroll-stop trigger fires
const INACTIVITY_DELAY = 45000 // ms of no activity at all before the inactivity trigger fires
const DISPLAY_DURATION = 4000 // ms the greeting stays up once shown — not cancelled early by new activity

/**
 * Drives the WhatsApp widget's "Hi there, need any help?" greeting.
 * Two independent idle triggers, each behind its own ENABLE_ flag above:
 * a short one that fires shortly after scrolling stops, and a longer
 * one that fires after any prolonged inactivity (scroll, mouse, touch
 * or key). Both re-arm after each showing, so the greeting can
 * reappear repeatedly through a long, idle visit. Once shown it stays
 * up for DISPLAY_DURATION regardless of new activity — activity during
 * that window only affects when the *next* idle period starts, not the
 * one already on screen.
 */
export default function useWhatsAppGreeting() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!ENABLE_SCROLL_STOP_TRIGGER && !ENABLE_INACTIVITY_TRIGGER) return

    let scrollStopTimer = 0
    let inactivityTimer = 0
    let hideTimer = 0
    let showing = false

    const show = () => {
      if (showing) return
      showing = true
      setVisible(true)
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => {
        showing = false
        setVisible(false)
      }, DISPLAY_DURATION)
    }

    const armInactivity = () => {
      if (!ENABLE_INACTIVITY_TRIGGER) return
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(show, INACTIVITY_DELAY)
    }

    const onScroll = () => {
      if (ENABLE_SCROLL_STOP_TRIGGER) {
        clearTimeout(scrollStopTimer)
        scrollStopTimer = setTimeout(show, SCROLL_STOP_DELAY)
      }
      armInactivity()
    }

    const onActivity = () => armInactivity()

    armInactivity()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onActivity, { passive: true })
    window.addEventListener('touchstart', onActivity, { passive: true })
    window.addEventListener('keydown', onActivity)
    window.addEventListener('click', onActivity)

    return () => {
      clearTimeout(scrollStopTimer)
      clearTimeout(inactivityTimer)
      clearTimeout(hideTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onActivity)
      window.removeEventListener('touchstart', onActivity)
      window.removeEventListener('keydown', onActivity)
      window.removeEventListener('click', onActivity)
    }
  }, [])

  return visible
}
