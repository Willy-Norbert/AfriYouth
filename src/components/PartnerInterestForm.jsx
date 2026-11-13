import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Choice, Input, Select, Textarea, countries } from './ApplicationForm'
import useFormSubmit from './useFormSubmit'

const orgTypes = ['Development partner / donor', 'Government institution', 'University / research institute',
  'Foundation', 'NGO / civil society', 'Innovation hub', 'Private company', 'Other']
const ways = ['Fund or co-fund', 'Share data or expertise', 'Co-design the work', 'Host or convene', 'Mentor or invest in solutions', 'Use the findings']

// Short expression-of-interest form for partnership calls (organisations, not individuals).
export default function PartnerInterestForm({ opportunity }) {
  const { status, handleSubmit } = useFormSubmit(`Partnership interest: ${opportunity.title}`)
  const [chosen, setChosen] = useState([])
  const [message, setMessage] = useState('')
  const toggle = (e) => setChosen((c) => (e.target.checked ? [...c, e.target.value] : c.filter((x) => x !== e.target.value)))

  if (status === 'sent') {
    return (
      <div className="border-t-4 border-tangerine bg-cream p-10 text-center" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-ink text-sun"><Check className="size-8" /></span>
        <h2 className="mt-6 text-3xl">Thank you for your interest</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">Our partnerships team will get back to you within a week to set up a first conversation.</p>
        <Link to="/services" className="mt-8 inline-block font-bold text-royal underline decoration-2 underline-offset-4">See how we work with organisations</Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="q-list space-y-6">
      <input type="hidden" name="opportunity" value={opportunity.title} />
      <input type="hidden" name="interests" value={chosen.join(', ')} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Organisation" name="organisation" required />
        <Select label="Type of organisation" name="orgType" required options={orgTypes} />
        <Input label="Your name" name="name" required autoComplete="name" />
        <Input label="Your role" name="role" required placeholder="e.g. Programme Manager" />
        <Input label="Work email" name="email" type="email" required autoComplete="email" />
        <Select label="Country" name="country" required options={countries} />
      </div>
      <div>
        <p className="q-label text-[15px] font-semibold">How would you like to take part?</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {ways.map((w) => (
            <Choice key={w} type="checkbox" name="way" value={w} checked={chosen.includes(w)} onChange={toggle}>{w}</Choice>
          ))}
        </div>
      </div>
      <Textarea label="Anything we should know?" name="message" max={800} value={message} onChange={(e) => setMessage(e.target.value)}
        hint="Your goals, timeline or questions. Optional." />
      {status === 'error' && <p className="text-sm font-semibold text-coral">Something went wrong. Please try again.</p>}
      <div className="border-t-2 border-ink pt-6">
        <button disabled={status === 'sending'}
          className="group inline-flex items-center gap-2 bg-tangerine px-7 py-3.5 font-bold text-ink transition hover:bg-sun disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send expression of interest'}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  )
}
