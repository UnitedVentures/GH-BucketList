import React from 'react'
import ReactDOM from 'react-dom/client'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* domAnimation covers everything the site uses (animate/exit/
        whileInView) at roughly half the JS weight of importing the
        full `motion` component set — components below use `m` instead
        of `motion` to opt into the smaller bundle.
        reducedMotion="user" makes every Framer Motion animation site-wide
        respect prefers-reduced-motion automatically, so components don't
        each need their own matchMedia check. */}
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </React.StrictMode>,
)
