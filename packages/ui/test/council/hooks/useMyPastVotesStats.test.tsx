import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { useMyPastVotesStats } from '@/council/hooks/useMyPastVotesStats'
import {
  RawCouncilElectionMock,
  seedCouncilCandidate,
  seedCouncilElection,
  seedCouncilMember,
  seedCounncilVote,
  seedElectedCouncil,
  seedMembers,
} from '@/mocks/data'

import { CANDIDATE_DATA, VOTE_DATA } from '../../_mocks/council'
import { alice, bob } from '../../_mocks/keyring'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('useMyPastVotesStats', () => {
  const server = setupMockServer()
  const useAccounts = {
    hasAccounts: false,
    allAccounts: [alice, bob],
  }

  describe('Counts total cast votes', () => {
    beforeEach(() => {
      seedMembers(server.server, 1)
      seedCouncilElection(
        {
          id: '0',
          isFinished: true,
          cycleId: 0,
        } as RawCouncilElectionMock,
        server.server
      )
      seedCouncilElection(
        {
          id: '1',
          isFinished: false,
          cycleId: 0,
        } as RawCouncilElectionMock,
        server.server
      )
      seedCouncilCandidate(CANDIDATE_DATA, server.server)
    })

    it('From single account', async () => {
      ;[0, 0, 0].forEach(() => seedCounncilVote({ ...VOTE_DATA }, server.server))

      const result = await renderUseStats()
      expect(result.votesTotal).toEqual(3)
    })

    it('From multiple accounts', async () => {
      ;[0, 0, 0].forEach(() => seedCounncilVote({ ...VOTE_DATA, castBy: alice.address }, server.server))
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address }, server.server)

      const result = await renderUseStats()
      expect(result.votesTotal).toEqual(4)
    })

    it('Past elections only', async () => {
      seedCounncilVote({ ...VOTE_DATA, castBy: alice.address }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, electionRoundId: '1' }, server.server)

      const result = await renderUseStats()
      expect(result.votesTotal).toEqual(2)
    })
  })

  describe('Counts times voted for a winner', () => {
    beforeEach(() => {
      seedMembers(server.server, 2)
      seedElectedCouncil(
        {
          id: '0',
          electedAtBlock: 1,
          endedAtBlock: 2,
        },
        server.server
      )
      seedCouncilElection(
        {
          id: '0',
          isFinished: true,
          cycleId: 0,
          electedCouncilId: '0',
        },
        server.server
      )
      seedCouncilElection(
        {
          id: '1',
          isFinished: false,
          cycleId: 0,
        } as RawCouncilElectionMock,
        server.server
      )
      seedCouncilCandidate(CANDIDATE_DATA, server.server)
      seedCouncilMember(
        {
          id: '0',
          electedInCouncilId: '0',
          memberId: '0',
          unpaidReward: 0,
          stake: 0,
        },
        server.server
      )
    })

    it('One winner, one election', async () => {
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, voteForId: '0' }, server.server)

      const result = await renderUseStats()
      expect(result.votesForWinners).toEqual(1)
    })

    it('No votes for winners', async () => {
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, voteForId: '1' }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address }, server.server)

      const result = await renderUseStats()
      expect(result.votesForWinners).toEqual(0)
    })

    it('One unrevealed vote, one for the winner', async () => {
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, voteForId: '0' }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address }, server.server)

      const result = await renderUseStats()
      expect(result.votesForWinners).toEqual(1)
    })

    it('Two revealed votes, only one for the winner', async () => {
      seedCouncilCandidate({ ...CANDIDATE_DATA, memberId: '1', id: '1' }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, voteForId: '0' }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, voteForId: '1' }, server.server)

      const result = await renderUseStats()
      expect(result.votesForWinners).toEqual(1)
    })

    it('Voted for the winner in different elections', async () => {
      seedElectedCouncil(
        {
          id: '1',
          electedAtBlock: 1,
          endedAtBlock: 2,
        },
        server.server
      )
      seedCouncilElection(
        {
          id: '2',
          isFinished: true,
          cycleId: 0,
          electedCouncilId: '1',
        },
        server.server
      )
      seedCouncilCandidate({ ...CANDIDATE_DATA, memberId: '1', id: '1', electionRoundId: '2' }, server.server)
      seedCouncilMember(
        {
          id: '1',
          electedInCouncilId: '1',
          memberId: '1',
          unpaidReward: 0,
          stake: 0,
        },
        server.server
      )

      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, voteForId: '0' }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, electionRoundId: '2', voteForId: '1' }, server.server)

      const result = await renderUseStats()
      expect(result.votesForWinners).toEqual(2)
    })

    it('Voted for two winners in the same election', async () => {
      seedCouncilCandidate({ ...CANDIDATE_DATA, memberId: '1', id: '1' }, server.server)
      seedCouncilMember(
        {
          id: '1',
          electedInCouncilId: '0',
          memberId: '1',
          unpaidReward: 0,
          stake: 0,
        },
        server.server
      )
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, voteForId: '0' }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, voteForId: '1' }, server.server)

      const result = await renderUseStats()
      expect(result.votesForWinners).toEqual(2)
    })

    it('Voted for two winners from different accounts', async () => {
      seedCouncilCandidate({ ...CANDIDATE_DATA, memberId: '1', id: '1' }, server.server)
      seedCouncilMember(
        {
          id: '1',
          electedInCouncilId: '0',
          memberId: '1',
          unpaidReward: 0,
          stake: 0,
        },
        server.server
      )
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, voteForId: '0' }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: alice.address, voteForId: '1' }, server.server)

      const result = await renderUseStats()
      expect(result.votesForWinners).toEqual(2)
    })
  })

  const renderUseStats = async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMyPastVotesStats(), {
      wrapper: ({ children }) => (
        <MockApolloProvider>
          <AccountsContext.Provider value={useAccounts}>{children}</AccountsContext.Provider>
        </MockApolloProvider>
      ),
    })
    while (result.current.isLoading) {
      await waitForNextUpdate()
    }
    return result.current
  }
})
