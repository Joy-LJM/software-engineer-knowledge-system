import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, name: 'Alice' }],
        text: async () => '',
      })
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('renders the users heading and fetched user data', async () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /users/i })).toBeInTheDocument()
    expect(await screen.findByText('1:Alice')).toBeInTheDocument()
  })
})
