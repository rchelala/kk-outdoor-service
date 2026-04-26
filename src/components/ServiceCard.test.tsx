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
