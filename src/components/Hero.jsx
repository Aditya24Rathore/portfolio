function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content animate-in">
          <div className="hero-badge">
            👋 Hi, I'm Aditya Rathore
          </div>
          <h1 className="hero-title">
            Software Developer<br />
            &amp; <span className="highlight">Problem Solver</span>
          </h1>
          <p className="hero-description">
            B.Tech CSE student passionate about C, C++, Data Structures &amp; Algorithms,
            and building real-world projects. Looking to apply programming fundamentals
            and gain industry experience.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View Projects →
            </a>
            <a href="https://github.com/Aditya24Rathore" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              GitHub Profile ↗
            </a>
            <a href="https://www.linkedin.com/in/adityrathore/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              LinkedIn ↗
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <h3>3+</h3>
              <p>Projects Built</p>
            </div>
            <div className="hero-stat">
              <h3>6+</h3>
              <p>Certifications</p>
            </div>
            <div className="hero-stat">
              <h3>C/C++</h3>
              <p>Core Languages</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
