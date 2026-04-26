import { useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { GradientButton } from './GradientButton'
import type { ContactFormData, FormStatus } from '../types'

const EMPTY: ContactFormData = { name: '', contact: '', message: '' }

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
        <h2 className="text-xl font-extrabold mb-2">Message sent!</h2>
        <p className="text-sm opacity-85">We'll get back to you soon.</p>
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
          Something went wrong — please try again.
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className={labelClass}>Name</label>
        <input
          id="name"
          required
          placeholder="Your name"
          className={inputClass}
          value={form.name}
          onChange={set('name')}
        />
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

      <div className="mb-6">
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          required
          rows={4}
          placeholder="What's on your mind?"
          className={`${inputClass} resize-none`}
          value={form.message}
          onChange={set('message')}
        />
      </div>

      <GradientButton type="submit" loading={status === 'submitting'}>
        Send Message
      </GradientButton>
    </form>
  )
}
