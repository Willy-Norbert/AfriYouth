import { Link } from 'react-router-dom'
import OpportunityList from '../components/OpportunityList'
import { opportunities } from '../data/opportunities'

export default function OpportunitiesSection() {
  const open = opportunities
    .filter((o) => o.status !== 'closed')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  return (
    <section className="bg-cream py-24">
      <div className="container-x">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl">Open calls</h2>
            <p className="mt-3 text-lg text-ink/70">{open.length} opportunities are taking applications right now.</p>
          </div>
          <Link to="/opportunities" className="border-b-2 border-ink pb-1 font-bold hover:text-royal">See every opportunity</Link>
        </div>
        <OpportunityList items={open.slice(0, 5)} />
      </div>
    </section>
  )
}
