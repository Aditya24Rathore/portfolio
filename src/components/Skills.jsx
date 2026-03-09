import { useRef, useEffect, useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import SectionProgress from './SectionProgress'

const devicon = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`

const skillCategories = [
  {
    title: 'Languages',
    color: '#3B82F6',
    speed: 25,
    direction: 'left',
    skills: [
      { name: 'C', logo: devicon('c') },
      { name: 'C++', logo: devicon('cplusplus') },
      { name: 'JavaScript', logo: devicon('javascript') },
      { name: 'HTML5', logo: devicon('html5') },
      { name: 'CSS3', logo: devicon('css3') },
    ],
  },
  {
    title: 'Tools & Platforms',
    color: '#8B5CF6',
    speed: 30,
    direction: 'right',
    skills: [
      { name: 'Git', logo: devicon('git') },
      { name: 'GitHub', logo: devicon('github') },
      { name: 'VS Code', logo: devicon('vscode') },
      { name: 'MySQL', logo: devicon('mysql') },
      { name: 'Vercel', logo: devicon('vercel') },
      { name: 'Vite', logo: devicon('vitejs') },
      { name: 'Node.js', logo: devicon('nodejs') },
      { name: 'React', logo: devicon('react') },
    ],
  },
  {
    title: 'DSA & Problem Solving',
    color: '#10B981',
    speed: 22,
    direction: 'left',
    skills: [
      { name: 'Arrays', emoji: '📊' },
      { name: 'Sorting', emoji: '🔀' },
      { name: 'Searching', emoji: '🔍' },
      { name: 'Recursion', emoji: '🔄' },
      { name: 'Linked Lists', emoji: '🔗' },
      { name: 'Trees', emoji: '🌳' },
      { name: 'Graphs', emoji: '🕸️' },
      { name: 'Dynamic Programming', emoji: '🧩' },
    ],
  },
  {
    title: 'Soft Skills',
    color: '#F59E0B',
    speed: 28,
    direction: 'right',
    skills: [
      { name: 'Communication', emoji: '🗣️' },
      { name: 'Problem-Solving', emoji: '🧠' },
      { name: 'Teamwork', emoji: '🤝' },
      { name: 'Time Management', emoji: '⏱️' },
      { name: 'Leadership', emoji: '🎯' },
      { name: 'Adaptability', emoji: '🔄' },
    ],
  },
]

function BeltRow({ category, index }) {
  const trackRef = useRef(null)
  const [paused, setPaused] = useState(false)

  // Triple items for seamless wrap
  const items = [...category.skills, ...category.skills, ...category.skills]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf
    let pos = category.direction === 'left' ? 0 : -track.scrollWidth / 3
    const speed = category.speed
    const dir = category.direction === 'left' ? -1 : 1
    const third = track.scrollWidth / 3

    function step() {
      if (!paused) {
        pos += dir * (speed / 60)
        if (category.direction === 'left' && pos <= -third) pos = 0
        if (category.direction === 'right' && pos >= 0) pos = -third
        track.style.transform = `translateX(${pos}px)`
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [paused, category.direction, category.speed])

  return (
    <div
      className={`skills-belt-row skills-belt-row--${index % 2 === 0 ? 'even' : 'odd'}`}
      style={{ '--belt-color': category.color }}
    >
      <div className="skills-belt-header">
        <span className="skills-belt-line" />
        <h3 className="skills-belt-title">{category.title}</h3>
        <span className="skills-belt-line" />
      </div>
      <div
        className="skills-belt"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="skills-belt-track" ref={trackRef}>
          {items.map((skill, i) => (
            <div
              className="skills-belt-chip"
              key={i}
              style={{ animationDelay: `${(i % category.skills.length) * 0.4}s` }}
            >
              <div className="skills-belt-chip-glow" />
              {skill.logo ? (
                <img
                  src={skill.logo}
                  alt={skill.name}
                  width="40"
                  height="40"
                  loading="lazy"
                  draggable="false"
                />
              ) : (
                <span className="skills-belt-chip-emoji">{skill.emoji}</span>
              )}
              <span className="skills-belt-chip-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Skills() {
  const titleRef = useScrollReveal()

  return (
    <section className="section" id="skills">
      <div className="container">
        <div ref={titleRef}>
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            Technologies and topics I work with regularly.
          </p>
          <SectionProgress label="Skills" />
        </div>
      </div>
      <div className="skills-belts">
        {skillCategories.map((cat, i) => (
          <BeltRow category={cat} index={i} key={i} />
        ))}
      </div>
    </section>
  )
}

export default Skills
