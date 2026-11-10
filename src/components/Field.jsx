// Labelled input used in all forms. Pass `as="textarea"` or `as="select"`.
export default function Field({ label, as = 'input', children, className = '', ...props }) {
  const Tag = as
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-bold uppercase tracking-widest text-ink/60">
        {label}{props.required && <span className="text-coral"> *</span>}
      </span>
      <Tag {...props}
        className="mt-1 w-full border-0 border-b-2 border-ink/20 bg-transparent px-0 py-2.5 text-lg outline-none transition placeholder:text-ink/30 focus:border-royal">
        {children}
      </Tag>
    </label>
  )
}
