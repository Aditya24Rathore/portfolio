import useScrollReveal from '../hooks/useScrollReveal'

function About() {
  const titleRef = useScrollReveal()
  const textRef = useScrollReveal({ animation: 'fadeLeft', delay: 100 })
  const highlightsRef = useScrollReveal({ animation: 'fadeRight', delay: 100, stagger: true })

  const highlights = [
    { icon: '💻', text: 'C / C++ (STL, OOPs)' },
    { icon: '🧮', text: 'DSA & Algorithms' },
    { icon: '🌐', text: 'Web Development' },
    { icon: '🛢️', text: 'MySQL' },
    { icon: '📊', text: 'Power BI & Excel' },
    { icon: '🔧', text: 'Git & GitHub' },
  ]

  return (
    <section className="about section" id="about">
      <div className="container">
        <div ref={titleRef}>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A quick overview of who I am and what I do.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-text" ref={textRef}>
            <p>
              I'm <strong>Aditya Rathore</strong>, a B.Tech Computer Science &amp; Engineering student
              at Takshshila Institute of Engineering &amp; Technology, Jabalpur. My core strengths
              lie in C, C++, and Data Structures &amp; Algorithms.
            </p>
            <p>
              I've built academic and personal projects including a Snake Game and an ATM
              System, applying OOP principles, real-time logic, and efficient data management.
              I enjoy bringing algorithms to life through interactive visualizations.
            </p>
            <p>
              I'm certified in Software Development (Microsoft &amp; LinkedIn), AWS Cloud
              Practitioner Essentials, and TCS iON Career Edge. I'm actively looking for
              entry-level Software Engineer / Developer roles to grow in the industry.
            </p>
          </div>
          <div>
            <div className="about-highlights" ref={highlightsRef}>
              {highlights.map((item, i) => (
                <div className="about-highlight-item" key={i}>
                  <span className="icon">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
