import ReactDOM from 'react-dom/client'
import { LazyMotion, domMax, MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

// No React.StrictMode: its dev-only double-invoked effects/mounts
// conflict with Framer Motion's AnimatePresence, leaving exit/enter
// animations stuck at their initial state in `npm run dev` (the same
// code animates correctly in a production build).
ReactDOM.createRoot(document.getElementById('root')).render(
  // domMax (not domAnimation): Calendar.jsx's fan-stack uses `drag="x"`
  // on an `m.div`, and the `drag` gesture recognizer only ships in the
  // domMax feature bundle — domAnimation silently drops it, so the drag
  // listener never attached at all (clicking through side cards looked
  // like a working swipe, but no real drag gesture was ever registered).
  // reducedMotion="user" makes every Framer Motion animation respect
  // prefers-reduced-motion automatically.
  <LazyMotion features={domMax}>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </LazyMotion>,
)
