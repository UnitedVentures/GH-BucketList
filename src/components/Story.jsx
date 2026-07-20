import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  m,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { featured } from '../data/editions.js'
import Loader from './Loader.jsx'

// three.js is heavy — load the shader background lazily and let the
// Loader plane cover the wait.
const ShaderBg = lazy(() => import('./ShaderBg.jsx'))

const panels = [
  {
    eyebrow: 'The Bucket List',
    text: (
      <>
        Our carefully curated portfolio of extraordinary journeys are about
        <em>experiences,</em>
        not just
        <em> destinations.</em>
      </>
    ),
  },
  {
    eyebrow: 'The Craft',
    text: (
      <>
        We design each itinerary around authenticity and uniqueness.
        Breathtaking landscapes and unforgettable moments — beyond the
        ordinary, <em>into the heart and soul of every destination.</em>
      </>
    ),
  }
]

// 0 = landing, 1..panels.length = the panels above, +1 = the destination
// tease. Derived from panels.length so trimming/adding a panel never
// leaves a step pointing at an undefined entry.
const LAST_STEP = panels.length + 1

const EXIT_MS = 650 // outgoing slide's fade+lift duration
const ENTER_MS = 900 // incoming slide's fade+settle duration
const MIN_DWELL = 1000 // ms a slide must stay fully SETTLED before it can move on
const EASE_OUT = [0.16, 1, 0.34, 1]
const EASE_IN = [0.4, 0, 1, 1]

const slideVariants = {
  enter: { opacity: 0, y: 32 },
  center: { opacity: 1, y: 0, transition: { duration: ENTER_MS / 1000, ease: EASE_OUT } },
  exit: { opacity: 0, y: -32, transition: { duration: EXIT_MS / 1000, ease: EASE_IN } },
}

const storyVariants = {
  visible: { opacity: 1, scale: 1 },
  leaving: { opacity: 0, scale: 1.03, transition: { duration: 0.9, ease: 'easeInOut' } },
}

export default function Story({ onReveal }) {
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)
  // flips true once the shader has actually painted — the dwell clock
  // starts from here, not from Story's own mount, so a slide can't be
  // considered "shown" before there's anything to see
  const [ready, setReady] = useState(false)
  const state = useRef({
    step: 0,
    leaving: false,
    transitioning: false,
    shownAt: 0,
    settleTimer: 0,
    pendingTimer: 0,
    pendingAdvance: false,
    acc: 0,
    lastNudge: 0,
  })

  // shader background: a per-step "settle" position plus a transient
  // gesture "nudge" layered on top, combined into one transform
  const baseY = useMotionValue(0) // vh, per-step settle
  const nudgeY = useMotionValue(0) // px, transient gesture push
  const scaleMV = useMotionValue(1.06)
  const rotateMV = useMotionValue(0)
  const shaderY = useTransform([baseY, nudgeY], ([b, n]) => `calc(${b}vh + ${n}px)`)
  // MotionConfig's reducedMotion="user" covers the declarative variants
  // below, but not these imperative animate() calls — guarded by hand
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      baseY.jump(-step * 1.4)
      scaleMV.jump(1.06 + step * 0.05)
      rotateMV.jump(step * 0.9)
      return
    }
    const opts = { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    animate(baseY, -step * 1.4, opts)
    animate(scaleMV, 1.06 + step * 0.05, opts)
    animate(rotateMV, step * 0.9, opts)
  }, [step, baseY, scaleMV, rotateMV, prefersReducedMotion])

  useEffect(() => {
    // nothing to step through yet — the shader (and step 0) aren't on
    // screen while the Loader is still covering the Suspense boundary
    if (!ready) return

    const s = state.current

    // one step forward: React swaps the slide's key, AnimatePresence
    // handles the exit-then-enter sequencing on its own. The dwell
    // clock only starts once the new slide is expected to be fully
    // settled (old exit + new enter), not the instant it's requested.
    const doAdvance = () => {
      if (s.leaving || s.transitioning) return
      const next = s.step + 1
      if (next > LAST_STEP) {
        s.leaving = true
        setLeaving(true)
        return
      }
      s.transitioning = true
      s.step = next
      setStep(next)
      clearTimeout(s.settleTimer)
      s.settleTimer = setTimeout(() => {
        s.shownAt = Date.now()
        s.transitioning = false
      }, EXIT_MS + ENTER_MS)
    }

    // the single entry point for manual scroll/touch/key input. Enforces
    // the minimum on-screen dwell: a request that arrives too early is
    // queued for the exact moment the dwell completes, never dropped and
    // never allowed to stack — so a burst of scrolling can only ever
    // move the story one step forward, never skip one.
    const advance = () => {
      if (s.leaving || s.transitioning) return
      const remaining = MIN_DWELL - (Date.now() - s.shownAt)
      if (remaining > 0) {
        if (!s.pendingAdvance) {
          s.pendingAdvance = true
          clearTimeout(s.pendingTimer)
          s.pendingTimer = setTimeout(() => {
            s.pendingAdvance = false
            advance()
          }, remaining)
        }
        return
      }
      doAdvance()
    }

    // the background answers every gesture — a soft push that springs
    // back — so even queued/ignored scrolls are felt
    const nudge = (dir, strength = 18) => {
      if (s.leaving) return
      const now = Date.now()
      if (now - s.lastNudge < 90) return
      s.lastNudge = now
      animate(nudgeY, [-dir * strength, 0], {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 1],
      })
    }

    const onWheel = (e) => {
      nudge(e.deltaY > 0 ? 1 : -1)
      if (e.deltaY <= 0) return
      s.acc += e.deltaY
      if (s.acc > 60) {
        advance()
        s.acc = 0
      }
    }
    let touchY = 0
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      // live drag feedback under the finger
      if (s.leaving) return
      const d = touchY - e.touches[0].clientY
      nudgeY.set(-Math.max(-60, Math.min(60, d * 0.25)))
    }
    const onTouchEnd = (e) => {
      animate(nudgeY, 0, { duration: 0.5, ease: [0.22, 1, 0.36, 1] })
      if (touchY - e.changedTouches[0].clientY > 50) advance()
    }
    const onKey = (e) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault()
        nudge(1)
        advance()
      }
    }

    document.body.style.overflow = 'hidden'
    s.settleTimer = setTimeout(() => {
      s.shownAt = Date.now()
    }, ENTER_MS)
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      clearTimeout(s.settleTimer)
      clearTimeout(s.pendingTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [ready, nudgeY])

  const isTease = step === LAST_STEP

  return (
    <Suspense fallback={<Loader />}>
      <m.div
        className={`story${leaving ? ' is-leaving' : ''}`}
        variants={storyVariants}
        animate={leaving ? 'leaving' : 'visible'}
        onAnimationComplete={(def) => {
          if (def === 'leaving') onReveal()
        }}
      >
        <m.div
          className="story__shader"
          style={{ y: shaderY, scale: scaleMV, rotate: rotateMV }}
          aria-hidden="true"
        >
          <ShaderBg onReady={() => setReady(true)} />
        </m.div>
        <div className="story__shade" aria-hidden="true" />

        <div className="story__content">
          <AnimatePresence mode="wait">
            <m.div
              className="story__slide"
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {step === 0 && (
                <>
                  <img
                    className="story__logo"
                    src={`${import.meta.env.BASE_URL}images/Logo.svg`}
                    alt="Bucket List by Go Holidays"
                  />
                  <p className="landing__by">by Go Holidays</p>
                  <p className="landing__tagline serif">
                    Not all journeys are measured in miles.
                    <br />
                    <em>Some are measured in moments.</em>
                  </p>
                </>
              )}

              {step > 0 && !isTease && (
                <>
                  <p className="eyebrow">{panels[step - 1].eyebrow}</p>
                  <p className="intro__text serif">{panels[step - 1].text}</p>
                </>
              )}

              {isTease && (
                <>
                  <p className="eyebrow">Next on the List · {featured.month}</p>
                  <p className="intro__text serif">{featured.description}</p>
                  <p className="intro__hint serif">{featured.tagline}</p>
                </>
              )}
            </m.div>
          </AnimatePresence>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>{isTease ? 'Scroll to reveal the destination' : 'Scroll'}</span>
          <span />
        </div>
      </m.div>
    </Suspense>
  )
}
