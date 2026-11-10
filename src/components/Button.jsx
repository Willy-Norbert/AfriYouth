import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const styles = {
  primary: 'bg-tangerine text-ink hover:bg-sun',
  dark: 'bg-ink text-white hover:bg-royal',
  light: 'bg-white text-ink hover:bg-cream',
  outline: 'border-2 border-current hover:bg-white/10',
  link: 'border-b-2 border-current !rounded-none !px-0 !py-1 hover:opacity-70',
}

// One button for the whole site. Use `to` for pages, `href` for external links.
export default function Button({ to, href, variant = 'primary', arrow = true, className = '', children, ...props }) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-semibold transition ${styles[variant]} ${className}`
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="size-4 transition group-hover:translate-x-1" />}
    </>
  )
  if (to) return <Link to={to} className={classes}>{content}</Link>
  if (href) return <a href={href} className={classes}>{content}</a>
  return <button className={classes} {...props}>{content}</button>
}
