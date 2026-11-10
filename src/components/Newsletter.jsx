import useFormSubmit from './useFormSubmit'

export default function Newsletter() {
  const { status, handleSubmit } = useFormSubmit('Newsletter signup')
  return (
    <section id="newsletter" className="bg-royal py-16 text-white">
      <div className="container-x grid items-end gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl">The AfriYouth Brief</h2>
          <p className="mt-3 max-w-md text-white/80">One email a month: new calls for applications, research and stories from our fellows.</p>
        </div>
        {status === 'sent' ? (
          <p className="border-l-4 border-sun pl-4 text-lg" role="status">Thanks — you're on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex border-b-2 border-white">
            <label className="sr-only" htmlFor="nl-email">Email address</label>
            <input id="nl-email" name="email" type="email" required placeholder="Your email address"
              className="flex-1 bg-transparent py-3 text-lg text-white outline-none placeholder:text-white/50" />
            <button disabled={status === 'sending'} className="px-2 font-bold text-sun hover:text-white">
              {status === 'sending' ? 'Joining…' : 'Subscribe →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
