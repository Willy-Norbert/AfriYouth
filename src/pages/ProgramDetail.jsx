import { Link, useParams } from 'react-router-dom'
import { CircleCheck, Clock, MapPin, Users } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import OpportunityList from '../components/OpportunityList'
import Button from '../components/Button'
import NotFound from './NotFound'
import { programs } from '../data/programs'
import { opportunities } from '../data/opportunities'

function List({ title, items }) {
  return (
    <div className="rounded-lg bg-cream p-7">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((x) => <li key={x} className="flex gap-3"><CircleCheck className="size-5 shrink-0 text-teal" />{x}</li>)}
      </ul>
    </div>
  )
}

export default function ProgramDetail() {
  const { slug } = useParams()
  const program = programs.find((p) => p.slug === slug)
  if (!program) return <NotFound />
  const related = opportunities.filter((o) => o.program === slug && o.status !== 'closed')

  return (
    <>
      <PageBanner eyebrow="Programs" title={program.title} text={program.summary} image={program.image} />
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <p className="text-lg text-ink/80">{program.about}</p>
            <div className="grid gap-6 md:grid-cols-2">
              <List title="Who can apply" items={program.eligibility} />
              <List title="What you'll gain" items={program.benefits} />
            </div>
            <h2 className="pt-6 text-2xl font-bold">Open opportunities</h2>
            {related.length ? <OpportunityList items={related} />
              : <p className="text-ink/60">No open calls right now. <Link to="/contact" className="font-bold text-royal">Get notified</Link>.</p>}
          </div>
          <aside className="h-fit rounded-lg bg-ink p-7 text-white lg:sticky lg:top-28">
            <h2 className="text-xl font-bold">At a glance</h2>
            <ul className="mt-5 space-y-4 text-white/80">
              <li className="flex gap-3"><Clock className="size-5 text-sun" />{program.duration}</li>
              <li className="flex gap-3"><MapPin className="size-5 text-sun" />{program.format}</li>
              <li className="flex gap-3"><Users className="size-5 text-sun" />{program.audience}</li>
            </ul>
            <Button to={related[0] ? `/opportunities/${related[0].slug}` : '/contact'} className="mt-8 w-full">
              {related[0] ? 'Apply now' : 'Ask about this program'}
            </Button>
          </aside>
        </div>
      </section>
    </>
  )
}
