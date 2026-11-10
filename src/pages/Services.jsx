import { CircleCheck } from 'lucide-react'
import PageBanner from '../components/PageBanner'
import Reveal from '../components/Reveal'
import { serviceArt } from '../components/ServicesArt'
import Button from '../components/Button'
import { colors } from '../components/colors'
import { services } from '../data/services'
import { pillars } from '../data/pillars'
import { images } from '../data/images'

const steps = ['Tell us your challenge', 'We co-design a plan', 'We deliver with youth', 'We measure the impact']

export default function Services() {
  return (
    <>
      <PageBanner eyebrow="What we do" title="Expertise for organisations that want youth-centred results."
        text="We support governments, NGOs, development partners and companies with research, policy, innovation and capacity building."
        image={images.meeting} curve="wave" />

      <section className="py-24">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const c = colors[pillars.find((p) => p.slug === s.pillar).color]
            const Art = serviceArt[s.title]
            return (
              <Reveal key={s.title} delay={i * 60} className="group flex h-full flex-col rounded-lg bg-white p-7 ring-1 ring-ink/10">
                <span className="block size-20 transition duration-300 group-hover:-rotate-3 group-hover:scale-105"><Art /></span>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 flex-1 text-ink/70">{s.text}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.includes.map((x) => <li key={x} className="flex items-center gap-2"><CircleCheck className={`size-4 ${c.text}`} />{x}</li>)}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-ink py-24 text-white">
        <div className="container-x">
          <h2 className="text-3xl font-extrabold sm:text-5xl">How we work with you</h2>
          <ol className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step} className="relative flex min-h-32 items-center rounded-lg bg-white/5 py-8 pl-28 pr-6 ring-1 ring-white/10">
                {/* Big outlined number that spills over the card's left edge and fades out */}
                <span aria-hidden="true"
                  className="pointer-events-none absolute -left-3 top-1/2 sm:-left-6 -translate-y-1/2 select-none font-display text-[7rem] leading-none text-transparent"
                  style={{
                    WebkitTextStroke: '2px #ff9756',
                    maskImage: 'linear-gradient(to bottom, #000 25%, transparent 92%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, #000 25%, transparent 92%)',
                  }}>
                  0{i + 1}
                </span>
                <p className="relative text-lg font-bold leading-snug"><span className="sr-only">Step {i + 1}: </span>{step}</p>
              </li>
            ))}
          </ol>
          <Button to="/contact?topic=service" className="mt-12">Request a service</Button>
        </div>
      </section>
    </>
  )
}
