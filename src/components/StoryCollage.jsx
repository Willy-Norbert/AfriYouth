// Scrapbook-style collage for "Why we exist": four torn-edge photos on a cut-paper
// backdrop, with hand-drawn doodles (crayon sun, pencil sketch on kraft paper,
// grid paper, marker arrow) and paper tape.
import { images } from '../data/images'

// Small seeded random generator so the torn edges look the same on every load
function random(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// A rectangle with rough, torn-looking edges, as a CSS clip-path polygon (in %)
function tornRect(seed, amp = 1.6, steps = 14) {
  const r = random(seed)
  const j = () => (r() - 0.5) * 2 * amp
  const pts = []
  for (let i = 0; i <= steps; i++) pts.push([(i / steps) * 100, amp + j()])
  for (let i = 1; i <= steps; i++) pts.push([100 - amp + j(), (i / steps) * 100])
  for (let i = steps - 1; i >= 0; i--) pts.push([(i / steps) * 100, 100 - amp + j()])
  for (let i = steps - 1; i >= 1; i--) pts.push([amp + j(), (i / steps) * 100])
  return `polygon(${pts.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`).join(',')})`
}

// Grid paper torn along a diagonal (top-left edge)
function tornDiagonal(seed) {
  const r = random(seed)
  const pts = ['100% 0%', '100% 100%', '0% 100%']
  const steps = 18
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    pts.push(`${(t * 100 + (r() - 0.5) * 6).toFixed(2)}% ${(100 - t * 100 + (r() - 0.5) * 6).toFixed(2)}%`)
  }
  return `polygon(${pts.join(',')})`
}

// One photo with torn edges and a soft shadow.
// `focus` sets which part of the photo stays in view (e.g. faces near the top).
function TornPhoto({ src, alt = '', seed, focus = '50% 35%', className = '' }) {
  return (
    <div className={`absolute drop-shadow-lg ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full bg-sky object-cover"
        style={{ clipPath: tornRect(seed, 1.1, 22), objectPosition: focus }} />
    </div>
  )
}

// SVG filters that make the doodles look hand-made: wobbly edges + dry-marker / pencil grain.
// Defined once per collage; ids are fixed because there is only one collage on a page.
function DoodleFilters() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        {/* Felt-tip marker: slightly wobbly edge, fine grain, a little see-through */}
        <filter id="ay-marker" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="wobble" />
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="11" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.75 0 0 0 1.45" result="grainAlpha" />
          <feComposite in="shape" in2="grainAlpha" operator="in" />
        </filter>
        {/* Crayon / pencil: rougher edge and stronger grain */}
        <filter id="ay-pencil" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="9" result="wobble" />
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale="2" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="2" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.6 0 0 0 1.35" result="grainAlpha" />
          <feComposite in="shape" in2="grainAlpha" operator="in" />
        </filter>
      </defs>
    </svg>
  )
}

// Zigzag "colouring-in" strokes that fill a circle, like a crayon scribble
function scribbleCircle(cx, cy, r, gap = 4.2, angle = -28) {
  const a = (angle * Math.PI) / 180
  const cos = Math.cos(a), sin = Math.sin(a)
  const rand = random(17)
  const pts = []
  let flip = false
  for (let d = -r + gap / 2; d < r; d += gap) {
    const half = Math.sqrt(r * r - d * d) * (0.9 + rand() * 0.12)
    const ends = flip ? [half, -half] : [-half, half]
    ends.forEach((t) => pts.push([cx + t * cos - d * sin, cy + t * sin + d * cos]))
    flip = !flip
  }
  return 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')
}

function HandSun({ className = '' }) {
  const rays = [0, 32, 61, 92, 118, 150, 181, 208, 240, 268, 300, 330]
  const lengths = [14, 10, 15, 11, 14, 9, 15, 12, 13, 10, 15, 11]
  const bend = [3, -2, 2, -3, 2, -2, 3, -1, 2, -3, 1, -2]
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g filter="url(#ay-pencil)" fill="none" stroke="#9d8cff" strokeLinecap="round" strokeLinejoin="round">
        {/* crayon colouring-in, then a quick outline drawn twice */}
        <path d={scribbleCircle(60, 60, 21)} strokeWidth="3.6" opacity="0.9" />
        <path d="M60 37c13-1 24 9 23 23s-10 23-23 23-24-10-23-23 10-23 25-23" strokeWidth="3" stroke="#7e1ced" opacity="0.85" />
        <path d="M58 38c14 0 23 10 23 22" strokeWidth="2" stroke="#7e1ced" opacity="0.5" />
        {rays.map((deg, i) => (
          <path key={deg} d={`M60 31q${bend[i]} ${-lengths[i] / 2} 0 ${-lengths[i]}`} strokeWidth="4.2"
            stroke="#7e1ced" transform={`rotate(${deg} 60 60)`} />
        ))}
      </g>
    </svg>
  )
}

// Kraft-paper scrap with a pencil sketch of three triangles
const kraft = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' seed='5'/%3E%3CfeColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.33 0 0 0 0 0.2 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`

function PaperScrap({ className = '' }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="absolute inset-0 shadow-md" style={{ clipPath: tornRect(7, 3, 8), backgroundColor: '#e9d8bd', backgroundImage: kraft }} />
      <svg viewBox="0 0 160 120" className="relative h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g filter="url(#ay-pencil)" stroke="#0200a7">
          {/* each triangle sketched twice, slightly off, like a real pencil drawing */}
          <path d="M22 22l30 4-14 74z" strokeWidth="4" />
          <path d="M24 20l29 7-13 72" strokeWidth="1.6" opacity="0.6" />
          <path d="M70 18l26 2-12 80z" strokeWidth="4" />
          <path d="M68 20l29 1-14 78" strokeWidth="1.6" opacity="0.6" />
          <path d="M112 44l32 46-38 4z" strokeWidth="4" stroke="#c723df" />
          <path d="M114 46l29 43-36 6" strokeWidth="1.6" stroke="#c723df" opacity="0.6" />
        </g>
      </svg>
    </div>
  )
}

function LoopyArrow({ className = '' }) {
  // The line ends at (138, 0) heading up-right; the head is one "V" stroke
  // (wing → tip → wing) drawn along that same direction, so it reads as one marker line.
  // overflow-visible: the tip sits on the top edge of the drawing, so don't clip it.
  const d = 'M8 104c4-20 8-36 20-38s12 22 0 24-6-30 16-34 16 24 2 26-4-30 20-36 18 22 4 24 2-32 28-40 26-14 40-30'
  const head = 'M120.5 6.5Q129 2.6 138 0Q136.4 8.5 136.6 17.5'
  return (
    <svg viewBox="0 0 160 110" fill="none" className={`overflow-visible ${className}`} aria-hidden="true">
      <g filter="url(#ay-marker)" stroke="#a01bb4" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} strokeWidth="6.5" />
        <path d={head} strokeWidth="6.5" />
        {/* a second, lighter pass where the marker went over itself */}
        <path d={d} strokeWidth="2.4" transform="translate(1.2 -1)" stroke="#e57cf2" opacity="0.6" />
        <path d={head} strokeWidth="2.2" transform="translate(1 -0.8)" stroke="#e57cf2" opacity="0.6" />
      </g>
    </svg>
  )
}

// A strip of semi-transparent paper tape with torn ends
function Tape({ className = '', color = 'rgba(246, 220, 251, 0.78)' }) {
  return (
    <div aria-hidden="true" className={`absolute z-10 h-7 w-24 shadow-sm ${className}`}
      style={{
        backgroundColor: color,
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 2px, transparent 2px 6px)',
        clipPath: 'polygon(0 8%, 4% 0, 8% 10%, 12% 2%, 88% 0, 92% 9%, 96% 1%, 100% 10%, 100% 92%, 96% 100%, 92% 90%, 88% 99%, 12% 100%, 8% 91%, 4% 100%, 0 92%)',
      }} />
  )
}

export default function StoryCollage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      {/* Cut-paper backdrop */}
      <div className="absolute inset-[9%_6%_7%_8%] rotate-2 bg-royal" style={{ clipPath: tornRect(3, 0.9, 30) }} />

      {/* Grid paper peeking out behind the photos */}
      <div className="absolute -right-3 top-[40%] h-40 w-32 sm:-right-6" aria-hidden="true">
        <div className="h-full w-full" style={{
          clipPath: tornDiagonal(5),
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(#0d062455 1.5px, transparent 1.5px), linear-gradient(90deg, #0d062455 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }} />
      </div>

      {/* Four photos */}
      <TornPhoto src={images.team} alt="Young AfriYouth team members" seed={11} focus="50% 30%"
        className="left-[3%] top-[7%] h-[48%] w-[55%] -rotate-3" />
      <TornPhoto src={images.soldering} alt="A young innovator building a prototype" seed={21} focus="50% 20%"
        className="left-[61%] top-[3%] h-[42%] w-[35%] rotate-3" />
      <TornPhoto src={images.fieldEngineers} alt="Young engineers at work" seed={31} focus="50% 40%"
        className="left-[1%] top-[58%] h-[35%] w-[46%] rotate-2" />
      <TornPhoto src={images.celebration} alt="Young people celebrating" seed={41} focus="50% 35%"
        className="left-[50%] top-[49%] h-[44%] w-[46%] -rotate-2" />

      {/* Tape holding the photos down */}
      <Tape className="left-[70%] top-[0.5%] rotate-[8deg]" />
      <Tape className="left-[16%] top-[4%] -rotate-[10deg]" color="rgba(236, 236, 255, 0.8)" />
      <Tape className="left-[63%] top-[46.5%] -rotate-[4deg]" />

      {/* Doodles */}
      <DoodleFilters />
      <HandSun className="absolute -left-6 -top-6 w-24 sm:-left-10 sm:w-28" />
      <PaperScrap className="absolute right-[2%] top-[38%] h-16 w-24 rotate-[-8deg] sm:h-20 sm:w-28" />
      <LoopyArrow className="absolute -bottom-[10%] left-[32%] w-24 -rotate-6 sm:-bottom-[16%] sm:left-[30%] sm:w-36" />
    </div>
  )
}
