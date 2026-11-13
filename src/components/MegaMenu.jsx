import { Link } from 'react-router-dom'
import { ArrowRight, FileText } from 'lucide-react'

// Large dropdown panel: link columns on the left, featured photo on the right.
export default function MegaMenu({ item, onClose }) {
  return (
    <div className="absolute inset-x-0 top-full border-t border-ink/10 bg-white shadow-[0_24px_40px_-24px_#0d062440]" onClick={onClose}>
      <div className="container-x grid gap-12 py-10 lg:grid-cols-[1fr_1fr_1.4fr]">
        {item.columns.map((col) => (
          <div key={col.heading}>
            <Link to={col.to} className="group inline-flex items-center gap-2 text-lg font-bold text-royal">
              {col.heading} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
            <ul className="mt-3 space-y-2">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  {to.startsWith('#')
                    ? <a href={to} className="text-ink/80 hover:text-royal">{label}</a>
                    : <Link to={to} className="text-ink/80 hover:text-royal">{label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Link to={item.feature.to} className="group relative flex min-h-52 items-end overflow-hidden rounded-lg bg-plum">
          <img src={item.feature.image} alt="" className="absolute inset-0 size-full object-cover opacity-70 transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
          <div className="relative p-6">
            <span className="rounded bg-royal px-2 py-1 text-xl font-extrabold uppercase leading-relaxed text-white [box-decoration-break:clone]">
              {item.feature.title}
            </span>
            <p className="mt-3 flex items-center gap-2 font-bold text-white">
              <FileText className="size-4" /> {item.feature.text}
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
