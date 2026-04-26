import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Leaf } from 'lucide-react'

export function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/services', label: 'Services' },
    { to: '/book', label: 'Book' },
    { to: '/contact', label: 'Contact' },
  ]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-opacity ${isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-white text-lg tracking-tight">
          <Leaf size={20} />
          KK Outdoor
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6 text-white">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="bg-white text-sky-600 text-sm font-bold px-4 py-1.5 rounded-lg hover:bg-sky-50 transition-colors"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-white"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden glass border-t border-white/20 px-4 py-4 flex flex-col gap-4 text-white">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="bg-white text-sky-600 text-sm font-bold px-4 py-2 rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}
