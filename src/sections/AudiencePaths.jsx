import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { audienceArt } from '../components/AudienceArt'
import { audiences } from '../data/audiences'

// "Who are you?" — the three main journeys.
export default function AudiencePaths() {
  return (
    <section className="bg-[#ffe9da] py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading center eyebrow="Start here" title="Who are you?"
          text="Choose the path that fits you and we'll show you where to go next." />

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-ink/10">
          {audiences.map((a) => {
            const Art = audienceArt[a.key]
            return (
              <Link key={a.key} to={a.to} className="group flex flex-col items-center px-8 text-center">
                <span className="block size-32 transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
                  <Art />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold">{a.label}</h3>
                <p className="mt-2 max-w-xs flex-1 text-ink/70">{a.text}</p>
                <span className="mt-5 font-bold text-royal">
                  {a.cta} <span className="inline-block transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
