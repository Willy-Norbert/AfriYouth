import Field from './Field'
import FormStep from './FormStep'
import FormSuccess from './FormSuccess'
import SubmitButton from './SubmitButton'
import useFormSubmit from './useFormSubmit'

export default function ApplyForm({ title }) {
  const { status, handleSubmit } = useFormSubmit(`New application: ${title}`)
  if (status === 'sent') return <FormSuccess title="Application received." text="We'll email you within two weeks with next steps." />

  return (
    <form onSubmit={handleSubmit} className="h-fit space-y-10 lg:sticky lg:top-28">
      <div>
        <h2 className="text-3xl">Application form</h2>
        <p className="mt-2 text-ink/60">Takes about 5 minutes. Fields marked * are required.</p>
      </div>
      <input type="hidden" name="opportunity" value={title} />
      <FormStep number="01" title="About you">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Country" name="country" required />
      </FormStep>
      <FormStep number="02" title="Your background">
        <Field label="Current occupation" name="occupation" placeholder="e.g. Student at AUCA" className="sm:col-span-2" />
        <Field label="Why do you want to join?" name="motivation" as="textarea" rows="4" required className="sm:col-span-2" />
      </FormStep>
      {status === 'error' && <p className="text-coral">Something went wrong. Please try again.</p>}
      <SubmitButton sending={status === 'sending'} sendingText="Submitting…">Submit application</SubmitButton>
    </form>
  )
}
