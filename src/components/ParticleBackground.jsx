import { useEffect, useRef } from 'react'
import anime from 'animejs'

/**
 * Anime.js-style stagger dot grid background
 * Interactive — dots ripple from mouse position
 */
export default function ParticleBackground() {
  const gridRef = useRef(null)

  useEffect(() => {
    const container = gridRef.current
    if (!container) return

    const COLS = Math.floor(window.innerWidth / 40)
    const ROWS = Math.floor(window.innerHeight / 40)
    const dots = []

    // Create dot grid
    container.innerHTML = ''
    container.style.display = 'grid'
    container.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`
    container.style.gap = '0px'

    for (let i = 0; i < ROWS * COLS; i++) {
      const dot = document.createElement('div')
      dot.className = 'grid-dot'
      dot.dataset.index = i
      dot.dataset.col = i % COLS
      dot.dataset.row = Math.floor(i / COLS)
      container.appendChild(dot)
      dots.push(dot)
    }

    // Stagger wave animation on load
    function playWave(originIndex) {
      anime({
        targets: dots,
        scale: [
          { value: 1.4, easing: 'easeOutSine', duration: 500 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200 },
        ],
        opacity: [
          { value: 1, easing: 'easeOutSine', duration: 500 },
          { value: 0.15, easing: 'easeInOutQuad', duration: 1200 },
        ],
        backgroundColor: [
          { value: document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(96,165,250,0.7)' : 'rgba(59,130,246,0.7)', easing: 'easeOutSine', duration: 500 },
          { value: document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(96,165,250,0.12)' : 'rgba(59,130,246,0.12)', easing: 'easeInOutQuad', duration: 1200 },
        ],
        delay: anime.stagger(50, {
          grid: [COLS, ROWS],
          from: originIndex,
        }),
      })
    }

    // Initial animation
    playWave(Math.floor((ROWS * COLS) / 2))

    // Loop animation every 6 seconds from random point
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * dots.length)
      playWave(randomIdx)
    }, 6000)

    // Mouse click ripple
    function handleClick(e) {
      const dot = e.target.closest('.grid-dot')
      if (dot) {
        playWave(Number(dot.dataset.index))
      }
    }
    container.addEventListener('click', handleClick)

    // Resize handler
    function handleResize() {
      const newCols = Math.floor(window.innerWidth / 40)
      const newRows = Math.floor(window.innerHeight / 40)
      container.style.gridTemplateColumns = `repeat(${newCols}, 1fr)`
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      container.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      ref={gridRef}
      className="dot-grid-bg"
    />
  )
}
