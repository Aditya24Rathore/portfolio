function Projects() {
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
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Some of the things I've built to learn and showcase my skills.
        </p>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div className="project-card" key={i}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
