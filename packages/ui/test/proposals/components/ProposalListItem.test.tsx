import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/common/providers/api/context'
import { seedMembers, seedProposal } from '@/mocks/data'
import { ProposalListItem, ProposalListItemProps } from '@/proposals/components/ProposalList/ProposalListItem'
import { Proposal } from '@/proposals/types'

import { getMember } from '../../_mocks/members'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { PROPOSAL_DATA } from '../../_mocks/server/seeds'
import { stubApi, stubQuery } from '../../_mocks/transactions'

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
  const api = stubApi()

  describe('Proposal in deciding stage', () => {
    const voteStatus = {
      isApprove: false,
      isReject: false,
      isSlash: false,
      isAbstain: false,
    }

    it('Member has not voted yet', async () => {
      stubQuery(api, 'proposalsEngine.voteExistsByProposalByVoter', voteStatus)
      renderComponent({ proposal: proposalData, isCouncilMember: true, memberId: '0' })
      expect(await screen.findByText('Vote')).toBeDefined()
    })

    it('Member has voted already', async () => {
      stubQuery(api, 'proposalsEngine.voteExistsByProposalByVoter', { ...voteStatus, isApprove: true })
      renderComponent({ proposal: proposalData, isCouncilMember: true, memberId: '0' })
      expect(screen.queryByText('Vote')).toBeNull()
    })

    it('Member is not a council member', async () => {
      stubQuery(api, 'proposalsEngine.voteExistsByProposalByVoter', voteStatus)
      renderComponent({ proposal: proposalData, isCouncilMember: false, memberId: '0' })
      expect(screen.queryByText('Vote')).toBeNull()
    })
  })

  it('Proposal not in voting stage', () => {
    renderComponent({ proposal: { ...proposalData, status: 'dormant' }, isCouncilMember: true })
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
      <ApiContext.Provider value={api}>
        <MockApolloProvider>
          <MemoryRouter>
            <ProposalListItem {...props} />
          </MemoryRouter>
        </MockApolloProvider>
      </ApiContext.Provider>
    )
  }
})
