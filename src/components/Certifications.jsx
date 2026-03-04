function Certifications() {
  const certs = [
    {
      icon: 'C++',
      title: 'C++ Bootcamp by LetsUpgrade',
      issuer: 'LetsUpgrade',
      date: 'March 2026',
    },
    {
      icon: '🏢',
      title: 'Career Essentials in Software Development',
      issuer: 'LinkedIn Learning & Microsoft',
      date: 'June 2025',
    },
    {
      icon: '💼',
      title: 'TCS iON Career Edge – Young Professional',
      issuer: 'Tata Consultancy Services (TCS iON)',
      date: 'June 2025',
    },
    {
      icon: '☁️',
      title: 'AWS Cloud Practitioner Essentials',
      issuer: 'Amazon Web Services (AWS)',
      date: 'June 2025',
    },
  ]

  return (
    <section className="section" id="certifications">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <p className="section-subtitle">
          Professional certifications that validate my skills.
        </p>
        <div className="certs-grid">
          {certs.map((cert, i) => (
            <div className="cert-card" key={i}>
              <span className="cert-icon">{cert.icon}</span>
              <div className="cert-info">
                <h3>{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <span className="cert-date">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
