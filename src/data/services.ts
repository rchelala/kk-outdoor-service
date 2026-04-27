import { Droplets, Car, Wind, Sparkles, PenLine } from 'lucide-react'
import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'power-wash',
    name: 'Power Washing',
    description: 'Driveways, patios & trash cans blasted clean',
    price: 10,
    icon: Droplets,
    duration: '30–60 min',
  },
  {
    id: 'car-wash',
    name: 'Car Wash',
    description: 'Hand wash, rinse & dry — looking brand new',
    price: 20,
    icon: Car,
    duration: '~45 min',
  },
  {
    id: 'leaf-blow',
    name: 'Leaf Blowing',
    description: 'Front & backyard cleared of leaves and debris',
    price: 10,
    icon: Wind,
    duration: '30–45 min',
  },
  {
    id: 'window-wipe',
    name: 'Window Wipe',
    description: 'Exterior window cleaning, streak-free shine',
    price: 15,
    icon: Sparkles,
    duration: '~30 min',
  },
  {
    id: 'other',
    name: 'Something Else?',
    description: "Tell us what you need — we'll make it happen",
    price: null,
    icon: PenLine,
  },
]
