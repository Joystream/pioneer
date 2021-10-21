import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { seedMembers, seedProposal } from '@/mocks/data'
import { ProposalListItem, ProposalListItemProps } from '@/proposals/components/ProposalList/ProposalListItem'
import { Proposal } from '@/proposals/types'

import { getMember } from '../../_mocks/members'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { PROPOSAL_DATA } from '../../_mocks/server/seeds'

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
  const server = setupMockServer()

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

  describe('Displays past votes', () => {
    beforeEach(() => {
      seedMembers(server.server, 2)
    })

    it('No previous votes', async () => {
      seedProposal(
        {
          ...PROPOSAL_DATA,
          votes: [],
        },
        server.server
      )

      renderComponent({ proposal: { ...proposalData, status: 'dormant' }, memberId: '0' })

      await waitForElementToBeRemoved(await screen.findByText(/loading/i))
      expect(screen.queryByText('Approved')).toBeNull()
    })

    it('One previous vote', async () => {
      seedProposal(
        {
          ...PROPOSAL_DATA,
          votes: [
            {
              id: '0',
              voteKind: 'APPROVE',
              network: 'OLYMPIA',
              createdAt: '2021-10-21T11:21:59.812Z',
              inBlock: 100,
              voterId: '0',
              rationale: '',
              votingRound: 1,
            },
          ],
        },
        server.server
      )

      renderComponent({ proposal: { ...proposalData, status: 'dormant' }, memberId: '0' })

      expect(await screen.findByText('Approved')).toBeDefined()
    })
  })

  function renderComponent(props: ProposalListItemProps) {
    render(
      <MockApolloProvider>
        <MemoryRouter>
          <ProposalListItem {...props} />
        </MemoryRouter>
      </MockApolloProvider>
    )
  }
})
