import { Link } from 'react-router-dom'
import ProgramCard from '../components/ProgramCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { programs } from '../data/programs'

export default function ProgramsSection() {
  return (
    <section className="py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Programs" title="Grow your skills. Lead the change."
            text="Fellowships, bootcamps and labs for students, young professionals and founders." />
          <Link to="/programs" className="font-bold text-royal hover:underline">View all programs →</Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}><ProgramCard program={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
