import useParallax from '../hooks/useParallax.js'

/**
 * The marble backdrop for an entire page (see .page-bg in index.css) —
 * one continuous image behind all of a page's sections rather than a
 * copy per section, with a slight parallax drift via useParallax. Mount
 * once per route, inside the .page wrapper (see App.jsx).
 */
export default function PageBackground() {
  const bgRef = useParallax(0.06)
  return <div ref={bgRef} className="page-bg" aria-hidden="true" />
}
