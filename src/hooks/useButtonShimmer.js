import { useEffect } from 'react'

/**
 * Cursor-following shine on every .btn--solid button, site-wide — a
 * single document-level listener rather than one per button, and
 * writes CSS custom properties directly (not React state) so it never
 * triggers a re-render on mouse movement. See .btn--solid::after in
 * index.css for the radial-gradient this drives.
 */
export default function useButtonShimmer() {
  useEffect(() => {
    const onMove = (e) => {
      const btn = e.target.closest?.('.btn--solid')
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      btn.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
      btn.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
}
