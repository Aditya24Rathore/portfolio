import useScrollReveal from '../hooks/useScrollReveal'

function Footer() {
  const year = new Date().getFullYear()
  const footerRef = useScrollReveal({ animation: 'fadeUp', duration: 800 })

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content" ref={footerRef}>
          <p className="footer-text">
            © {year} Aditya Rathore — Built with React &amp; deployed on Vercel
          </p>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="https://github.com/Aditya24Rathore" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/adityrathore/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
