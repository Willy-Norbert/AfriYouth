import Field from './Field'
import FormSuccess from './FormSuccess'
import SubmitButton from './SubmitButton'
import useFormSubmit from './useFormSubmit'

const topics = {
  general: 'A general question',
  opportunity: 'Programs & opportunities',
  service: 'Requesting a service',
  partnership: 'A partnership',
}

export default function ContactForm({ topic }) {
  const { status, handleSubmit } = useFormSubmit('New message from AfriYouth website')
  if (status === 'sent') return <FormSuccess title="Thank you." text="Your message is with our team. We reply within 3 working days." />

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
      <Field label="I'm writing about" name="topic" as="select" defaultValue={topic} className="sm:col-span-2">
        {Object.entries(topics).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
      </Field>
      <Field label="Full name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Organisation" name="organisation" placeholder="Optional" className="sm:col-span-2" />
      <Field label="Message" name="message" as="textarea" rows="4" required className="sm:col-span-2" />
      {status === 'error' && <p className="text-coral sm:col-span-2">Something went wrong. Please try again.</p>}
      <div className="sm:col-span-2"><SubmitButton sending={status === 'sending'}>Send message</SubmitButton></div>
    </form>
  )
}
