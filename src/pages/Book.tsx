import { BookingForm } from '../components/BookingForm'

export function Book() {
  return (
    <div className="animated-gradient min-h-screen py-12 px-4">
      <div className="text-center text-white mb-8">
        <h1 className="text-3xl font-black tracking-tight mb-2">Book a Service</h1>
        <p className="text-white/80 text-sm">We'll confirm within 24 hours</p>
      </div>
      <BookingForm />
    </div>
  )
}
