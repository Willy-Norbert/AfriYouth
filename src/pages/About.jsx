import PageBanner from '../components/PageBanner'
import Reveal from '../components/Reveal'
import { valueArt } from '../components/ValuesArt'
import Button from '../components/Button'
import PinBoard from '../components/PinBoard'
import ImpactSection from '../sections/ImpactSection'
import PartnerCta from '../sections/PartnerCta'
import { images } from '../data/images'
import { site } from '../data/site'

// Brand keywords (AfriYouth brand guidelines)
const values = [
  ['Innovation', 'We test bold ideas and learn fast.'],
  ['Youth empowerment', 'Young people lead — not just take part.'],
  ['Sustainability', 'Solutions that serve the SDGs and last beyond a project.'],
  ['Global impact', 'African solutions with global relevance.'],
  ['Human-centered design', 'We design with communities, not just for them.'],
  ['Leadership development', 'Growing the next generation of African leaders.'],
]

// Torn ends for the tape strips on the photo
const tapeEdge = 'polygon(0 8%, 4% 0, 8% 10%, 12% 2%, 88% 0, 92% 9%, 96% 1%, 100% 10%, 100% 92%, 96% 100%, 92% 90%, 88% 99%, 12% 100%, 8% 91%, 4% 100%, 0 92%)'

export default function About() {
  return (
    <>
      <PageBanner eyebrow="About us" title="About AfriYouth"
        text="An African innovation and policy lab that identifies, nurtures and advances ideas from Africa’s young innovators to address the SDGs."
        image={images.celebration} curve="dip" />

      <section id="mission" className="py-24">
        <div className="container-x">
          <p className="mx-auto max-w-3xl text-center text-lg text-ink/70">
            AfriYouth Innovation Labs identifies, nurtures and advances promising ideas from Africa’s young innovators
            to address the SDGs. Through human-centered design, applied research and innovation, we turn community-driven
            ideas into practical, scalable solutions for Africa and beyond.
          </p>
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <Reveal className="rounded-lg bg-sun p-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em]">Our mission</p>
              <p className="mt-4 font-display text-2xl font-bold leading-snug sm:text-3xl">
                To empower Africa’s youth to generate evidence, shape policy and develop innovative solutions to
                Africa’s most pressing socio-economic challenges through research, human-centered design and entrepreneurship.
              </p>
            </Reveal>
            <Reveal delay={120} className="rounded-lg bg-ink p-10 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sun">Our vision</p>
              <p className="mt-4 font-display text-2xl font-bold leading-snug sm:text-3xl">
                An Africa where empowered young people use evidence, innovation and entrepreneurship to solve complex
                challenges, shape policies and drive inclusive and sustainable socio-economic transformation by 2050.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="story" className="overflow-hidden bg-cream py-24">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          {/* Photo stuck on the board: white print border, slight tilt, two strips of tape */}
          <div className="relative mx-auto w-full max-w-lg -rotate-2">
            <span aria-hidden="true" className="absolute -left-4 -top-3 z-10 h-8 w-28 -rotate-[24deg] shadow-sm"
              style={{ backgroundColor: 'rgba(190, 180, 255, 0.7)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0 2px, transparent 2px 6px)', clipPath: tapeEdge }} />
            <span aria-hidden="true" className="absolute -right-4 -top-3 z-10 h-8 w-28 rotate-[22deg] shadow-sm"
              style={{ backgroundColor: 'rgba(229, 124, 242, 0.5)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0 2px, transparent 2px 6px)', clipPath: tapeEdge }} />
            <img src={images.soldering} alt="A young innovator building an electronics prototype"
              className="aspect-[4/3] w-full border-[12px] border-b-[44px] border-white bg-sky object-cover shadow-[0_18px_40px_-18px_rgba(13,6,36,0.45)]" />
          </div>
          <div>
            <h2 className="max-w-md text-3xl leading-[1.1] sm:text-[2.75rem]">What makes AfriYouth <span className="text-royal">unique</span></h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
              Others train, incubate, research or consult. We connect all four, through research, policy,
              human-centered design, entrepreneurship and foresight.
            </p>
            <Button to="/services" variant="dark" className="mt-8">See what we do</Button>
          </div>
        </div>
      </section>

      <section id="philosophy" className="py-24">
        <div className="container-x text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-tangerine">Our philosophy</p>
          {site.tagline && <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">{site.tagline}</h2>}
          {/* Steps pinned to a board, joined by string */}
          <div className="mx-auto mt-12 max-w-6xl rounded-2xl bg-sky/60 px-6 py-14 sm:px-12"
            style={{ backgroundImage: 'radial-gradient(rgba(13,6,36,0.07) 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
            <PinBoard steps={site.philosophy} />
          </div>
        </div>
      </section>

      <section id="values" className="pb-24">
        <div className="container-x">
          <h2 className="text-center text-3xl font-extrabold sm:text-5xl">What we stand for</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(([title, text], i) => {
              const Art = valueArt[title]
              return (
              <Reveal key={title} delay={i * 60} className="group rounded-lg p-7 ring-1 ring-ink/10">
                <span className="block size-20 transition duration-300 group-hover:-rotate-3 group-hover:scale-105"><Art /></span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-1 text-ink/70">{text}</p>
              </Reveal>
              )
            })}
          </div>
        </div>
      </section>
      <PartnerCta />
      <ImpactSection />
    </>
  )
}
