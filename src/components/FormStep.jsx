// Numbered group of fields inside a form.
export default function FormStep({ number, title, children }) {
  return (
    <fieldset className="grid gap-x-8 gap-y-6 border-t border-ink/15 pt-6 sm:grid-cols-2">
      <legend className="float-left mb-2 w-full font-display text-xl sm:col-span-2">
        <span className="mr-3 text-tangerine">{number}</span>{title}
      </legend>
      {children}
    </fieldset>
  )
}
