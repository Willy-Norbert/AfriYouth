import { images } from './images'
import { programs } from './programs'
import { labs, supporting } from './services'

// Main menu. Items with `columns` open a large dropdown panel.
export const menu = [
  {
    label: 'About', to: '/about',
    columns: [
      { heading: 'About AfriYouth', to: '/about', links: [
        ['Mission & vision', '/about#mission'], ['What makes us unique', '/about#story'],
        ['Our philosophy', '/about#philosophy'], ['What we stand for', '/about#values'], ['Our impact', '/about#impact'],
      ] },
      { heading: 'Work with us', to: '/contact', links: [
        ['Partner with us', '/contact?topic=partnership'], ['Request a service', '/contact?topic=service'],
        ['Join the newsletter', '#newsletter'], ['Contact us', '/contact'],
      ] },
    ],
    feature: { image: images.celebration, title: 'From evidence to impact', text: 'An African innovation and policy lab', to: '/about#story' },
  },
  {
    label: 'What we do', to: '/services',
    columns: [
      { heading: 'Our labs', to: '/services', links: labs.map((s) => [s.title, `/services#${s.slug}`]) },
      { heading: 'Supporting services', to: '/services#supporting', links: [
        ...supporting.map((s) => [s.title, `/services#${s.slug}`]),
        ['Evidence-to-Impact Accelerator', '/services#accelerator'],
      ] },
    ],
    feature: { image: images.fieldEngineers, title: 'Work with AfriYouth', text: 'Request research, policy or foresight support', to: '/contact?topic=service' },
  },
  {
    label: 'Programs', to: '/programs',
    columns: [
      { heading: 'Our programs', to: '/programs', links: programs.map((p) => [p.title, `/programs/${p.slug}`]) },
      { heading: 'Get started', to: '/opportunities', links: [
        ['Open opportunities', '/opportunities'], ['Opportunities for partners', '/opportunities'],
        ['Get updates by email', '#newsletter'],
      ] },
    ],
    feature: { image: images.soldering, title: 'Applications open', text: 'See calls closing soon', to: '/opportunities' },
  },
  { label: 'Opportunities', to: '/opportunities' },
  { label: 'Resources', to: '/resources' },
]
