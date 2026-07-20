import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import useScramble from '../hooks/useScramble.js'
import { featured } from '../data/editions.js'

export default function Hero() {
  const titleRef = useRef(null)
  const videoRef = useRef(null)
  const [videoOk, setVideoOk] = useState(false)
  const title = featured.heroTitle || featured.place
  const scrambledTitle = useScramble(title)

  // Scroll-driven rearrange: as the itinerary slides up over the pinned
  // hero, the hero content fades and lifts away (0 → 1 over ~¾ screen).
  // The callback form of useTransform re-reads innerHeight on every
  // scroll update, so this stays correct across resizes without its
  // own resize listener.
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, (latest) =>
    1 - Math.min(1, Math.max(0, latest / (window.innerHeight * 0.75))),
  )
  const heroY = useTransform(
    scrollY,
    (latest) => Math.min(1, Math.max(0, latest / (window.innerHeight * 0.75))) * -32,
  )

  // Autoplay can be blocked (low-power mode, data saver). The still
  // image stays until the video genuinely plays; retry once on the
  // first user interaction.
  useEffect(() => {
    const retry = () => {
      const v = videoRef.current
      if (v && v.paused) v.play().catch(() => {})
    }
    window.addEventListener('pointerdown', retry, { once: true })
    window.addEventListener('touchstart', retry, { once: true })
    document.addEventListener('visibilitychange', retry)
    return () => {
      window.removeEventListener('pointerdown', retry)
      window.removeEventListener('touchstart', retry)
      document.removeEventListener('visibilitychange', retry)
    }
  }, [])

  // Fit the title to its container on a single line: measure the final
  // title text (not the mid-scramble frame) at the CSS size and scale
  // down proportionally if it overflows.
  useLayoutEffect(() => {
    const el = titleRef.current
    if (!el) return
    const fit = () => {
      const shown = el.textContent
      el.textContent = title
      el.style.fontSize = ''
      const base = parseFloat(getComputedStyle(el).fontSize)
      if (el.scrollWidth > el.clientWidth) {
        el.style.fontSize = `${base * (el.clientWidth / el.scrollWidth) * 0.97}px`
      }
      el.textContent = shown
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [title])

  return (
    <>
      <section className="hero" id="destination">
        <div className="hero__bgs" aria-hidden="true">
          <div
            className="hero__bg is-active"
            style={{ backgroundImage: `url(${featured.image})` }}
          />
          {/* the video fades in only once it can actually play;
              otherwise the still image above remains */}
          <video
            ref={videoRef}
            className={`hero__video${videoOk ? ' is-ready' : ''}`}
            src={`${import.meta.env.BASE_URL}videos/south-africa.mp4`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setVideoOk(true)}
            onError={() => setVideoOk(false)}
            aria-hidden="true"
          />
        </div>
        <div className="hero__veil" />

        <m.div className="wrap hero__content" style={{ opacity: heroOpacity, y: heroY }}>
          <p className="hero__edition">
            The {featured.month} Edition · {featured.edition}
          </p>
          <h1 className="hero__place" ref={titleRef}>
            {scrambledTitle}
          </h1>
          <p className="hero__country">{featured.country}</p>
        </m.div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll for the Itinerary</span>
          <span />
        </div>
      </section>

      {/* reserves one viewport so the fixed hero above has room to sit
          under the itinerary before it scrolls up and covers it */}
      <div className="hero__spacer" aria-hidden="true" />
    </>
  )
}
