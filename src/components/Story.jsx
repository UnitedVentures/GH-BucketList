import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { featured } from '../data/editions.js'
import Loader from './Loader.jsx'

// three.js is heavy — load the shader background lazily and let the
// Loader plane cover the wait.
const ShaderBg = lazy(() => import('./ShaderBg.jsx'))

const panels = [
  {
    eyebrow: '01 · The Collection',
    text: (
      <>
        Welcome to the Bucket List — a carefully curated portfolio of
        extraordinary journeys, for travellers who believe travel should be
        about <em>experiences, not just destinations.</em>
      </>
    ),
  },
  {
    eyebrow: '02 · The Craft',
    text: (
      <>
        Each itinerary is designed around authentic local encounters,
        breathtaking landscapes and unforgettable moments — beyond the
        ordinary, into the <em>heart and soul of every destination.</em>
      </>
    ),
  },
  {
    eyebrow: '03 · The Timing',
    text: (
      <>
        Every journey is scheduled for the ideal time of year — the best of
        the weather and the season, away from the crowds,{' '}
        <em>without compromise on quality.</em>
      </>
    ),
  },
]

const LAST_STEP = 4 // 0 landing · 1-3 panels · 4 tease

// each step settles the shader a little deeper into the scene
const shaderBase = (step) =>
  `translateY(${-step * 1.4}vh) scale(${(1.06 + step * 0.05).toFixed(3)}) rotate(${(step * 0.9).toFixed(2)}deg)`

export default function Story({ onReveal }) {
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const shaderRef = useRef(null)
  const state = useRef({ step: 0, lockUntil: 0, acc: 0, leaving: false, nudgeT: 0, lastNudge: 0 })

  useEffect(() => {
    const el = shaderRef.current
    if (el) el.style.transform = shaderBase(state.current.step)
  }, [step])

  useEffect(() => {
    // strictly linear: the story only ever moves forward
    const advance = () => {
      const s = state.current
      if (s.leaving || Date.now() < s.lockUntil) return
      s.lockUntil = Date.now() + 1050
      const next = s.step + 1
      if (next > LAST_STEP) {
        s.leaving = true
        setLeaving(true)
        setTimeout(onReveal, 900)
        return
      }
      s.step = next
      setStep(next)
    }

    // the background answers every gesture — a soft push that springs
    // back — so even locked/ignored scrolls are felt
    const nudge = (dir, strength = 18) => {
      const el = shaderRef.current
      const s = state.current
      if (!el || s.leaving) return
      const now = Date.now()
      if (now - s.lastNudge < 90) return
      s.lastNudge = now
      el.style.transform = `${shaderBase(s.step)} translateY(${-dir * strength}px)`
      clearTimeout(s.nudgeT)
      s.nudgeT = setTimeout(() => {
        el.style.transform = shaderBase(s.step)
      }, 230)
    }

    const onWheel = (e) => {
      nudge(e.deltaY > 0 ? 1 : -1)
      if (e.deltaY <= 0) return
      state.current.acc += e.deltaY
      if (state.current.acc > 60) {
        advance()
        state.current.acc = 0
      }
    }
    let touchY = 0
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      // live drag feedback under the finger
      const el = shaderRef.current
      if (!el || state.current.leaving) return
      const d = touchY - e.touches[0].clientY
      el.style.transform = `${shaderBase(state.current.step)} translateY(${-Math.max(-60, Math.min(60, d * 0.25))}px)`
    }
    const onTouchEnd = (e) => {
      const el = shaderRef.current
      if (el) el.style.transform = shaderBase(state.current.step)
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
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      clearTimeout(state.current.nudgeT)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [onReveal])

  const isTease = step === LAST_STEP

  return (
    <Suspense fallback={<Loader />}>
      <div className={`story${leaving ? ' is-leaving' : ''}`}>
        <div className="story__shader" ref={shaderRef} aria-hidden="true">
          <ShaderBg />
        </div>
        <div className="story__shade" aria-hidden="true" />

        <div className="story__content">
          <div className="story__slide" key={step}>
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
