import useScrollReveal from '../hooks/useScrollReveal'
import SectionProgress from './SectionProgress'

function Skills() {
  const titleRef = useScrollReveal()
  const gridRef = useScrollReveal({ animation: 'scaleIn', stagger: true })

  const skillCategories = [
    {
      icon: '💻',
      title: 'Programming Languages',
      skills: ['C', 'C++', 'STL', 'OOPs', 'HTML5', 'CSS3', 'JavaScript', 'React.js'],
    },
    {
      icon: '🛠️',
      title: 'Tools & Platforms',
      skills: ['Git & GitHub', 'VS Code', 'Code Blocks', 'MySQL', 'Power BI', 'Excel', 'Vercel'],
    },
    {
      icon: '🧮',
      title: 'DSA & Problem Solving',
      skills: ['Arrays & Strings', 'Sorting Algorithms', 'Searching', 'Recursion', 'Time Complexity', 'Space Complexity'],
    },
    {
      icon: '🤝',
      title: 'Soft Skills',
      skills: ['Communication', 'Problem-Solving', 'Teamwork', 'Time Management'],
    },
  ]

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
        <div className="skills-grid" ref={gridRef}>
          {skillCategories.map((category, i) => (
            <div className="skill-card" key={i}>
              <div className="skill-card-icon animated-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <div className="skill-tag-list">
                {category.skills.map((skill, j) => (
                  <span className="skill-tag" key={j}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
