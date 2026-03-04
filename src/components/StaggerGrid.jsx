import { useEffect, useRef } from 'react'
import anime from 'animejs'

/**
 * Anime.js-style stagger grid section divider
 * Creates a grid of squares that animate in a wave pattern
 */
export default function StaggerGrid({ id = 'stagger', rows = 10, cols = 20 }) {
  const gridRef = useRef(null)

  useEffect(() => {
    const container = gridRef.current
    if (!container) return

    container.innerHTML = ''

    const squares = []
    for (let i = 0; i < rows * cols; i++) {
      const sq = document.createElement('div')
      sq.className = 'stagger-square'
      container.appendChild(sq)
      squares.push(sq)
    }

    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`

    // Auto-play stagger animation
    function playStagger(fromIdx) {
      anime({
        targets: squares,
        scale: [
          { value: 0.1, easing: 'easeOutSine', duration: 500 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200 },
        ],
        borderRadius: [
          { value: '50%', easing: 'easeOutSine', duration: 500 },
          { value: '2px', easing: 'easeInOutQuad', duration: 1200 },
        ],
        backgroundColor: [
          { value: document.documentElement.getAttribute('data-theme') === 'dark' ? '#A78BFA' : '#6366F1', easing: 'easeOutSine', duration: 500 },
          { value: document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(167,139,250,0.12)' : 'rgba(99,102,241,0.12)', easing: 'easeInOutQuad', duration: 1200 },
        ],
        delay: anime.stagger(30, {
          grid: [cols, rows],
          from: fromIdx,
        }),
      })
    }

    // Observer to trigger on scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playStagger('center')
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(container)

    // Click handler
    function handleClick(e) {
      const sq = e.target.closest('.stagger-square')
      if (sq) {
        const idx = squares.indexOf(sq)
        if (idx !== -1) playStagger(idx)
      }
    }
    container.addEventListener('click', handleClick)

    return () => {
      observer.disconnect()
      container.removeEventListener('click', handleClick)
    }
  }, [rows, cols])

  return (
    <section className="stagger-section" id={id}>
      <div ref={gridRef} className="stagger-grid" />
    </section>
  )
}
