import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

/**
 * Animates a number counting up every time it enters the viewport
 */
export default function useCountUp(endValue, duration = 1500) {
  const ref = useRef(null)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const obj = { val: 0 }
          anime({
            targets: obj,
            val: [0, endValue],
            duration,
            easing: 'easeOutExpo',
            round: 1,
            update: () => setDisplay(String(obj.val)),
          })
        } else {
          setDisplay('0')
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [endValue, duration])

  return { ref, display }
}
