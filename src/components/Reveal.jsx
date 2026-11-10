import { useEffect, useRef, useState } from 'react'

// Fades its children in when they scroll into view.
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}
