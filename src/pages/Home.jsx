import Hero from '../sections/Hero'
import AudiencePaths from '../sections/AudiencePaths'
import StorySection from '../sections/StorySection'
import PillarsSection from '../sections/PillarsSection'
import OpportunitiesSection from '../sections/OpportunitiesSection'
import ResourcesSection from '../sections/ResourcesSection'
import PartnerCta from '../sections/PartnerCta'

export default function Home() {
  return (
    <>
      <Hero />
      <AudiencePaths />
      <StorySection />
      <PillarsSection />
      <OpportunitiesSection />
      <ResourcesSection />
      <PartnerCta />
    </>
  )
}
