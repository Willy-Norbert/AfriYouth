// Textile-inspired fills for the colourful hero map.

export default function MapPatterns() {
  return (
    <defs>
      <pattern id="p-stripe" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
        <rect width="12" height="12" fill="#ff9756" />
        <rect width="5" height="12" fill="#e2560b" />
      </pattern>
      <pattern id="p-dots" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#1800ad" />
        <circle cx="5" cy="5" r="2" fill="#fff5ec" />
      </pattern>
      <pattern id="p-zigzag" width="16" height="10" patternUnits="userSpaceOnUse">
        <rect width="16" height="10" fill="#3a25c8" />
        <path d="M0 8 4 2l4 6 4-6 4 6" fill="none" stroke="#ff9756" strokeWidth="1.8" />
      </pattern>
      <pattern id="p-check" width="14" height="14" patternUnits="userSpaceOnUse">
        <rect width="14" height="14" fill="#ff751f" />
        <rect width="7" height="7" fill="#12093f" opacity=".85" />
        <rect x="7" y="7" width="7" height="7" fill="#12093f" opacity=".85" />
      </pattern>
      <pattern id="p-tri" width="14" height="12" patternUnits="userSpaceOnUse">
        <rect width="14" height="12" fill="#5d7aff" />
        <path d="M0 12 7 2l7 10z" fill="#ff9756" />
      </pattern>
    </defs>
  )
}
