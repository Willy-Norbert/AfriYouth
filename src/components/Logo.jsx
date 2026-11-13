import { Link } from 'react-router-dom'

// Official AfriYouth Innovation Labs logo, from the brand guidelines.
// public/logo.svg       – full colour, for light backgrounds (navbar)
// public/logo-white.svg – white with tagline, for dark backgrounds (footer)
export default function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" aria-label="AfriYouth Innovation Labs home" className={`inline-flex shrink-0 items-center ${className}`}>
      {light
        ? <img src="/logo-white.svg" alt="AfriYouth Innovation Labs — Fueling Innovators for Sustainable Development" width="262" height="128" className="h-24 w-auto" />
        : <img src="/logo.svg" alt="AfriYouth Innovation Labs" width="186" height="128" className="h-16 w-auto" />}
    </Link>
  )
}
