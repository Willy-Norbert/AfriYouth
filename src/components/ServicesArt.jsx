// Cartoon illustrations for the six services on the Services page.
// Same hand-drawn style as AudienceArt and ValuesArt: brand colours, African details.

const ink = '#1b1030'

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
function Bust({ skin, shirt, hair, cheek = '#e2560b', children }) {
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
    <rect width="8" height="8" fill="#ff751f" />
    <rect width="4" height="4" fill={ink} />
    <rect x="4" y="4" width="4" height="4" fill="#1800ad" />
    <rect y="3.4" width="8" height="1.2" fill="#ffd166" />
  </pattern>
)

// Research: young woman with an afro puff holding a magnifying glass
export function ResearchArt() {
  const skin = '#8d5435'
  const puff = (
    <>
      <path d="M40.5 55c0-14 8.5-20 19.5-20s19.5 6 19.5 20c-5-6-11-8.5-19.5-8.5S45.5 49 40.5 55z" fill={ink} />
    </>
  )
  return (
    <Frame id="svc-research" bg="#dfe4ff">
      <circle cx="60" cy="27" r="14" fill={ink} />
      <Bust skin={skin} shirt="#ff751f" hair={puff}>
        <path d="M86 106Q92 92 86 80" fill="none" stroke="#ff751f" strokeWidth="10" strokeLinecap="round" />
      </Bust>
      <circle cx="41" cy="66" r="2.4" fill="#ffd166" />
      {/* magnifying glass */}
      <path d="M90 66l-7 12" stroke={ink} strokeWidth="5" strokeLinecap="round" />
      <circle cx="96" cy="54" r="12" fill="#fff" fillOpacity=".7" stroke="#1800ad" strokeWidth="4" />
      <path d="M90 50q3-4 8-4" fill="none" stroke="#5d7aff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="84" cy="79" r="6" fill={skin} />
    </Frame>
  )
}

// Policy: a man with a document in front of a domed government building
export function PolicyArt() {
  const skin = '#5f3520'
  return (
    <Frame id="svc-policy" bg="#ece7ff">
      {/* building */}
      <g fill="#c9c0f5">
        <path d="M14 40a14 14 0 0 1 28 0z" />
        <rect x="12" y="40" width="32" height="4" />
        <rect x="14" y="46" width="4" height="30" /><rect x="22" y="46" width="4" height="30" />
        <rect x="30" y="46" width="4" height="30" /><rect x="38" y="46" width="4" height="30" />
        <rect x="27" y="22" width="2" height="6" />
      </g>
      <Bust skin={skin} shirt="#3a25c8" hair={shortHair} cheek="#ff9756">
        <path d="M52 90l8 10 8-10" fill="#fff" />
        <path d="M58 92h4l1 14-3 4-3-4z" fill="#ff751f" />
      </Bust>
      {/* document */}
      <g transform="rotate(-6 84 102)">
        <rect x="70" y="86" width="28" height="34" rx="2" fill="#fff" />
        <path d="M75 94h18M75 100h18M75 106h12" stroke="#9aa1d4" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="90" cy="113" r="3.5" fill="#ff751f" />
      </g>
      <ellipse cx="70" cy="104" rx="5.5" ry="5" fill={skin} />
    </Frame>
  )
}

// Design sprints: woman in a headwrap holding a tablet with a wireframe sketch
export function SprintArt() {
  const skin = '#9a5d3a'
  const wrap = (
    <>
      <path d="M40 54c-1-17 8-25 20-25s21 8 20 25c-5-6-12-8.5-20-8.5S45 48 40 54z" fill="url(#svc-sprint-k)" />
      <circle cx="51" cy="28" r="7" fill="url(#svc-sprint-k)" />
    </>
  )
  return (
    <Frame id="svc-sprint" bg="#ffe1c9">
      <defs>{kente('svc-sprint-k')}</defs>
      <path d="M96 24l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#fff" />
      <Bust skin={skin} shirt="#1800ad" hair={wrap} />
      {/* tablet */}
      <g transform="rotate(-4 60 106)">
        <rect x="38" y="90" width="44" height="32" rx="4" fill={ink} />
        <rect x="41" y="93" width="38" height="26" rx="2" fill="#fff" />
        <rect x="44" y="96" width="14" height="9" rx="1" fill="#ff9756" />
        <path d="M61 97h14M61 101h10M44 109h31M44 113h22" stroke="#9aa1d4" strokeWidth="2" strokeLinecap="round" />
      </g>
      <ellipse cx="38" cy="106" rx="5" ry="4.5" fill={skin} />
      <ellipse cx="82" cy="102" rx="5" ry="4.5" fill={skin} />
    </Frame>
  )
}

// Capacity building: a graduate in a cap with a kente stole
export function CapacityArt() {
  const skin = '#6e3f26'
  const cap = (
    <>
      {shortHair}
      <path d="M60 22l30 11-30 11-30-11z" fill={ink} />
      <path d="M44 38v8c0 3 7 6 16 6s16-3 16-6v-8l-16 6z" fill={ink} />
      <path d="M86 34v14" stroke="#ff751f" strokeWidth="2" />
      <circle cx="86" cy="50" r="3" fill="#ff751f" />
    </>
  )
  return (
    <Frame id="svc-capacity" bg="#ffdccb">
      <defs>{kente('svc-capacity-k')}</defs>
      <Bust skin={skin} shirt={ink} hair={cap} cheek="#ff9756">
        <path d="M44 92l8 30M76 92l-8 30" stroke="url(#svc-capacity-k)" strokeWidth="9" />
      </Bust>
    </Frame>
  )
}

// Foresight: a young person looking through a telescope at the stars
export function ForesightArt() {
  const skin = '#8d5435'
  return (
    <Frame id="svc-foresight" bg="#1f1660">
      <g fill="#fff">
        <circle cx="22" cy="30" r="1.6" /><circle cx="34" cy="16" r="1.2" /><circle cx="18" cy="56" r="1.2" />
        <circle cx="70" cy="14" r="1.4" /><circle cx="104" cy="56" r="1.2" />
      </g>
      <path d="M100 18l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffd166" />
      <Bust skin={skin} shirt="#ff751f" hair={shortHair}>
        <path d="M86 106Q94 92 86 80" fill="none" stroke="#ff751f" strokeWidth="10" strokeLinecap="round" />
      </Bust>
      {/* telescope */}
      <g transform="rotate(-35 80 60)">
        <rect x="70" y="54" width="36" height="12" rx="3" fill="#5d7aff" />
        <rect x="102" y="52" width="8" height="16" rx="2" fill="#1800ad" />
        <rect x="64" y="56" width="8" height="8" rx="2" fill="#1800ad" />
      </g>
      <circle cx="84" cy="79" r="6" fill={skin} />
    </Frame>
  )
}

// Monitoring, evaluation & learning: a person behind a laptop showing a rising chart
export function MelArt() {
  const skin = '#5f3520'
  return (
    <Frame id="svc-mel" bg="#e3f2e8">
      <Bust skin={skin} shirt="#3a25c8" hair={shortHair} cheek="#ff9756">
        <path d="M49 91l11 12 11-12" fill="none" stroke="#ffd166" strokeWidth="4" strokeLinejoin="round" />
      </Bust>
      {/* glasses */}
      <g fill="none" stroke={ink} strokeWidth="1.8">
        <circle cx="53" cy="58" r="5.5" /><circle cx="67" cy="58" r="5.5" /><path d="M58.5 58h3" />
      </g>
      {/* laptop */}
      <rect x="30" y="84" width="60" height="34" rx="3" fill="#9aa1d4" />
      <rect x="33" y="87" width="54" height="28" rx="2" fill="#fff" />
      <path d="M38 109l10-8 8 4 10-10 12-6" fill="none" stroke="#ff751f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="78" cy="89" r="2.5" fill="#ff751f" />
      <rect x="22" y="116" width="76" height="6" rx="2" fill="#7f87cc" />
    </Frame>
  )
}

export const serviceArt = {
  'Youth-centred research': ResearchArt,
  'Policy analysis & briefs': PolicyArt,
  'Design sprints & innovation labs': SprintArt,
  'Capacity building': CapacityArt,
  'Foresight & scenarios': ForesightArt,
  'Monitoring, evaluation & learning': MelArt,
}
