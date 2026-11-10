import { colors } from './colors'
import { pillars } from '../data/pillars'

export default function ResourceCard({ item }) {
  const pillar = pillars.find((p) => p.slug === item.pillar)
  const c = colors[pillar.color]
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-48 overflow-hidden bg-sky">
        <img src={item.image} alt="" loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>{item.type} · {item.date}</p>
        <h3 className="mt-2 flex-1 text-lg font-bold leading-snug">{item.title}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => <span key={t} className="rounded-md bg-sky px-3 py-1 text-xs text-ink/70">{t}</span>)}
        </div>
      </div>
    </article>
  )
}
