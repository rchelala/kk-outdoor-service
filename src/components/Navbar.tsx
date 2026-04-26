import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/services', label: 'Services' },
    { to: '/book', label: 'Book' },
    { to: '/contact', label: 'Contact' },
  ]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-forest font-semibold' : 'text-ink-2 hover:text-ink'
    }`

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent border-b border-transparent'
      }`}
      style={{ borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0 }}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <span
            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white shadow-sm flex-shrink-0"
            style={{
              background: 'var(--primary)',
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 22,
              lineHeight: 1,
            }}
          >
            kk
          </span>
          <span className="font-bold tracking-tight text-[15px]" style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            KK Outdoor{' '}
            <span style={{ color: 'var(--ink-3)', fontWeight: 500 }}>Services</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-colors text-white"
            style={{ background: 'var(--primary)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden w-10 h-10 rounded-xl flex items-center justify-center border transition-colors"
          style={{ background: 'var(--surface)', borderColor: 'var(--line)', color: 'var(--ink)' }}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="sm:hidden px-4 py-4 flex flex-col gap-1 border-t"
          style={{ background: 'rgba(255,255,255,0.95)', borderColor: 'var(--line)' }}
        >
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className="py-3 text-base font-medium border-b"
              style={{ color: 'var(--ink)', borderColor: 'var(--line)', textDecoration: 'none' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="mt-3 text-center text-sm font-semibold py-3 rounded-full text-white"
            style={{ background: 'var(--primary)' }}
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}
