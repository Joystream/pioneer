import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { WorkingGroupsOpenings } from '@/app/pages/WorkingGroups/WorkingGroupsOpenings'
import { seedBlocks, seedMember } from '@/mocks/data'
import { seedOpening, seedOpeningStatuses } from '@/mocks/data/mockOpenings'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { OPENING_DATA } from '../../working-groups/modals/ApplyForRoleModal.test'

const aliceMember = {
  id: '0',
  rootAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
  controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  handle: 'alice',
  metadata: {
    name: 'animi et',
    about: 'Optio possimus...',
  },
  isVerified: true,
  isFoundingMember: true,
  inviteCount: 5,
  registeredAtBlockId: '1',
}

describe('WorkingGroupOpenings', () => {
  const mockServer = setupMockServer()

  beforeAll(cryptoWaitReady)

  beforeEach(() => {
    seedBlocks(mockServer.server)
    seedWorkingGroups(mockServer.server)
  })

  it('Renders page', async () => {
    renderPage()

    expect(await screen.findByRole('heading', { name: 'Working Groups' })).toBeDefined()
  })

  it('No openings', async () => {
    renderPage()

    expect(await screen.findByText('No openings found')).toBeDefined()
    expect(await screen.findByRole('button', { name: /^Openings 0/i })).toBeDefined()
    expect(await screen.findByRole('button', { name: /^Upcoming openings 0/i })).toBeDefined()
  })

  it('With openings', async () => {
    seedBlocks(mockServer.server)
    seedMember(aliceMember, mockServer.server)
    seedWorkingGroups(mockServer.server)
    seedOpeningStatuses(mockServer.server)
    seedOpening({ ...OPENING_DATA }, mockServer.server)
    seedOpening({ ...OPENING_DATA }, mockServer.server)

    renderPage()

    expect(await screen.findByRole('button', { name: /^Openings 2/i })).toBeDefined()
    expect(await screen.findByRole('button', { name: /^Upcoming openings 0/i })).toBeDefined()
  })

  function renderPage() {
    render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <WorkingGroupsOpenings />
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
