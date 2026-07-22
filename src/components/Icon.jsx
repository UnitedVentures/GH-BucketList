/**
 * Small hand-drawn line-icon set — 24x24, single stroke, no fill.
 * Kept as one dictionary so every icon shares the same visual weight.
 */
const paths = {
  users: (
    <>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M2.5 20c0-3.5 2.7-6 6-6s6 2.5 6 6" />
      <circle cx="16.5" cy="8.5" r="2.4" />
      <path d="M15 14.2c2.7.4 4.5 2.6 4.5 5.8" />
    </>
  ),
  bed: (
    <>
      <path d="M2.5 19v-8a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v8" />
      <path d="M2.5 19v2M21.5 19v2" />
      <path d="M2.5 15h19" />
      <rect x="4.5" y="9" width="6" height="4" rx="1.2" />
    </>
  ),
  route: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.6 8.4 13 13l-4.6 2.6L11 11l4.6-2.6Z" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5c.6 3.4 2 4.8 5.4 5.4-3.4.6-4.8 2-5.4 5.4-.6-3.4-2-4.8-5.4-5.4 3.4-.6 4.8-2 5.4-5.4Z" />
      <path d="M19 15c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  guide: (
    <>
      <circle cx="12" cy="7.5" r="3.3" />
      <path d="M5 20.5c0-4 3.1-6.8 7-6.8s7 2.8 7 6.8" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v-3.4l2-4.6a2 2 0 0 1 1.9-1.3h8.2a2 2 0 0 1 1.9 1.3l2 4.6V16" />
      <path d="M4 16h16v2.4a1 1 0 0 1-1 1h-1.4a1 1 0 0 1-1-1V17H7.4v1.4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
      <circle cx="7.5" cy="16" r="0.2" />
      <circle cx="16.5" cy="16" r="0.2" />
    </>
  ),
  shield: (
    <path d="M12 3.2 19 6v5.4c0 4.6-3 8-7 9.4-4-1.4-7-4.8-7-9.4V6l7-2.8Zm-3.3 8.6 2.3 2.3 4.3-4.4" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.4 12h17.2M12 3.4c2.4 2.3 3.7 5.3 3.7 8.6s-1.3 6.3-3.7 8.6c-2.4-2.3-3.7-5.3-3.7-8.6S9.6 5.7 12 3.4Z" />
    </>
  ),
  check: (
    <path d="M4 12.5 9.5 18 20 6" />
  ),
}

export default function Icon({ name, className = '' }) {
  const path = paths[name]
  if (!path) return null
  return (
    <span className={`icon ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 24 24">{path}</svg>
    </span>
  )
}
