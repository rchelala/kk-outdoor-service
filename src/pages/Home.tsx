import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { GlassBadge } from '../components/GlassBadge'
import { ServiceCard } from '../components/ServiceCard'
import { ServiceCarousel } from '../components/ServiceCarousel'
import { services } from '../data/services'

const PREVIEW_SERVICES = services.filter(s => s.id !== 'other')

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="animated-gradient min-h-[92vh] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-12 pb-4">
          <GlassBadge className="mb-6">
            <Star size={12} fill="currentColor" />
            Neighborhood Trusted
          </GlassBadge>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Your Neighborhood<br />Cleaning Crew
          </h1>

          <p className="text-white/85 text-base sm:text-lg mb-8 max-w-sm leading-relaxed">
            Power washing · Car wash · Leaf blowing and more —<br className="hidden sm:block" />
            right on your block
          </p>

          <div className="flex gap-3 flex-wrap justify-center mb-10">
            <Link
              to="/book"
              className="bg-white text-sky-600 font-bold px-6 py-3 rounded-xl shadow-lg shadow-black/20 hover:bg-sky-50 transition-colors text-sm"
            >
              Book a Service
            </Link>
            <Link
              to="/services"
              className="glass text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm"
            >
              See Services
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-3 flex-wrap justify-center">
            {[
              { num: '50+', label: 'Homes Served' },
              { num: '5★', label: 'Avg Rating' },
              { num: 'Same Day', label: 'Available' },
            ].map(stat => (
              <div key={stat.label} className="glass rounded-xl px-5 py-3 text-center text-white">
                <span className="block font-extrabold text-lg leading-none">{stat.num}</span>
                <span className="text-xs opacity-75 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <ServiceCarousel />

        {/* Wave transition */}
        <div
          className="h-8 bg-slate-50"
          style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}
        />
      </section>

      {/* Service preview */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-1">What We Do</h2>
        <p className="text-slate-500 text-sm mb-6">Tap any service to book instantly</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PREVIEW_SERVICES.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/services"
            className="text-sky-600 font-bold text-sm hover:underline"
          >
            View all services →
          </Link>
        </div>
      </section>

      {/* About section */}
      <section className="animated-gradient py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <GlassBadge className="mb-5">About Us</GlassBadge>
          <h2 className="text-2xl font-extrabold text-white mb-4">
            Hi, we're Kristian &amp; Khalid
          </h2>
          <p className="text-white/85 text-sm leading-relaxed">
            We're two kids from your neighborhood who love getting outside and helping our
            community. We started KK Outdoor Services to do great work at prices that make
            sense — no big company overhead, just two hardworking kids with equipment and
            a can-do attitude. Scan our card, pick a service, and we'll show up ready to work.
          </p>
          <Link
            to="/book"
            className="inline-block mt-8 bg-white text-sky-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-sky-50 transition-colors text-sm"
          >
            Book a Service
          </Link>
        </div>
      </section>
    </div>
  )
}
