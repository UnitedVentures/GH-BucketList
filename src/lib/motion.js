const EASE = [0.16, 1, 0.3, 1]

/**
 * Framer Motion props for a fade-and-lift-in that plays once, when the
 * element scrolls into view. Shared across every section that reveals
 * on scroll — pass overrides for the handful of props that vary.
 */
export const reveal = ({ y = 36, amount = 0.2, duration = 1, delay = 0 } = {}) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount },
  transition: { duration, ease: EASE, delay },
})
