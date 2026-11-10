import { useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import ContactForm from '../components/ContactForm'
import { site } from '../data/site'
import { images } from '../data/images'

const details = [
  ['Office', site.address],
  ['Email', site.email],
  ['Phone', site.phone],
  ['Hours', 'Mon – Fri, 8:00 – 17:00 CAT'],
]

export default function Contact() {
  const [params] = useSearchParams()
  return (
    <>
      <PageBanner eyebrow="Contact" title="Get in touch"
        text="Whether you're looking for an opportunity, a service or a partnership, write to us and the right person will reply."
        image={images.laptopGroup} />
      <section className="py-20">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_2fr]">
          <dl className="h-fit border-t-2 border-ink">
            {details.map(([label, value]) => (
              <div key={label} className="border-b border-ink/15 py-5">
                <dt className="text-xs font-bold uppercase tracking-widest text-ink/50">{label}</dt>
                <dd className="mt-1 text-lg">{value}</dd>
              </div>
            ))}
          </dl>
          <ContactForm topic={params.get('topic') || 'general'} />
        </div>
      </section>
    </>
  )
}
