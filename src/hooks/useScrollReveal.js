import { useEffect, useRef } from 'react'
import anime from 'animejs'

/**
 * Clean scroll-reveal hook — subtle fade-in when elements enter the viewport.
 * Resets when elements leave so they animate again on re-scroll.
 */
export default function useScrollReveal({
  animation = 'fadeUp',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  stagger = false,
  staggerDelay = 60,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const initial = getInitialStyle(animation)

    function hide() {
      if (stagger) {
        Array.from(el.children).forEach(child => Object.assign(child.style, initial))
      } else {
        Object.assign(el.style, initial)
      }
    }

    hide()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const props = getAnimeProps(animation)
          const targets = stagger ? Array.from(el.children) : el
          anime.remove(targets)
          anime({
            targets,
            ...props,
            duration,
            delay: stagger ? anime.stagger(staggerDelay, { start: delay }) : delay,
            easing: 'easeOutCubic',
          })
        } else {
          const targets = stagger ? Array.from(el.children) : el
          anime.remove(targets)
          hide()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animation, delay, duration, threshold, stagger, staggerDelay])

  return ref
}

function getInitialStyle(animation) {
  const base = { opacity: '0', transition: 'none' }
  switch (animation) {
    case 'fadeUp':    return { ...base, transform: 'translateY(30px)' }
    case 'fadeLeft':  return { ...base, transform: 'translateX(-30px)' }
    case 'fadeRight': return { ...base, transform: 'translateX(30px)' }
    case 'scaleIn':  return { ...base, transform: 'scale(0.95) translateY(20px)' }
    default:         return { ...base, transform: 'translateY(30px)' }
  }
}

function getAnimeProps(animation) {
  switch (animation) {
    case 'fadeUp':    return { opacity: [0, 1], translateY: [30, 0] }
    case 'fadeLeft':  return { opacity: [0, 1], translateX: [-30, 0] }
    case 'fadeRight': return { opacity: [0, 1], translateX: [30, 0] }
    case 'scaleIn':  return { opacity: [0, 1], scale: [0.95, 1], translateY: [20, 0] }
    default:         return { opacity: [0, 1], translateY: [30, 0] }
  }
}
