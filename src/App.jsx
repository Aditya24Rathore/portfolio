import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import LeetCodeCard from './components/LeetCodeCard'
import Projects from './components/Projects'
import SortingVisualizer from './components/SortingVisualizer'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Only set attribute if not already set (View Transition sets it directly)
    if (document.documentElement.getAttribute('data-theme') !== theme) {
      document.documentElement.setAttribute('data-theme', theme)
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    // Smooth page entrance
    setLoaded(true)
  }, [])

  const toggleTheme = (e) => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    // Get toggle button position for the expanding circle origin
    const x = e?.clientX ?? window.innerWidth / 2
    const y = e?.clientY ?? 40
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // Use View Transitions API if supported for a smooth clip-path reveal
    if (document.startViewTransition) {
      // Disable per-element CSS transitions so only the circle clip animates
      document.documentElement.classList.add('theme-transitioning')

      const transition = document.startViewTransition(() => {
        document.documentElement.setAttribute('data-theme', newTheme)
        setTheme(newTheme)
      })

      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ]},
          { duration: 600, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
        )
      })

      transition.finished.then(() => {
        document.documentElement.classList.remove('theme-transitioning')
      })
    } else {
      // Fallback: just switch instantly
      setTheme(newTheme)
    }
  }

  return (
    <div className={`app-wrapper ${loaded ? 'app-loaded' : ''}`}>
      <ScrollProgress />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <div className="section-transition">
          <About />
        </div>
        <div className="section-transition">
          <Skills />
        </div>
        <div className="section-transition">
          <LeetCodeCard />
        </div>
        <div className="section-transition">
          <Projects />
        </div>
        <div className="section-transition">
          <SortingVisualizer />
        </div>
        <div className="section-transition">
          <Certifications />
        </div>
        <div className="section-transition">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
