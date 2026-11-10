import { Link } from 'react-router-dom'
import { site, socials } from '../data/site'

const explore = [
  ['About us', '/about'], ['What we do', '/services'], ['Programs', '/programs'],
  ['Opportunities', '/opportunities'], ['Resources', '/resources'], ['Contact', '/contact'],
]

// Simple social icons (24×24, drawn with currentColor)
const icons = {
  LinkedIn: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z" />,
  X: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.17h1.7L7.4 4.74H5.58z" />,
  Instagram: <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3.6c2.7 0 3 0 4.1.06 2.7.12 3.97 1.4 4.1 4.1.05 1.06.06 1.38.06 4.1s0 3.04-.06 4.1c-.13 2.7-1.4 3.97-4.1 4.1-1.06.05-1.38.06-4.1.06s-3.04 0-4.1-.06c-2.72-.13-3.97-1.4-4.1-4.1C3.6 15.04 3.6 14.72 3.6 12s0-3.04.06-4.1C3.79 5.18 5.06 3.9 7.76 3.78 8.96 3.6 9.28 3.6 12 3.6zM12 2c-2.72 0-3.06 0-4.12.06C4.24 2.23 2.24 4.24 2.06 7.88 2 8.94 2 9.28 2 12s0 3.06.06 4.12c.17 3.63 2.18 5.64 5.82 5.82C8.94 22 9.28 22 12 22s3.06 0 4.12-.06c3.63-.17 5.65-2.18 5.82-5.82.06-1.06.06-1.4.06-4.12s0-3.06-.06-4.12c-.16-3.63-2.18-5.65-5.82-5.82C15.06 2 14.72 2 12 2z" />,
  YouTube: <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.7 15.1V8.9L15.5 12z" />,
}

const label = 'mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-white'
const underlined = 'underline decoration-1 underline-offset-4 hover:text-sun'
const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-ink text-sm text-white/80">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        {/* Big tagline */}
        <p className="max-w-xs text-4xl font-semibold leading-[1.05] tracking-tight text-white">
          Evidence. Innovation. Youth-led change.
        </p>

        {/* Office */}
        <div>
          <h3 className={label}>Kigali</h3>
          <a href={`mailto:${site.email}`} className={underlined}>{site.email}</a>
          <p className="mt-1.5">{site.phone}</p>
          <p className="mt-1.5">{site.address}</p>
          <a href="https://maps.google.com/?q=Kigali,Rwanda" target="_blank" rel="noreferrer"
            className={`mt-6 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-white ${underlined}`}>
            See on map ↗
          </a>
        </div>

        {/* Links */}
        <div>
          <h3 className={label}>Explore</h3>
          <ul className="space-y-1.5">
            {explore.map(([text, to]) => (
              <li key={text}><Link to={to} className="hover:text-white hover:underline hover:underline-offset-4">{text}</Link></li>
            ))}
          </ul>
        </div>

        {/* Newsletter + socials */}
        <div>
          <h3 className={label}>Want new opportunities<br />in your inbox?</h3>
          <a href="#newsletter" className={`text-xs font-semibold uppercase tracking-[0.12em] text-white ${underlined}`}>
            Sign up for our newsletter →
          </a>
          <h3 className={`${label} mt-8`}>Follow us</h3>
          <div className="flex items-center gap-7">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="text-white transition hover:text-sun">
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">{icons[s.label]}</svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row">
        <p>© {year} {site.name}</p>
        <a href="https://www.irabaruta.online" target="_blank" rel="noreferrer" aria-label="Visit irabaruta.online" className="inline-flex">
          <img src="https://www.irabaruta.online/logo.png" alt="Irabaruta" className="h-7 w-auto object-contain" />
        </a>
      </div>
    </footer>
  )
}
