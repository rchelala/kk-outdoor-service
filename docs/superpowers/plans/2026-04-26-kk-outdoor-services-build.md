# KK Outdoor Services — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a mobile-first React website for Kristian & Khalid's neighborhood outdoor cleaning business, with animated glassmorphism design and Formspree booking form.

**Architecture:** Single-page React app (React Router v6) with four pages: Home, Services, Book, Contact. All service data lives in a typed array in `src/data/services.ts`. Forms POST to Formspree via `fetch`. Deployed to Vercel with an SPA rewrite rule.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v3, React Router v6, lucide-react, Vitest, React Testing Library, Formspree

---

## File Map

| File | Responsibility |
|---|---|
| `src/types/index.ts` | `Service` and `FormState` interfaces |
| `src/data/services.ts` | Typed array of all 5 services with prices + icons |
| `src/index.css` | Gradient animation keyframe + glassmorphism utility classes |
| `tailwind.config.ts` | Custom font (Inter), extend animation tokens |
| `src/components/Navbar.tsx` | Glassmorphism nav, mobile hamburger |
| `src/components/Footer.tsx` | Dark footer, branding, nav links |
| `src/components/GlassBadge.tsx` | Reusable frosted pill (trust badge, carousel pill) |
| `src/components/ServiceCard.tsx` | Grid card: icon, name, desc, price badge, Book Now link |
| `src/components/ServiceCarousel.tsx` | Pure-CSS infinite-scroll strip of service pills |
| `src/components/BookingForm.tsx` | Glassmorphism form, Formspree POST, URL pre-fill, success/error |
| `src/components/ContactForm.tsx` | Simpler version of BookingForm (name, contact, message) |
| `src/pages/Home.tsx` | Hero + carousel + service preview + about blurb |
| `src/pages/Services.tsx` | Page header + full service grid |
| `src/pages/Book.tsx` | Gradient background + BookingForm |
| `src/pages/Contact.tsx` | Gradient background + ContactForm |
| `src/App.tsx` | Router, layout wrapper (Navbar + outlet + Footer) |
| `src/main.tsx` | React root mount |
| `vercel.json` | SPA catch-all rewrite rule |
| `.env.example` | `VITE_FORMSPREE_ID` placeholder |
| `src/components/ServiceCard.test.tsx` | ServiceCard render tests |
| `src/components/BookingForm.test.tsx` | Pre-fill, success, error state tests |
| `src/data/services.test.ts` | Service data integrity tests |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`

- [ ] **Step 1.1: Scaffold Vite + React + TS project**

Run in `c:\Users\rober\OneDrive\Documents\KK Outdoor Services`:

```bash
npm create vite@latest . -- --template react-ts
```

When prompted "Current directory is not empty. Remove existing files and continue?" — select **No, keep existing files** (it will add alongside CLAUDE.md).

- [ ] **Step 1.2: Install dependencies**

```bash
npm install
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 1.3: Initialize Tailwind**

```bash
npx tailwindcss init -p --ts
```

- [ ] **Step 1.4: Verify scaffold works**

```bash
npm run dev
```

Expected: Vite dev server running at `http://localhost:5173`. Open it — default Vite/React page shows.

- [ ] **Step 1.5: Commit**

```bash
git init
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.node.json index.html src/
git commit -m "feat: scaffold Vite + React + TS project"
```

---

## Task 2: Configure Tailwind, Fonts & Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 2.1: Configure Tailwind**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradientShift 7s ease infinite',
        'carousel-scroll': 'carouselScroll 18s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        carouselScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [forms],
} satisfies Config
```

- [ ] **Step 2.2: Set up global CSS**

Replace `src/index.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-50 text-slate-900 font-sans;
  }
}

@layer utilities {
  .animated-gradient {
    background: linear-gradient(-45deg, #0ea5e9, #22c55e, #0284c7, #059669, #38bdf8);
    background-size: 400% 400%;
    animation: gradientShift 7s ease infinite;
  }

  .glass {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .glass-dark {
    background: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}
```

- [ ] **Step 2.3: Add Inter font meta to index.html**

Add `<link rel="preconnect" href="https://fonts.googleapis.com">` before the `</head>` tag in `index.html`. Update title to `KK Outdoor Services`.

- [ ] **Step 2.4: Commit**

```bash
git add tailwind.config.ts src/index.css index.html
git commit -m "feat: configure Tailwind, Inter font, and animated gradient utilities"
```

---

## Task 3: Types & Service Data

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/services.ts`
- Create: `src/data/services.test.ts`

- [ ] **Step 3.1: Write the failing test**

Create `src/data/services.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { services } from './services'

describe('services data', () => {
  it('has exactly 5 services', () => {
    expect(services).toHaveLength(5)
  })

  it('each service has required fields', () => {
    for (const s of services) {
      expect(s.id).toBeTruthy()
      expect(s.name).toBeTruthy()
      expect(s.description).toBeTruthy()
      expect(s.icon).toBeTruthy()
    }
  })

  it('the other service has null price', () => {
    const other = services.find(s => s.id === 'other')
    expect(other).toBeDefined()
    expect(other!.price).toBeNull()
  })

  it('priced services have positive prices', () => {
    const priced = services.filter(s => s.price !== null)
    expect(priced).toHaveLength(4)
    for (const s of priced) {
      expect(s.price).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 3.2: Add Vitest config to vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

Create `src/test-setup.ts`:

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 3.3: Run test — verify it fails**

```bash
npx vitest run src/data/services.test.ts
```

Expected: FAIL — `Cannot find module './services'`

- [ ] **Step 3.4: Create types**

Create `src/types/index.ts`:

```ts
import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  name: string
  description: string
  price: number | null
  icon: LucideIcon
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface BookingFormData {
  firstName: string
  lastName: string
  contact: string
  address: string
  service: string
  date: string
  notes: string
}

export interface ContactFormData {
  name: string
  contact: string
  message: string
}
```

- [ ] **Step 3.5: Create service data**

Create `src/data/services.ts`:

```ts
import { Droplets, Car, Wind, Sparkles, PenLine } from 'lucide-react'
import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'power-wash',
    name: 'Power Washing',
    description: 'Driveways, patios & trash cans blasted clean',
    price: 10,
    icon: Droplets,
  },
  {
    id: 'car-wash',
    name: 'Car Wash',
    description: 'Hand wash, rinse & dry — looking brand new',
    price: 15,
    icon: Car,
  },
  {
    id: 'leaf-blow',
    name: 'Leaf Blowing',
    description: 'Front & backyard cleared of leaves and debris',
    price: 10,
    icon: Wind,
  },
  {
    id: 'window-wipe',
    name: 'Window Wipe',
    description: 'Exterior window cleaning, streak-free shine',
    price: 15,
    icon: Sparkles,
  },
  {
    id: 'other',
    name: 'Something Else?',
    description: 'Tell us what you need — we\'ll make it happen',
    price: null,
    icon: PenLine,
  },
]
```

- [ ] **Step 3.6: Run test — verify it passes**

```bash
npx vitest run src/data/services.test.ts
```

Expected: PASS — 4 tests pass

- [ ] **Step 3.7: Commit**

```bash
git add src/types/index.ts src/data/services.ts src/data/services.test.ts src/test-setup.ts vite.config.ts
git commit -m "feat: add Service types and service data with tests"
```

---

## Task 4: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 4.1: Create Navbar**

Create `src/components/Navbar.tsx`:

```tsx
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
```

- [ ] **Step 4.2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add glassmorphism Navbar with mobile hamburger"
```

---

## Task 5: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 5.1: Create Footer**

Create `src/components/Footer.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-white font-extrabold text-lg">
          <Leaf size={20} className="text-green-400" />
          KK Outdoor Services
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
```

- [ ] **Step 5.2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer with nav links and branding"
```

---

## Task 6: Shared UI — GlassBadge & GradientButton

**Files:**
- Create: `src/components/GlassBadge.tsx`
- Create: `src/components/GradientButton.tsx`

- [ ] **Step 6.1: Create GlassBadge**

Create `src/components/GlassBadge.tsx`:

```tsx
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function GlassBadge({ children, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-xs font-semibold text-white tracking-wide ${className}`}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 6.2: Create GradientButton**

Create `src/components/GradientButton.tsx`:

```tsx
import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export function GradientButton({ children, loading, className = '', ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-green-500 text-white font-bold text-sm shadow-lg shadow-sky-500/30 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? 'Sending...' : children}
    </button>
  )
}
```

- [ ] **Step 6.3: Commit**

```bash
git add src/components/GlassBadge.tsx src/components/GradientButton.tsx
git commit -m "feat: add GlassBadge and GradientButton shared components"
```

---

## Task 7: ServiceCard Component

**Files:**
- Create: `src/components/ServiceCard.tsx`
- Create: `src/components/ServiceCard.test.tsx`

- [ ] **Step 7.1: Write failing tests**

Create `src/components/ServiceCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Droplets } from 'lucide-react'
import { describe, it, expect } from 'vitest'
import { ServiceCard } from './ServiceCard'
import type { Service } from '../types'

const mockService: Service = {
  id: 'power-wash',
  name: 'Power Washing',
  description: 'Driveways, patios & trash cans',
  price: 10,
  icon: Droplets,
}

const otherService: Service = {
  id: 'other',
  name: 'Something Else?',
  description: 'Tell us what you need',
  price: null,
  icon: Droplets,
}

function renderCard(service: Service) {
  return render(
    <MemoryRouter>
      <ServiceCard service={service} />
    </MemoryRouter>
  )
}

describe('ServiceCard', () => {
  it('renders the service name', () => {
    renderCard(mockService)
    expect(screen.getByText('Power Washing')).toBeInTheDocument()
  })

  it('renders the price badge for priced services', () => {
    renderCard(mockService)
    expect(screen.getByText('$10')).toBeInTheDocument()
  })

  it('renders Book Now link pointing to /book?service=power-wash', () => {
    renderCard(mockService)
    const link = screen.getByRole('link', { name: /book now/i })
    expect(link).toHaveAttribute('href', '/book?service=power-wash')
  })

  it('renders Ask Us link for the other service', () => {
    renderCard(otherService)
    expect(screen.getByRole('link', { name: /ask us/i })).toBeInTheDocument()
  })

  it('does not render a price badge for the other service', () => {
    renderCard(otherService)
    expect(screen.queryByText(/\$\d+/)).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 7.2: Run test — verify it fails**

```bash
npx vitest run src/components/ServiceCard.test.tsx
```

Expected: FAIL — `Cannot find module './ServiceCard'`

- [ ] **Step 7.3: Implement ServiceCard**

Create `src/components/ServiceCard.tsx`:

```tsx
import { Link } from 'react-router-dom'
import type { Service } from '../types'

interface Props {
  service: Service
}

export function ServiceCard({ service }: Props) {
  const { id, name, description, price, icon: Icon } = service
  const isOther = id === 'other'

  return (
    <div
      className={`bg-white rounded-2xl border p-4 flex flex-col shadow-sm ${
        isOther
          ? 'border-dashed border-slate-300 col-span-2'
          : 'border-slate-200'
      }`}
    >
      {isOther ? (
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center">
            <Icon size={22} className="text-slate-500" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-700 text-sm">{name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          </div>
          <Link
            to={`/book?service=${id}`}
            className="flex-shrink-0 bg-slate-100 text-slate-600 text-xs font-bold px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors"
          >
            Ask Us →
          </Link>
        </div>
      ) : (
        <>
          <div className="w-11 h-11 bg-gradient-to-br from-sky-100 to-green-100 rounded-xl flex items-center justify-center mb-3">
            <Icon size={22} className="text-sky-600" />
          </div>
          <p className="font-bold text-slate-800 text-sm mb-1">{name}</p>
          <p className="text-xs text-slate-500 mb-3 flex-1">{description}</p>
          <div className="flex flex-col gap-2">
            <span className="self-start text-xs font-extrabold text-white bg-gradient-to-r from-sky-500 to-green-500 px-3 py-1 rounded-full">
              ${price}
            </span>
            <Link
              to={`/book?service=${id}`}
              className="text-center bg-sky-50 text-sky-600 text-xs font-bold py-2 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors"
            >
              Book Now →
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
```

- [ ] **Step 7.4: Run test — verify it passes**

```bash
npx vitest run src/components/ServiceCard.test.tsx
```

Expected: PASS — 5 tests pass

- [ ] **Step 7.5: Commit**

```bash
git add src/components/ServiceCard.tsx src/components/ServiceCard.test.tsx
git commit -m "feat: add ServiceCard component with tests"
```

---

## Task 8: ServiceCarousel Component

**Files:**
- Create: `src/components/ServiceCarousel.tsx`

- [ ] **Step 8.1: Create ServiceCarousel**

Create `src/components/ServiceCarousel.tsx`:

```tsx
const PILLS = [
  'Power Washing',
  'Car Wash',
  'Leaf Blowing',
  'Window Wipe',
  'Trash Can Cleaning',
  'Yard Cleanup',
  'Driveway Rinse',
  'Patio Sweep',
]

export function ServiceCarousel() {
  return (
    <div className="overflow-hidden w-full bg-black/10 border-t border-white/15 py-2.5">
      <div
        className="flex gap-3 w-max animate-carousel-scroll"
        style={{ animationDuration: '18s' }}
      >
        {/* Duplicate the pills for seamless loop */}
        {[...PILLS, ...PILLS].map((pill, i) => (
          <span
            key={i}
            className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-white whitespace-nowrap"
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 8.2: Commit**

```bash
git add src/components/ServiceCarousel.tsx
git commit -m "feat: add pure-CSS infinite ServiceCarousel"
```

---

## Task 9: BookingForm Component

**Files:**
- Create: `src/components/BookingForm.tsx`
- Create: `src/components/BookingForm.test.tsx`

- [ ] **Step 9.1: Write failing tests**

Create `src/components/BookingForm.test.tsx`:

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BookingForm } from './BookingForm'

function renderForm(search = '') {
  return render(
    <MemoryRouter initialEntries={[`/book${search}`]}>
      <Routes>
        <Route path="/book" element={<BookingForm />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('BookingForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('pre-selects service chip from ?service= query param', () => {
    renderForm('?service=car-wash')
    const chip = screen.getByRole('button', { name: /car wash/i })
    expect(chip).toHaveAttribute('data-selected', 'true')
  })

  it('shows success message after successful Formspree submission', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: true })
    renderForm()

    await userEvent.type(screen.getByLabelText(/first name/i), 'John')
    await userEvent.type(screen.getByLabelText(/last name/i), 'Smith')
    await userEvent.type(screen.getByLabelText(/email or phone/i), 'john@test.com')
    await userEvent.type(screen.getByLabelText(/address/i), '123 Main St')
    await userEvent.click(screen.getByRole('button', { name: /power washing/i }))
    await userEvent.click(screen.getByRole('button', { name: /send booking/i }))

    await waitFor(() => {
      expect(screen.getByText(/we got it/i)).toBeInTheDocument()
    })
  })

  it('shows error message when Formspree returns a non-ok response', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false })
    renderForm()

    await userEvent.type(screen.getByLabelText(/first name/i), 'John')
    await userEvent.type(screen.getByLabelText(/last name/i), 'Smith')
    await userEvent.type(screen.getByLabelText(/email or phone/i), 'john@test.com')
    await userEvent.type(screen.getByLabelText(/address/i), '123 Main St')
    await userEvent.click(screen.getByRole('button', { name: /power washing/i }))
    await userEvent.click(screen.getByRole('button', { name: /send booking/i }))

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 9.2: Run test — verify it fails**

```bash
npx vitest run src/components/BookingForm.test.tsx
```

Expected: FAIL — `Cannot find module './BookingForm'`

- [ ] **Step 9.3: Implement BookingForm**

Create `src/components/BookingForm.tsx`:

```tsx
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, AlertCircle } from 'lucide-react'
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
        <h2 className="text-xl font-extrabold mb-2">We got it!</h2>
        <p className="text-sm opacity-85">
          Kristian &amp; Khalid will be in touch within 24 hours to confirm your booking.
        </p>
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
          Something went wrong — please try again or text us directly.
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name</label>
          <input
            id="firstName"
            required
            placeholder="Kristian"
            className={inputClass}
            value={form.firstName}
            onChange={set('firstName')}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name</label>
          <input
            id="lastName"
            required
            placeholder="Smith"
            className={inputClass}
            value={form.lastName}
            onChange={set('lastName')}
          />
        </div>
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

      <div className="mb-4">
        <label htmlFor="address" className={labelClass}>Address</label>
        <input
          id="address"
          required
          placeholder="123 Maple Street"
          className={inputClass}
          value={form.address}
          onChange={set('address')}
        />
      </div>

      <div className="mb-4">
        <label className={labelClass}>Service</label>
        <div className="flex flex-wrap gap-2">
          {services.map(s => (
            <button
              key={s.id}
              type="button"
              data-selected={form.service === s.id ? 'true' : 'false'}
              onClick={() => toggleService(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                form.service === s.id
                  ? 'bg-white text-sky-600 border-white'
                  : 'bg-white/15 text-white border-white/30 hover:bg-white/25'
              }`}
            >
              {s.name}{s.price !== null ? ` — $${s.price}` : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="date" className={labelClass}>Preferred Date</label>
        <input
          id="date"
          type="date"
          className={inputClass}
          value={form.date}
          onChange={set('date')}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="notes" className={labelClass}>
          Notes {form.service === 'other' && <span className="text-red-300">*</span>}
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
          value={form.notes}
          onChange={set('notes')}
        />
      </div>

      <GradientButton type="submit" loading={status === 'submitting'}>
        Send Booking Request
      </GradientButton>
    </form>
  )
}
```

- [ ] **Step 9.4: Run test — verify it passes**

```bash
npx vitest run src/components/BookingForm.test.tsx
```

Expected: PASS — 3 tests pass

- [ ] **Step 9.5: Commit**

```bash
git add src/components/BookingForm.tsx src/components/BookingForm.test.tsx
git commit -m "feat: add BookingForm with Formspree, pre-fill, and success/error states"
```

---

## Task 10: ContactForm Component

**Files:**
- Create: `src/components/ContactForm.tsx`

- [ ] **Step 10.1: Implement ContactForm**

Create `src/components/ContactForm.tsx`:

```tsx
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
```

- [ ] **Step 10.2: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "feat: add ContactForm component"
```

---

## Task 11: Home Page

**Files:**
- Create: `src/pages/Home.tsx`

- [ ] **Step 11.1: Implement Home page**

Create `src/pages/Home.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { GlassBadge } from '../components/GlassBadge'
import { ServiceCard } from '../components/ServiceCard'
import { ServiceCarousel } from '../components/ServiceCarousel'
import { services } from '../data/services'

const PREVIEW_SERVICES = services.filter(s => s.id !== 'other')

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="animated-gradient min-h-[92vh] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-12 pb-4">
          <GlassBadge className="mb-6">
            <Star size={12} fill="currentColor" />
            Neighborhood Trusted
          </GlassBadge>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Your Neighborhood<br />Cleaning Crew
          </h1>

          <p className="text-white/85 text-base sm:text-lg mb-8 max-w-sm leading-relaxed">
            Power washing · Car wash · Leaf blowing and more —<br className="hidden sm:block" />
            right on your block
          </p>

          <div className="flex gap-3 flex-wrap justify-center mb-10">
            <Link
              to="/book"
              className="bg-white text-sky-600 font-bold px-6 py-3 rounded-xl shadow-lg shadow-black/20 hover:bg-sky-50 transition-colors text-sm"
            >
              Book a Service
            </Link>
            <Link
              to="/services"
              className="glass text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm"
            >
              See Services
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-3 flex-wrap justify-center">
            {[
              { num: '50+', label: 'Homes Served' },
              { num: '5★', label: 'Avg Rating' },
              { num: 'Same Day', label: 'Available' },
            ].map(stat => (
              <div key={stat.label} className="glass rounded-xl px-5 py-3 text-center text-white">
                <span className="block font-extrabold text-lg leading-none">{stat.num}</span>
                <span className="text-xs opacity-75 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <ServiceCarousel />

        {/* Wave */}
        <div
          className="h-8 bg-slate-50"
          style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}
        />
      </section>

      {/* Service preview */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-1">What We Do</h2>
        <p className="text-slate-500 text-sm mb-6">Tap any service to book instantly</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PREVIEW_SERVICES.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/services"
            className="text-sky-600 font-bold text-sm hover:underline"
          >
            View all services →
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="animated-gradient py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <GlassBadge className="mb-5">About Us</GlassBadge>
          <h2 className="text-2xl font-extrabold text-white mb-4">
            Hi, we're Kristian &amp; Khalid
          </h2>
          <p className="text-white/85 text-sm leading-relaxed">
            We're two kids from your neighborhood who love getting outside and helping our
            community. We started KK Outdoor Services to do great work at prices that make
            sense — no big company overhead, just two hardworking kids with equipment and
            a can-do attitude. Scan our card, pick a service, and we'll show up ready to work.
          </p>
          <Link
            to="/book"
            className="inline-block mt-8 bg-white text-sky-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-sky-50 transition-colors text-sm"
          >
            Book a Service
          </Link>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 11.2: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: add Home page with hero, carousel, service preview, and about section"
```

---

## Task 12: Services Page

**Files:**
- Create: `src/pages/Services.tsx`

- [ ] **Step 12.1: Implement Services page**

Create `src/pages/Services.tsx`:

```tsx
import { ServiceCard } from '../components/ServiceCard'
import { services } from '../data/services'

export function Services() {
  return (
    <div>
      <div className="animated-gradient py-12 px-4 text-center text-white">
        <h1 className="text-3xl font-black tracking-tight mb-2">Our Services</h1>
        <p className="text-white/80 text-sm">Tap any service to book</p>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-3">
          {services.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 12.2: Commit**

```bash
git add src/pages/Services.tsx
git commit -m "feat: add Services page with full service grid"
```

---

## Task 13: Book Page

**Files:**
- Create: `src/pages/Book.tsx`

- [ ] **Step 13.1: Implement Book page**

Create `src/pages/Book.tsx`:

```tsx
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
```

- [ ] **Step 13.2: Commit**

```bash
git add src/pages/Book.tsx
git commit -m "feat: add Book page"
```

---

## Task 14: Contact Page

**Files:**
- Create: `src/pages/Contact.tsx`

- [ ] **Step 14.1: Implement Contact page**

Create `src/pages/Contact.tsx`:

```tsx
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
```

- [ ] **Step 14.2: Commit**

```bash
git add src/pages/Contact.tsx
git commit -m "feat: add Contact page"
```

---

## Task 15: App Routing & Layout

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 15.1: Implement App with router and layout**

Replace `src/App.tsx` with:

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { Book } from './pages/Book'
import { Contact } from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <div className="animated-gradient min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
```

- [ ] **Step 15.2: Update main.tsx**

Replace `src/main.tsx` with:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 15.3: Start dev server and verify all pages**

```bash
npm run dev
```

Open `http://localhost:5173` and manually verify:
- Home: animated gradient hero, carousel scrolling, stat pills visible
- Services: 2-column grid with all 5 services, prices showing, Other spans full width
- Book: glassmorphism form, clicking a service chip selects/deselects it
- Contact: simpler form loads
- Nav links all work, hamburger opens/closes on mobile width (375px DevTools)

- [ ] **Step 15.4: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: wire up React Router with layout shell (Navbar + Footer)"
```

---

## Task 16: Environment & Vercel Config

**Files:**
- Create: `vercel.json`
- Create: `.env.example`
- Create: `.env.local` (not committed)
- Modify: `.gitignore`

- [ ] **Step 16.1: Create vercel.json**

Create `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 16.2: Create .env.example**

Create `.env.example`:

```bash
# Formspree form ID — get it at formspree.io after creating a form
VITE_FORMSPREE_ID=
```

- [ ] **Step 16.3: Create .env.local with placeholder**

Create `.env.local` (do NOT commit this file):

```bash
VITE_FORMSPREE_ID=your_form_id_here
```

- [ ] **Step 16.4: Ensure .gitignore covers .env.local**

Check `.gitignore` includes:
```
.env.local
.env*.local
```

Add the lines if missing.

- [ ] **Step 16.5: Commit**

```bash
git add vercel.json .env.example .gitignore
git commit -m "feat: add vercel.json SPA rewrite and env config"
```

---

## Task 17: Run All Tests & Final Build

- [ ] **Step 17.1: Run the full test suite**

```bash
npx vitest run
```

Expected: All tests pass. If any fail, fix before proceeding.

- [ ] **Step 17.2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 17.3: Run production build**

```bash
npm run build
```

Expected: `dist/` directory created with zero errors or warnings.

- [ ] **Step 17.4: Preview the production build locally**

```bash
npm run preview
```

Open `http://localhost:4173` and verify:
- Navigate directly to `/services`, `/book`, `/contact` in the browser address bar — all load (not 404). This verifies the SPA rewrite will work on Vercel.
- Glassmorphism backdrop-filter renders on Chrome and Safari (open Safari DevTools or BrowserStack)
- Carousel loops seamlessly with no visible jump
- Booking form: fill in fields, select a service, submit — success card shows (requires Formspree ID to be set; if not set yet, verify the error state shows instead of a silent failure)

- [ ] **Step 17.5: Final commit**

```bash
git add -A
git commit -m "chore: verify build, tests pass, ready for Vercel deploy"
```

---

## Post-Deploy Checklist (Manual — After Vercel Deploy)

1. Sign up at [formspree.io](https://formspree.io), create a new form, copy the form ID
2. Add `VITE_FORMSPREE_ID=<your_id>` to Vercel environment variables (Project Settings → Environment Variables)
3. Trigger a redeploy on Vercel
4. Submit a test booking from the live site — confirm email arrives
5. Share the Vercel URL with Kristian & Khalid for final review
