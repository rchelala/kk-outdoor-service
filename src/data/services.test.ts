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
