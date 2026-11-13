// Cartoon illustrations for the About page's "What we stand for" values.
// Same hand-drawn style as AudienceArt: brand colours, African textile details.

const ink = '#0d0624'

function Frame({ id, bg, children }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id={`${id}-clip`}><circle cx="60" cy="60" r="58" /></clipPath>
      </defs>
      <circle cx="60" cy="60" r="58" fill={bg} />
      <g clipPath={`url(#${id}-clip)`}>{children}</g>
    </svg>
  )
}

// Shoulders, neck and head, with a simple happy face
function Bust({ skin, shirt, hair, cheek = '#a01bb4', children }) {
  return (
    <>
      <path d="M24 122c0-22 16-34 36-34s36 12 36 34z" fill={shirt} />
      {children}
      <rect x="53" y="72" width="14" height="18" rx="6" fill={skin} />
      <ellipse cx="60" cy="56" rx="19" ry="20" fill={skin} />
      <circle cx="41" cy="59" r="3.5" fill={skin} />
      <circle cx="79" cy="59" r="3.5" fill={skin} />
      {hair}
      <circle cx="53" cy="58" r="2.2" fill={ink} />
      <circle cx="67" cy="58" r="2.2" fill={ink} />
      <circle cx="49" cy="64" r="3" fill={cheek} opacity=".3" />
      <circle cx="71" cy="64" r="3" fill={cheek} opacity=".3" />
      <path d="M55 65q5 4.5 10 0" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
    </>
  )
}

const shortHair = <path d="M41 54c-1-14 7-21 19-21s20 7 19 21c-3-7-9-10-19-10s-16 3-19 10z" fill={ink} />

const kente = (id) => (
  <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse">
    <rect width="8" height="8" fill="#c723df" />
    <rect width="4" height="4" fill={ink} />
    <rect x="4" y="4" width="4" height="4" fill="#0200a7" />
    <rect y="3.4" width="8" height="1.2" fill="#9d8cff" />
  </pattern>
)

// Innovation: young woman with braids holding up a glowing lightbulb
export function InnovationArt() {
  const skin = '#8d5435'
  const braids = (
    <>
      <path d="M41 54c-1-14 7-21 19-21s20 7 19 21c-3-7-9-10-19-10s-16 3-19 10z" fill={ink} />
      {[36, 40.5, 75.5, 80].map((x) => <rect key={x} x={x} y="48" width="4" height="34" rx="2" fill={ink} />)}
      {[38, 42.5, 77.5, 82].map((x) => <circle key={x} cx={x} cy="84" r="2.2" fill="#c723df" />)}
    </>
  )
  return (
    <Frame id="val-innov" bg="#f9e3fc">
      <defs>{kente('val-innov-k')}</defs>
      <Bust skin={skin} shirt="#0200a7" hair={braids}>
        <path d="M45 92q15 10 30 0" fill="none" stroke="url(#val-innov-k)" strokeWidth="6" />
        <path d="M86 106Q96 86 92 66" fill="none" stroke="#0200a7" strokeWidth="10" strokeLinecap="round" />
      </Bust>
      {/* lightbulb */}
      <g stroke="#9d8cff" strokeWidth="3" strokeLinecap="round">
        <path d="M92 18v-6M76 26l-4-4M108 26l4-4M72 40h-6M112 40h6" />
      </g>
      <circle cx="92" cy="38" r="12" fill="#9d8cff" />
      <path d="M88 38q4 4 8 0" fill="none" stroke="#c723df" strokeWidth="2" strokeLinecap="round" />
      <rect x="86.5" y="48" width="11" height="7" rx="2" fill="#9aa1d4" />
      <circle cx="92" cy="61" r="6" fill={skin} />
    </Frame>
  )
}

// Youth empowerment: young man raising his fist, with sparkles
export function EmpowermentArt() {
  const skin = '#5f3520'
  return (
    <Frame id="val-power" bg="#dfe4ff">
      <path d="M96 24l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#c723df" />
      <path d="M88 52l1.6 3.8 3.8 1.6-3.8 1.6-1.6 3.8-1.6-3.8-3.8-1.6 3.8-1.6z" fill="#fff" />
      <Bust skin={skin} shirt="#c723df" hair={shortHair} cheek="#e57cf2">
        <path d="M49 91l11 12 11-12" fill="none" stroke="#0200a7" strokeWidth="4.5" strokeLinejoin="round" />
        <path d="M52 93l8 8.5 8-8.5" fill="none" stroke="#fbeefd" strokeWidth="1.6" strokeDasharray="2 2.5" />
        <path d="M34 106Q24 86 28 64" fill="none" stroke="#c723df" strokeWidth="10" strokeLinecap="round" />
      </Bust>
      <rect x="20" y="46" width="16" height="17" rx="6" fill={skin} />
      <path d="M24 50h8M24 54h8" stroke={ink} strokeOpacity=".25" strokeWidth="1.5" strokeLinecap="round" />
    </Frame>
  )
}

// Global impact: woman in a patterned headwrap holding a globe with Africa on it
export function GlobalArt() {
  const skin = '#9a5d3a'
  const wrap = (
    <>
      <path d="M40 54c-1-17 8-25 20-25s21 8 20 25c-5-6-12-8.5-20-8.5S45 48 40 54z" fill="url(#val-global-k)" />
      <circle cx="69" cy="28" r="7" fill="url(#val-global-k)" />
    </>
  )
  return (
    <Frame id="val-global" bg="#f7dcfb">
      <defs>{kente('val-global-k')}</defs>
      <Bust skin={skin} shirt="#7e1ced" hair={wrap} />
      {/* globe */}
      <circle cx="60" cy="104" r="18" fill="#0301ff" />
      <ellipse cx="60" cy="104" rx="8" ry="18" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" />
      <path d="M42 104h36" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" />
      <path d="M54 92c4-2 9-1 11 2 2 3 6 4 5 8-1 3-3 4-3 7 0 4-3 8-6 9-2-3-1-6-3-9-2-2-5-3-6-6-1-4 0-9 2-11z" fill="#9d8cff" />
      <ellipse cx="42" cy="106" rx="5.5" ry="5" fill={skin} />
      <ellipse cx="78" cy="106" rx="5.5" ry="5" fill={skin} />
    </Frame>
  )
}

// Human-centred design: a designer with a marker in front of sticky notes
export function DesignArt() {
  const skin = '#6e3f26'
  return (
    <Frame id="val-design" bg="#e8ebff">
      <g>
        <rect x="12" y="30" width="20" height="20" rx="2" fill="#9d8cff" transform="rotate(-8 22 40)" />
        <rect x="88" y="22" width="20" height="20" rx="2" fill="#e57cf2" transform="rotate(10 98 32)" />
        <rect x="92" y="50" width="17" height="17" rx="2" fill="#b9c4ff" transform="rotate(-6 100 58)" />
        <path d="M16 38h12M16 43h8" stroke={ink} strokeOpacity=".35" strokeWidth="1.6" strokeLinecap="round" transform="rotate(-8 22 40)" />
        <path d="M92 30h12M92 35h8" stroke={ink} strokeOpacity=".35" strokeWidth="1.6" strokeLinecap="round" transform="rotate(10 98 32)" />
      </g>
      <Bust skin={skin} shirt="#a01bb4" hair={shortHair} cheek="#e57cf2">
        <path d="M46 91q14 9 28 0" fill="none" stroke="#fbeefd" strokeWidth="3" />
      </Bust>
      {/* glasses */}
      <g fill="none" stroke={ink} strokeWidth="1.8">
        <circle cx="53" cy="58" r="5.5" /><circle cx="67" cy="58" r="5.5" /><path d="M58.5 58h3" />
      </g>
      {/* marker */}
      <rect x="80" y="86" width="7" height="26" rx="2" fill="#0200a7" transform="rotate(25 83 99)" />
      <rect x="86.5" y="82" width="5" height="6" rx="1" fill="#c723df" transform="rotate(25 83 99)" />
      <ellipse cx="82" cy="104" rx="6" ry="5.5" fill={skin} />
    </Frame>
  )
}

// Sustainability: young man holding a seedling in a clay pot
export function SustainabilityArt() {
  const skin = '#8d5435'
  return (
    <Frame id="val-green" bg="#e3f2e8">
      <Bust skin={skin} shirt="#0200a7" hair={shortHair}>
        <path d="M49 91l11 12 11-12" fill="none" stroke="#e57cf2" strokeWidth="4.5" strokeLinejoin="round" />
      </Bust>
      {/* seedling */}
      <path d="M60 98V80" stroke="#2f8f5b" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 86c-8 0-13-5-13-11 7 0 13 4 13 11z" fill="#3aa66a" />
      <path d="M60 82c7-1 12-6 12-12-7 0-12 5-12 12z" fill="#2f8f5b" />
      <path d="M47 100h26l-4 22H51z" fill="#8e1aa0" />
      <rect x="45" y="96" width="30" height="7" rx="2" fill="#a01bb4" />
      <ellipse cx="45" cy="108" rx="5.5" ry="5" fill={skin} />
      <ellipse cx="75" cy="108" rx="5.5" ry="5" fill={skin} />
    </Frame>
  )
}

// Leadership: woman in a gele headwrap speaking through a megaphone
export function LeadershipArt() {
  const skin = '#9a5d3a'
  const gele = (
    <g transform="translate(60 56) scale(1.31) translate(-37 -72)">
      <path d="M20 68c-4-14 4-26 17-26 14 0 22 10 18 26-4-5-10-7-18-7s-13 2-17 7z" fill="url(#val-lead-g)" />
      <path d="M22 50c6-10 22-12 32-2-8-3-20-3-32 2z" fill="#e57cf2" />
      <path d="M30 44c4-6 14-6 18 0" fill="none" stroke="#8e1aa0" strokeWidth="1.6" />
    </g>
  )
  return (
    <Frame id="val-lead" bg="#f6e6fb">
      <defs>
        <pattern id="val-lead-g" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="10" height="10" fill="#a01bb4" />
          <rect width="4" height="10" fill="#e57cf2" />
          <circle cx="7" cy="5" r="1.2" fill="#fbeefd" />
        </pattern>
      </defs>
      <Bust skin={skin} shirt="#7e1ced" hair={gele}>
        <path d="M45 92q15 9 30 0" fill="none" stroke="#9d8cff" strokeWidth="3.5" />
        <path d="M86 106Q94 92 84 80" fill="none" stroke="#7e1ced" strokeWidth="10" strokeLinecap="round" />
      </Bust>
      <circle cx="41" cy="66" r="2.4" fill="#9d8cff" />
      {/* megaphone */}
      <path d="M76 66l24-12v30l-24-8z" fill="#c723df" />
      <ellipse cx="100" cy="69" rx="3.5" ry="15" fill="#a01bb4" />
      <g fill="none" stroke="#0200a7" strokeWidth="2.5" strokeLinecap="round">
        <path d="M108 58q5 11 0 22" />
        <path d="M113 52q8 17 0 34" />
      </g>
      <ellipse cx="83" cy="79" rx="5.5" ry="5" fill={skin} />
    </Frame>
  )
}

export const valueArt = {
  Innovation: InnovationArt,
  'Youth empowerment': EmpowermentArt,
  Sustainability: SustainabilityArt,
  'Global impact': GlobalArt,
  'Human-centered design': DesignArt,
  'Leadership development': LeadershipArt,
}
