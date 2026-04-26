import { BookingForm } from '../components/BookingForm'

export function Book() {
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
        <p className="eyebrow mb-3">Get on the schedule</p>
        <h1
          className="serif mb-2"
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}
        >
          Book a Service
        </h1>
        <p className="text-sm" style={{ color: 'var(--ink-2)' }}>
          We'll confirm within 24 hours
        </p>
      </div>
      <div className="py-8 px-4">
        <BookingForm />
      </div>
    </div>
  )
}
