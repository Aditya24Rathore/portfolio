import { useState, useRef, useEffect, useCallback } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

// ===== Sorting Algorithms =====
const algorithms = {
  bubble: {
    name: 'Bubble Sort',
    time: 'O(n²)',
    space: 'O(1)',
    best: 'O(n)',
  },
  selection: {
    name: 'Selection Sort',
    time: 'O(n²)',
    space: 'O(1)',
    best: 'O(n²)',
  },
  merge: {
    name: 'Merge Sort',
    time: 'O(n log n)',
    space: 'O(n)',
    best: 'O(n log n)',
  },
  quick: {
    name: 'Quick Sort',
    time: 'O(n²)',
    space: 'O(log n)',
    best: 'O(n log n)',
  },
}

function generateArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10)
}

function SortingVisualizer() {
  const [array, setArray] = useState(() => generateArray(30))
  const [activeIndices, setActiveIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  const [algorithm, setAlgorithm] = useState('bubble')
  const [speed, setSpeed] = useState(50)
  const [sorting, setSorting] = useState(false)
  const [arraySize, setArraySize] = useState(30)
  const stopRef = useRef(false)

  const delay = useCallback(() => {
    return new Promise(resolve => setTimeout(resolve, Math.max(5, 200 - speed * 2)))
  }, [speed])

  const reset = () => {
    stopRef.current = true
    setSorting(false)
    setActiveIndices([])
    setSortedIndices([])
    const newArr = generateArray(arraySize)
    setArray(newArr)
  }

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize])

  // ===== Bubble Sort =====
  async function bubbleSort(arr) {
    const a = [...arr]
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        if (stopRef.current) return
        setActiveIndices([j, j + 1])
        if (a[j] > a[j + 1]) {
          ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
          setArray([...a])
        }
        await delay()
      }
      setSortedIndices(prev => [...prev, a.length - i - 1])
    }
    setSortedIndices(a.map((_, i) => i))
  }

  // ===== Selection Sort =====
  async function selectionSort(arr) {
    const a = [...arr]
    for (let i = 0; i < a.length; i++) {
      let minIdx = i
      for (let j = i + 1; j < a.length; j++) {
        if (stopRef.current) return
        setActiveIndices([minIdx, j])
        if (a[j] < a[minIdx]) {
          minIdx = j
        }
        await delay()
      }
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      setArray([...a])
      setSortedIndices(prev => [...prev, i])
    }
    setSortedIndices(a.map((_, i) => i))
  }

  // ===== Merge Sort =====
  async function mergeSort(arr) {
    const a = [...arr]

    async function merge(start, mid, end) {
      const left = a.slice(start, mid + 1)
      const right = a.slice(mid + 1, end + 1)
      let i = 0, j = 0, k = start

      while (i < left.length && j < right.length) {
        if (stopRef.current) return
        setActiveIndices([k, mid + 1 + j])
        if (left[i] <= right[j]) {
          a[k] = left[i]
          i++
        } else {
          a[k] = right[j]
          j++
        }
        k++
        setArray([...a])
        await delay()
      }
      while (i < left.length) {
        if (stopRef.current) return
        a[k] = left[i]
        setActiveIndices([k])
        setArray([...a])
        i++
        k++
        await delay()
      }
      while (j < right.length) {
        if (stopRef.current) return
        a[k] = right[j]
        setActiveIndices([k])
        setArray([...a])
        j++
        k++
        await delay()
      }
    }

    async function sort(start, end) {
      if (start >= end || stopRef.current) return
      const mid = Math.floor((start + end) / 2)
      await sort(start, mid)
      await sort(mid + 1, end)
      await merge(start, mid, end)
    }

    await sort(0, a.length - 1)
    setSortedIndices(a.map((_, i) => i))
  }

  // ===== Quick Sort =====
  async function quickSort(arr) {
    const a = [...arr]

    async function partition(low, high) {
      const pivot = a[high]
      let i = low - 1
      for (let j = low; j < high; j++) {
        if (stopRef.current) return -1
        setActiveIndices([j, high])
        if (a[j] < pivot) {
          i++
          ;[a[i], a[j]] = [a[j], a[i]]
          setArray([...a])
        }
        await delay()
      }
      ;[a[i + 1], a[high]] = [a[high], a[i + 1]]
      setArray([...a])
      setSortedIndices(prev => [...prev, i + 1])
      return i + 1
    }

    async function sort(low, high) {
      if (low >= high || stopRef.current) return
      const pi = await partition(low, high)
      if (pi === -1) return
      await sort(low, pi - 1)
      await sort(pi + 1, high)
    }

    await sort(0, a.length - 1)
    setSortedIndices(a.map((_, i) => i))
  }

  const startSort = async () => {
    stopRef.current = false
    setSorting(true)
    setActiveIndices([])
    setSortedIndices([])

    const sortFunctions = {
      bubble: bubbleSort,
      selection: selectionSort,
      merge: mergeSort,
      quick: quickSort,
    }

    await sortFunctions[algorithm](array)
    setActiveIndices([])
    setSorting(false)
  }

  const maxVal = Math.max(...array)
  const info = algorithms[algorithm]
  const titleRef = useScrollReveal({ animation: 'flipX', duration: 1000 })
  const containerRef = useScrollReveal({ animation: 'scaleIn', delay: 100, duration: 1100 })

  return (
    <section className="visualizer section" id="visualizer">
      <div className="container">
        <div ref={titleRef}>
          <h2 className="section-title">DSA Sorting Visualizer</h2>
          <p className="section-subtitle">
            Watch sorting algorithms in action. Select an algorithm, adjust speed, and hit Start!
          </p>
        </div>

        <div className="visualizer-container" ref={containerRef}>
          {/* Controls */}
          <div className="visualizer-controls">
            <select
              value={algorithm}
              onChange={e => setAlgorithm(e.target.value)}
              disabled={sorting}
            >
              {Object.entries(algorithms).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name}
                </option>
              ))}
            </select>

            <label>
              Speed:
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={e => setSpeed(Number(e.target.value))}
              />
            </label>

            <label>
              Size:
              <input
                type="range"
                min="10"
                max="80"
                value={arraySize}
                onChange={e => {
                  if (!sorting) setArraySize(Number(e.target.value))
                }}
                disabled={sorting}
              />
              {arraySize}
            </label>

            <button className="btn btn-primary" onClick={startSort} disabled={sorting}>
              {sorting ? 'Sorting...' : '▶ Start'}
            </button>
            <button className="btn btn-outline" onClick={reset}>
              ↻ Reset
            </button>
          </div>

          {/* Bars */}
          <div className="bars-container">
            {array.map((value, i) => {
              let className = 'bar'
              if (sortedIndices.includes(i)) className += ' sorted'
              else if (activeIndices.includes(i)) className += ' active'
              return (
                <div
                  key={i}
                  className={className}
                  style={{ height: `${(value / maxVal) * 100}%` }}
                >
                  {arraySize <= 30 && (
                    <span className="bar-value">{value}</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Complexity */}
          <div className="complexity-info">
            <div className="complexity-item">
              <strong>Algorithm:</strong> {info.name}
            </div>
            <div className="complexity-item">
              <strong>Best:</strong> {info.best}
            </div>
            <div className="complexity-item">
              <strong>Worst:</strong> {info.time}
            </div>
            <div className="complexity-item">
              <strong>Space:</strong> {info.space}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SortingVisualizer
