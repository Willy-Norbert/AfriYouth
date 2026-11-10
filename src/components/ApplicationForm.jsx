import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { site } from '../data/site'

// Full application form, in four steps with a progress bar.
// Answers are kept in this browser as a draft until the person submits.

const countries = ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon',
  'Central African Republic', 'Chad', 'Comoros', 'Congo', "Côte d'Ivoire", 'DR Congo', 'Djibouti', 'Egypt',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau',
  'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco',
  'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'São Tomé and Príncipe', 'Senegal', 'Seychelles',
  'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda',
  'Zambia', 'Zimbabwe', 'Other (outside Africa)']

const steps = ['Personal details', 'Background', 'Your application', 'Review & submit']
const intros = [
  "Let's start with the basics.",
  "Tell us where you're at right now.",
  'This is the part we read most closely.',
  'One last look before you send it.',
]

// Woven kente-style fill for the progress strip
const kente = 'repeating-linear-gradient(90deg, #ff751f 0 14px, #12093f 14px 20px, #ffd166 20px 26px, #1800ad 26px 40px, #e2560b 40px 46px)'
const languages = ['English', 'French', 'Kinyarwanda', 'Swahili', 'Portuguese', 'Arabic', 'Amharic', 'Other']
const MOTIVATION_MAX = 1500

// --- Small form building blocks (boxed inputs, like most application portals) ---
const box = 'mt-1.5 w-full border-2 border-ink/15 bg-white px-4 py-3 text-base outline-none transition placeholder:text-ink/35 focus:border-tangerine'

function Label({ text, required, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold">{text}{required && <span className="text-coral"> *</span>}</span>
      {hint && <span className="mt-0.5 block text-xs text-ink/55">{hint}</span>}
      {children}
    </label>
  )
}

function Input({ label, hint, className, ...props }) {
  return <Label text={label} required={props.required} hint={hint} className={className}><input {...props} className={box} /></Label>
}

function Select({ label, hint, options, className, ...props }) {
  return (
    <Label text={label} required={props.required} hint={hint} className={className}>
      <select {...props} className={box}>
        <option value="">Choose…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Label>
  )
}

function Textarea({ label, hint, max, className, ...props }) {
  const length = (props.value || '').length
  return (
    <Label text={label} required={props.required} hint={hint} className={className}>
      <textarea {...props} maxLength={max} className={`${box} min-h-36 leading-relaxed`} />
      {max && <span className={`mt-1 block text-right text-xs ${length > max * 0.9 ? 'text-coral' : 'text-ink/45'}`}>{length} / {max}</span>}
    </Label>
  )
}

function Choice({ type, name, value, checked, onChange, children }) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 border-2 px-4 py-3 transition ${checked ? 'border-ink bg-ink text-white' : 'border-ink/15 hover:border-ink/40'}`}>
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="size-4 accent-tangerine" />
      <span className="text-sm">{children}</span>
    </label>
  )
}

export default function ApplicationForm({ opportunity }) {
  const draftKey = `afriyouth-application-${opportunity.slug}`
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(draftKey)) || { languages: [] } } catch { return { languages: [] } }
  })
  const stepRef = useRef(null)
  const topRef = useRef(null)

  // Keep a draft in this browser so nothing is lost on refresh
  useEffect(() => {
    try { localStorage.setItem(draftKey, JSON.stringify(data)) } catch { /* storage unavailable */ }
  }, [data, draftKey])

  const set = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }))
  const toggleLanguage = (e) => setData((d) => ({
    ...d,
    languages: e.target.checked ? [...(d.languages || []), e.target.value] : (d.languages || []).filter((l) => l !== e.target.value),
  }))
  const bind = (name) => ({ name, value: data[name] || '', onChange: set })

  function go(to) {
    setError('')
    setStep(to)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Only move on when every required field in this step is filled in correctly
  function next() {
    const fields = [...stepRef.current.querySelectorAll('input, select, textarea')]
    const bad = fields.find((f) => !f.checkValidity())
    if (bad) return bad.reportValidity()
    if (step === 1 && !data.occupation) return setError('Please tell us what you are doing now.')
    if (step === 1 && !(data.languages || []).length) return setError('Please choose at least one language you speak.')
    go(step + 1)
  }

  async function submit(e) {
    e.preventDefault()
    if (step < steps.length - 1) return next()
    const fields = [...stepRef.current.querySelectorAll('input')]
    const bad = fields.find((f) => !f.checkValidity())
    if (bad) return bad.reportValidity()
    setStatus('sending')
    const payload = { ...data, languages: (data.languages || []).join(', '), opportunity: opportunity.title }
    if (!site.formAccessKey) { // demo mode: no form key set yet
      setTimeout(() => { setStatus('sent'); try { localStorage.removeItem(draftKey) } catch { /* ignore */ } }, 700)
      return
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, subject: `New application: ${opportunity.title}`, access_key: site.formAccessKey }),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) try { localStorage.removeItem(draftKey) } catch { /* ignore */ }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-t-4 border-tangerine bg-cream p-10 text-center" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-ink text-sun"><Check className="size-8" /></span>
        <h2 className="mt-6 text-3xl">Application submitted</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">
          Thank you, {data.firstName}. We've received your application for {opportunity.title}.
          We'll email {data.email} within two weeks with next steps.
        </p>
        <Link to="/opportunities" className="mt-8 inline-block font-bold text-royal underline decoration-2 underline-offset-4">See other opportunities</Link>
      </div>
    )
  }

  const review = [
    ['Name', `${data.firstName || ''} ${data.lastName || ''}`], ['Email', data.email], ['Phone', data.phone],
    ['Date of birth', data.dob], ['Gender', data.gender], ['Nationality', data.nationality],
    ['Lives in', [data.city, data.residence].filter(Boolean).join(', ')],
    ['Education', [data.education, data.field].filter(Boolean).join(' · ')], ['Institution', data.institution],
    ['Current status', data.occupation], ['Organisation / role', data.role], ['Languages', (data.languages || []).join(', ')],
    ['CV link', data.cv], ['Heard about us', data.source],
  ]

  return (
    <form onSubmit={submit} noValidate ref={topRef}>
      {/* Step header: big number, name and a short line */}
      <div className="flex items-end justify-between gap-6">
        <div className="flex items-end gap-4">
          <span className="font-display text-7xl leading-[0.8] text-tangerine">0{step + 1}</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">Step {step + 1} of {steps.length}</p>
            <h3 className="mt-1 text-2xl sm:text-3xl">{steps[step]}</h3>
          </div>
        </div>
        <p className="hidden max-w-[14rem] text-right text-sm text-ink/55 sm:block">{intros[step]}</p>
      </div>

      {/* Progress: four woven segments that fill in as you go */}
      <div className="mt-5 grid grid-cols-4 gap-1.5" aria-hidden="true">
        {steps.map((s, i) => (
          <span key={s} className="h-2.5 transition-all duration-500"
            style={i <= step ? { background: kente } : { background: 'rgba(18,9,63,0.08)' }} />
        ))}
      </div>
      <p className="mt-2 text-sm text-ink/55 sm:hidden">{intros[step]}</p>

      <div ref={stepRef} className="py-8">
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="First name" required autoComplete="given-name" {...bind('firstName')} />
            <Input label="Last name" required autoComplete="family-name" {...bind('lastName')} />
            <Input label="Email address" type="email" required autoComplete="email" {...bind('email')} />
            <Input label="Phone (with country code)" type="tel" required placeholder="+250 7xx xxx xxx" autoComplete="tel" {...bind('phone')} />
            <Input label="Date of birth" type="date" required {...bind('dob')} />
            <Select label="Gender" required options={['Female', 'Male', 'Prefer to self-describe', 'Prefer not to say']} {...bind('gender')} />
            <Select label="Nationality" required options={countries} {...bind('nationality')} />
            <Select label="Country you live in" required options={countries} {...bind('residence')} />
            <Input label="City / town" required className="sm:col-span-2" {...bind('city')} />
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Select label="Highest level of education" required className="sm:col-span-2"
              options={['Secondary school', 'Diploma / certificate', "Bachelor's degree (in progress)", "Bachelor's degree", "Master's degree", 'PhD', 'Other']}
              {...bind('education')} />
            <Input label="School / university" required {...bind('institution')} />
            <Input label="Field of study" required placeholder="e.g. Economics" {...bind('field')} />
            <Input label="Year of graduation (or expected)" type="number" min="1990" max="2035" required {...bind('gradYear')} />
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold">What are you doing now?<span className="text-coral"> *</span></p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {['Student', 'Employed', 'Self-employed / founder', 'Looking for work'].map((o) => (
                  <Choice key={o} type="radio" name="occupation" value={o} checked={data.occupation === o} onChange={set}>{o}</Choice>
                ))}
              </div>
            </div>
            <Input label="Organisation and role" hint="If you work or volunteer somewhere" placeholder="e.g. Analyst at Youth Hub" className="sm:col-span-2" {...bind('role')} />
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold">Languages you speak well<span className="text-coral"> *</span></p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {languages.map((l) => (
                  <Choice key={l} type="checkbox" name="languages" value={l} checked={(data.languages || []).includes(l)} onChange={toggleLanguage}>{l}</Choice>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5">
            <Textarea label={`Why do you want to join ${opportunity.title}?`} required max={MOTIVATION_MAX}
              hint="Tell us what you hope to learn and what you'll bring. Around 200–250 words." {...bind('motivation')} />
            <Textarea label="Describe an issue in your community you would like to work on" required max={1200}
              hint="What is the problem, who does it affect, and why does it matter to you?" {...bind('issue')} />
            <Input label="Link to your CV" type="url" required placeholder="Google Drive, Dropbox or OneDrive link"
              hint="Make sure the link can be opened by anyone with it." {...bind('cv')} />
            <Select label="How did you hear about this opportunity?" required
              options={['AfriYouth website', 'Social media', 'Friend or colleague', 'University / school', 'Newsletter', 'Other']} {...bind('source')} />
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-ink/70">Please check your answers before you submit. You can go back to change anything.</p>
            <dl className="mt-6 divide-y divide-ink/10 border-y-2 border-ink">
              {review.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
                  <dt className="text-sm text-ink/55">{k}</dt>
                  <dd className="break-words text-sm font-medium">{v || '—'}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" required name="confirm" checked={!!data.confirm} onChange={(e) => setData((d) => ({ ...d, confirm: e.target.checked }))} className="mt-0.5 size-4 accent-royal" />
                I confirm that the information I have given is true and complete.
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" required name="consent" checked={!!data.consent} onChange={(e) => setData((d) => ({ ...d, consent: e.target.checked }))} className="mt-0.5 size-4 accent-royal" />
                I agree that AfriYouth Innovation Labs may store and use my details to review this application.
              </label>
            </div>
            {status === 'error' && <p className="mt-4 text-sm font-semibold text-coral">Something went wrong. Please try again.</p>}
          </div>
        )}
      </div>

      {error && <p className="pb-4 text-sm font-semibold text-coral" role="alert">{error}</p>}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 border-t-2 border-ink pt-6">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-2 font-semibold text-ink/70 hover:text-ink">
            <ArrowLeft className="size-4" /> Back
          </button>
        ) : <span className="text-xs text-ink/45">Your answers are saved on this device as you type.</span>}
        <button type="submit" disabled={status === 'sending'}
          className="group inline-flex items-center gap-2 bg-tangerine px-7 py-3.5 font-bold text-ink transition hover:bg-sun disabled:opacity-60">
          {step < steps.length - 1 ? 'Continue' : status === 'sending' ? 'Submitting…' : 'Submit application'}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  )
}
