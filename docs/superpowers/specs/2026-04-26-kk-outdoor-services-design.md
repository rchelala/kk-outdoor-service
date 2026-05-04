# KK Outdoor Services — Website Design Spec

**Date:** 2026-04-26
**Project:** Website for Kristian & Khalid's neighborhood outdoor cleaning business
**Use case:** Homeowners receive a business card door-to-door, visit the site on their phone, and book a service

---

## Context

Kristian and Khalid are kids running a neighborhood outdoor cleaning business. The website's primary job is to convert business card recipients into bookings — customers will almost always arrive on mobile. The site must feel friendly and trustworthy, not corporate. No accounts, no payments, no database.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Icons | lucide-react |
| Form backend | Formspree (email TBD — to be wired up before deploy) |
| Deployment | Vercel |

---

## Brand & Visual Identity

### Name & Story
**KK Outdoor Services** — K for Kristian, K for Khalid. The site can include a short personal intro ("Hi, we're Kristian & Khalid — two kids in your neighborhood who love getting outside and helping out").

### Color Palette
| Token | Value | Use |
|---|---|---|
| Primary | `#0ea5e9` (sky blue) | Buttons, accents, icons |
| Secondary | `#22c55e` (green) | Gradient partner, prices |
| Dark blue | `#0284c7` | Text on light, hover states |
| Deep green | `#059669` | Gradient anchor |
| Background | `#f8fafc` | Page background |
| Surface | `white` | Cards |

### Animated Gradient
All hero and form backgrounds use a 5-stop animated gradient:
```css
background: linear-gradient(-45deg, #0ea5e9, #22c55e, #0284c7, #059669, #38bdf8);
background-size: 400% 400%;
animation: gradientShift 7s ease infinite;
```

### Glassmorphism
Surfaces overlaid on the gradient use:
```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.3);
```
Applied to: nav bar, stat pills, trust badge, form card, service carousel pills.

### Icons
All icons use **lucide-react**. No emojis in the UI (emojis only acceptable in marketing copy if desired).

Service icon map:
- Power Washing → `Droplets`
- Car Wash → `Car`
- Leaf Blowing → `Wind`
- Window Wipe → `Sparkles`
- Other → `PenLine`

---

## Pages

### 1. Home (`/`)

**Hero section** (full-viewport, animated gradient background):
- Glassmorphism nav: logo left ("🌿 KK Outdoor"), links right (Services · Book · Contact)
- Trust badge (glass pill): "⭐ Neighborhood Trusted"
- Headline: **"Your Neighborhood Cleaning Crew"**
- Subheadline: "Power washing · Car wash · Leaf blowing and more — right on your block"
- Two CTA buttons:
  - Primary (white, solid): "Book a Service" → `/book`
  - Secondary (glass outline): "See Services" → `/services`
- Glass stat pills row: "50+ Homes Served" · "5★ Avg Rating" · "Same Day Available"
- **Scrolling service carousel**: infinite-loop strip of glass pills (Power Washing, Car Wash, Leaf Blowing, Trash Can Cleaning, Yard Cleanup, Driveway Rinse, Patio Sweep, Window Wipe) — CSS animation, no JS library
- Wave SVG transition into below-fold content
- Service preview grid (4 cards, same style as Services page) below fold

**About blurb** (below fold):
Short paragraph introducing Kristian & Khalid. Friendly, first-person, neighborhood feel.

---

### 2. Services (`/services`)

**Header**: Same animated gradient, "Our Services / Tap any service to book"

**Service grid** (2-column):
Each card:
- Lucide icon in a rounded `linear-gradient(#e0f2fe, #dcfce7)` icon box
- Service name (bold)
- Short description
- Gradient price badge (`$10` or `$15`)
- "Book Now →" button → `/book?service=<name>`

Services:
| Service | Icon | Price | Description |
|---|---|---|---|
| Power Washing | Droplets | $10 | Driveways, patios & trash cans |
| Car Wash | Car | $15 | Hand wash, rinse & dry |
| Leaf Blowing | Wind | $10 | Front & backyard cleanup |
| Window Wipe | Sparkles | $15 | Exterior window cleaning |
| Other | PenLine | — | Spans full width, dashed border, "Tell us what you need" |

---

### 3. Book (`/book`)

**Full page**: Animated gradient background, centered glassmorphism form card.

**Form fields:**
1. First Name + Last Name (two-column)
2. Email or Phone
3. Address
4. Service selection — chip toggles (pre-selected if `?service=` query param present)
5. Preferred Date (date picker)
6. Notes / describe what you need (textarea — required when "Other" is selected)

**Submission**: Formspree POST. On success: show a glass confirmation card ("We got it! Kristian & Khalid will be in touch within 24 hours."). On error: inline error message.

**Email**: TBD — to be added to `.env.local` as `VITE_FORMSPREE_ID` before deploy.

---

### 4. Contact (`/contact`)

Simple page. Same glassmorphism form card style. Fields: Name, Email or Phone, Message. Submit via Formspree (same endpoint as booking or separate — TBD).

---

## Components

| Component | Description |
|---|---|
| `Navbar` | Glassmorphism nav, responsive hamburger on mobile |
| `Footer` | Simple dark footer, links + "Built by Kristian & Khalid" |
| `ServiceCard` | Reused on Home and Services pages |
| `ServiceCarousel` | Pure CSS infinite scroll strip |
| `BookingForm` | Glassmorphism form, Formspree integration, service pre-fill |
| `ContactForm` | Simpler version of BookingForm |
| `GlassBadge` | Reusable frosted pill component |
| `GradientButton` | Primary CTA button with gradient |

---

## Data

All service data lives in `src/data/services.ts` — no hardcoded values in JSX:

```ts
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number | null; // null = "contact us"
  icon: LucideIcon;
}
```

---

## Non-Negotiables

- Mobile-first — all layouts designed for 390px wide first
- `vercel.json` with SPA rewrite rule (required for React Router)
- No `any` types in TypeScript
- `.env.local` in `.gitignore`
- Form success and error states always visible to user
- Clean build before every deploy

---

## Out of Scope

- User accounts or login
- Payment processing
- Admin dashboard
- Database or CMS
- Blog

---

## Verification

Before shipping:
1. `npm run build` passes with zero TypeScript errors
2. All 4 pages render correctly on mobile (390px) and desktop
3. Service card "Book Now" buttons pre-fill the correct service chip on `/book`
4. Booking form submits to Formspree and shows success/error state
5. Carousel scrolls smoothly with no jump on loop
6. Glassmorphism renders correctly on Chrome + Safari (check `-webkit-backdrop-filter`)
7. Deploy preview on Vercel — test all routes directly (not just via nav)
