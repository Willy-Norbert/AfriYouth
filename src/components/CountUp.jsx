import { useEffect, useRef, useState } from 'react'

// Animates a number from 0 up to `end` when it appears on screen.
export default function CountUp({ end, suffix = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / 1500, 1)
        setValue(Math.round(end * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>
}
