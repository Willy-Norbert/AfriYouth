import { images } from './images'

// The areas AfriYouth works in. Each has its own colour and photo.
export const pillars = [
  { slug: 'research', short: 'Studies led by young people', image: images.writing, title: 'Research & Evidence', icon: 'Search', color: 'teal',
    text: 'Youth-led research that turns lived experience into data decision-makers can use.' },
  { slug: 'policy', short: 'Youth voices in decision-making', image: images.meeting, title: 'Policy & Advocacy', icon: 'Landmark', color: 'plum',
    text: 'Bringing young voices and evidence into the rooms where policy is made.' },
  { slug: 'design', short: 'Solutions built with communities', image: images.workshop, title: 'Human-Centred Design', icon: 'Lightbulb', color: 'tangerine',
    text: 'Designing solutions with communities, not just for them.' },
  { slug: 'entrepreneurship', short: 'Support for young founders', image: images.founder, title: 'Entrepreneurship', icon: 'Rocket', color: 'coral',
    text: 'Helping young founders test, launch and grow ventures that solve real problems.' },
  { slug: 'foresight', short: 'Preparing for possible futures', image: images.lecture, title: 'Strategic Foresight', icon: 'Telescope', color: 'royal',
    text: 'Exploring possible futures so Africa can prepare for what comes next.' },
  { slug: 'impact', short: 'Measuring what works', image: images.coding, title: 'Impact Measurement', icon: 'ChartLine', color: 'sun',
    text: 'Tracking what works so every program gets better and every partner sees results.' },
]
