import { useEffect, useRef, useState } from 'react'

export default function useTypingEffect(text, {
  charDelay = 40,
  startDelay = 600,
  showCursor = true,
  loop = false,
  loopPause = 27000,
  eraseDelay = 25,
} = {}) {
  const [displayed, setDisplayed] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [done, setDone] = useState(false)
  const cancelledRef = useRef(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    cancelledRef.current = false
    let i = 0
    let activeTimeout = null

    function schedule(fn, delay) {
      activeTimeout = setTimeout(() => {
        if (!cancelledRef.current) fn()
      }, delay)
    }

    function type() {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
        schedule(type, charDelay)
      } else if (loop) {
        setDone(true)
        schedule(erase, loopPause)
      } else {
        setDone(true)
      }
    }

    function erase() {
      setDone(false)
      function step() {
        if (i > 0) {
          i--
          setDisplayed(text.slice(0, i))
          schedule(step, eraseDelay)
        } else {
          schedule(type, 400)
        }
      }
      step()
    }

    schedule(type, startDelay)

    return () => {
      cancelledRef.current = true
      clearTimeout(activeTimeout)
    }
  }, [text, charDelay, startDelay, loop, loopPause, eraseDelay])

  // Blinking cursor
  useEffect(() => {
    if (!showCursor) return
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [showCursor])

  const cursor = showCursor ? (cursorVisible ? '|' : '\u00A0') : ''

  return { displayed, cursor, done }
}
