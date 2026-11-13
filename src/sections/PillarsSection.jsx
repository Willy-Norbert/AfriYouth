import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { pillars } from '../data/pillars'
import { programs } from '../data/programs'

// A distinct look for each work-area panel (in order): background, whether it's
// dark (white text), and the colour of the big outlined number.
const panels = [
  { bg: '#e3e3ff', dark: false, stroke: '#0301ff' }, // light blue
  { bg: '#0d0624', dark: true, stroke: '#e57cf2' },  // dark purple
  { bg: '#f6dcfb', dark: false, stroke: '#a01bb4' }, // pink tint
  { bg: '#0200a7', dark: true, stroke: '#e57cf2' },  // duke blue
  { bg: '#c723df', dark: true, stroke: '#0d0624' },  // steel pink
]

// "What we do": intro at the top, then five full-width panels (one per division) that stack
// on top of each other as you scroll (each one sticks under the navbar).
export default function PillarsSection() {
  return (
    <section className="pt-24">
      <div className="container-x flex flex-col justify-between gap-6 pb-14 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-4xl sm:text-5xl">What we do</h2>
          <p className="mt-5 max-w-xl text-lg text-ink/70">
            Everything we do sits in five strategic divisions. Together they connect research, policy,
            human-centered design, entrepreneurship and foresight — from evidence to impact.
          </p>
        </div>
        <Link to="/services" className="w-fit shrink-0 border-b-2 border-ink pb-1 font-bold hover:text-royal">
          Services for organisations
        </Link>
      </div>

      <ol>
        {pillars.map((p, i) => {
          const look = panels[i % panels.length]
          const hasPrograms = programs.some((x) => x.pillar === p.slug)
          return (
            <li key={p.slug} className="sticky top-20">
              <div className={`min-h-[calc(100vh-5rem)] rounded-t-[2rem] shadow-[0_-16px_40px_-24px_rgba(13,6,36,0.35)] ${look.dark ? 'text-white' : 'text-ink'}`}
                style={{ backgroundColor: look.bg }}>
                <div className="container-x grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 lg:grid-cols-2">
                  <div className="max-w-xl">
                    {/* Outlined number */}
                    <span aria-hidden="true"
                      className="-ml-1 block select-none font-display text-[5.5rem] leading-[0.8] text-transparent sm:text-[7rem]"
                      style={{ WebkitTextStroke: `1.5px ${look.stroke}` }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-8 text-4xl leading-[1.08] sm:text-5xl">{p.title}</h3>
                    <p className={`mt-5 text-lg leading-relaxed ${look.dark ? 'text-white/70' : 'text-ink/70'}`}>{p.text}</p>

                    <Link to={hasPrograms ? `/programs?area=${p.slug}` : '/services'}
                      className={`group mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3.5 font-semibold transition ${look.dark ? 'bg-white text-ink hover:bg-cream' : 'bg-ink text-white hover:bg-royal'}`}>
                      {hasPrograms ? 'Explore programs' : 'See our services'} <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
                    </Link>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                    <img src={p.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
