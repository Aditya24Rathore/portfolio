import { useState, useRef, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

function Contact() {
  const titleRef = useScrollReveal()
  const infoRef = useScrollReveal({ animation: 'fadeLeft', delay: 100 })
  const formRef = useScrollReveal({ animation: 'fadeRight', delay: 100 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [copiedText, setCopiedText] = useState('')
  const copyTimerRef = useRef(null)
  const submitTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(copyTimerRef.current)
      clearTimeout(submitTimerRef.current)
    }
  }, [])

  // Replace with your Web3Forms access key from https://web3forms.com
  const WEB3FORMS_KEY = 'c8a1c4b4-7b2b-476e-841d-eae7c35a809d'

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    clearTimeout(copyTimerRef.current)
    copyTimerRef.current = setTimeout(() => setCopiedText(''), 2000)
  }

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New message from ${formData.name} via Portfolio`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        clearTimeout(submitTimerRef.current)
        submitTimerRef.current = setTimeout(() => setSubmitted(false), 3000)
      } else {
        setError('Failed to send. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div ref={titleRef}>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have a question or want to work together? Drop me a message!
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-info" ref={infoRef}>
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

          <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
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
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={sending}>
              {sending ? 'Sending...' : submitted ? '✓ Sent!' : 'Send Message →'}
            </button>
            {error && <p style={{ color: '#ff4444', marginTop: '0.5rem', textAlign: 'center' }}>{error}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
