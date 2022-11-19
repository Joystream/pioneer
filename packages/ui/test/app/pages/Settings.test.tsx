import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { Settings } from '@/app/pages/Settings/Settings'
import { NetworkEndpointsProvider } from '@/common/providers/network-endpoints/provider'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const mockUseNetworkEndpoints = [
  {
    queryNodeEndpointSubscription: 'queryNodeEndpointSubscription',
    queryNodeEndpoint: 'queryNodeEndpoint',
    membershipFaucetEndpoint: 'membershipFaucetEndpoint',
    nodeRpcEndpoint: 'nodeRpcEndpoint',
  },
]

jest.mock('@/common/hooks/useNetworkEndpoints', () => ({
  useNetworkEndpoints: () => mockUseNetworkEndpoints,
}))

describe('Settings', () => {
  setupMockServer()

  beforeAll(cryptoWaitReady)

  it('Renders page', async () => {
    renderPage()

    expect(await screen.findByRole('heading', { name: 'settings' })).toBeDefined()
  })

  it('General settings', async () => {
    renderPage()
    expect(await screen.findByText('selectNetwork')).toBeDefined()
    expect(await screen.findByText('networkDetails')).toBeDefined()
    expect(await screen.findByText('networkAddress')).toBeDefined()
    expect(await screen.findByText('QueryNodeAddress')).toBeDefined()
    expect(await screen.findByText('faucet')).toBeDefined()
    expect(await screen.findByText(mockUseNetworkEndpoints[0].queryNodeEndpoint)).toBeDefined()
    expect(await screen.findAllByText(mockUseNetworkEndpoints[0].membershipFaucetEndpoint)).toBeDefined()
  })

  function renderPage() {
    render(
      <MemoryRouter>
        <NetworkEndpointsProvider>
          <MockQueryNodeProviders>
            <Settings />
          </MockQueryNodeProviders>
        </NetworkEndpointsProvider>
      </MemoryRouter>
    )
  }
})
