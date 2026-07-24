import ReactDOM from 'react-dom/client'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

// No React.StrictMode: its dev-only double-invoked effects/mounts
// conflict with Framer Motion's AnimatePresence, leaving exit/enter
// animations stuck at their initial state in `npm run dev` (the same
// code animates correctly in a production build).
ReactDOM.createRoot(document.getElementById('root')).render(
  // domAnimation covers everything the site uses (animate/exit/
  // whileInView) at roughly half the JS weight of importing the full
  // `motion` component set — components use `m` instead of `motion`.
  // reducedMotion="user" makes every Framer Motion animation respect
  // prefers-reduced-motion automatically.
  <LazyMotion features={domAnimation}>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </LazyMotion>,
)
