export default function FormSuccess({ title, text }) {
  return (
    <div className="rounded-lg border-l-4 border-teal bg-teal/5 p-8" role="status">
      <h3 className="text-3xl">{title}</h3>
      <p className="mt-2 text-lg text-ink/70">{text}</p>
    </div>
  )
}
