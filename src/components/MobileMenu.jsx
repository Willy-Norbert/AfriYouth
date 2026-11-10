import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { menu } from '../data/menu'

// Phone menu: each section opens like an accordion.
export default function MobileMenu({ onClose }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto border-t border-ink/10 bg-white px-5 pb-10 lg:hidden">
      <ul>
        {menu.map((m) => (
          <li key={m.label} className="border-b border-ink/10">
            {m.columns ? (
              <button onClick={() => setOpen(open === m.label ? null : m.label)} aria-expanded={open === m.label}
                className="flex w-full items-center justify-between py-4 text-lg font-bold">
                {m.label} <ChevronDown className={`size-5 transition ${open === m.label ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <Link to={m.to} onClick={onClose} className="block py-4 text-lg font-bold">{m.label}</Link>
            )}
            {open === m.label && m.columns.map((col) => (
              <div key={col.heading} className="pb-4">
                <Link to={col.to} onClick={onClose} className="font-bold text-royal">{col.heading} →</Link>
                <ul className="mt-2 space-y-2 pl-1">
                  {col.links.map(([label, to]) => (
                    <li key={label}>
                      {to.startsWith('#')
                        ? <a href={to} onClick={onClose} className="text-ink/75">{label}</a>
                        : <Link to={to} onClick={onClose} className="text-ink/75">{label}</Link>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </li>
        ))}
      </ul>
      <Link to="/opportunities" onClick={onClose} className="mt-6 block rounded-md bg-ink py-4 text-center font-bold text-white">Apply now</Link>
    </div>
  )
}
