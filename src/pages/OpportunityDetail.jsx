import { useParams } from 'react-router-dom'
import { Calendar, CircleCheck, MapPin } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import ApplyForm from '../components/ApplyForm'
import NotFound from './NotFound'
import { opportunities } from '../data/opportunities'
import { programs } from '../data/programs'
import { formatDate } from '../components/formatDate'

// Requirements on the left, application form on the right.
export default function OpportunityDetail() {
  const { slug } = useParams()
  const item = opportunities.find((o) => o.slug === slug)
  if (!item) return <NotFound />
  const program = programs.find((p) => p.slug === item.program)

  return (
    <>
      <PageBanner eyebrow="Opportunities" title={item.title} text={program.summary} image={program.image} />
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <img src={program.image} alt="" className="aspect-video w-full rounded-lg bg-sky object-cover" />
            <div className="mt-6 flex flex-wrap gap-4 text-ink/70">
              <span className="flex items-center gap-2"><Calendar className="size-5 text-tangerine" />Apply by {formatDate(item.deadline)}</span>
              <span className="flex items-center gap-2"><MapPin className="size-5 text-tangerine" />{item.location}</span>
            </div>
            <h2 className="mt-8 text-2xl font-bold">Requirements</h2>
            <ul className="mt-4 space-y-3">
              {program.eligibility.map((x) => <li key={x} className="flex gap-3"><CircleCheck className="size-5 shrink-0 text-teal" />{x}</li>)}
            </ul>
            <h2 className="mt-8 text-2xl font-bold">What you'll get</h2>
            <ul className="mt-4 space-y-3">
              {program.benefits.map((x) => <li key={x} className="flex gap-3"><CircleCheck className="size-5 shrink-0 text-sun" />{x}</li>)}
            </ul>
          </div>
          <ApplyForm title={item.title} />
        </div>
      </section>
    </>
  )
}
