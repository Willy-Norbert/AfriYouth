import { Link } from 'react-router-dom'
import Icon from './Icon'
import { colors } from './colors'

// Coloured card for one work area.
export default function PillarCard({ pillar, index }) {
  const c = colors[pillar.color]
  return (
    <Link to={`/programs?area=${pillar.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
      <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-ink/5">0{index + 1}</span>
      <span className={`mb-6 grid size-14 place-items-center rounded-2xl ${c.bg} ${c.btnText}`}>
        <Icon name={pillar.icon} className="size-7" />
      </span>
      <h3 className="text-xl font-bold">{pillar.title}</h3>
      <p className="mt-2 flex-1 text-ink/70">{pillar.text}</p>
      <span className={`mt-6 font-semibold ${c.text}`}>Explore programs →</span>
      <span className={`absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition group-hover:scale-x-100 ${c.bg}`} />
    </Link>
  )
}
