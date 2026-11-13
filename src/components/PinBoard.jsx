import { useLayoutEffect, useRef, useState } from 'react'

// Paper cards pinned to a board, joined by a piece of string from pin to pin.
// Pins and string are drawn in one layer above the cards, measured from the layout,
// so they follow the cards on any screen size.
//   rope      – draw a thick twisted rope instead of thin string (for dark sections)
//   listClass – layout of the cards (defaults to one row on large screens)
const tilt = [-3, 2, -1.5, 2.5, -2, 1.5]
const pinColor = ['#c723df', '#0301ff', '#7e1ced', '#c723df', '#0301ff', '#7e1ced']

export default function PinBoard({ steps, rope = false, listClass = 'flex flex-wrap justify-center gap-x-8 gap-y-14 lg:flex-nowrap lg:justify-between lg:gap-x-4' }) {
  const boxRef = useRef(null)
  const cardRefs = useRef([])
  const [pins, setPins] = useState([])
  const [boardWidth, setBoardWidth] = useState(0)

  useLayoutEffect(() => {
    function measure() {
      const box = boxRef.current
      if (!box) return
      const b = box.getBoundingClientRect()
      setBoardWidth(b.width)
      setPins(cardRefs.current.map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2 - b.left, y: r.top - b.top + 6 }
      }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(boxRef.current)
    return () => ro.disconnect()
  }, [steps.length])

  // String between neighbouring pins, sagging a little (more on longer pieces)
  // Pieces that jump to the next row (on small screens) run behind the paper so they
  // never cover the words; pieces along a row run over the paper.
  const strings = pins.slice(0, -1).map((a, i) => {
    const c = pins[i + 1]
    const sameRow = Math.abs(a.y - c.y) < 40
    const sag = sameRow ? 22 + Math.abs(c.x - a.x) * 0.08 : 34
    return { sameRow, d: `M${a.x} ${a.y}Q${(a.x + c.x) / 2} ${Math.max(a.y, c.y) + sag} ${c.x} ${c.y}` }
  })
  // Rope mode: one rope per row, edge to edge, sagging between pins (like a clothesline)
  const ropeRows = []
  if (rope && pins.length) {
    const width = boardWidth
    let row = [pins[0]]
    for (let i = 1; i < pins.length; i++) {
      if (Math.abs(pins[i].y - row[0].y) < 40) row.push(pins[i])
      else { ropeRows.push(row); row = [pins[i]] }
    }
    ropeRows.push(row)
    ropeRows.forEach((r, k) => {
      const pts = [{ x: -24, y: r[0].y - 10 }, ...r, { x: width + 24, y: r[r.length - 1].y - 10 }]
      let d = `M${pts[0].x} ${pts[0].y}`
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], c = pts[i]
        d += `Q${(a.x + c.x) / 2} ${Math.max(a.y, c.y) + 16 + Math.abs(c.x - a.x) * 0.05} ${c.x} ${c.y}`
      }
      ropeRows[k] = { d }
    })
  }

  const drawString = ({ d }, i) => rope ? (
    <g key={i}>
      {/* rope: shadow, body, then short diagonal dashes for the twist */}
      {/* rope: shadow, body, then two offset strands so it reads as twisted fibre */}
      <path d={d} fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="5" transform="translate(2 6)" />
      <path d={d} fill="none" stroke="#c4a679" strokeWidth="5" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#8f7049" strokeWidth="2" strokeDasharray="5 4" transform="translate(0 1.1)" />
      <path d={d} fill="none" stroke="#ecdcbd" strokeWidth="1.8" strokeDasharray="5 4" strokeDashoffset="4.5" transform="translate(0 -1.1)" />
    </g>
  ) : (
    <g key={i}>
      <path d={d} fill="none" stroke="#0d0624" strokeOpacity="0.14" strokeWidth="3" transform="translate(2 4)" />
      <path d={d} fill="none" stroke="#a01bb4" strokeWidth="2" strokeLinecap="round" />
    </g>
  )

  return (
    <div ref={boxRef} className="relative">
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {!rope && strings.filter((x) => !x.sameRow).map(drawString)}
      </svg>
      <ol className={`relative ${listClass}`}>
        {steps.map((step, i) => (
          <li key={step} ref={(el) => { cardRefs.current[i] = el }}
            style={{ transform: `rotate(${tilt[i % tilt.length]}deg)` }}>
            <div className="min-w-28 bg-white px-5 pb-4 pt-7 text-center text-ink shadow-[0_10px_24px_-12px_rgba(13,6,36,0.4)] ring-1 ring-ink/5">
              <span className="block text-xs font-semibold tracking-[0.2em] text-ink/40">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-1 block font-display text-xl font-bold text-royal">{step}</span>
            </div>
          </li>
        ))}
      </ol>

      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          {pinColor.map((c, i) => (
            <radialGradient key={i} id={`pin${i}`} cx="35%" cy="30%" r="70%">
              <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="0.28" stopColor={c} />
              <stop offset="1" stopColor={c} stopOpacity="1" />
            </radialGradient>
          ))}
        </defs>
        {/* string along each row, with a soft shadow on the paper */}
        {rope ? ropeRows.map(drawString) : strings.filter((x) => x.sameRow).map(drawString)}
        {/* pins on top */}
        {pins.map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <ellipse cx="3" cy="5" rx="8" ry="6" fill="#0d0624" opacity="0.22" />
            <circle r="9" fill={`url(#pin${i % pinColor.length})`} />
            <circle r="9" fill="none" stroke="#0d0624" strokeOpacity="0.15" />
          </g>
        ))}
      </svg>
    </div>
  )
}
