import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { WorkingGroupsOpenings } from '@/app/pages/WorkingGroups/WorkingGroupsOpenings'
import { seedEventCategory, seedMember } from '@/mocks/data'
import { seedOpening, seedOpeningStatuses } from '@/mocks/data/seedOpenings'
import { seedUpcomingOpening } from '@/mocks/data/seedUpcomingOpening'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { MEMBER_ALICE_DATA, OPENING_DATA, UPCOMING_OPENING } from '../../_mocks/server/seeds'

describe('WorkingGroupOpenings', () => {
  const mockServer = setupMockServer()

  beforeAll(cryptoWaitReady)

  beforeEach(() => {
    seedMember(MEMBER_ALICE_DATA, mockServer.server)
    seedWorkingGroups(mockServer.server)
    seedOpeningStatuses(mockServer.server)
    seedEventCategory('BudgetSpendingEvent', mockServer.server)
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
    seedOpening({ ...OPENING_DATA }, mockServer.server)
    seedOpening({ ...OPENING_DATA, id: 'forumWorkingGroup-2', runtimeId: 2 }, mockServer.server)

    renderPage()

    expect(await screen.findByRole('button', { name: /^Openings 2/i })).toBeDefined()
    expect(await screen.findByRole('button', { name: /^Upcoming openings 0/i })).toBeDefined()
  })

  it('With upcoming openings', async () => {
    seedUpcomingOpening(UPCOMING_OPENING, mockServer.server)

    renderPage()

    expect(await screen.findByRole('button', { name: /^Openings 0/i })).toBeDefined()
    expect(await screen.findByRole('button', { name: /^Upcoming openings 1/i })).toBeDefined()
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
