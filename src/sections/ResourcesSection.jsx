import { Link } from 'react-router-dom'
import ResourceCard from '../components/ResourceCard'
import SectionHeading from '../components/SectionHeading'
import { resources } from '../data/resources'

export default function ResourcesSection() {
  return (
    <section className="py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Knowledge hub" title="Latest research & insights" />
          <Link to="/resources" className="font-bold text-royal hover:underline">Browse the library →</Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {resources.slice(0, 3).map((r) => <ResourceCard key={r.title} item={r} />)}
        </div>
      </div>
    </section>
  )
}
