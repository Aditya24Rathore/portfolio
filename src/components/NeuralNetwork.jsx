import { useEffect, useRef } from 'react'

/**
 * AI Neural Network Canvas Background
 * Animated particles connected like a neural network with data-flow pulses.
 */
export default function NeuralNetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    const CONNECTION_DIST = 120
    const PARTICLE_COUNT = 80
    let mouseX = -1000
    let mouseY = -1000

    function resize() {
      const parent = canvas.parentElement
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function isDark() {
      return document.documentElement.getAttribute('data-theme') === 'dark'
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.z = Math.random() * 0.5 + 0.5 // depth
        this.vx = (Math.random() - 0.5) * 0.6
        this.vy = (Math.random() - 0.5) * 0.6
        this.baseRadius = Math.random() * 2 + 1
        this.radius = this.baseRadius
        this.pulsePhase = Math.random() * Math.PI * 2
        this.activated = false
        this.activationTime = 0
        this.brightness = 0
      }

      update(time) {
        this.x += this.vx
        this.y += this.vy

        // Soft boundary bounce
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        // Mouse repulsion
        const dx = this.x - mouseX
        const dy = this.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          this.vx += (dx / dist) * 0.3
          this.vy += (dy / dist) * 0.3
        }

        // Dampen velocity
        this.vx *= 0.999
        this.vy *= 0.999

        // Pulse
        this.radius = this.baseRadius + Math.sin(time * 0.002 + this.pulsePhase) * 0.5

        // Activation fade
        if (this.activated) {
          const elapsed = time - this.activationTime
          this.brightness = Math.max(0, 1 - elapsed / 1500)
          if (this.brightness <= 0) this.activated = false
        }
      }

      draw(ctx, time) {
        const dark = isDark()
        const baseAlpha = 0.3 + this.z * 0.4
        const alpha = baseAlpha + this.brightness * 0.6
        const r = dark ? 96 : 59
        const g = dark ? 165 : 130
        const b = dark ? 250 : 246

        // Glow when activated
        if (this.brightness > 0.1) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2)
          const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4)
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.brightness * 0.4})`)
          glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.fillStyle = glow
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle())
    }

    // Random activation pulses
    let lastPulse = 0
    function triggerPulse(time) {
      if (time - lastPulse > 2500) {
        lastPulse = time
        const origin = particles[Math.floor(Math.random() * particles.length)]
        origin.activated = true
        origin.activationTime = time

        // Cascade to nearby particles
        particles.forEach(p => {
          const dx = p.x - origin.x
          const dy = p.y - origin.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST * 1.5 && p !== origin) {
            setTimeout(() => {
              p.activated = true
              p.activationTime = performance.now()
            }, dist * 3)
          }
        })
      }
    }

    // Draw connections
    function drawConnections(ctx, time) {
      const dark = isDark()
      const r = dark ? 96 : 59
      const g = dark ? 165 : 130
      const b = dark ? 250 : 246

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15
            const pulse = Math.max(particles[i].brightness, particles[j].brightness)
            const finalAlpha = alpha + pulse * 0.3

            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`
            ctx.lineWidth = 0.5 + pulse * 1.5
            ctx.stroke()

            // Data flow dot along the connection
            if (pulse > 0.3) {
              const progress = ((time * 0.002) % 1)
              const dotX = particles[i].x + (particles[j].x - particles[i].x) * progress
              const dotY = particles[i].y + (particles[j].y - particles[i].y) * progress
              ctx.beginPath()
              ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pulse * 0.8})`
              ctx.fill()
            }
          }
        }
      }
    }

    function animate(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      triggerPulse(time)
      drawConnections(ctx, time)

      particles.forEach(p => {
        p.update(time)
        p.draw(ctx, time)
      })

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    function handleMouseLeave() {
      mouseX = -1000
      mouseY = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="neural-network-canvas"
      aria-hidden="true"
    />
  )
}
