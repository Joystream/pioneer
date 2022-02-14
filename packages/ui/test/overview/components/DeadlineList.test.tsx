import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { seedElectedCouncil, seedMembers, seedProposal, seedOpening, seedOpeningStatuses } from '@/mocks/data'
import { seedUpcomingOpening } from '@/mocks/data/seedUpcomingOpening'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'
import { DeadlineList } from '@/overview/components/DeadlineList/DeadlineList'

import { testProposals } from '../../_mocks/proposals'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { OPENING_DATA, PROPOSAL_DATA, UPCOMING_OPENING } from '../../_mocks/server/seeds'

describe('DeadlineList', () => {
  const mockServer = setupMockServer()

  beforeEach(async () => {
    seedMembers(mockServer.server, 2)
    seedElectedCouncil(
      {
        id: '1',
        electedAtBlock: 0,
        endedAtBlock: 10,
        electedAtTime: '2022-01-01',
        electedAtNetwork: 'OLYMPIA',
      },
      mockServer.server
    )
    seedProposal(PROPOSAL_DATA, mockServer.server)
    seedWorkingGroups(mockServer.server)
    seedOpeningStatuses(mockServer.server)
    seedOpening(OPENING_DATA, mockServer.server)
    seedUpcomingOpening(UPCOMING_OPENING, mockServer.server)
    seedProposal(testProposals[0], mockServer.server)
  })
  it('render proposal', async () => {
    renderComponent()
    expect(await screen.queryByText('deadline.proposalMessage')).toBeDefined()
  })
  it('render election list', async () => {
    renderComponent()
    expect(await screen.queryByText('deadline.announcingPeriod')).toBeDefined()
  })
  it('Render opening list', async () => {
    renderComponent()
    expect(await screen.findByText('deadline.upcomingOpeningsMessage')).toBeDefined()
    expect(await screen.findByText('deadline.opening')).toBeDefined()
  })

  function renderComponent() {
    return render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <DeadlineList />
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
