import PageBanner from '../components/PageBanner'
import Reveal from '../components/Reveal'
import { valueArt } from '../components/ValuesArt'
import Button from '../components/Button'
import { Squiggle } from '../components/Doodles'
import ImpactSection from '../sections/ImpactSection'
import PartnerCta from '../sections/PartnerCta'
import { images } from '../data/images'

const values = [
  ['Innovation', 'We test bold ideas and learn fast.'],
  ['Youth empowerment', 'Young people lead — not just take part.'],
  ['Global impact', 'African solutions with global relevance.'],
  ['Human-centred design', 'We design with communities.'],
  ['Sustainability', 'Change that lasts beyond a project.'],
  ['Leadership', 'Growing the next generation of leaders.'],
]

export default function About() {
  return (
    <>
      <PageBanner eyebrow="About us" title="We connect evidence, policy and innovation — led by youth."
        text="AfriYouth Innovation Labs empowers Africa's youth to generate evidence, shape policy and develop innovative solutions to pressing socio-economic challenges."
        image={images.team} curve="dip" />

      <section id="mission" className="py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal className="rounded-lg bg-sun p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Our mission</p>
            <p className="mt-4 font-display text-2xl font-bold leading-snug sm:text-3xl">
              To empower Africa's youth to generate evidence, shape policy and build solutions through research,
              human-centred design and entrepreneurship.
            </p>
          </Reveal>
          <Reveal delay={120} className="rounded-lg bg-ink p-10 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sun">Our vision</p>
            <p className="mt-4 font-display text-2xl font-bold leading-snug sm:text-3xl">
              An Africa where empowered young people drive inclusive and sustainable socio-economic transformation.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="story" className="bg-cream py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <img src={images.workshop} alt="Young people collaborating" className="aspect-[4/3] w-full rounded-lg bg-sky object-cover shadow-xl" />
          <div>
            <h2 className="text-3xl font-extrabold sm:text-5xl">More than a youth organisation</h2>
            <Squiggle className="my-5 w-20" />
            <p className="text-lg text-ink/70">
              Most organisations do one thing: train, incubate or research. We bring research, policy, human-centred
              design, entrepreneurship and foresight together — because complex challenges need connected answers.
            </p>
            <Button to="/services" variant="dark" className="mt-8">See what we do</Button>
          </div>
        </div>
      </section>

      <section id="values" className="py-24">
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
