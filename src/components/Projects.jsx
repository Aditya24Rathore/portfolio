import { useRef, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import SectionProgress from './SectionProgress'

/** 3D tilt for individual cards */
function TiltCard({ children, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const max = 6
    const scale = 1.02

    function handleMouseMove(e) {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rx = ((y - cy) / cy) * -max
      const ry = ((x - cx) / cx) * max
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale},${scale},${scale})`
    }
    function handleMouseLeave() {
      el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)'
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className={className} ref={ref} style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s cubic-bezier(0.03,0.98,0.52,0.99)' }}>
      {children}
    </div>
  )
}

function Projects() {
  const titleRef = useScrollReveal()
  const gridRef = useScrollReveal({ stagger: true })

  const projects = [
    {
      icon: '🐍',
      title: 'Snake Game',
      description:
        'Console-based Snake Game built with C++ and STL, applying OOP principles, real-time game loop, efficient snake body management using deque, and collision detection with dynamic scoring.',
      tags: ['C++', 'STL', 'OOP', 'Game Logic', 'Deque'],
      liveLink: null,
      codeLink: 'https://github.com/Aditya24Rathore/Snake_Game',
    },
    {
      icon: '🏧',
      title: 'ATM System',
      description:
        'Menu-driven ATM console application in C using procedural programming, pointers, switch-case logic, and input validation. Features PIN authentication, transaction processing, and real-time balance management.',
      tags: ['C', 'Pointers', 'Procedural', 'Input Validation'],
      liveLink: null,
      codeLink: 'https://github.com/Aditya24Rathore/ATM-PROJECT',
    },
    {
      icon: '📊',
      title: 'DSA Sorting Visualizer',
      description:
        'Interactive visualization of sorting algorithms including Bubble Sort, Selection Sort, Merge Sort, and Quick Sort. Features speed control, array size adjustment, and real-time complexity display.',
      tags: ['React', 'JavaScript', 'CSS Animations', 'Algorithms'],
      liveLink: '#visualizer',
      codeLink: 'https://github.com/Aditya24Rathore',
    },
  ]

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div ref={titleRef}>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Some of the things I've built to learn and showcase my skills.
          </p>
          <SectionProgress label="Projects" />
        </div>
        <div className="projects-grid" ref={gridRef}>
          {projects.map((project, i) => (
            <TiltCard className="project-card" key={i}>
              <div className="project-card-image">{project.icon}</div>
              <div className="project-card-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, j) => (
                    <span className="project-tag" key={j}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveLink && (
                    <a href={project.liveLink} className="project-link">
                      Live Demo ↗
                    </a>
                  )}
                  <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    Source Code ↗
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
