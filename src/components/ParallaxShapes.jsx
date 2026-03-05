import { useEffect, useRef } from 'react'

/**
 * Floating parallax shapes for depth effect.
 * Large geometric shapes move at different speeds during scroll.
 */
export default function ParallaxShapes() {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function handleScroll() {
      const scrollY = window.scrollY
      const shapes = el.querySelectorAll('.parallax-shape')
      shapes.forEach(shape => {
        const speed = parseFloat(shape.dataset.speed) || 0.3
        const rotate = parseFloat(shape.dataset.rotate) || 0
        const y = scrollY * speed
        const r = scrollY * rotate
        shape.style.transform = `translateY(${y}px) rotate(${r}deg)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="parallax-shapes-container" ref={containerRef} aria-hidden="true">
      {/* Large circle - slow */}
      <div
        className="parallax-shape shape-circle"
        data-speed="-0.12"
        data-rotate="0.02"
      />
      {/* Small diamond - medium */}
      <div
        className="parallax-shape shape-diamond"
        data-speed="-0.25"
        data-rotate="-0.05"
      />
      {/* Triangle - fast */}
      <div
        className="parallax-shape shape-triangle"
        data-speed="-0.08"
        data-rotate="0.03"
      />
      {/* Ring */}
      <div
        className="parallax-shape shape-ring"
        data-speed="-0.18"
        data-rotate="-0.02"
      />
      {/* Plus sign */}
      <div
        className="parallax-shape shape-plus"
        data-speed="-0.3"
        data-rotate="0.08"
      />
      {/* Small dot */}
      <div
        className="parallax-shape shape-dot"
        data-speed="-0.15"
        data-rotate="0"
      />
    </div>
  )
}
