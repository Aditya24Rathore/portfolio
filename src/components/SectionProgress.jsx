import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-triggered progress bar that fills as user scrolls past the section.
 * Bar color shifts hue as it fills; optional particle trail.
 */
export default function SectionProgress({ label = '' }) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function handleScroll() {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      // Start filling when top hits bottom of viewport, complete when top hits top
      const raw = 1 - (rect.top / windowH)
      setProgress(Math.max(0, Math.min(1, raw)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const hue = 210 + progress * 120 // blue → purple → pink

  return (
    <div className="section-progress" ref={ref}>
      {label && <span className="section-progress-label">{label}</span>}
      <div className="section-progress-track">
        <div
          className="section-progress-fill"
          style={{
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, hsl(${hue}, 80%, 60%), hsl(${hue + 40}, 80%, 60%))`,
          }}
        >
          {progress > 0.02 && (
            <span className="section-progress-glow" />
          )}
        </div>
      </div>
    </div>
  )
}
