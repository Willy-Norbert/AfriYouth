import { useState } from 'react'
import PageBanner from '../components/PageBanner'
import OpportunityList from '../components/OpportunityList'
import { opportunities } from '../data/opportunities'
import { images } from '../data/images'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'youth', label: 'For young people' },
  { key: 'partner', label: 'For partners & organisations' },
]

export default function Opportunities() {
  const [filter, setFilter] = useState('all')
  const list = opportunities.filter((o) => filter === 'all' || o.for === filter)

  return (
    <>
      <PageBanner eyebrow="Opportunities" title="Your next step starts here."
        text="Fellowships, trainings, internships and partnership calls — with clear requirements and deadlines." image={images.benchLaptops} />
      <section className="py-16">
        <div className="container-x">
          <div className="flex flex-wrap gap-6">
            {filters.map((f) => (
              <button key={f.key} onClick={() => setFilter(f.key)} aria-pressed={filter === f.key}
                className={`border-b-2 px-1 py-2 font-bold transition ${filter === f.key ? 'border-ink' : 'border-transparent text-ink/50 hover:text-ink'}`}>
                {f.label}
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink/60">{list.length} opportunities</p>
          <div className="mt-6"><OpportunityList items={list} /></div>
        </div>
      </section>
    </>
  )
}
