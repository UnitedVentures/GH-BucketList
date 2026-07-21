import ReactDOM from 'react-dom/client'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

// No React.StrictMode: its dev-only double-invoked effects/mounts are
// known to conflict with Framer Motion's AnimatePresence, leaving
// exit/enter animations stuck at their initial state in `npm run dev`
// (confirmed: the exact same code animates correctly in a production
// build, where StrictMode's double-invocation doesn't happen — this
// was a dev-preview-only artifact, not a real bug, but disabling
// StrictMode keeps local development matching production).
ReactDOM.createRoot(document.getElementById('root')).render(
  // domAnimation covers everything the site uses (animate/exit/
  // whileInView) at roughly half the JS weight of importing the full
  // `motion` component set — components below use `m` instead of
  // `motion` to opt into the smaller bundle.
  // reducedMotion="user" makes every Framer Motion animation site-wide
  // respect prefers-reduced-motion automatically, so components don't
  // each need their own matchMedia check.
  <LazyMotion features={domAnimation}>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </LazyMotion>,
)
