// Cartoon illustrations for the "Who are you?" cards.
// Hand-drawn SVG in the AfriYouth brand colours, with African textile details.

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

function Face({ cx, cy, skin, cheek = '#e2560b' }) {
  return (
    <>
      <circle cx={cx - 7} cy={cy + 1} r="2.2" fill={ink} />
      <circle cx={cx + 7} cy={cy + 1} r="2.2" fill={ink} />
      <circle cx={cx - 11} cy={cy + 7} r="3" fill={cheek} opacity=".3" />
      <circle cx={cx + 11} cy={cy + 7} r="3" fill={cheek} opacity=".3" />
      <path d={`M${cx - 5} ${cy + 8}q5 4.5 10 0`} fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx={cx} cy={cy + 4.5} rx="1.6" ry="1.2" fill={skin} stroke={ink} strokeOpacity=".25" />
    </>
  )
}

// Young woman with an afro puff, kente headband and a notebook
export function YouthArt() {
  const skin = '#8d5435'
  return (
    <Frame id="aud-youth" bg="#ffd6b8">
      <defs>
        <pattern id="aud-kente" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#ff751f" />
          <rect width="4" height="4" fill={ink} />
          <rect x="4" y="4" width="4" height="4" fill="#1800ad" />
          <rect y="3.4" width="8" height="1.2" fill="#ffd166" />
        </pattern>
      </defs>
      {/* sparkles */}
      <path d="M95 22l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#fff" />
      <path d="M22 36l1.6 3.8 3.8 1.6-3.8 1.6-1.6 3.8-1.6-3.8-3.8-1.6 3.8-1.6z" fill="#ff751f" />
      {/* body */}
      <path d="M24 122c0-22 16-34 36-34s36 12 36 34z" fill="#ff751f" />
      <path d="M45 92q15 10 30 0" fill="none" stroke="url(#aud-kente)" strokeWidth="7" />
      <rect x="53" y="72" width="14" height="18" rx="6" fill={skin} />
      {/* afro puff */}
      <circle cx="60" cy="27" r="15" fill={ink} />
      {/* head */}
      <ellipse cx="60" cy="57" rx="19" ry="20" fill={skin} />
      <circle cx="41" cy="60" r="3.5" fill={skin} />
      <circle cx="79" cy="60" r="3.5" fill={skin} />
      <circle cx="41" cy="67" r="2.6" fill="#ffd166" />
      <circle cx="79" cy="67" r="2.6" fill="#ffd166" />
      <path d="M40.5 55c0-14 8.5-20 19.5-20s19.5 6 19.5 20c-5-6-11-8.5-19.5-8.5S45.5 49 40.5 55z" fill={ink} />
      <path d="M41 46.5q19-10 38 0v5.5q-19-10-38 0z" fill="url(#aud-kente)" />
      <Face cx={60} cy={58} skin={skin} />
      {/* notebook */}
      <g transform="rotate(-8 60 106)">
        <rect x="38" y="96" width="44" height="28" rx="3" fill="#1800ad" />
        <rect x="42" y="99" width="36" height="25" rx="2" fill="#fff" />
        <path d="M47 106h22M47 112h16" stroke="#5d7aff" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <ellipse cx="38" cy="104" rx="5" ry="4.5" fill={skin} />
      <ellipse cx="82" cy="100" rx="5" ry="4.5" fill={skin} />
    </Frame>
  )
}

// Professional in a dashiki-style shirt, holding a results chart
export function OrganisationArt() {
  const skin = '#6e3f26'
  return (
    <Frame id="aud-org" bg="#d9e0ff">
      {/* building skyline */}
      <g fill="#b9c4ff">
        <rect x="10" y="44" width="16" height="60" rx="2" />
        <rect x="94" y="34" width="18" height="70" rx="2" />
      </g>
      <g fill="#d9e0ff">
        <rect x="14" y="50" width="3" height="4" /><rect x="20" y="50" width="3" height="4" />
        <rect x="14" y="58" width="3" height="4" /><rect x="20" y="58" width="3" height="4" />
        <rect x="98" y="40" width="3" height="4" /><rect x="105" y="40" width="3" height="4" />
        <rect x="98" y="48" width="3" height="4" /><rect x="105" y="48" width="3" height="4" />
      </g>
      {/* body */}
      <path d="M24 122c0-22 16-34 36-34s36 12 36 34z" fill="#3a25c8" />
      <path d="M49 91l11 12 11-12" fill="none" stroke="#ff9756" strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M52 93l8 8.5 8-8.5" fill="none" stroke="#fff5ec" strokeWidth="1.6" strokeDasharray="2 2.5" />
      <rect x="53" y="72" width="14" height="18" rx="6" fill={skin} />
      {/* head */}
      <ellipse cx="60" cy="56" rx="19" ry="20" fill={skin} />
      <circle cx="41" cy="59" r="3.5" fill={skin} />
      <circle cx="79" cy="59" r="3.5" fill={skin} />
      <path d="M41 54c-1-14 7-21 19-21s20 7 19 21c-3-7-9-10-19-10s-16 3-19 10z" fill={ink} />
      <Face cx={60} cy={57} skin={skin} cheek="#ff9756" />
      {/* glasses */}
      <g fill="none" stroke={ink} strokeWidth="1.8">
        <circle cx="53" cy="58" r="5.5" /><circle cx="67" cy="58" r="5.5" />
        <path d="M58.5 58h3" />
      </g>
      {/* chart board */}
      <g transform="rotate(6 80 104)">
        <rect x="62" y="88" width="38" height="32" rx="3" fill="#fff" />
        <rect x="68" y="106" width="5" height="9" rx="1" fill="#5d7aff" />
        <rect x="76" y="100" width="5" height="15" rx="1" fill="#ff9756" />
        <rect x="84" y="94" width="5" height="21" rx="1" fill="#ff751f" />
      </g>
      <ellipse cx="64" cy="108" rx="5" ry="4.5" fill={skin} />
    </Frame>
  )
}

// Two partners side by side: a woman in a gele headwrap and a man
export function PartnerArt() {
  const skinA = '#9a5d3a'
  const skinB = '#5f3520'
  return (
    <Frame id="aud-partner" bg="#ffdccb">
      <defs>
        <pattern id="aud-gele" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="10" height="10" fill="#e2560b" />
          <rect width="4" height="10" fill="#ff9756" />
          <circle cx="7" cy="5" r="1.2" fill="#fff5ec" />
        </pattern>
      </defs>
      {/* heart between them */}
      <path d="M60 30c-3-6-13-5-12 3 1 6 12 12 12 12s11-6 12-12c1-8-9-9-12-3z" fill="#fff" />
      {/* man, right */}
      <path d="M58 124c0-18 11-28 25-28s25 10 25 28z" fill="#1800ad" />
      <path d="M72 100l11 10 11-10" fill="none" stroke="#ff9756" strokeWidth="3.5" />
      <rect x="78" y="80" width="11" height="18" rx="5" fill={skinB} />
      <ellipse cx="83.5" cy="72" rx="14.5" ry="15.5" fill={skinB} />
      <path d="M69 69c-1-11 5-16 14.5-16s15.5 5 14.5 16c-2.5-5.5-7-8-14.5-8s-12 2.5-14.5 8z" fill={ink} />
      <circle cx="78.5" cy="73" r="1.9" fill={ink} /><circle cx="88.5" cy="73" r="1.9" fill={ink} />
      <circle cx="75" cy="78" r="2.4" fill="#ff9756" opacity=".35" /><circle cx="92" cy="78" r="2.4" fill="#ff9756" opacity=".35" />
      <path d="M79.5 79q4 3.5 8 0" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
      {/* woman, left */}
      <path d="M12 124c0-18 11-28 25-28s25 10 25 28z" fill="#ff751f" />
      <path d="M26 99q11 8 22 0" fill="none" stroke="#1800ad" strokeWidth="3.5" />
      <rect x="31.5" y="82" width="11" height="16" rx="5" fill={skinA} />
      <ellipse cx="37" cy="72" rx="14.5" ry="15.5" fill={skinA} />
      <circle cx="23" cy="76" r="2.2" fill="#ffd166" />
      {/* gele */}
      <path d="M20 68c-4-14 4-26 17-26 14 0 22 10 18 26-4-5-10-7-18-7s-13 2-17 7z" fill="url(#aud-gele)" />
      <path d="M22 50c6-10 22-12 32-2-8-3-20-3-32 2z" fill="#ff9756" />
      <path d="M30 44c4-6 14-6 18 0" fill="none" stroke="#c2480a" strokeWidth="1.6" />
      <circle cx="32" cy="74" r="1.9" fill={ink} /><circle cx="42" cy="74" r="1.9" fill={ink} />
      <circle cx="28.5" cy="79" r="2.4" fill="#e2560b" opacity=".3" /><circle cx="45.5" cy="79" r="2.4" fill="#e2560b" opacity=".3" />
      <path d="M33 80q4 3.5 8 0" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
    </Frame>
  )
}

export const audienceArt = { youth: YouthArt, organisation: OrganisationArt, partner: PartnerArt }
