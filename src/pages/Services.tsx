import { ServiceCard } from '../components/ServiceCard'
import { services } from '../data/services'

export function Services() {
  return (
    <div>
      <div className="animated-gradient py-12 px-4 text-center text-white">
        <h1 className="text-3xl font-black tracking-tight mb-2">Our Services</h1>
        <p className="text-white/80 text-sm">Tap any service to book</p>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-3">
          {services.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </div>
  )
}
