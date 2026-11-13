// A printed photo stuck on a board: white print border (thicker at the bottom),
// two strips of see-through tape across the top corners and a soft shadow.
// Tilt it with a rotate-* class in className.
const tapeEdge = 'polygon(0 8%, 4% 0, 8% 10%, 12% 2%, 88% 0, 92% 9%, 96% 1%, 100% 10%, 100% 92%, 96% 100%, 92% 90%, 88% 99%, 12% 100%, 8% 91%, 4% 100%, 0 92%)'
const stripes = 'repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0 2px, transparent 2px 6px)'

export default function TapedPhoto({ src, alt = '', aspect = 'aspect-[4/3]', className = '' }) {
  return (
    <div className={`relative mx-auto w-full ${className}`}>
      <span aria-hidden="true" className="absolute -left-4 -top-3 z-10 h-8 w-28 -rotate-[24deg] shadow-sm"
        style={{ backgroundColor: 'rgba(190, 180, 255, 0.7)', backgroundImage: stripes, clipPath: tapeEdge }} />
      <span aria-hidden="true" className="absolute -right-4 -top-3 z-10 h-8 w-28 rotate-[22deg] shadow-sm"
        style={{ backgroundColor: 'rgba(229, 124, 242, 0.5)', backgroundImage: stripes, clipPath: tapeEdge }} />
      <img src={src} alt={alt}
        className={`${aspect} w-full border-[12px] border-b-[44px] border-white bg-sky object-cover shadow-[0_18px_40px_-18px_rgba(13,6,36,0.45)]`} />
    </div>
  )
}
