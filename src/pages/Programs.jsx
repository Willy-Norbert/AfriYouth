import { useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import ProgramCard from '../components/ProgramCard'
import { programs } from '../data/programs'
import { pillars } from '../data/pillars'
import { images } from '../data/images'

export default function Programs() {
  const [params, setParams] = useSearchParams()
  const area = params.get('area') || 'all'
  const list = area === 'all' ? programs : programs.filter((p) => p.pillar === area)
  const tabs = [{ slug: 'all', title: 'All programs' }, ...pillars]

  return (
    <>
      <PageBanner eyebrow="Programs" title="Programs that turn potential into leadership."
        text="Choose a program by area. Each one shows who it's for, what you'll gain and how to join." image={images.workshop} curve="arch" />
      <section className="py-16">
        <div className="container-x">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter programs by area">
            {tabs.map((t) => (
              <button key={t.slug} role="tab" aria-selected={area === t.slug}
                onClick={() => setParams(t.slug === 'all' ? {} : { area: t.slug })}
                className={`rounded-md px-5 py-2 font-medium transition ${area === t.slug ? 'bg-ink text-white' : 'bg-sky hover:bg-ink/10'}`}>
                {t.title}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <ProgramCard key={p.slug} program={p} />)}
          </div>
        </div>
      </section>
    </>
  )
}
