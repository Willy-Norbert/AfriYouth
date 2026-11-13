import { CircleCheck } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import Reveal from '../components/Reveal'
import { serviceArt } from '../components/ServicesArt'
import Button from '../components/Button'
import { colors } from '../components/colors'
import { labs, supporting, acceleratorStages } from '../data/services'
import { pillars } from '../data/pillars'
import { images } from '../data/images'

// One lab / service card: illustration, title, short text, full list of services, product.
function ServiceCard({ s, i }) {
  const c = colors[pillars.find((p) => p.slug === s.pillar).color]
  const Art = serviceArt[s.slug]
  return (
    <Reveal delay={(i % 3) * 60} className="h-full">
      <article id={s.slug} className="group flex h-full scroll-mt-28 flex-col rounded-lg bg-white p-7 ring-1 ring-ink/10">
        <span className="block size-20 transition duration-300 group-hover:-rotate-3 group-hover:scale-105"><Art /></span>
        <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
        <p className="mt-2 text-ink/70">{s.text}</p>
        {s.model && (
          <p className="mt-4 text-sm font-semibold text-ink/80">
            <span className="sr-only">How it works: </span>
            {s.model.join(' → ')}
          </p>
        )}
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-ink/45">{s.includesLabel || 'Services'}</p>
        <ul className="mt-3 flex-1 space-y-2 text-sm">
          {s.includes.map((x) => <li key={x} className="flex items-start gap-2"><CircleCheck className={`mt-0.5 size-4 shrink-0 ${c.text}`} />{x}</li>)}
        </ul>
        {s.product && (
          <div className={`mt-6 rounded-md px-4 py-3 ${c.soft}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/55">Product</p>
            <p className="mt-1 font-bold">{s.product}</p>
            {s.note && <p className="mt-1 text-sm text-ink/65">{s.note}</p>}
          </div>
        )}
      </article>
    </Reveal>
  )
}

export default function Services() {
  return (
    <>
      <PageBanner eyebrow="What we do" title="Research, policy and innovation for Africa’s most pressing challenges."
        text="Six labs and two supporting services for governments, NGOs, development partners, universities and companies. Everything sits within our five strategic divisions."
        image={images.fieldEngineers} curve="wave" />

      <section className="py-24">
        <div className="container-x">
          <h2 className="text-3xl sm:text-5xl">Our labs</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {labs.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
          </div>

          <h2 id="supporting" className="mt-24 scroll-mt-28 text-3xl sm:text-5xl">Supporting services</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Resource Mobilization &amp; Partnerships is a cross-cutting commercial service that supports every division.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {supporting.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
          </div>
        </div>
      </section>

      <section id="accelerator" className="scroll-mt-20 bg-ink py-24 text-white">
        <div className="container-x">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sun">Our flagship product</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">The Evidence-to-Impact Accelerator</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/70">
            Instead of disconnected research, incubation and training programmes, we combine them: ten stages
            that take a community problem all the way to a solution that scales.
          </p>
          <ol className="mt-14 grid gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
            {acceleratorStages.map(([title, text], i) => (
              <li key={title}>
                {/* Big outlined number that fades out */}
                <span aria-hidden="true"
                  className="block select-none font-display text-[6.5rem] leading-[0.8] text-transparent"
                  style={{
                    WebkitTextStroke: '2px #e57cf2',
                    maskImage: 'linear-gradient(to bottom, #000 30%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, #000 30%, transparent 100%)',
                  }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* One line runs across all steps, with a dot for each */}
                <div className="relative mt-3 border-t border-white/20 pt-6 sm:pr-8">
                  <span className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-sun" aria-hidden="true" />
                  <p className="text-xl font-bold"><span className="sr-only">Stage {i + 1}: </span>{title}</p>
                  <p className="mt-2 text-white/65">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button to="/programs/evidence-to-impact-accelerator">About the Accelerator</Button>
            <Button to="/contact?topic=service" variant="outline" arrow={false}>Request a service</Button>
          </div>
        </div>
      </section>
    </>
  )
}
