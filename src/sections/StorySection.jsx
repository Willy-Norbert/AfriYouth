import Button from '../components/Button'
import Reveal from '../components/Reveal'
import StoryCollage from '../components/StoryCollage'

// "Why we exist" with a cut-paper scrapbook collage.
export default function StorySection() {
  return (
    <section className="overflow-hidden py-24">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <StoryCollage />
        </Reveal>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-tangerine">Why we exist</p>
          <h2 className="max-w-md text-3xl leading-[1.1] sm:text-[2.75rem]">
            Africa will have the world’s <span className="text-royal">largest workforce</span> by 2030.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
            We give young people the capacity to solve African problems and build their own future.
          </p>
          <Button to="/about" variant="dark" className="mt-8">Our story</Button>
        </div>
      </div>
    </section>
  )
}
