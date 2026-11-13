import { Link } from 'react-router-dom'
import { Flag, Users } from 'lucide-react'
import { colors } from './colors'
import { pillars } from '../data/pillars'

export default function ProgramCard({ program }) {
  const pillar = pillars.find((p) => p.slug === program.pillar)
  const c = colors[pillar.color]
  return (
    <Link to={`/programs/${program.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-sky">
        <img src={program.image} alt="" loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" />
        <span className={`absolute left-4 top-4 rounded-md px-3 py-1 text-xs font-bold ${c.bg} ${c.btnText}`}>{pillar.title}</span>
        {program.flagship && <span className="absolute right-4 top-4 rounded-md bg-white px-3 py-1 text-xs font-bold text-ink">Flagship</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">{program.title}</h3>
        <p className="mt-2 flex-1 text-ink/70">{program.summary}</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-ink/60">
          <span className="flex items-center gap-1.5"><Users className="size-4" />{program.audience}</span>
          <span className="flex items-center gap-1.5"><Flag className="size-4" />{program.outcome}</span>
        </div>
      </div>
    </Link>
  )
}
