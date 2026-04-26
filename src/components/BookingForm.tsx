import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, AlertCircle, Shield } from 'lucide-react'
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

const inputClass = [
  'w-full rounded-xl px-4 py-3 text-sm transition-all',
  'border focus:outline-none focus:ring-2',
].join(' ')

const inputStyle = {
  background: 'color-mix(in oklch, white 60%, transparent)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderColor: 'color-mix(in oklch, white 55%, transparent)',
  color: 'var(--ink)',
}

const labelClass = 'block text-xs font-semibold tracking-wide mb-1.5'

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
        `https://formspree.io/f/xwvajebe`,
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
      <div
        className="rounded-2xl p-8 text-center max-w-md mx-auto"
        style={{
          background: 'linear-gradient(180deg, var(--primary-soft), white)',
          border: '1px solid var(--line)',
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'var(--primary)', color: '#fff' }}
        >
          <CheckCircle2 size={28} />
        </div>
        <h2 className="serif text-2xl mb-2" style={{ color: 'var(--ink)' }}>We got it!</h2>
        <p className="text-sm" style={{ color: 'var(--ink-2)' }}>
          Kristian &amp; Khalid will be in touch within 24 hours to confirm your booking.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 max-w-md mx-auto w-full"
      style={{
        background: 'color-mix(in oklch, white 65%, transparent)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        border: '1px solid color-mix(in oklch, white 65%, transparent)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {status === 'error' && (
        <div
          className="flex items-center gap-2 rounded-xl p-3 mb-4 text-sm"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid color-mix(in oklch, var(--accent) 30%, transparent)' }}
        >
          <AlertCircle size={16} />
          Something went wrong — please try again or text us directly.
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label htmlFor="firstName" className={labelClass} style={{ color: 'var(--ink-2)' }}>First Name</label>
          <input
            id="firstName"
            required
            placeholder="Kristian"
            className={inputClass}
            style={inputStyle}
            value={form.firstName}
            onChange={set('firstName')}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass} style={{ color: 'var(--ink-2)' }}>Last Name</label>
          <input
            id="lastName"
            required
            placeholder="Smith"
            className={inputClass}
            style={inputStyle}
            value={form.lastName}
            onChange={set('lastName')}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="contact" className={labelClass} style={{ color: 'var(--ink-2)' }}>Email or Phone</label>
        <input
          id="contact"
          required
          placeholder="john@email.com or 555-0100"
          className={inputClass}
          style={inputStyle}
          value={form.contact}
          onChange={set('contact')}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address" className={labelClass} style={{ color: 'var(--ink-2)' }}>Address</label>
        <input
          id="address"
          required
          placeholder="123 Maple Street"
          className={inputClass}
          style={inputStyle}
          value={form.address}
          onChange={set('address')}
        />
      </div>

      <div className="mb-4">
        <label className={labelClass} style={{ color: 'var(--ink-2)' }}>Service</label>
        <div className="flex flex-wrap gap-2">
          {services.map(s => {
            const selected = form.service === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleService(s.id)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
                style={{
                  background: selected ? 'var(--primary)' : 'transparent',
                  color: selected ? '#fff' : 'var(--ink)',
                  borderColor: selected ? 'var(--primary)' : 'var(--line-2)',
                  borderStyle: s.id === 'other' ? 'dashed' : 'solid',
                }}
              >
                {s.name}{s.price !== null ? ` — $${s.price}` : ''}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="date" className={labelClass} style={{ color: 'var(--ink-2)' }}>Preferred Date</label>
        <input
          id="date"
          type="date"
          className={inputClass}
          style={inputStyle}
          value={form.date}
          onChange={set('date')}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="notes" className={labelClass} style={{ color: 'var(--ink-2)' }}>
          Notes {form.service === 'other' && <span style={{ color: 'var(--accent)' }}>*</span>}
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
          style={inputStyle}
          value={form.notes}
          onChange={set('notes')}
        />
      </div>

      <GradientButton type="submit" loading={status === 'submitting'}>
        Send Booking Request
      </GradientButton>

      <p className="flex items-center justify-center gap-2 text-xs mt-3" style={{ color: 'var(--ink-3)' }}>
        <Shield size={13} /> We never share your info.
      </p>
    </form>
  )
}
