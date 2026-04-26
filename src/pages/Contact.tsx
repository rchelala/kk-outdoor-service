import { ContactForm } from '../components/ContactForm'

export function Contact() {
  return (
    <div className="animated-gradient min-h-screen py-12 px-4">
      <div className="text-center text-white mb-8">
        <h1 className="text-3xl font-black tracking-tight mb-2">Get in Touch</h1>
        <p className="text-white/80 text-sm">Questions? We'd love to hear from you.</p>
      </div>
      <ContactForm />
    </div>
  )
}
