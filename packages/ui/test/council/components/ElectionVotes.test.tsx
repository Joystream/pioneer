import { render, screen } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { ElectionVotes } from '@/council/components/election/CandidateVote/ElectionVotes'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import {
  RawCouncilElectionMock,
  seedCouncilCandidate,
  seedCouncilElection,
  seedCounncilVote,
  seedMembers,
} from '@/mocks/data'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const VOTE_DATA = {
  electionRoundId: '0',
  stake: 1200,
  stakeLocked: true,
  castBy: '500000000000000000000000000000000000000000000000',
  voteForId: null,
}

const CANDIDATE_DATA = {
  id: '0',
  electionRoundId: '0',
  memberId: '0',
  stake: 1000,
  stakingAccountId: '',
  rewardAccountId: '',
  noteMetadata: {
    header: '',
    bulletPoints: [],
    bannerImageUri: '',
    description: '',
  },
}

const Results = () => {
  const { election } = useCurrentElection()
  return election ? <ElectionVotes election={election} /> : null
}

describe('UI: ElectionVotes', () => {
  const server = setupMockServer()

  const useAccounts = {
    hasAccounts: true,
    allAccounts: [{ name: 'account', address: '5aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' }],
  }

  beforeEach(() => {
    seedMembers(server.server, 2)
    seedCouncilElection(
      {
        id: '0',
        isFinished: false,
        cycleId: 0,
      } as RawCouncilElectionMock,
      server.server
    )
    seedCouncilCandidate(CANDIDATE_DATA, server.server)
  })

  it('No votes revealed', async () => {
    seedCounncilVote(VOTE_DATA, server.server)
    renderComponent()
    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('0')
    expect((await screen.findByText(/total revealed votes/i)).nextSibling?.textContent).toEqual('0')
  })

  it('Vote revealed', async () => {
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0', stake: 1337 }, server.server)
    renderComponent()
    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('1,337')
    expect((await screen.findByText(/total revealed votes/i)).nextSibling?.textContent).toEqual('1')
  })

  it('Multiple revealed votes', async () => {
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0', stake: 2000 }, server.server)
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0', stake: 900 }, server.server)
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0', stake: 45 }, server.server)
    renderComponent()
    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('2,945')
    expect((await screen.findByText(/total revealed votes/i)).nextSibling?.textContent).toEqual('3')
  })

  it('Multiple revealed votes, unrevealed votes', async () => {
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0', stake: 2000 }, server.server)
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0', stake: 900 }, server.server)
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0', stake: 45 }, server.server)
    seedCounncilVote({ ...VOTE_DATA, stake: 7000 }, server.server)
    seedCounncilVote({ ...VOTE_DATA, stake: 3000 }, server.server)
    renderComponent()
    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('2,945')
    expect((await screen.findByText(/total revealed votes/i)).nextSibling?.textContent).toEqual('3')
  })

  it('Multiple candidates, ordered by votes number', async () => {
    seedCouncilCandidate({ ...CANDIDATE_DATA, id: '1', memberId: '1' }, server.server)
    seedCounncilVote({ ...VOTE_DATA, voteForId: '1', stake: 2000 }, server.server)
    seedCounncilVote({ ...VOTE_DATA, voteForId: '1', stake: 900 }, server.server)
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0', stake: 1337 }, server.server)
    renderComponent()
    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect(await screen.findByText(/bob/i)).toBeDefined()
    const stakes = await screen.findAllByText(/total stake/i)
    expect(stakes[0].nextSibling?.textContent).toEqual('2,900')
    expect(stakes[1].nextSibling?.textContent).toEqual('1,337')
    const voteNumbers = await screen.findAllByText(/total revealed votes/i)
    expect(voteNumbers[0].nextSibling?.textContent).toEqual('2')
    expect(voteNumbers[1].nextSibling?.textContent).toEqual('1')
  })

  it('Own stake', async () => {
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0', stake: 1000 }, server.server)
    seedCounncilVote(
      { ...VOTE_DATA, voteForId: '0', stake: 2000, castBy: '5aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
      server.server
    )
    renderComponent()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('3,000')
    expect((await screen.findByText(/my stake/i)).nextSibling?.textContent).toEqual('2,000')
  })

  const renderComponent = () =>
    render(
      <AccountsContext.Provider value={useAccounts}>
        <MockQueryNodeProviders>
          <Results />
        </MockQueryNodeProviders>
      </AccountsContext.Provider>
    )
})
