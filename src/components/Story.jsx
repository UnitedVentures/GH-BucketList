import { Suspense, lazy, useEffect, useRef, useState } from 'react'
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

// each step settles the shader a little deeper into the scene
const shaderBase = (step) =>
  `translateY(${-step * 1.4}vh) scale(${(1.06 + step * 0.05).toFixed(3)}) rotate(${(step * 0.9).toFixed(2)}deg)`

const MIN_DWELL = 1000 // ms a slide must stay fully on screen before it can move on
const FADE_OUT_MS = 650 // outgoing slide's fade+lift duration before the next one mounts

export default function Story({ onReveal }) {
  const [step, setStep] = useState(0)
  const [fading, setFading] = useState(false)
  const [leaving, setLeaving] = useState(false)
  // flips true once the shader has actually painted — the dwell clock
  // starts from here, not from Story's own mount, so a slide can't be
  // considered "shown" before there's anything to see
  const [ready, setReady] = useState(false)
  const shaderRef = useRef(null)
  const state = useRef({
    step: 0,
    leaving: false,
    fadingNow: false,
    shownAt: 0,
    fadeTimer: 0,
    pendingTimer: 0,
    pendingAdvance: false,
    acc: 0,
    nudgeTimer: 0,
    lastNudge: 0,
  })

  useEffect(() => {
    const el = shaderRef.current
    if (el) el.style.transform = shaderBase(state.current.step)
  }, [step])

  useEffect(() => {
    // nothing to step through yet — the shader (and step 0) aren't on
    // screen while the Loader is still covering the Suspense boundary
    if (!ready) return

    const s = state.current

    // one step: the current slide lifts and fades out, then the next
    // one mounts and lifts+fades itself in from below (see the
    // storySlideIn keyframe / .is-fading-out rule in index.css)
    const doAdvance = () => {
      if (s.leaving) return
      s.fadingNow = true
      setFading(true)
      s.fadeTimer = setTimeout(() => {
        const next = s.step + 1
        if (next > LAST_STEP) {
          s.leaving = true
          setLeaving(true)
          setTimeout(onReveal, 900)
          return
        }
        s.step = next
        s.shownAt = Date.now()
        s.fadingNow = false
        setStep(next)
        setFading(false)
      }, FADE_OUT_MS)
    }

    // the single entry point for manual scroll/touch/key input. Enforces
    // the minimum on-screen dwell: a request that arrives too early is
    // queued for the exact moment the dwell completes, never dropped and
    // never allowed to stack — so a burst of scrolling can only ever
    // move the story one step forward, never skip one.
    const advance = () => {
      if (s.leaving || s.fadingNow) return
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
      const el = shaderRef.current
      if (!el || s.leaving) return
      const now = Date.now()
      if (now - s.lastNudge < 90) return
      s.lastNudge = now
      el.style.transform = `${shaderBase(s.step)} translateY(${-dir * strength}px)`
      clearTimeout(s.nudgeTimer)
      s.nudgeTimer = setTimeout(() => {
        el.style.transform = shaderBase(s.step)
      }, 260)
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
      const el = shaderRef.current
      if (!el || s.leaving) return
      const d = touchY - e.touches[0].clientY
      el.style.transform = `${shaderBase(s.step)} translateY(${-Math.max(-60, Math.min(60, d * 0.25))}px)`
    }
    const onTouchEnd = (e) => {
      const el = shaderRef.current
      if (el) el.style.transform = shaderBase(s.step)
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
    s.shownAt = Date.now()
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      clearTimeout(s.fadeTimer)
      clearTimeout(s.pendingTimer)
      clearTimeout(s.nudgeTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [ready, onReveal])

  const isTease = step === LAST_STEP

  return (
    <Suspense fallback={<Loader />}>
      <div className={`story${leaving ? ' is-leaving' : ''}`}>
        <div className="story__shader" ref={shaderRef} aria-hidden="true">
          <ShaderBg onReady={() => setReady(true)} />
        </div>
        <div className="story__shade" aria-hidden="true" />

        <div className="story__content">
          <div
            className={`story__slide${fading ? ' is-fading-out' : ''}`}
            key={step}
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
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>{isTease ? 'Scroll to reveal the destination' : 'Scroll'}</span>
          <span />
        </div>
      </div>
    </Suspense>
  )
}
