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
  const timeoutRef = useRef(null)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    let phase = 'typing' // 'typing' | 'paused' | 'erasing'

    function type() {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
        timeoutRef.current = setTimeout(type, charDelay)
      } else if (loop) {
        phase = 'paused'
        setDone(true)
        timeoutRef.current = setTimeout(erase, loopPause)
      } else {
        setDone(true)
      }
    }

    function erase() {
      setDone(false)
      phase = 'erasing'
      function step() {
        if (i > 0) {
          i--
          setDisplayed(text.slice(0, i))
          timeoutRef.current = setTimeout(step, eraseDelay)
        } else {
          timeoutRef.current = setTimeout(type, 400)
        }
      }
      step()
    }

    timeoutRef.current = setTimeout(type, startDelay)

    return () => clearTimeout(timeoutRef.current)
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
