import { Link } from 'react-router-dom'
import { daysLeft, formatDate } from './formatDate'

// One line of the opportunities noticeboard.
export default function OpportunityRow({ item }) {
  const days = daysLeft(item.deadline)
  const closed = item.status === 'closed' || days < 0

  return (
    <li className={`group grid gap-3 border-b border-ink/15 py-6 md:grid-cols-[2.2fr_1fr_1fr_1.1fr_auto] md:items-center md:gap-6 ${closed ? 'text-ink/40' : ''}`}>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-tangerine">{item.type}</p>
        <h3 className="mt-1 text-xl leading-snug">{item.title}</h3>
      </div>
      <p className="text-sm md:text-base">{item.location}</p>
      <p className="text-sm md:text-base">{formatDate(item.deadline)}</p>
      <p className={`text-sm font-bold ${closed ? '' : days <= 21 ? 'text-coral' : 'text-teal'}`}>
        {closed ? 'Closed' : `${days} days left`}
      </p>
      {closed ? <span className="text-sm">—</span> : (
        <Link to={`/opportunities/${item.slug}`}
          className="justify-self-start rounded-md bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-royal">
          Apply
        </Link>
      )}
    </li>
  )
}
