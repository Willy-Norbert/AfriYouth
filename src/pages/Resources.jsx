import { useState } from 'react'
import PageBanner from '../components/PageBanner'
import ResourceCard from '../components/ResourceCard'
import { resources } from '../data/resources'
import { pillars } from '../data/pillars'
import { images } from '../data/images'

export default function Resources() {
  const [query, setQuery] = useState('')
  const [area, setArea] = useState('all')
  const list = resources.filter((r) =>
    (area === 'all' || r.pillar === area) && r.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      <PageBanner eyebrow="Resources" title="Evidence, policy solutions and futures, all in one place."
        text="AfriYouth Evidence Reports, the Policy Solutions Series, the Africa 2050 Futures Series and practical toolkits." image={images.vrDesk} curve="ripple" />
      <section className="py-16">
        <div className="container-x">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search resources…" aria-label="Search resources"
              className="flex-1 rounded-md border border-ink/15 px-6 py-3 outline-none focus:border-royal focus:ring-4 focus:ring-royal/15" />
            <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filter by division"
              className="rounded-md border border-ink/15 px-6 py-3 outline-none focus:border-royal">
              <option value="all">All divisions</option>
              {pillars.map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
            </select>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((r) => <ResourceCard key={r.title} item={r} />)}
          </div>
          {!list.length && <p className="mt-10 text-center text-ink/60">No resources match your search.</p>}
        </div>
      </section>
    </>
  )
}
