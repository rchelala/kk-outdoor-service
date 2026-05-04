import { Link } from 'react-router-dom'
import { Shield, Clock } from 'lucide-react'
import { ServiceCard } from '../components/ServiceCard'
import { ServiceCarousel } from '../components/ServiceCarousel'
import { WorkGallery } from '../components/WorkGallery'
import { services } from '../data/services'

const PREVIEW_SERVICES = services.filter(s => s.id !== 'other')

const TRUST_STATS = [
  { num: '24h', label: 'Quote turnaround' },
  { num: 'On-time', label: 'Every job' },
  { num: 'Cash / Zelle', label: 'Pay when happy' },
  { num: '100%', label: 'Satisfaction promise' },
]

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-10 pb-0 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="hero-grid">
            {/* Left: text */}
            <div className="animate-fade-up">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{
                  background: 'var(--primary-soft)',
                  color: 'var(--primary)',
                  border: '1px solid color-mix(in oklch, var(--primary) 15%, transparent)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: 'var(--primary)',
                    boxShadow: '0 0 0 3px color-mix(in oklch, var(--primary) 25%, transparent)',
                  }}
                />
                Now booking — same-week openings
              </span>

              <h1
                className="serif mb-4"
                style={{
                  fontSize: 'clamp(38px, 6.5vw, 72px)',
                  lineHeight: 1.03,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                }}
              >
                Driveways, cars &amp; yards —{' '}
                <span style={{ color: 'var(--primary)' }}>looked after</span>{' '}
                by the kids next door.
              </h1>

              <p
                className="mb-7 leading-relaxed"
                style={{
                  fontSize: 'clamp(15px, 1.5vw, 17px)',
                  color: 'var(--ink-2)',
                  maxWidth: 520,
                }}
              >
                Kristian &amp; Khalid power-wash, hand-detail, blow leaves and clean windows for
                neighbors right on your block. Honest quotes, on-time arrival.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full text-white text-sm transition-colors"
                  style={{ background: 'var(--primary)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
                >
                  Book a Service →
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                  style={{
                    background: 'color-mix(in oklch, white 55%, transparent)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid color-mix(in oklch, white 65%, transparent)',
                    color: 'var(--ink)',
                  }}
                >
                  See Services
                </Link>
              </div>

              <p className="text-xs flex items-center gap-2" style={{ color: 'var(--ink-3)' }}>
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ background: 'var(--primary)', boxShadow: '0 0 0 3px var(--primary-soft)' }}
                />
                Two kids · honest work · cash on delivery
              </p>
            </div>

            {/* Right: photo placeholder with floating badges */}
            <div className="relative hidden sm:block">
              <div
                className="rounded-[22px] shadow-lg border overflow-hidden"
                style={{
                  aspectRatio: '4/5',
                  background:
                    'repeating-linear-gradient(135deg, color-mix(in oklch, #1f4d3b 10%, transparent) 0 1px, transparent 1px 14px), linear-gradient(180deg, #d6e4d8, #aec4b3)',
                  borderColor: 'var(--line)',
                }}
              >
                <span
                  className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-md font-mono"
                  style={{
                    background: 'rgba(255,255,255,.9)',
                    color: 'var(--ink-2)',
                    border: '1px solid var(--line)',
                  }}
                >
                  hero photo · kids power-washing a driveway
                </span>
              </div>

              {/* Floating: Satisfaction promise */}
              <div
                className="glass-strong absolute -left-4 -bottom-4 rounded-[14px] p-3.5 flex items-center gap-3"
                style={{ maxWidth: 240 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}
                >
                  <Shield size={18} />
                </div>
                <div>
                  <p className="text-[13px] font-bold leading-tight" style={{ color: 'var(--ink)' }}>
                    Satisfaction promise
                  </p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--ink-2)' }}>
                    Not happy? We re-do it free.
                  </p>
                </div>
              </div>

              {/* Floating: Same-week service */}
              <div
                className="glass-strong absolute -right-3 top-5 rounded-full py-2.5 px-3.5 flex items-center gap-2 text-[13px] font-semibold"
                style={{ color: 'var(--ink)' }}
              >
                <Clock size={15} style={{ color: 'var(--primary)' }} />
                Same-week service
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div
          className="mt-12 border-t border-b"
          style={{
            background: 'color-mix(in oklch, white 38%, transparent)',
            backdropFilter: 'blur(14px) saturate(140%)',
            WebkitBackdropFilter: 'blur(14px) saturate(140%)',
            borderColor: 'color-mix(in oklch, white 55%, transparent)',
          }}
        >
          <div className="max-w-5xl mx-auto trust-grid">
            {TRUST_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="py-5 text-center trust-cell"
                style={{
                  borderRight: i < 3 ? '1px solid var(--line)' : undefined,
                }}
              >
                <div
                  className="serif text-[28px] leading-none"
                  style={{ color: 'var(--primary)' }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-[11px] mt-1.5 font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--ink-2)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel */}
      <ServiceCarousel />

      {/* Service preview */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <p className="eyebrow mb-2">What we do</p>
        <h2
          className="serif mb-1"
          style={{
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            lineHeight: 1.1,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
          }}
        >
          Four simple services.{' '}
          <span style={{ color: 'var(--primary)' }}>One honest crew.</span>
        </h2>
        <p className="text-sm mb-7 mt-2" style={{ color: 'var(--ink-2)' }}>
          Tap any service to book instantly
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PREVIEW_SERVICES.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/services"
            className="text-sm font-bold hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            View all services →
          </Link>
        </div>
      </section>

      {/* Our Work section */}
      <WorkGallery />

      {/* About section */}
      <section
        className="py-16 px-4"
        style={{ background: 'var(--bg-2)' }}
      >
        <div className="max-w-xl mx-auto text-center">
          <p className="eyebrow mb-4">About us</p>
          <h2
            className="serif mb-5"
            style={{
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              lineHeight: 1.1,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
            }}
          >
            Hi, we're Kristian &amp; Khalid
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>
            We're two kids from your neighborhood who love getting outside and helping our
            community. We started KK Outdoor Services to do great work at prices that make
            sense — no big company overhead, just two hardworking kids with equipment and
            a can-do attitude. Scan our card, pick a service, and we'll show up ready to work.
          </p>
          <Link
            to="/book"
            className="inline-block mt-8 text-sm font-semibold px-6 py-3 rounded-full text-white transition-colors"
            style={{ background: 'var(--primary)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
          >
            Book a Service
          </Link>
        </div>
      </section>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
          padding-bottom: 56px;
        }
        @media (min-width: 880px) {
          .hero-grid { grid-template-columns: 1.1fr 0.9fr; gap: 56px; }
        }
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        .trust-cell:nth-child(2) { border-right: none !important; }
        .trust-cell:nth-child(1),
        .trust-cell:nth-child(2) { border-bottom: 1px solid var(--line); }
        @media (min-width: 640px) {
          .trust-grid { grid-template-columns: repeat(4, 1fr); }
          .trust-cell:nth-child(2) { border-right: 1px solid var(--line) !important; }
          .trust-cell:nth-child(1),
          .trust-cell:nth-child(2) { border-bottom: none; }
        }
      `}</style>
    </div>
  )
}
