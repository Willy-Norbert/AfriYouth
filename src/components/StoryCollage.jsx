// Scrapbook-style collage for "Why we exist": four torn-edge photos on a cut-paper
// backdrop, with hand-drawn doodles (sun, paper scrap, grid paper, loopy arrow).
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

function HandSun({ className = '' }) {
  const rays = [0, 32, 61, 92, 118, 150, 181, 208, 240, 268, 300, 330]
  const lengths = [14, 10, 15, 11, 14, 9, 15, 12, 13, 10, 15, 11]
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="22" fill="#ffd166" />
      {rays.map((deg, i) => (
        <line key={deg} x1="60" y1="30" x2="60" y2={30 - lengths[i]} stroke="#ffd166" strokeWidth="5"
          strokeLinecap="round" transform={`rotate(${deg} 60 60)`} />
      ))}
    </svg>
  )
}

function PaperScrap({ className = '' }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="absolute inset-0 bg-[#f3e6d3] shadow-md" style={{ clipPath: tornRect(7, 3, 8) }} />
      <svg viewBox="0 0 160 120" className="relative h-full w-full" fill="none" stroke="#8a4b2a" strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 22l30 4-14 74z" />
        <path d="M70 18l26 2-12 80z" />
        <path d="M112 44l32 46-38 4z" />
      </svg>
    </div>
  )
}

function LoopyArrow({ className = '' }) {
  return (
    <svg viewBox="0 0 160 110" fill="none" className={className} aria-hidden="true">
      <path d="M8 104c4-20 8-36 20-38s12 22 0 24-6-30 16-34 16 24 2 26-4-30 20-36 18 22 4 24 2-32 28-40 26-14 40-30"
        stroke="#e2560b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M126 12l20 2-6 19" stroke="#e2560b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
          backgroundImage: 'linear-gradient(#12093f55 1.5px, transparent 1.5px), linear-gradient(90deg, #12093f55 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }} />
      </div>

      {/* Four photos */}
      <TornPhoto src={images.team} alt="Young AfriYouth team members" seed={11} focus="50% 30%"
        className="left-[3%] top-[7%] h-[48%] w-[55%] -rotate-3" />
      <TornPhoto src={images.founder} alt="A young founder" seed={21} focus="50% 20%"
        className="left-[61%] top-[3%] h-[42%] w-[35%] rotate-3" />
      <TornPhoto src={images.workshop} alt="A youth workshop" seed={31} focus="50% 40%"
        className="left-[1%] top-[58%] h-[35%] w-[46%] rotate-2" />
      <TornPhoto src={images.celebration} alt="Young people celebrating" seed={41} focus="50% 35%"
        className="left-[50%] top-[49%] h-[44%] w-[46%] -rotate-2" />

      {/* Doodles */}
      <HandSun className="absolute -left-6 -top-6 w-24 sm:-left-10 sm:w-28" />
      <PaperScrap className="absolute right-[2%] top-[38%] h-16 w-24 rotate-[-8deg] sm:h-20 sm:w-28" />
      <LoopyArrow className="absolute bottom-[-2%] left-[30%] w-32 sm:w-40" />
    </div>
  )
}
