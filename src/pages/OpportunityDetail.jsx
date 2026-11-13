import { Link, useParams } from 'react-router-dom'
import ApplicationForm from '../components/ApplicationForm'
import PartnerInterestForm from '../components/PartnerInterestForm'
import NotFound from './NotFound'
import { opportunities } from '../data/opportunities'
import { programs } from '../data/programs'
import { daysLeft, formatDate } from '../components/formatDate'

// Application page laid out like an online form: a cover image that reaches the
// middle of the screen, and one white form card that rises up over it.
export default function OpportunityDetail() {
  const { slug } = useParams()
  const item = opportunities.find((o) => o.slug === slug)
  if (!item) return <NotFound />
  const program = programs.find((p) => p.slug === item.program)
  const days = daysLeft(item.deadline)
  const closed = item.status === 'closed' || days < 0
  const forPartners = item.for === 'partner'

  return (
    <div className="bg-[#f4f3f9] pb-20">
      {/* Cover: photo on dark purple, with a curved bottom edge */}
      <div className="relative h-[55vh] min-h-[340px] overflow-hidden bg-ink">
        <img src={program.image} alt="" className="absolute inset-0 size-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink/80" />
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-px h-[42px] w-full sm:h-[58px]">
          <path d="M0 0Q720 120 1440 0V60H0z" fill="#f4f3f9" />
        </svg>
      </div>

      {/* Form card */}
      <div className="container-x relative -mt-[38vh] sm:-mt-[34vh]">
        <article className="mx-auto max-w-5xl overflow-hidden rounded-xl bg-white shadow-[0_4px_16px_-8px_rgba(13,6,36,0.18)]">

          {/* Form header */}
          <header className="border-b border-ink/10 px-6 py-8 sm:px-12 sm:py-10">
            <Link to="/opportunities" className="text-sm text-ink/55 hover:text-royal">← All opportunities</Link>
            <h1 className="mt-4 text-3xl sm:text-4xl">{item.title}</h1>
            <p className="mt-3 text-ink/70">{program.summary}</p>
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink/65">
              <span>{item.type}</span>
              <span>Deadline <strong className="text-ink">{formatDate(item.deadline)}</strong></span>
              {!closed && <span className={days <= 21 ? 'font-semibold text-coral' : 'font-semibold text-royal'}>{days} days left</span>}
              <span>{item.location}</span>
            </p>
            {!closed && (
              <p className="mt-4 text-sm text-ink/55">
                {forPartners
                  ? 'Tell us about your organisation. It takes about 3 minutes and we reply within a week.'
                  : <>Have your CV ready (a file or a link). Not sure you're eligible?{' '}
                    <Link to={`/programs/${program.slug}`} className="font-semibold text-royal underline underline-offset-4">See what the program involves</Link></>}
              </p>
            )}
            <p className="mt-4 text-xs text-coral">* Required</p>
          </header>

          {/* Questions */}
          <div className="px-6 py-8 sm:px-12 sm:py-10">
            {closed ? (
              <div>
                <h2 className="text-2xl">Applications for this call have closed</h2>
                <p className="mt-3 text-ink/70">Sign up for our newsletter to hear when the next round opens.</p>
                <Link to="/opportunities" className="mt-6 inline-block font-bold text-royal underline decoration-2 underline-offset-4">See open opportunities</Link>
              </div>
            ) : forPartners ? (
              <PartnerInterestForm opportunity={item} />
            ) : (
              <ApplicationForm opportunity={item} />
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
