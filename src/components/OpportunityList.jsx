import OpportunityRow from './OpportunityRow'

const headers = ['Opportunity', 'Where', 'Deadline', 'Time left', '']

// Noticeboard-style table of opportunities.
export default function OpportunityList({ items }) {
  return (
    <div>
      <div className="hidden grid-cols-[2.2fr_1fr_1fr_1.1fr_auto] gap-6 border-b-2 border-ink pb-3 text-xs font-bold uppercase tracking-widest text-ink/50 md:grid">
        {headers.map((h, i) => <span key={i} className={i === 4 ? 'w-[66px]' : ''}>{h}</span>)}
      </div>
      <ul className="border-t-2 border-ink md:border-t-0">
        {items.map((o) => <OpportunityRow key={o.slug} item={o} />)}
      </ul>
    </div>
  )
}
