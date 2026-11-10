import { Link } from 'react-router-dom'

// Top banner for inner pages, with breadcrumb.
export default function PageBanner({ eyebrow, title, text, image }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {image && <img src={image} alt="" className="absolute inset-0 size-full object-cover opacity-25" />}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="container-x relative py-20 sm:py-28">
        <nav className="mb-6 text-sm text-white/60" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">Home</Link> <span className="mx-2">/</span>
          <span className="text-sun">{eyebrow}</span>
        </nav>
        <h1 className="max-w-3xl text-4xl font-extrabold sm:text-6xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg text-white/75">{text}</p>}
      </div>
    </section>
  )
}
