import { render, screen } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { ElectionVotes } from '@/council/components/election/CandidateVote/ElectionVotes'
import { RawCouncilElectionMock, seedCouncilElection, seedCounncilVote, seedMembers } from '@/mocks/data'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const VOTE_DATA = {
  electionRoundId: '0',
  stake: 1200,
  stakeLocked: true,
  castBy: '500000000000000000000000000000000000000000000000',
  voteForId: null,
}

describe('UI: ElectionVotes', () => {
  const server = setupMockServer()

  const useAccounts = {
    hasAccounts: true,
    allAccounts: [{ name: 'account', address: '5aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' }],
  }

  beforeEach(() => {
    seedMembers(server.server, 1)
    seedCouncilElection(
      {
        id: '0',
        isFinished: false,
        cycleId: 0,
      } as RawCouncilElectionMock,
      server.server
    )
  })

  it('Vote not revealed', async () => {
    seedCounncilVote(VOTE_DATA, server.server)
    renderComponent()
    expect(await screen.findByText(/unknown member/i)).toBeDefined()
  })

  it('Vote revealed', async () => {
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0' }, server.server)
    renderComponent()
    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect(screen.queryByText(/unknown member/i)).toBeNull()
  })

  describe('Own vote', () => {
    it('Vote not revealed', async () => {
      seedCounncilVote({ ...VOTE_DATA, castBy: '5aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' }, server.server)
      renderComponent()
      expect(await screen.findByText('Reveal')).toBeDefined()
      expect(screen.queryByText('Revealed')).toBeNull()
    })

    it('Vote revealed', async () => {
      seedCounncilVote(
        { ...VOTE_DATA, voteForId: '0', castBy: '5aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
        server.server
      )
      renderComponent()
      expect(await screen.findByText('Revealed')).toBeDefined()
      expect(screen.queryByText('Reveal')).toBeNull()
    })
  })

  it("Other user's vote", () => {
    seedCounncilVote(VOTE_DATA, server.server)
    renderComponent()
    expect(screen.queryByText('Reveal')).toBeNull()
    expect(screen.queryByText('Revealed')).toBeNull()
  })

  const renderComponent = () =>
    render(
      <AccountsContext.Provider value={useAccounts}>
        <MockQueryNodeProviders>
          <ElectionVotes electionCycleId={0} />
        </MockQueryNodeProviders>
      </AccountsContext.Provider>
    )
})
