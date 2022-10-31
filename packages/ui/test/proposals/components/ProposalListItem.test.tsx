import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/api/providers/context'
import { createType } from '@/common/model/createType'
import { seedMembers, seedProposal } from '@/mocks/data'
import { ProposalListItem, ProposalListItemProps } from '@/proposals/components/ProposalList/ProposalListItem'
import { Proposal } from '@/proposals/types'

import { getMember } from '../../_mocks/members'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { PROPOSAL_DATA } from '../../_mocks/server/seeds'
import { stubApi, stubConst, stubQuery } from '../../_mocks/transactions'

const proposalData: Proposal = {
  id: '0',
  title: 'Proposal',
  status: 'deciding',
  type: 'fundingRequest',
  proposer: getMember('bob'),
  createdAt: '2021-10-21T10:10:24.001Z',
  councilApprovals: 0,
}

const voteData = {
  id: '0',
  voteKind: 'APPROVE',
  network: 'OLYMPIA',
  createdAt: '2021-10-21T11:21:59.812Z',
  inBlock: 100,
  voterId: '0',
  rationale: '',
  votingRound: 1,
}

const proposalParameters = {
  votingPeriod: createType('u32', 10),
  gracePeriod: createType('u32', 10),
  approvalQuorumPercentage: createType('u32', 10),
  approvalThresholdPercentage: createType('u32', 10),
  slashingQuorumPercentage: createType('u32', 10),
  slashingThresholdPercentage: createType('u32', 10),
  requiredStake: createType('Option<u128>', 1000),
  constitutionality: createType('u32', 1),
}

describe('UI: ProposalListItem', () => {
  const server = setupMockServer()
  const api = stubApi()
  stubConst(api, 'proposalsCodex.fundingRequestProposalParameters', proposalParameters)
  describe('Proposal in deciding stage', () => {
    it('Member has voted already', async () => {
      seedMembers(server.server, 2)
      seedProposal(
        {
          ...PROPOSAL_DATA,
          votes: [{ ...voteData, voterId: '0' }],
        },
        server.server
      )
      renderComponent({ proposal: proposalData, isCouncilMember: true, memberId: '0' })
      await waitFor(async () => expect(screen.queryByText('Vote')).toBeNull())
    })

    it('Member is not a council member', async () => {
      stubQuery(api, 'proposalsEngine.voteExistsByProposalByVoter.size', createType('u64', 0))
      renderComponent({ proposal: proposalData, isCouncilMember: false, memberId: '0' })
      expect(screen.queryByText('Vote')).toBeNull()
    })

    it('Member has not voted yet', async () => {
      stubQuery(api, 'proposalsEngine.voteExistsByProposalByVoter.size', createType('u64', 0))
      renderComponent({ proposal: proposalData, isCouncilMember: true, memberId: '0' })
      const button = await screen.findByText('Vote')
      expect(button).toBeDefined()
      expect(button.parentNode?.parentNode?.textContent).toEqual('Vote')
    })

    it('Voting in second round', async () => {
      stubConst(api, 'proposalsCodex.fundingRequestProposalParameters', {
        ...proposalParameters,
        constitutionality: createType('u32', 2),
      })
      seedMembers(server.server, 2)
      seedProposal(
        {
          ...PROPOSAL_DATA,
          votes: [voteData],
        },
        server.server
      )

      renderComponent({ proposal: { ...proposalData, councilApprovals: 1 }, memberId: '0', isCouncilMember: true })

      expect(await screen.findByText('Approved')).toBeDefined()
      const button = await screen.findByText('Vote')
      expect(button.parentNode?.parentNode?.textContent).toEqual('2/2 Vote')
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
      expect(screen.queryByText('Approved')).toBeNull()
    })

    it('One approval vote', async () => {
      stubConst(api, 'proposalsCodex.fundingRequestProposalParameters', proposalParameters)
      seedProposal(
        {
          ...PROPOSAL_DATA,
          votes: [voteData],
        },
        server.server
      )

      renderComponent({ proposal: { ...proposalData, status: 'dormant' }, memberId: '0' })

      expect(await screen.findByText('Approved')).toBeDefined()
    })

    it('One reject vote', async () => {
      stubConst(api, 'proposalsCodex.fundingRequestProposalParameters', proposalParameters)
      seedProposal(
        {
          ...PROPOSAL_DATA,
          votes: [{ ...voteData, voteKind: 'REJECT' }],
        },
        server.server
      )

      renderComponent({ proposal: { ...proposalData, status: 'dormant' }, memberId: '0' })

      const vote = await screen.findByText('Rejected')
      expect(vote).toBeDefined()
      expect(vote.parentNode?.parentNode?.childNodes[0].textContent).toEqual('Rejected')
    })

    it('Two votes', async () => {
      stubConst(api, 'proposalsCodex.fundingRequestProposalParameters', {
        ...proposalParameters,
        constitutionality: createType('u32', 2),
      })
      seedProposal(
        {
          ...PROPOSAL_DATA,
          votes: [
            { ...voteData, voteKind: 'REJECT', votingRound: 2 },
            { ...voteData, id: '1', votingRound: 1 },
          ],
        },
        server.server
      )

      renderComponent({ proposal: { ...proposalData, status: 'dormant' }, memberId: '0' })

      const firstVote = await screen.findByText('Approved')
      expect(firstVote.parentNode?.parentNode?.childNodes[0].textContent).toEqual('1/2 Approved')
      expect(firstVote.parentNode?.parentNode?.childNodes[1].textContent).toEqual('2/2 Rejected')
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
