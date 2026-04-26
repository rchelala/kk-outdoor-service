import { ContactForm } from '../components/ContactForm'

export function Contact() {
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
        <p className="eyebrow mb-3">Say hello</p>
        <h1
          className="serif mb-2"
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}
        >
          Get in Touch
        </h1>
        <p className="text-sm" style={{ color: 'var(--ink-2)' }}>
          Questions? We'd love to hear from you.
        </p>
      </div>
      <div className="py-8 px-4">
        <ContactForm />
      </div>
    </div>
  )
}
