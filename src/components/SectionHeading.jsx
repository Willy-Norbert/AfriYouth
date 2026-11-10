// Small label + big title + optional intro text.
export default function SectionHeading({ eyebrow, title, text, light = false, center = false }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`mb-3 text-sm font-bold uppercase tracking-[0.2em] ${light ? 'text-sun' : 'text-tangerine'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl font-extrabold sm:text-5xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg ${light ? 'text-white/75' : 'text-ink/70'}`}>{text}</p>}
    </div>
  )
}
