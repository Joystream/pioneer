import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { ProposalListItem, ProposalListItemProps } from '@/proposals/components/ProposalList/ProposalListItem'
import { Proposal } from '@/proposals/types'

import { getMember } from '../../_mocks/members'

const proposalData: Proposal = {
  id: '0',
  title: 'Proposal',
  status: 'deciding',
  type: 'fundingRequest',
  proposer: getMember('bob'),
  createdAt: '2021-10-21T10:10:24.001Z',
  councilApprovals: 0,
}

describe('UI: ProposalListItem', () => {
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  function renderComponent(props: ProposalListItemProps) {
    render(
      <MembershipContext.Provider value={useMyMemberships}>
        <MemoryRouter>
          <ProposalListItem {...props} />
        </MemoryRouter>
      </MembershipContext.Provider>
    )
  }

  it('Proposal in voting stage', async () => {
    renderComponent({ proposal: proposalData, isCouncilMember: true })
    expect(await screen.findByText('Vote')).toBeDefined()
  })

  it('Proposal not in voting stage', () => {
    renderComponent({ proposal: { ...proposalData, status: 'dormant' }, isCouncilMember: true })
    expect(screen.queryByText('Vote')).toBeNull()
  })

  it('Proposal in voting stage, but member is not a council member', async () => {
    renderComponent({ proposal: proposalData, isCouncilMember: false })
    expect(screen.queryByText('Vote')).toBeNull()
  })
})
