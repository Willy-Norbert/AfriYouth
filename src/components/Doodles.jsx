// Hand-drawn style decorations used around photos and headings.

export function Sun({ className = '' }) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="18" fill="#ff9756" />
      {rays.map((deg) => (
        <line key={deg} x1="50" y1="20" x2="50" y2="6" stroke="#ff9756" strokeWidth="5"
          strokeLinecap="round" transform={`rotate(${deg} 50 50)`} />
      ))}
    </svg>
  )
}

export function Underline({ className = '', color = '#e2560b' }) {
  return (
    <svg viewBox="0 0 200 16" fill="none" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M3 11c40-8 70-8 98-3s60 4 96-5" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export function Squiggle({ className = '', color = '#e2560b' }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      <path d="M6 70c20-4 22-30 40-28s8 26 26 22 18-40 40-52" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <path d="M96 10l16 2-4 16" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Starburst({ className = '', color = '#1800ad' }) {
  const points = Array.from({ length: 28 }, (_, i) => {
    const r = i % 2 ? 40 : 50
    const a = (i / 28) * Math.PI * 2
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`
  }).join(' ')
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <polygon points={points} fill={color} strokeLinejoin="round" />
    </svg>
  )
}

export function GridPatch({ className = '' }) {
  return (
    <div aria-hidden="true" className={`bg-white ${className}`}
      style={{ backgroundImage: 'linear-gradient(#12093f22 1px, transparent 1px), linear-gradient(90deg, #12093f22 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
  )
}

// Thin pattern strip inspired by African textiles
export function PatternStrip({ className = '' }) {
  return (
    <div aria-hidden="true" className={`h-3 w-full ${className}`}
      style={{ background: 'repeating-linear-gradient(90deg, #ff9756 0 24px, #e2560b 24px 36px, #5d7aff 36px 60px, #3a25c8 60px 72px, #1800ad 72px 96px, #ff751f 96px 108px)' }} />
  )
}
