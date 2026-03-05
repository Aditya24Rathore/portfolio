import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
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
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    // Smooth page entrance
    setLoaded(true)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
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
