import { Link } from 'react-router-dom'

// Official AfriYouth Innovation Labs logo (public/logo-web.png).
// `light` is used on dark backgrounds (footer): the logo sits on a white card
// so its dark text and white letter fills stay visible.
export default function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" aria-label="AfriYouth Innovation Labs home"
      className={`inline-flex shrink-0 items-center ${light ? 'rounded-lg bg-white px-4 py-3' : ''} ${className}`}>
      <img src="/logo-web.png" alt="AfriYouth Innovation Labs" width="900" height="385"
        className={`w-auto ${light ? 'h-16' : 'h-14'}`} />
    </Link>
  )
}
