import { useEffect, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

/**
 * Returns a display string that scrambles into `text` whenever it changes:
 * unresolved characters cycle through random glyphs, resolving left to
 * right over `duration` ms. Whitespace and punctuation stay fixed so the
 * layout doesn't jitter.
 */
export default function useScramble(text, duration = 900) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      return
    }

    let raf
    let start
    const step = (now) => {
      if (start === undefined) start = now
      const progress = Math.min(1, (now - start) / duration)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const c = text[i]
        if (/[\s·—,'’&-]/.test(c)) {
          out += c
          continue
        }
        const revealAt = ((i + 1) / text.length) * 0.85
        out += progress >= revealAt ? c : CHARS[(Math.random() * CHARS.length) | 0]
      }
      setDisplay(out)
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [text, duration])

  return display
}
