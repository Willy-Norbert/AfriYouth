import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from './Logo'
import MegaMenu from './MegaMenu'
import MobileMenu from './MobileMenu'
import { menu } from '../data/menu'

export default function Navbar() {
  const [active, setActive] = useState(null) // label of the open dropdown
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef(null)
  const pointerType = useRef(null)
  const { pathname } = useLocation()
  const openItem = menu.find((m) => m.label === active && m.columns)

  // Close menus whenever the page changes
  useEffect(() => {
    setActive(null)
    setMobileOpen(false)
  }, [pathname])

  // Close the dropdown when clicking or tapping outside the header
  useEffect(() => {
    if (!active) return
    const onDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setActive(null)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [active])

  const linkClass = (on) =>
    `flex items-center gap-1 py-7 text-[15px] font-bold transition hover:text-royal ${on ? 'text-royal' : ''}`

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white shadow-[0_1px_0_#0d062414]"
      onMouseLeave={() => setActive(null)} onKeyDown={(e) => e.key === 'Escape' && setActive(null)}>
      <nav className="container-x flex h-20 items-center justify-between gap-8" aria-label="Main">
        <Logo />
        <div className="hidden items-center gap-7 lg:flex">
          {menu.map((m) =>
            m.columns ? (
              // Items with a dropdown open the menu instead of going to a page
              <button key={m.label} type="button"
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(m.label)}
                onPointerDown={(e) => { pointerType.current = e.pointerType }}
                onClick={() => {
                  // Mouse: hover already opened it, so a click keeps it open.
                  // Touch / keyboard: a click toggles it open and closed.
                  if (pointerType.current === 'mouse') setActive(m.label)
                  else setActive((cur) => (cur === m.label ? null : m.label))
                  pointerType.current = null
                }}
                aria-haspopup="true" aria-expanded={active === m.label}
                className={linkClass(active === m.label || pathname.startsWith(m.to))}>
                {m.label}
                <ChevronDown className={`size-4 transition ${active === m.label ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <NavLink key={m.label} to={m.to}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(null)}
                className={({ isActive }) => linkClass(isActive)}>
                {m.label}
              </NavLink>
            )
          )}
          <Link to="/opportunities" className="rounded-md bg-ink px-5 py-3 text-[15px] font-bold text-white transition hover:bg-royal">Apply now</Link>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 lg:hidden" aria-label="Toggle menu" aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </nav>

      {openItem && <MegaMenu item={openItem} onClose={() => setActive(null)} />}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  )
}
