import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { Settings } from '@/app/pages/Settings/Settings'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('Settings', () => {
  setupMockServer()

  beforeAll(cryptoWaitReady)

  it('Renders page', async () => {
    renderPage()

    expect(await screen.findByRole('heading', { name: 'Settings' })).toBeDefined()
  })

  it('General settings', async () => {
    renderPage()

    expect(await screen.findByText(/network/i)).toBeDefined()
  })

  function renderPage() {
    render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <Settings />
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
