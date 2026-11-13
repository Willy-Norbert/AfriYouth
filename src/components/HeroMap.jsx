import africa from '../data/africa.json'
import { activeCountries } from '../data/countries'
import MapPatterns from './MapPatterns'
import { mapFills } from './colors'

// Calm map of Africa: countries we work in wear textile patterns, the selected
// one turns dark. Every country darkens slightly when the mouse passes over it.
// Clicking (or tabbing to) a country chooses it: countries we work in become
// `selected`, the others are just `peeked` at.
export default function HeroMap({ selected, peek, onSelect, onPeek }) {
  const spot = africa.find((c) => c.name === (peek || selected))

  function choose(name) {
    if (activeCountries[name]) {
      onSelect(name)
      onPeek(null)
    } else {
      onPeek(name)
    }
  }

  return (
    <svg viewBox="0 0 600 640" className="h-auto w-full" role="group" aria-label="Map of Africa">
      <MapPatterns />
      {africa.map((c, i) => {
        const active = activeCountries[c.name]
        const fill = selected === c.name && !peek ? '#0d0624'
          : peek === c.name ? '#7f87cc'
          : active ? mapFills[(i * 7) % mapFills.length] : '#d3d6ec'
        return (
          <path key={c.id} d={c.d} fill={fill} stroke="#f1f2fb" strokeWidth="1.5" strokeLinejoin="round"
            className="cursor-pointer transition-[fill,filter] duration-200 hover:brightness-[0.82] focus:outline-none"
            tabIndex={0}
            onFocus={() => choose(c.name)}
            onClick={() => choose(c.name)}>
            <title>{c.name}</title>
          </path>
        )
      })}
      {/* Dot on the country in focus, so small countries are easy to see */}
      {spot && (
        <g className="pointer-events-none">
          <circle cx={spot.cx} cy={spot.cy} r="14" fill="#c723df" opacity=".35" className="animate-ping" style={{ transformOrigin: `${spot.cx}px ${spot.cy}px` }} />
          <circle cx={spot.cx} cy={spot.cy} r="8" fill="#c723df" stroke="#fff" strokeWidth="2.5" />
        </g>
      )}
    </svg>
  )
}
