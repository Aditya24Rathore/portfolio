import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [copiedText, setCopiedText] = useState('')

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(''), 2000)
  }

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    // In a real app, you'd send this to a backend or service like Formspree
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">
          Have a question or want to work together? Drop me a message!
        </p>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of something great.
            </p>
            <div className="contact-links">
              <a href="#" onClick={(e) => { e.preventDefault(); copyToClipboard('rathoreaditya262@gmail.com') }} className="contact-link-item" title="Click to copy">
                <span className="link-icon">📧</span>
                {copiedText === 'rathoreaditya262@gmail.com' ? 'Copied!' : 'rathoreaditya262@gmail.com'}
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); copyToClipboard('+917805960951') }} className="contact-link-item" title="Click to copy">
                <span className="link-icon">📞</span>
                {copiedText === '+917805960951' ? 'Copied!' : '+91 7805960951'}
              </a>
              <a href="https://github.com/Aditya24Rathore" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <span className="link-icon">🐙</span>
                github.com/Aditya24Rathore
              </a>
              <a href="https://www.linkedin.com/in/adityrathore/" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <span className="link-icon">💼</span>
                linkedin.com/in/adityrathore
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {submitted ? '✓ Sent!' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
