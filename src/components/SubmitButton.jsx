import { ArrowRight } from 'lucide-react'

export default function SubmitButton({ sending, children, sendingText = 'Sending…' }) {
  return (
    <button disabled={sending}
      className="group inline-flex items-center gap-3 rounded-md bg-ink px-8 py-4 font-bold text-white transition hover:bg-royal disabled:opacity-60">
      {sending ? sendingText : children}
      <ArrowRight className="size-5 transition group-hover:translate-x-1" />
    </button>
  )
}
