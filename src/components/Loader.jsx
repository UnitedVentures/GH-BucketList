/**
 * Full-screen brand loader: a tiny plane tracing a dashed arc between
 * two destinations, drawn in lineart gold. Pure SVG/SMIL — no JS.
 */
export default function Loader() {
  return (
    <div className="loader" role="status" aria-label="Loading">
      <svg viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="112" r="4" stroke="#bfa04a" strokeWidth="1.5" />
        <circle cx="296" cy="112" r="4" stroke="#bfa04a" strokeWidth="1.5" />
        <path
          id="loader-arc"
          d="M28 110 C 100 18, 220 18, 292 110"
          stroke="#bfa04a"
          strokeWidth="1.2"
          strokeDasharray="2 7"
          strokeLinecap="round"
          opacity="0.7"
        />
        <g>
          <path
            d="M0 -7 L1.6 -1.6 L8 0 L1.6 1.6 L0 7 L-1 1.4 L-5 0 L-1 -1.4 Z"
            fill="#e2d194"
          />
          <animateMotion dur="2.6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#loader-arc" />
          </animateMotion>
        </g>
      </svg>
      <p className="loader__text">Charting the journey…</p>
    </div>
  )
}
