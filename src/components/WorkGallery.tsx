export function WorkGallery() {
  const workImages = [
    {
      src: '/Car_Wash_Truck.jpeg',
      alt: 'Professional car wash service - truck detail',
    },
    {
      src: '/Car_Wash_Truck2.jpeg',
      alt: 'Professional car wash service - truck cleaning',
    },
  ]

  return (
    <section className="max-w-5xl mx-auto px-4 py-14">
      <p className="eyebrow mb-2">Our Work</p>
      <h2
        className="serif mb-1"
        style={{
          fontSize: 'clamp(26px, 3.5vw, 40px)',
          lineHeight: 1.1,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
        }}
      >
        See the{' '}
        <span style={{ color: 'var(--primary)' }}>difference we make.</span>
      </h2>
      <p className="text-sm mb-7 mt-2" style={{ color: 'var(--ink-2)' }}>
        Real results from our recent car wash services
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {workImages.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[18px] border shadow-md transition-all duration-300 hover:shadow-xl"
            style={{
              aspectRatio: '4/3',
              borderColor: 'var(--line)',
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'linear-gradient(to top, rgba(31, 77, 59, 0.4), transparent 50%)',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
