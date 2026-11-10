import { Link, useParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import ApplicationForm from '../components/ApplicationForm'
import NotFound from './NotFound'
import { opportunities } from '../data/opportunities'
import { programs } from '../data/programs'
import { daysLeft, formatDate } from '../components/formatDate'

// Application page: the step-by-step form, with a summary of the opportunity beside it.
export default function OpportunityDetail() {
  const { slug } = useParams()
  const item = opportunities.find((o) => o.slug === slug)
  if (!item) return <NotFound />
  const program = programs.find((p) => p.slug === item.program)
  const days = daysLeft(item.deadline)
  const closed = item.status === 'closed' || days < 0

  return (
    <>
      <PageBanner eyebrow="Opportunities" title={item.title} text={program.summary} image={program.image} curve="tilt" />

      <section className="py-16 sm:py-20">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_21rem] lg:gap-16">
          {/* Summary, styled like an application ticket (first on phones, right-hand side on desktop) */}
          <aside className="space-y-8 lg:sticky lg:top-28 lg:order-2">
            <div className="relative bg-ink text-white">
              {/* notches cut into both sides at the tear line */}
              <span className="absolute -left-3 top-[58%] size-6 rounded-full bg-white" aria-hidden="true" />
              <span className="absolute -right-3 top-[58%] size-6 rounded-full bg-white" aria-hidden="true" />
              <div className="p-7 pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sun">{item.type}</p>
                {closed ? (
                  <p className="mt-4 font-display text-4xl">Closed</p>
                ) : (
                  <p className="mt-3 flex items-end gap-3">
                    <span className={`font-display text-7xl leading-none ${days <= 21 ? 'text-sun' : 'text-white'}`}>{days}</span>
                    <span className="pb-1.5 text-sm leading-tight text-white/70">days left<br />to apply</span>
                  </p>
                )}
              </div>
              <div className="mx-6 border-t-2 border-dashed border-white/25" aria-hidden="true" />
              <dl className="grid grid-cols-2 gap-4 p-7 pt-6 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-white/45">Deadline</dt>
                  <dd className="mt-1 font-semibold">{formatDate(item.deadline)}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-white/45">Where</dt>
                  <dd className="mt-1 font-semibold">{item.location}</dd>
                </div>
              </dl>
              {!closed && (
                <p className="border-t border-white/10 px-7 py-4 text-xs text-white/55">
                  Takes about 10 minutes. Have a link to your CV ready. Answers save as you go.
                </p>
              )}
            </div>

            <div>
              <h2 className="text-xl">Who can apply</h2>
              <ul className="mt-3 space-y-2 border-t border-ink/15 pt-3 text-sm text-ink/75">
                {program.eligibility.map((x) => <li key={x} className="flex gap-3"><span className="mt-2 h-0.5 w-3 shrink-0 bg-tangerine" />{x}</li>)}
              </ul>
            </div>
            <Link to={`/programs/${program.slug}`} className="inline-block text-sm font-bold text-royal underline decoration-2 underline-offset-4">
              What you'll get from the {program.title} →
            </Link>
          </aside>

          {/* Form */}
          <div className="lg:order-1">
            {closed ? (
              <div className="border-t-4 border-ink bg-cream p-10">
                <h2 className="text-3xl">Applications for this call have closed</h2>
                <p className="mt-3 text-ink/70">Sign up for our newsletter to hear when the next round opens, or look at what's open now.</p>
                <Link to="/opportunities" className="mt-6 inline-block font-bold text-royal underline decoration-2 underline-offset-4">See open opportunities</Link>
              </div>
            ) : (
              <>
                <h2 className="mb-6 text-3xl sm:text-4xl">Apply for this {item.type.toLowerCase()}</h2>
                <ApplicationForm opportunity={item} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
