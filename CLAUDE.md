# CLAUDE.md — Kids Outdoor Cleaning Services Website

## Project Overview

A small business website for kids offering neighborhood outdoor cleaning services
(power washing, car wash, leaf blowing, etc.). Used alongside business cards handed
out door-to-door. Homeowners visit the site to book a service later.

**Goal:** Clean, trustworthy, fun-but-professional site that converts curious neighbors
into booked customers.

---

## Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | React + TypeScript                |
| Build Tool  | Vite                              |
| Styling     | Tailwind CSS                      |
| Routing     | React Router v6                   |
| Forms       | Formspree (preferred) or Resend   |
| Deployment  | Vercel                            |
| Version Control | GitHub                        |

**No database needed.** All bookings go through the contact form → email. No auth.

---

## Project Structure

```
kids-cleaning-site/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/           # Button, Input, Textarea, etc.
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ServiceCard.tsx
│   │   └── BookingForm.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Book.tsx
│   │   └── Contact.tsx
│   ├── data/
│   │   └── services.ts   # Service list, prices, descriptions
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── .env.local             # FORMSPREE_FORM_ID or Resend key — never committed
├── .env.example
├── vercel.json            # SPA rewrite rule — always include
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

---

## Pages

### `/` — Home
- Hero section: catchy headline, subheadline, CTA button ("Book a Service")
- Brief intro about who they are (local kids, dependable, affordable)
- Services preview (3-card grid)
- Testimonials section (can be placeholder / fake reviews initially)
- Footer with contact info

### `/services` — Services
- Full list of services with name, description, price range, icon/image
- Each card has a "Book This" CTA that links to `/book?service=X`

### `/book` — Booking Form
- Pre-fills service from query param if coming from a service card
- Fields: Name, Address, Phone/Email, Service requested, Preferred date, Notes
- Submits via Formspree or Resend
- Success state: confirmation message shown inline (no redirect)

### `/contact` — Contact
- Simple message form (Name, Email, Message)
- Same form submission approach as booking

---

## Form Submission

### Option A — Formspree (Recommended for simplicity)
```tsx
// No backend needed — just POST to Formspree endpoint
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```
- Sign up at formspree.io, create a form, get the form ID
- Store form ID in `.env.local` as `VITE_FORMSPREE_ID` (safe to expose — it's public)
- Free tier: 50 submissions/month — more than enough

### Option B — Resend via Vercel API Route
```ts
// api/send-email.ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY); // server-side only
```
- Use if you want custom email templates or more control
- Resend API key must stay server-side — never use `VITE_` prefix

---

## Design Direction

- **Tone:** Friendly, hardworking, neighborhood kids — not corporate
- **Colors:** Bright but clean — blues/greens suggest cleanliness and outdoors
- **Font:** Friendly sans-serif (e.g., Nunito, Poppins, or Inter)
- **Images:** Use outdoor/cleaning illustrations or photos; avoid stock-y corporate imagery
- **Mobile-first:** Most visitors will arrive via phone after seeing the business card

---

## Services Data Shape

```ts
// src/types/index.ts
export interface Service {
  id: string;
  name: string;
  description: string;
  priceRange: string;   // e.g. "$10–$20"
  icon: string;         // emoji or icon name
  duration?: string;    // e.g. "~30 min"
}
```

```ts
// src/data/services.ts
export const services: Service[] = [
  { id: "power-wash", name: "Trash Can Power Wash", priceRange: "$10–$15", ... },
  { id: "car-wash",   name: "Car Wash",              priceRange: "$15–$25", ... },
  { id: "leaf-blow",  name: "Leaf Blowing",          priceRange: "$10–$20", ... },
  // add more as needed
];
```

---

## Environment Variables

```bash
# .env.example
VITE_FORMSPREE_ID=        # Formspree form ID (if using Formspree)
RESEND_API_KEY=            # Resend key — server-side only (if using Resend)
```

---

## Non-Negotiables

- Always include `vercel.json` with SPA rewrite rule
- No `any` types in TypeScript
- Mobile-first responsive layout
- Form must show clear success/error feedback — no silent failures
- `.env.local` in `.gitignore`
- Run `npm run build` clean before every deploy

---

## Out of Scope

- No user accounts or login
- No payment processing (cash on delivery for now)
- No admin dashboard
- No database
