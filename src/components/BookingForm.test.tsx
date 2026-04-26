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
