import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { WorkingGroupsOpenings } from '@/app/pages/WorkingGroups/WorkingGroupsOpenings'
import { seedBlocks } from '@/mocks/data'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('WorkingGroupOpenings', () => {
  const mockServer = setupMockServer()

  beforeAll(cryptoWaitReady)

  beforeEach(() => {
    seedBlocks(mockServer.server)
    seedWorkingGroups(mockServer.server)
  })

  it('Renders page', async () => {
    render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <WorkingGroupsOpenings />
        </MockQueryNodeProviders>
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: 'Working Groups' })).toBeDefined()
  })
})
