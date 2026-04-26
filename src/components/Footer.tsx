import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span
            className="w-8 h-8 rounded-[8px] flex items-center justify-center text-white flex-shrink-0"
            style={{
              background: 'var(--primary)',
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            kk
          </span>
          <span className="font-bold text-white tracking-tight text-[15px]">
            KK Outdoor{' '}
            <span className="font-normal text-slate-400">Services</span>
          </span>
        </div>
        <nav className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <Link to="/book" className="hover:text-white transition-colors">Book</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>
        <p className="text-xs text-slate-500">
          Built by Kristian &amp; Khalid · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
