import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { pillars } from '../data/pillars'

// A distinct look for each work-area panel (in order): background, whether it's
// dark (white text), and the colour of the big outlined number.
const panels = [
  { bg: '#dfe5ff', dark: false, stroke: '#1800ad' }, // light blue
  { bg: '#12093f', dark: true, stroke: '#ff9756' },  // deep indigo
  { bg: '#ffe2cc', dark: false, stroke: '#e2560b' }, // peach
  { bg: '#ff751f', dark: false, stroke: '#12093f' }, // orange
  { bg: '#1800ad', dark: true, stroke: '#ffd166' },  // royal blue
  { bg: '#ffd166', dark: false, stroke: '#1800ad' }, // sunny yellow
]

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
          const look = panels[i % panels.length]
          return (
            <li key={p.slug} className="sticky top-20">
              <div className={`min-h-[calc(100vh-5rem)] rounded-t-[2rem] shadow-[0_-16px_40px_-24px_rgba(18,9,63,0.35)] ${look.dark ? 'text-white' : 'text-ink'}`}
                style={{ backgroundColor: look.bg }}>
                <div className="container-x grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 lg:grid-cols-2">
                  <div>
                    {/* Big outlined number that fades out, like on the Services page */}
                    <span aria-hidden="true"
                      className="-ml-2 block select-none font-display text-[8rem] leading-[0.85] text-transparent sm:text-[10rem]"
                      style={{
                        WebkitTextStroke: `2.5px ${look.stroke}`,
                        maskImage: 'linear-gradient(to bottom, #000 35%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, #000 35%, transparent 100%)',
                      }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="-mt-2 text-4xl sm:-mt-3 sm:text-5xl">{p.title}</h3>
                    <p className={`mt-5 max-w-md text-lg ${look.dark ? 'text-white/75' : 'text-ink/75'}`}>{p.text}</p>
                    <Link to={`/programs?area=${p.slug}`}
                      className={`group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold transition ${look.dark ? 'bg-white text-ink hover:bg-sun' : 'bg-ink text-white hover:bg-royal'}`}>
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
