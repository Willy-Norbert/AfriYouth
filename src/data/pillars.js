import { images } from './images'

// AfriYouth's five strategic divisions. Each has its own colour, photo and flagship products.
// (Resource Mobilization & Partnerships is a cross-cutting service, see services.js.)
export const pillars = [
  { slug: 'research', short: 'Evidence on Africa’s emerging challenges', image: images.writing,
    title: 'Research & Evidence', icon: 'Search', color: 'teal',
    text: 'We generate evidence on Africa’s emerging socio-economic challenges, through applied research led with young people.',
    products: ['Evidence Reports', 'Surveys', 'Impact Studies'] },
  { slug: 'policy', short: 'Research turned into policy', image: images.meeting,
    title: 'Policy & Governance', icon: 'Landmark', color: 'plum',
    text: 'We translate research into actionable policies and institutional reforms, and bring young people into policymaking.',
    products: ['Policy Lab', 'Policy Papers', 'Policy Innovation Challenges'] },
  { slug: 'innovation', short: 'From idea to scalable venture', image: images.soldering,
    title: 'Innovation & Entrepreneurship', icon: 'Lightbulb', color: 'tangerine',
    text: 'We help young innovators turn community-driven ideas into practical, scalable solutions using human-centered design.',
    products: ['Innovation Accelerator', 'HCD Lab'] },
  { slug: 'foresight', short: 'Preparing for 2030, 2040 and 2050', image: images.vrDesk,
    title: 'Foresight & Futures', icon: 'Telescope', color: 'royal',
    text: 'We explore the possible futures of Africa’s youth, work and technology, so institutions can prepare today.',
    products: ['Africa 2030/2050 Scenarios', 'Futures Studies'] },
  { slug: 'leadership', short: 'Skills, careers and impact', image: images.fieldEngineers,
    title: 'Leadership & Capacity Building', icon: 'GraduationCap', color: 'coral',
    text: 'Practical, outcome-oriented training that moves young people from education to employment and career growth.',
    products: ['Employability Skills Lab', 'Professional Skills Academy', 'Impact & Learning Services'] },
]
