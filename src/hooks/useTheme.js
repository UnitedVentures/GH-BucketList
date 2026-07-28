import { useState } from 'react'

const THEME_KEY = 'bucketlist:theme'

// index.html's inline script already sets this attribute before React
// even mounts (avoids a flash of the wrong theme on load) — this hook
// just reads that same source of truth rather than re-deciding it.
function getInitialTheme() {
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'dark' ? 'dark' : 'light'
}

/**
 * Site-wide light/dark toggle. Self-contained on purpose: every page
 * navigation here is a real browser load (no client router), so each
 * mounted Nav can read/own this independently without needing to sync
 * with any other component — only one Nav is ever on screen at a time.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem(THEME_KEY, next)
      } catch {
        // ignore — worst case the choice doesn't persist
      }
      return next
    })
  }

  return [theme, toggleTheme]
}
