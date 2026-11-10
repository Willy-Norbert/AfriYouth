import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroMap from '../components/HeroMap'
import africa from '../data/africa.json'
import { activeCountries } from '../data/countries'
import { programs } from '../data/programs'

// Where each photo card sits around the map on large screens
const cardPositions = ['lg:left-0 lg:top-[36%]', 'lg:left-[12%] lg:top-[52%]', 'lg:right-0 lg:top-[46%]']
const countryNames = Object.keys(activeCountries)
const MAP_WIDTH = 600 // width of the map's viewBox

export default function Hero() {
  const [selected, setSelected] = useState('Rwanda')
  const [hovered, setHovered] = useState(null)
  const [peek, setPeek] = useState(null) // a country we don't work in yet, being hovered
  const [lines, setLines] = useState([])
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const cardRefs = useRef([])

  const country = activeCountries[selected]
  const countryPrograms = country.programs.map((slug) => programs.find((p) => p.slug === slug))
  const cards = countryPrograms.slice(0, 3)

  // Connector lines: from each photo card to every country that runs that program.
  // Measured from the page layout, so they follow the cards on any screen size (desktop only).
  useLayoutEffect(() => {
    function measure() {
      const box = containerRef.current
      const map = mapRef.current
      if (!box || !map || !window.matchMedia('(min-width: 1024px)').matches) return setLines([])
      const b = box.getBoundingClientRect()
      const m = map.getBoundingClientRect()
      const scale = m.width / MAP_WIDTH
      const next = []
      cards.forEach((p, i) => {
        const el = cardRefs.current[i]
        if (!el) return
        const c = el.getBoundingClientRect()
        const leftOfMap = c.left + c.width / 2 < m.left + m.width / 2
        const x1 = (leftOfMap ? c.right : c.left) - b.left
        const y1 = c.top + c.height / 2 - b.top
        countryNames
          .filter((name) => activeCountries[name].programs.includes(p.slug))
          .forEach((name) => {
            const spot = africa.find((a) => a.name === name)
            if (!spot) return
            const x2 = m.left - b.left + spot.cx * scale
            const y2 = m.top - b.top + spot.cy * scale
            const mx = (x1 + x2) / 2
            next.push({ key: `${p.slug}-${name}`, slug: p.slug, x1, y1, x2, y2, d: `M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}` })
          })
      })
      setLines(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(containerRef.current)
    cardRefs.current.forEach((el) => el && ro.observe(el))
    return () => ro.disconnect()
  }, [selected]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(#eceffe_0_44%,#fff5ec_44%)]">
      <div ref={containerRef} className="container-x relative pb-20 pt-14 lg:min-h-[860px]">
        <h1 className="font-hero text-center text-5xl leading-none sm:text-7xl lg:text-8xl">Built by Africa's youth</h1>
        <p className="mx-auto mt-5 max-w-sm text-center text-ink/70">
          Research, policy and innovation led by young people, in {countryNames.length} countries and growing.
        </p>
        <p className="mt-3 text-center">
          <Link to="/programs"
            className="text-sm font-bold text-royal underline decoration-2 underline-offset-4 hover:text-ink">
            View all programs
          </Link>
        </p>

        <div ref={mapRef} className="relative mx-auto mt-6 w-full max-w-md lg:max-w-[520px]">
          <HeroMap selected={selected} peek={peek} onSelect={setSelected} onPeek={setPeek} />
        </div>

        {/* Connector lines between program cards and countries (desktop) */}
        {lines.length > 0 && (
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" aria-hidden="true">
            {lines.map((l) => {
              const on = hovered === l.slug
              const dim = hovered && !on
              const color = on ? '#ff751f' : '#1800ad'
              return (
                <g key={l.key} className="transition-opacity duration-300" opacity={dim ? 0.12 : on ? 1 : 0.45}>
                  <path d={l.d} fill="none" stroke={color} strokeWidth={on ? 2 : 1.3}
                    strokeDasharray="4 5" strokeLinecap="round" className={on ? 'animate-dash' : ''} />
                  <circle cx={l.x2} cy={l.y2} r={on ? 4 : 3} fill={color} stroke="#fff" strokeWidth="1.5" />
                  <circle cx={l.x1} cy={l.y1} r="3" fill={color} />
                </g>
              )
            })}
          </svg>
        )}

        {/* Selected country, bottom left */}
        <div className="mt-8 text-center lg:absolute lg:bottom-14 lg:left-8 lg:mt-0 lg:text-left" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Where we work</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight">{peek || selected}</p>
          <p className="mt-1 text-sm text-ink/55">
            {peek ? 'No programs here yet' : `${countryPrograms.length} programs${country.hub ? ' · Headquarters' : ''}`}
          </p>
        </div>

        {/* Short statement, bottom right */}
        <p className="mx-auto mt-6 max-w-xs text-center text-ink/70 lg:absolute lg:bottom-16 lg:right-8 lg:mx-0 lg:mt-0 lg:max-w-[15rem] lg:text-left">
          Turning youth-led evidence into better policy and lasting solutions across Africa.
        </p>

        {/* Photo cards: in a row on phones, floating around the map on desktop */}
        <div className="mt-6 grid grid-cols-3 gap-3 lg:contents">
          {cards.map((p, i) => (
            <Link key={p.slug} to={`/programs/${p.slug}`} ref={(el) => { cardRefs.current[i] = el }}
              onMouseEnter={() => setHovered(p.slug)} onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(p.slug)} onBlur={() => setHovered(null)}
              className={`group block rounded-lg bg-white/80 p-2 shadow-sm ring-1 ring-ink/5 transition hover:shadow-lg lg:absolute lg:z-10 lg:w-36 ${cardPositions[i]}`}>
              <img src={p.image} alt="" className="aspect-[4/3] w-full rounded-md bg-[#d3d6ec] object-cover" />
              <p className="mt-2 px-1 text-center text-xs font-bold leading-snug">{p.title}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Curved bottom edge, in the colour of the next section */}
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full sm:h-14">
        <path d="M0 0Q720 120 1440 0V60H0z" fill="#ffe9da" />
      </svg>
    </section>
  )
}
