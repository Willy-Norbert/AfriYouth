import { Link } from 'react-router-dom'

// Curved bottom edges for the inner-page banners. Each page uses a different
// one so they don't all look the same. Drawn in a 1440×60 box, filled white
// (the colour of the section below every banner).
const curves = {
  dip: 'M0 0Q720 120 1440 0V60H0z',                                  // dips down in the middle
  arch: 'M0 60Q720 -60 1440 60z',                                    // rises up in the middle
  wave: 'M0 30C240 0 480 0 720 30S1200 60 1440 30V60H0z',            // one gentle wave
  ripple: 'M0 22C180 50 360 50 540 26S900 2 1080 26 1380 46 1440 36V60H0z', // smaller double wave
  swoopRight: 'M0 52C600 52 1100 40 1440 0V60H0z',                   // sweeps up to the right
  swoopLeft: 'M0 0C340 40 840 52 1440 52V60H0z',                     // sweeps up to the left
  sCurve: 'M0 8C360 8 540 52 900 52S1260 30 1440 18V60H0z',          // lazy S
  tilt: 'M0 0C480 70 960 60 1440 28V60H0z',                          // off-centre dip
}

// Top banner for inner pages, with breadcrumb.
// `curve` picks one of the shapes above for the bottom edge.
export default function PageBanner({ eyebrow, title, text, image, curve }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {image && <img src={image} alt="" className="absolute inset-0 size-full object-cover opacity-25" />}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className={`container-x relative py-20 sm:py-28 ${curve ? 'pb-28 sm:pb-36' : ''}`}>
        <nav className="mb-6 text-sm text-white/60" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">Home</Link> <span className="mx-2">/</span>
          <span className="text-sun">{eyebrow}</span>
        </nav>
        <h1 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg text-white/75">{text}</p>}
      </div>
      {curves[curve] && (
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-px h-[42px] w-full sm:h-[58px]">
          <path d={curves[curve]} fill="#ffffff" />
        </svg>
      )}
    </section>
  )
}
