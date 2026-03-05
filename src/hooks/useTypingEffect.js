import { useEffect, useRef, useState } from 'react'

/**
 * Animated typing / character reveal hook.
 * Reveals text character-by-character with a blinking cursor.
 */
export default function useTypingEffect(text, {
  charDelay = 40,
  startDelay = 600,
  showCursor = true,
} = {}) {
  const [displayed, setDisplayed] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [done, setDone] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0

    function type() {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
        timeoutRef.current = setTimeout(type, charDelay)
      } else {
        setDone(true)
      }
    }

    timeoutRef.current = setTimeout(type, startDelay)

    return () => clearTimeout(timeoutRef.current)
  }, [text, charDelay, startDelay])

  // Blinking cursor
  useEffect(() => {
    if (!showCursor) return
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [showCursor])

  const cursor = showCursor && !done ? (cursorVisible ? '|' : '\u00A0') : ''

  return { displayed, cursor, done }
}
