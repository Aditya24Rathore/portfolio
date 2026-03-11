import { useState, useEffect, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

function AnimatedRing({ radius, stroke, progress, color, delay }) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const ref = useRef(null)

  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            let start = 0
            const step = () => {
              start += 1
              if (start <= progress) {
                setAnimatedProgress(start)
                requestAnimationFrame(step)
              }
            }
            requestAnimationFrame(step)
          }, delay)
        } else {
          setAnimatedProgress(0)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [progress, delay])

  return (
    <svg ref={ref} width={radius * 2} height={radius * 2} className="lc-ring">
      <circle
        stroke="var(--border)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: 'stroke-dashoffset 0.05s ease', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      />
    </svg>
  )
}

function CountUp({ end, duration = 2000, delay = 0 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              setCount(Math.floor(progress * end))
              if (progress < 1) requestAnimationFrame(animate)
            }
            requestAnimationFrame(animate)
          }, delay)
        } else {
          setCount(0)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, delay])

  return <span ref={ref}>{count}</span>
}

const USERNAME = 'Aditya_0324'
const API_BASE = 'https://alfa-leetcode-api.onrender.com'
const STORAGE_KEY = 'leetcode_stats'

const INITIAL_DEFAULTS = {
  totalSolved: 57,
  totalProblems: 3864,
  easySolved: 55,
  easyTotal: 930,
  mediumSolved: 2,
  mediumTotal: 2021,
  hardSolved: 0,
  hardTotal: 913,
  acceptance: 80,
  streak: 41,
  activeDays: 42,
}

function getSavedStats() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...INITIAL_DEFAULTS, ...JSON.parse(saved) }
  } catch { /* ignore */ }
  return INITIAL_DEFAULTS
}

function LeetCodeCard() {
  const titleRef = useScrollReveal()
  const cardRef = useScrollReveal({ animation: 'scaleIn', delay: 100 })
  const statsRef = useScrollReveal({ animation: 'fadeUp', delay: 200, stagger: true })

  const [stats, setStats] = useState(getSavedStats)

  useEffect(() => {
    const controller = new AbortController()
    const opts = { signal: controller.signal }

    Promise.allSettled([
      fetch(`${API_BASE}/userProfile/${USERNAME}`, opts).then(r => r.ok ? r.json() : Promise.reject()),
      fetch(`${API_BASE}/${USERNAME}/calendar`, opts).then(r => r.ok ? r.json() : Promise.reject()),
    ]).then(([profileRes, calendarRes]) => {
      setStats((prev) => {
        const next = { ...prev }

        if (profileRes.status === 'fulfilled') {
          const profile = profileRes.value
          const questionsCount = profile.allQuestionsCount || []
          const easyQ = questionsCount.find(q => q.difficulty === 'Easy')
          const medQ = questionsCount.find(q => q.difficulty === 'Medium')
          const hardQ = questionsCount.find(q => q.difficulty === 'Hard')

          if (easyQ) next.easyTotal = easyQ.count
          if (medQ) next.mediumTotal = medQ.count
          if (hardQ) next.hardTotal = hardQ.count
          next.totalProblems = (next.easyTotal + next.mediumTotal + next.hardTotal)

          const acSubs = profile.matchedUser?.submitStats?.acSubmissionNum || []
          const allSolved = acSubs.find(s => s.difficulty === 'All')
          const easySolved = acSubs.find(s => s.difficulty === 'Easy')
          const medSolved = acSubs.find(s => s.difficulty === 'Medium')
          const hardSolved = acSubs.find(s => s.difficulty === 'Hard')

          if (allSolved) next.totalSolved = allSolved.count
          if (easySolved) next.easySolved = easySolved.count
          if (medSolved) next.mediumSolved = medSolved.count
          if (hardSolved) next.hardSolved = hardSolved.count

          const totalSubs = profile.matchedUser?.submitStats?.totalSubmissionNum || []
          const allTotal = totalSubs.find(s => s.difficulty === 'All')
          if (allSolved && allTotal && allTotal.submissions > 0) {
            next.acceptance = Math.round((allSolved.submissions / allTotal.submissions) * 100)
          }
        }

        if (calendarRes.status === 'fulfilled') {
          const cal = calendarRes.value
          if (cal.streak != null) next.streak = cal.streak
          if (cal.totalActiveDays != null) next.activeDays = cal.totalActiveDays
        }

        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
        return next
      })
    })

    return () => controller.abort()
  }, [])

  const { totalSolved, totalProblems, acceptance, streak, activeDays } = stats
  const easy = { solved: stats.easySolved, total: stats.easyTotal, color: '#00b8a3' }
  const medium = { solved: stats.mediumSolved, total: stats.mediumTotal, color: '#ffc01e' }
  const hard = { solved: stats.hardSolved, total: stats.hardTotal, color: '#ef4743' }

  return (
    <section className="section" id="leetcode">
      <div className="container">
        <div ref={titleRef}>
          <h2 className="section-title">LeetCode</h2>
          <p className="section-subtitle">
            My competitive programming journey on LeetCode.
          </p>
        </div>

        <div className="lc-card" ref={cardRef}>
          <div className="lc-header">
            <div className="lc-profile">
              <div className="lc-avatar-wrap">
                <img
                  src="https://assets.leetcode.com/users/Aditya_0324/avatar_1769593389.png"
                  alt="LeetCode Avatar"
                  className="lc-avatar"
                />
                <div className="lc-avatar-glow"></div>
              </div>
              <div>
                <h3 className="lc-username">Aditya_0324</h3>
                <span className="lc-lang-badge">C++</span>
              </div>
            </div>
            <a
              href="https://leetcode.com/u/Aditya_0324/"
              target="_blank"
              rel="noopener noreferrer"
              className="lc-profile-link"
            >
              View Profile
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

          <div className="lc-main">
            <div className="lc-total-ring">
              <AnimatedRing
                radius={70}
                stroke={8}
                progress={Math.round((totalSolved / totalProblems) * 100)}
                color="var(--accent)"
                delay={300}
              />
              <div className="lc-ring-label">
                <span className="lc-ring-number"><CountUp end={totalSolved} delay={300} /></span>
                <span className="lc-ring-text">Solved</span>
              </div>
            </div>

            <div className="lc-difficulty-bars">
              {[
                { label: 'Easy', ...easy },
                { label: 'Medium', ...medium },
                { label: 'Hard', ...hard },
              ].map((d) => (
                <div className="lc-bar-row" key={d.label}>
                  <div className="lc-bar-info">
                    <span className="lc-bar-dot" style={{ background: d.color }}></span>
                    <span className="lc-bar-label">{d.label}</span>
                    <span className="lc-bar-count">{d.solved}/{d.total}</span>
                  </div>
                  <div className="lc-bar-track">
                    <div
                      className="lc-bar-fill"
                      style={{ '--bar-width': `${(d.solved / d.total) * 100}%`, background: d.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lc-stats-row" ref={statsRef}>
            <div className="lc-stat">
              <span className="lc-stat-icon">🎯</span>
              <span className="lc-stat-value"><CountUp end={acceptance} delay={400} />%</span>
              <span className="lc-stat-label">Acceptance</span>
            </div>
            <div className="lc-stat">
              <span className="lc-stat-icon">🔥</span>
              <span className="lc-stat-value"><CountUp end={streak} delay={500} /></span>
              <span className="lc-stat-label">Max Streak</span>
            </div>
            <div className="lc-stat">
              <span className="lc-stat-icon">📅</span>
              <span className="lc-stat-value"><CountUp end={activeDays} delay={600} /></span>
              <span className="lc-stat-label">Active Days</span>
            </div>
            <div className="lc-stat">
              <span className="lc-stat-icon">⚡</span>
              <span className="lc-stat-value lc-stat-lang">C++</span>
              <span className="lc-stat-label">Primary Lang</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeetCodeCard
