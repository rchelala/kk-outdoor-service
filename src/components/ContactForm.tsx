import { useState } from 'react'
import { CheckCircle2, AlertCircle, Shield } from 'lucide-react'
import { GradientButton } from './GradientButton'
import type { ContactFormData, FormStatus } from '../types'

const EMPTY: ContactFormData = { name: '', contact: '', message: '' }

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

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(EMPTY)
  const [status, setStatus] = useState<FormStatus>('idle')

  const set = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [field]: e.target.value }))

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
        <h2 className="serif text-2xl mb-2" style={{ color: 'var(--ink)' }}>Message sent!</h2>
        <p className="text-sm" style={{ color: 'var(--ink-2)' }}>We'll get back to you soon.</p>
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
          Something went wrong — please try again.
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className={labelClass} style={{ color: 'var(--ink-2)' }}>Name</label>
        <input
          id="name"
          required
          placeholder="Your name"
          className={inputClass}
          style={inputStyle}
          value={form.name}
          onChange={set('name')}
        />
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

      <div className="mb-6">
        <label htmlFor="message" className={labelClass} style={{ color: 'var(--ink-2)' }}>Message</label>
        <textarea
          id="message"
          required
          rows={4}
          placeholder="What's on your mind?"
          className={`${inputClass} resize-none`}
          style={inputStyle}
          value={form.message}
          onChange={set('message')}
        />
      </div>

      <GradientButton type="submit" loading={status === 'submitting'}>
        Send Message
      </GradientButton>

      <p className="flex items-center justify-center gap-2 text-xs mt-3" style={{ color: 'var(--ink-3)' }}>
        <Shield size={13} /> We never share your info.
      </p>
    </form>
  )
}
