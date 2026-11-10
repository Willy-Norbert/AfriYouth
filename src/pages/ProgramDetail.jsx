import { Link, useParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import OpportunityList from '../components/OpportunityList'
import Button from '../components/Button'
import NotFound from './NotFound'
import { programs } from '../data/programs'
import { opportunities } from '../data/opportunities'

// A plain list with thin dividers and a short orange dash before each line
function DashList({ title, items }) {
  return (
    <div>
      <h2 className="text-3xl">{title}</h2>
      <ul className="mt-6 border-b border-ink/15">
        {items.map((x) => (
          <li key={x} className="flex gap-4 border-t border-ink/15 py-4 text-lg">
            <span className="mt-3.5 h-0.5 w-4 shrink-0 bg-tangerine" aria-hidden="true" />
            {x}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProgramDetail() {
  const { slug } = useParams()
  const program = programs.find((p) => p.slug === slug)
  if (!program) return <NotFound />
  const related = opportunities.filter((o) => o.program === slug && o.status !== 'closed')
  const facts = [['Duration', program.duration], ['Format', program.format], ['Who it’s for', program.audience]]

  return (
    <>
      <PageBanner eyebrow="Programs" title={program.title} text={program.summary} image={program.image} curve="swoopRight" />

      {/* Key facts in one line */}
      <section className="border-b border-ink/10">
        <div className="container-x flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <dl className="grid gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-ink/15">
            {facts.map(([label, value]) => (
              <div key={label} className="sm:px-8 sm:first:pl-0">
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/45">{label}</dt>
                <dd className="mt-1 text-lg font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <Button to={related[0] ? `/opportunities/${related[0].slug}` : '/contact'} className="w-fit shrink-0">
            {related[0] ? 'Apply now' : 'Ask about this program'}
          </Button>
        </div>
      </section>

      {/* What the program is, with a pinned-up photo */}
      <section className="overflow-hidden py-20">
        <div className="container-x grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-tangerine">About the program</p>
            <p className="mt-5 font-display text-2xl leading-snug sm:text-3xl">{program.about}</p>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <span className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-3 bg-sun/80" aria-hidden="true" />
            <img src={program.image} alt="" className="aspect-[4/5] w-full rotate-2 border-[10px] border-white bg-sky object-cover shadow-xl" />
          </div>
        </div>
      </section>

      {/* Who can apply / what you'll gain */}
      <section className="bg-cream py-20">
        <div className="container-x grid gap-14 md:grid-cols-2">
          <DashList title="Who can apply" items={program.eligibility} />
          <DashList title="What you’ll gain" items={program.benefits} />
        </div>
      </section>

      {/* Open calls for this program */}
      <section className="py-20">
        <div className="container-x">
          <h2 className="text-3xl">Open calls</h2>
          <div className="mt-8">
            {related.length ? <OpportunityList items={related} /> : (
              <p className="text-lg text-ink/70">
                No open calls right now.{' '}
                <a href="#newsletter" className="font-bold text-royal underline decoration-2 underline-offset-4">Get an email</a>{' '}
                when the next one opens.
              </p>
            )}
          </div>
          <p className="mt-12 text-ink/70">
            Questions about {program.title}?{' '}
            <Link to="/contact" className="font-bold text-ink underline decoration-2 underline-offset-4 hover:text-royal">Talk to us</Link>
          </p>
        </div>
      </section>
    </>
  )
}
