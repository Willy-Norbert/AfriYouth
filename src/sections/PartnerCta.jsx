import Button from '../components/Button'
import { Sun } from '../components/Doodles'
import { images } from '../data/images'

// For organisations and partners: call to action.
export default function PartnerCta() {
  return (
    <section className="pb-24">
      <div className="container-x">
        <div className="relative grid overflow-hidden rounded-lg bg-royal text-white lg:grid-cols-2">
          <div className="relative z-10 p-10 sm:p-14">
            <Sun className="mb-6 size-16" />
            <h2 className="text-3xl font-extrabold sm:text-5xl">Let's build Africa's future together.</h2>
            <p className="mt-4 max-w-md text-white/85">
              Need research, policy support, foresight or an impact framework? Want to back The Evidence to Impact Accelerator? We'd love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact?topic=partnership" variant="light">Partner with us</Button>
              <Button to="/services" variant="outline" arrow={false}>Our services</Button>
            </div>
          </div>
          <img src={images.meeting} alt="Partners in a workshop" className="h-72 w-full bg-ink/20 object-cover lg:h-full" />
        </div>
      </div>
    </section>
  )
}
