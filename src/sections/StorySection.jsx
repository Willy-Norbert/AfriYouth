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
          <h2 className="text-3xl font-extrabold sm:text-5xl">
            Africa is young. <span className="text-royal">So are we.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink/70">
            Six in ten Africans are under 25. AfriYouth is run by young people who do the research,
            sit in the policy rooms and build the ventures themselves.
          </p>
          <Button to="/about" variant="dark" className="mt-8">Our story</Button>
        </div>
      </div>
    </section>
  )
}
