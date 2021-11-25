import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { TermsOfService } from '@/app/pages/Terms'

describe('Terms of Service', () => {
  it('Renders page', async () => {
    renderPage()

    expect(await screen.findByRole('heading', { name: 'Terms of Service' })).toBeDefined()
  })

  function renderPage() {
    render(
      <MemoryRouter>
        <TermsOfService />
      </MemoryRouter>
    )
  }
})
