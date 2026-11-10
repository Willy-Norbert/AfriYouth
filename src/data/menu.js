import { images } from './images'
import { pillars } from './pillars'
import { programs } from './programs'
import { services } from './services'

// Main menu. Items with `columns` open a large dropdown panel.
export const menu = [
  {
    label: 'About', to: '/about',
    columns: [
      { heading: 'About AfriYouth', to: '/about', links: [
        ['Mission & vision', '/about#mission'], ['Our story', '/about#story'],
        ['What we stand for', '/about#values'], ['Our impact', '/about#impact'], ['Contact us', '/contact'],
      ] },
      { heading: 'Work with us', to: '/contact', links: [
        ['Partner with us', '/contact?topic=partnership'], ['Request a service', '/contact?topic=service'],
        ['Join the newsletter', '#newsletter'],
      ] },
    ],
    feature: { image: images.team, title: 'Led by young Africans', text: 'Read how AfriYouth began', to: '/about#story' },
  },
  {
    label: 'What we do', to: '/services',
    columns: [
      { heading: 'Areas of work', to: '/services', links: pillars.map((p) => [p.title, `/programs?area=${p.slug}`]) },
      { heading: 'Services', to: '/services', links: services.map((s) => [s.title, '/services']) },
    ],
    feature: { image: images.meeting, title: 'Work with AfriYouth', text: 'Request research, policy or design support', to: '/contact?topic=service' },
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
    feature: { image: images.workshop, title: 'Applications open', text: 'See calls closing soon', to: '/opportunities' },
  },
  { label: 'Opportunities', to: '/opportunities' },
  { label: 'Resources', to: '/resources' },
]
