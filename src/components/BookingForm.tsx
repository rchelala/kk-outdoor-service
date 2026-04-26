import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { services } from '../data/services'
import { GradientButton } from './GradientButton'
import type { BookingFormData, FormStatus } from '../types'

const EMPTY: BookingFormData = {
  firstName: '',
  lastName: '',
  contact: '',
  address: '',
  service: '',
  date: '',
  notes: '',
}

export function BookingForm() {
  const [searchParams] = useSearchParams()
  const preSelected = searchParams.get('service') ?? ''

  const [form, setForm] = useState<BookingFormData>({ ...EMPTY, service: preSelected })
  const [status, setStatus] = useState<FormStatus>('idle')

  const set = (field: keyof BookingFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [field]: e.target.value }))

  const toggleService = (id: string) =>
    setForm(f => ({ ...f, service: f.service === id ? '' : id }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(
        `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      )
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass rounded-2xl p-8 text-center text-white max-w-md mx-auto">
        <CheckCircle2 size={48} className="mx-auto mb-4 text-green-300" />
        <h2 className="text-xl font-extrabold mb-2">We got it!</h2>
        <p className="text-sm opacity-85">
          Kristian &amp; Khalid will be in touch within 24 hours to confirm your booking.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-white/20 border border-white/35 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50'
  const labelClass = 'block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 max-w-md mx-auto w-full">
      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/40 rounded-xl p-3 mb-4 text-white text-sm">
          <AlertCircle size={16} />
          Something went wrong — please try again or text us directly.
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name</label>
          <input
            id="firstName"
            required
            placeholder="Kristian"
            className={inputClass}
            value={form.firstName}
            onChange={set('firstName')}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name</label>
          <input
            id="lastName"
            required
            placeholder="Smith"
            className={inputClass}
            value={form.lastName}
            onChange={set('lastName')}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="contact" className={labelClass}>Email or Phone</label>
        <input
          id="contact"
          required
          placeholder="john@email.com or 555-0100"
          className={inputClass}
          value={form.contact}
          onChange={set('contact')}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address" className={labelClass}>Address</label>
        <input
          id="address"
          required
          placeholder="123 Maple Street"
          className={inputClass}
          value={form.address}
          onChange={set('address')}
        />
      </div>

      <div className="mb-4">
        <label className={labelClass}>Service</label>
        <div className="flex flex-wrap gap-2">
          {services.map(s => (
            <button
              key={s.id}
              type="button"
              data-selected={form.service === s.id ? 'true' : 'false'}
              onClick={() => toggleService(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                form.service === s.id
                  ? 'bg-white text-sky-600 border-white'
                  : 'bg-white/15 text-white border-white/30 hover:bg-white/25'
              }`}
            >
              {s.name}{s.price !== null ? ` — $${s.price}` : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="date" className={labelClass}>Preferred Date</label>
        <input
          id="date"
          type="date"
          className={inputClass}
          value={form.date}
          onChange={set('date')}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="notes" className={labelClass}>
          Notes {form.service === 'other' && <span className="text-red-300">*</span>}
        </label>
        <textarea
          id="notes"
          rows={3}
          required={form.service === 'other'}
          placeholder={
            form.service === 'other'
              ? 'Describe what you need...'
              : 'Any special instructions (optional)'
          }
          className={`${inputClass} resize-none`}
          value={form.notes}
          onChange={set('notes')}
        />
      </div>

      <GradientButton type="submit" loading={status === 'submitting'}>
        Send Booking Request
      </GradientButton>
    </form>
  )
}
