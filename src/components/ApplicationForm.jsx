import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, FileText, Upload, X } from 'lucide-react'
import { site } from '../data/site'

// Full application form on one page, in three short sections.
// Answers are kept in this browser as a draft until the person submits.

export const countries = ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon',
  'Central African Republic', 'Chad', 'Comoros', 'Congo', "Côte d'Ivoire", 'DR Congo', 'Djibouti', 'Egypt',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau',
  'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco',
  'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'São Tomé and Príncipe', 'Senegal', 'Seychelles',
  'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda',
  'Zambia', 'Zimbabwe', 'Other (outside Africa)']


const MOTIVATION_MAX = 1500
const MAX_CV_MB = 5

// --- Small form building blocks (boxed inputs, like most application portals) ---
const box = 'mt-1 w-full border-2 border-ink/15 bg-white px-3 py-2 text-[15px] outline-none transition placeholder:text-ink/35 focus:border-tangerine'

function Label({ text, required, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="q-label text-[15px] font-semibold">{text}{required && <span className="text-coral"> *</span>}</span>
      {hint && <span className="mt-0.5 block text-xs text-ink/55">{hint}</span>}
      {children}
    </label>
  )
}

export function Input({ label, hint, className, ...props }) {
  return <Label text={label} required={props.required} hint={hint} className={className}><input {...props} className={box} /></Label>
}

export function Select({ label, hint, options, className, ...props }) {
  return (
    <Label text={label} required={props.required} hint={hint} className={className}>
      <select {...props} className={box}>
        <option value="">Choose…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Label>
  )
}

export function Textarea({ label, hint, max, className, ...props }) {
  const length = (props.value || '').length
  return (
    <Label text={label} required={props.required} hint={hint} className={className}>
      <textarea {...props} maxLength={max} className={`${box} min-h-28 leading-relaxed`} />
      {max && <span className={`mt-1 block text-right text-xs ${length > max * 0.9 ? 'text-coral' : 'text-ink/45'}`}>{length} / {max}</span>}
    </Label>
  )
}

export function Choice({ type, name, value, checked, onChange, children }) {
  return (
    <label className={`flex cursor-pointer items-center gap-2.5 border-2 px-3 py-2 transition ${checked ? 'border-ink bg-ink text-white' : 'border-ink/15 hover:border-ink/40'}`}>
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="size-4 accent-tangerine" />
      <span className="text-sm">{children}</span>
    </label>
  )
}

export default function ApplicationForm({ opportunity }) {
  const draftKey = `afriyouth-application-${opportunity.slug}`
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(draftKey)) || {} } catch { return {} }
  })
  const formRef = useRef(null)
  const [cvMode, setCvMode] = useState('upload') // upload | link
  const [cvFile, setCvFile] = useState(null) // files can't be kept in the draft
  const [dragging, setDragging] = useState(false)

  function pickFile(file) {
    if (!file) return
    if (!/\.(pdf|docx?)$/i.test(file.name)) return setError('Please choose a PDF or Word file for your CV.')
    if (file.size > MAX_CV_MB * 1024 * 1024) return setError(`Your CV is too large. Please keep it under ${MAX_CV_MB} MB.`)
    setError('')
    setCvFile(file)
  }

  // Keep a draft in this browser so nothing is lost on refresh
  useEffect(() => {
    try { localStorage.setItem(draftKey, JSON.stringify(data)) } catch { /* storage unavailable */ }
  }, [data, draftKey])

  const set = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }))
  const tick = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.checked }))
  const bind = (name) => ({ name, value: data[name] || '', onChange: set })

  async function submit(e) {
    e.preventDefault()
    setError('')
    // Check every required field, top to bottom
    const fields = [...formRef.current.querySelectorAll('input, select, textarea')]
    const bad = fields.find((f) => !f.checkValidity())
    if (bad) return bad.reportValidity()
    if (!data.occupation) return setError('Please tell us what you are doing now (question 11).')
    if (cvMode === 'upload' && !cvFile) return setError('Please attach your CV, or switch to "Paste a link" (question 14).')

    setStatus('sending')
    const payload = { ...data, cv: cvMode === 'link' ? data.cv : '', opportunity: opportunity.title }
    if (!site.formAccessKey) { // demo mode: no form key set yet
      setTimeout(() => { setStatus('sent'); try { localStorage.removeItem(draftKey) } catch { /* ignore */ } }, 700)
      return
    }
    try {
      const fields = { ...payload, subject: `New application: ${opportunity.title}`, access_key: site.formAccessKey }
      let res
      if (cvMode === 'upload' && cvFile) {
        // Send as a file upload (Web3Forms needs a plan that allows attachments)
        const body = new FormData()
        Object.entries(fields).forEach(([k, v]) => body.append(k, v ?? ''))
        body.append('attachment', cvFile)
        res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body })
      } else {
        res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        })
      }
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) try { localStorage.removeItem(draftKey) } catch { /* ignore */ }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-cream p-10 text-center" role="status">
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

  const section = 'border-b border-ink/10 pb-2 text-xl sm:col-span-2'

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="q-list grid gap-x-6 gap-y-6 sm:grid-cols-2">
      <h3 className={section}>Personal details</h3>
      <Input label="First name" required autoComplete="given-name" {...bind('firstName')} />
      <Input label="Last name" required autoComplete="family-name" {...bind('lastName')} />
      <Input label="Email address" type="email" required autoComplete="email" {...bind('email')} />
      <Input label="Phone (with country code)" type="tel" required placeholder="+250 7xx xxx xxx" autoComplete="tel" {...bind('phone')} />
      <Input label="Date of birth" type="date" required {...bind('dob')} />
      <Select label="Country you live in" required options={countries} {...bind('residence')} />
      <Input label="City / town" required {...bind('city')} />

      <h3 className={`${section} mt-4`}>Background</h3>
      <Select label="Highest level of education" required
        options={['Secondary school', 'Diploma / certificate', "Bachelor's degree (in progress)", "Bachelor's degree", "Master's degree", 'PhD', 'Other']}
        {...bind('education')} />
      <Input label="School / university" required {...bind('institution')} />
      <Input label="Field of study" required placeholder="e.g. Economics" {...bind('field')} />
      <div className="sm:col-span-2">
        <p className="q-label text-[15px] font-semibold">What are you doing now?<span className="text-coral"> *</span></p>
        <div className="mt-2 grid gap-2 sm:grid-cols-4">
          {['Student', 'Employed', 'Self-employed / founder', 'Looking for work'].map((o) => (
            <Choice key={o} type="radio" name="occupation" value={o} checked={data.occupation === o} onChange={set}>{o}</Choice>
          ))}
        </div>
      </div>

      <h3 className={`${section} mt-4`}>Your application</h3>
      <Textarea label={`Why do you want to join ${opportunity.title}?`} required max={MOTIVATION_MAX} className="sm:col-span-2"
        hint="Tell us what you hope to learn and what you'll bring. Around 200–250 words." {...bind('motivation')} />
      <Textarea label="Describe an issue in your community you would like to work on" required max={1200} className="sm:col-span-2"
        hint="What is the problem, who does it affect, and why does it matter to you?" {...bind('issue')} />
      <div className="sm:col-span-2">
        <p className="q-label text-[15px] font-semibold">Your CV<span className="text-coral"> *</span></p>
        <div className="mt-2 inline-flex border-2 border-ink/15 text-sm" role="radiogroup" aria-label="How to share your CV">
          {[['upload', 'Upload a file'], ['link', 'Paste a link']].map(([mode, text]) => (
            <button key={mode} type="button" role="radio" aria-checked={cvMode === mode} onClick={() => { setCvMode(mode); setError('') }}
              className={`px-4 py-2 font-semibold transition ${cvMode === mode ? 'bg-ink text-white' : 'hover:bg-ink/5'}`}>
              {text}
            </button>
          ))}
        </div>

        {cvMode === 'upload' ? (
          cvFile ? (
            <div className="mt-3 flex items-center gap-3 border-2 border-ink/15 px-4 py-3">
              <FileText className="size-5 shrink-0 text-royal" />
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">{cvFile.name}</span>
              <span className="text-xs text-ink/50">{cvFile.size < 1024 * 1024 ? `${Math.max(1, Math.round(cvFile.size / 1024))} KB` : `${(cvFile.size / 1024 / 1024).toFixed(1)} MB`}</span>
              <button type="button" onClick={() => setCvFile(null)} className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-coral">
                <X className="size-4" /> Remove
              </button>
            </div>
          ) : (
            <label
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files[0]) }}
              className={`mt-3 flex cursor-pointer flex-col items-center justify-center gap-1 border-2 border-dashed px-4 py-8 text-center transition ${dragging ? 'border-tangerine bg-tangerine/5' : 'border-ink/20 hover:border-ink/40'}`}>
              <Upload className="size-6 text-ink/50" />
              <span className="text-sm"><strong className="text-royal underline underline-offset-4">Choose a file</strong> or drag it here</span>
              <span className="text-xs text-ink/50">PDF or Word, up to {MAX_CV_MB} MB</span>
              <input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => pickFile(e.target.files[0])} />
            </label>
          )
        ) : (
          <div className="mt-3">
            <input type="url" required aria-label="Link to your CV" placeholder="Google Drive, Dropbox or OneDrive link"
              className={box} {...bind('cv')} />
            <span className="mt-1 block text-xs text-ink/55">Make sure the link can be opened by anyone with it.</span>
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-ink/10 pt-6 sm:col-span-2">
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" required name="confirm" checked={!!data.confirm} onChange={tick} className="mt-0.5 size-4 accent-tangerine" />
          I confirm that the information I have given is true and complete.
        </label>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" required name="consent" checked={!!data.consent} onChange={tick} className="mt-0.5 size-4 accent-tangerine" />
          I agree that AfriYouth Innovation Labs may store and use my details to review this application.
        </label>
      </div>

      {(error || status === 'error') && (
        <p className="text-sm font-semibold text-coral sm:col-span-2" role="alert">{error || 'Something went wrong. Please try again.'}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <span className="text-xs text-ink/45">Your answers are saved on this device as you type.</span>
        <button type="submit" disabled={status === 'sending'}
          className="group inline-flex items-center gap-2 bg-tangerine px-7 py-3.5 font-bold text-ink transition hover:bg-sun disabled:opacity-60">
          {status === 'sending' ? 'Submitting…' : 'Submit application'}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  )
}
