import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MyMemberships } from '@/memberships/providers/membership/provider'
import { Member } from '@/memberships/types'
import { seedElectedCouncil, seedMembers, seedOpening, seedOpeningStatuses, seedProposal } from '@/mocks/data'
import { seedUpcomingOpening } from '@/mocks/data/seedUpcomingOpening'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'
import { DeadlineList } from '@/overview/components/DeadlineList/DeadlineList'

import { getMember } from '../../_mocks/members'
import { testProposals } from '../../_mocks/proposals'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { OPENING_DATA, PROPOSAL_DATA, UPCOMING_OPENING } from '../../_mocks/server/seeds'

describe('DeadlineList', () => {
  const bob = getMember('bob')
  const mockServer = setupMockServer()
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [bob],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

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
    renderComponent(bob)
    expect(await screen.queryByText('deadline.proposalMessage')).toBeDefined()
  })
  it('render election list', async () => {
    renderComponent(bob)
    expect(await screen.queryByText('deadline.announcingPeriod')).toBeDefined()
  })
  it('Render opening list', async () => {
    renderComponent(bob)
    expect(await screen.queryByText('deadline.upcomingOpeningsMessage')).toBeDefined()
    expect(await screen.queryByText('deadline.opening')).toBeDefined()
  })

  function renderComponent(member: Member) {
    return render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <DeadlineList member={member} />
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
