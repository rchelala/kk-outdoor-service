import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  name: string
  description: string
  price: number | null
  icon: LucideIcon
  duration?: string
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
