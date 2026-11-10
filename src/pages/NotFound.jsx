import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <p className="font-display text-8xl font-extrabold text-sun">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">This page went exploring.</h1>
      <p className="mt-2 text-ink/70">Let's get you back on track.</p>
      <Button to="/" variant="dark" className="mt-8">Back to home</Button>
    </section>
  )
}
