import { MapPin } from 'lucide-react'
import { ServiceCard } from '../components/ServiceCard'
import { services } from '../data/services'

export function Services() {
  return (
    <div>
      {/* Header */}
      <div
        className="py-14 px-4 text-center"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, color-mix(in oklch, #1f4d3b 20%, transparent), transparent 80%)',
        }}
      >
        <p className="eyebrow mb-3">What we offer</p>
        <h1
          className="serif mb-2"
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}
        >
          Our Services
        </h1>
        <p className="text-sm" style={{ color: 'var(--ink-2)' }}>
          Tap any service to book instantly
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-3">
          {services.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>

      {/* Service Area */}
      <div className="max-w-2xl mx-auto px-4 pb-14">
        <div
          className="rounded-2xl border p-5"
          style={{
            background: 'color-mix(in oklch, white 65%, transparent)',
            backdropFilter: 'blur(16px) saturate(140%)',
            WebkitBackdropFilter: 'blur(16px) saturate(140%)',
            borderColor: 'color-mix(in oklch, white 65%, transparent)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}
            >
              <MapPin size={22} />
            </div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: 'var(--ink)' }}>
                Where We Serve
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                We serve the <span className="font-semibold" style={{ color: 'var(--ink)' }}>Liberty community</span> in South Phoenix — neighborhoods around{' '}
                <span className="font-semibold" style={{ color: 'var(--ink)' }}>23rd Ave & Southern Ave</span> and nearby streets.
                Not sure if we reach you?{' '}
                <a href="/contact" className="underline" style={{ color: 'var(--primary)' }}>
                  Just ask!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
