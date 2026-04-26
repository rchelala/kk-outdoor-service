const PILLS = [
  'Power Washing',
  'Car Wash',
  'Leaf Blowing',
  'Window Wipe',
  'Trash Can Cleaning',
  'Yard Cleanup',
  'Driveway Rinse',
  'Patio Sweep',
]

export function ServiceCarousel() {
  return (
    <div className="overflow-hidden w-full bg-black/10 border-t border-white/15 py-2.5">
      <div className="flex gap-3 w-max animate-[carouselScroll_18s_linear_infinite]">
        {[...PILLS, ...PILLS].map((pill, i) => (
          <span
            key={i}
            className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-white whitespace-nowrap"
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  )
}
