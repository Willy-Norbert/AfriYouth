import {
  Search, Landmark, Lightbulb, Rocket, Telescope, ChartLine, GraduationCap,
  Sparkles, Building2, Handshake, Users, Globe, Circle,
} from 'lucide-react'

// Icons used by name in the data files. Add new ones here.
const icons = {
  Search, Landmark, Lightbulb, Rocket, Telescope, ChartLine, GraduationCap,
  Sparkles, Building2, Handshake, Users, Globe,
}

export default function Icon({ name, className = 'size-5' }) {
  const LucideIcon = icons[name] || Circle
  return <LucideIcon className={className} aria-hidden="true" />
}
