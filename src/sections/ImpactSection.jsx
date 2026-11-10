import CountUp from '../components/CountUp'
import { PatternStrip } from '../components/Doodles'
import { impact } from '../data/impact'

export default function ImpactSection() {
  return (
    <section id="impact" className="relative overflow-hidden bg-plum text-white">
      <PatternStrip />
      <div className="container-x py-20">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-sun">Our impact so far</p>
        <div className="mt-10 grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((item) => (
            <div key={item.label}>
              <p className="font-display text-6xl font-extrabold text-sun"><CountUp end={item.value} suffix={item.suffix} /></p>
              <p className="mt-2 text-white/80">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
