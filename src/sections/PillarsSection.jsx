import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { colors } from '../components/colors'
import { pillars } from '../data/pillars'

// Soft background for each work-area panel (in order)
const panelBg = ['bg-[#eceffe]', 'bg-[#efeafe]', 'bg-[#fff0e3]', 'bg-[#ffe9da]', 'bg-[#e8ebff]', 'bg-[#fff5ec]']

// "What we do": intro at the top, then six full-width panels that stack
// on top of each other as you scroll (each one sticks under the navbar).
export default function PillarsSection() {
  return (
    <section className="pt-24">
      <div className="container-x flex flex-col justify-between gap-6 pb-14 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-4xl sm:text-5xl">What we do</h2>
          <p className="mt-5 max-w-xl text-lg text-ink/70">
            We work across six areas. Most projects use several at once: a study becomes a policy brief,
            the brief becomes a pilot, and the pilot becomes a venture.
          </p>
        </div>
        <Link to="/services" className="w-fit shrink-0 border-b-2 border-ink pb-1 font-bold hover:text-royal">
          Services for organisations
        </Link>
      </div>

      <ol>
        {pillars.map((p, i) => {
          const c = colors[p.color]
          return (
            <li key={p.slug} className="sticky top-20">
              <div className={`min-h-[calc(100vh-5rem)] rounded-t-[2rem] shadow-[0_-16px_40px_-24px_rgba(18,9,63,0.35)] ${panelBg[i % panelBg.length]}`}>
                <div className="container-x grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 lg:grid-cols-2">
                  <div>
                    <span className={`font-display text-6xl sm:text-7xl ${c.text}`}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-6 text-4xl sm:text-5xl">{p.title}</h3>
                    <p className="mt-5 max-w-md text-lg text-ink/70">{p.text}</p>
                    <Link to={`/programs?area=${p.slug}`}
                      className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white transition hover:bg-royal">
                      Explore programs <ArrowUpRight className="size-5 transition group-hover:rotate-45" />
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
