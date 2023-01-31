import { render, screen } from '@testing-library/react'
import React, { useMemo } from 'react'

import { BN_ZERO } from '@/common/constants'
import { repeat } from '@/common/utils'
import { RevealingStageVotes } from '@/council/components/election/CandidateVote/RevealingStageVotes'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { CandidateWithMyVotes, useMyCastVotes } from '@/council/hooks/useMyCastVotes'
import { calculateCommitment } from '@/council/model/calculateCommitment'
import { electionVotingResultComparator } from '@/council/model/electionVotingResultComparator'
import {
  RawCouncilCandidateMock,
  RawCouncilElectionMock,
  RawCouncilVoteMock,
  seedCouncilCandidate,
  seedCouncilElection,
  seedCouncilVote,
  seedMembers,
} from '@/mocks/data'

import { CANDIDATE_DATA, VOTE_DATA } from '../../_mocks/council'
import { alice, bob } from '../../_mocks/keyring'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubAccounts } from '../../_mocks/transactions'

const Results = ({ onlyMyVotes }: { onlyMyVotes: boolean }) => {
  const { election } = useCurrentElection()
  const { votes, isLoading: votesLoading } = useMyCastVotes(election?.cycleId)
  const sortedCandidatesWithVotes = useMemo((): CandidateWithMyVotes[] => {
    if (!election) return []

    return election.candidates
      .map((candidate) => {
        const myVotesForCandidate = votes?.filter((vote) => vote.optionId === candidate.member.id) ?? []

        return {
          ...candidate,
          myVotes: myVotesForCandidate,
          myStake: myVotesForCandidate.reduce((prev, next) => prev.add(next.stake), BN_ZERO),
        }
      })
      .sort(electionVotingResultComparator)
  }, [votes, election])

  return election ? (
    <RevealingStageVotes
      isLoading={votesLoading}
      totalStake={election.totalElectionStake}
      candidateWithVotes={sortedCandidatesWithVotes}
      onlyMyVotes={onlyMyVotes}
    />
  ) : null
}

interface ExtendedRawCouncilCandidateMock extends RawCouncilCandidateMock {
  votesNumber?: number
}

interface MockElectionData {
  votes?: Partial<RawCouncilVoteMock>[]
  candidate?: Partial<ExtendedRawCouncilCandidateMock>[]
}

const seedInformations = (server: any, data: MockElectionData) => {
  data.votes?.forEach((vote) => {
    seedCouncilVote({ ...VOTE_DATA, ...vote }, server)
  })
  data.candidate?.forEach((candidate, index) => {
    seedCouncilCandidate(
      {
        ...CANDIDATE_DATA,
        ...candidate,
        votesReceived: repeat(() => VOTE_DATA, candidate.votesNumber ?? 0),
        id: String(index),
      },
      server
    )
  })
}

describe('UI: RevealingStageVotes', () => {
  const server = setupMockServer()

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
    stubAccounts([{ name: 'account', address: bob.address }])
  })

  it('No votes revealed', async () => {
    renderComponent()

    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('0')
    expect((await screen.findByText(/revealed votes/i)).nextSibling?.textContent).toEqual('0')
  })

  it('Vote revealed', async () => {
    seedInformations(server.server, {
      candidate: [
        {
          votePower: '1337',
          votesNumber: 1,
        },
      ],
    })

    renderComponent()

    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('1,337')
    expect((await screen.findByText(/revealed votes/i)).nextSibling?.textContent).toEqual('1')
  })

  it('Multiple revealed votes', async () => {
    seedInformations(server.server, {
      candidate: [{ votePower: '2945', votesNumber: 3 }],
    })

    renderComponent()

    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('2,945')
    expect((await screen.findByText(/revealed votes/i)).nextSibling?.textContent).toEqual('3')
  })

  it('Multiple candidates, ordered by votes number', async () => {
    seedInformations(server.server, {
      candidate: [
        { memberId: '0', votePower: '2900', votesNumber: 2 },
        { memberId: '1', votePower: '1337', votesNumber: 1 },
      ],
    })

    renderComponent()

    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect(await screen.findByText(/bob/i)).toBeDefined()
    const stakes = await screen.findAllByText(/total stake/i)
    expect(stakes[0].nextSibling?.textContent).toEqual('2,900')
    expect(stakes[1].nextSibling?.textContent).toEqual('1,337')
    const voteNumbers = await screen.findAllByText(/revealed votes/i)
    expect(voteNumbers[0].nextSibling?.textContent).toEqual('2')
    expect(voteNumbers[1].nextSibling?.textContent).toEqual('1')
  })

  it('My stake', async () => {
    seedInformations(server.server, {
      votes: [{ voteForId: '0', stake: 2000, castBy: bob.address }],
      candidate: [{ memberId: '0', votePower: '3000', votesNumber: 2 }],
    })

    renderComponent()

    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('3,000')
    expect((await screen.findByText(/My contributed votes/i)).parentNode?.parentNode?.nextSibling?.textContent).toEqual(
      '2,000'
    )
  })

  describe('Votes that can be revealed', () => {
    beforeEach(() => {
      window.localStorage.clear()
    })

    it('No votes to reveal', () => {
      renderComponent()

      expect(screen.queryByText(/reveal/i)).toBeNull()
    })

    it('One vote can be revealed', async () => {
      const salt = '0x7a0c114de774424abcd5d60fc58658a35341c9181b09e94a16dfff7ba2192206'
      const commitment = calculateCommitment(bob.address, '0', salt, 0)
      seedCouncilVote({ ...VOTE_DATA, commitment, castBy: bob.address }, server.server)
      window.localStorage.setItem('votes:0', JSON.stringify([{ salt, accountId: bob.address, optionId: '0' }]))
      renderComponent()

      expect(await screen.findByText('Reveal')).toBeDefined()
    })

    it('One vote, already revealed', async () => {
      const salt = '0x7a0c114de774424abcd5d60fc58658a35341c9181b09e94a16dfff7ba2192206'
      const commitment = calculateCommitment(bob.address, '0', salt, 0)
      seedCouncilVote({ ...VOTE_DATA, commitment, castBy: bob.address, voteForId: '0' }, server.server)
      window.localStorage.setItem('votes:0', JSON.stringify([{ salt, accountId: bob.address, optionId: '0' }]))
      renderComponent()

      expect(await screen.findByText('Revealed')).toBeDefined()
    })

    it('Two votes for the same candidate, one of them revealed', async () => {
      stubAccounts([
        { name: 'account', address: bob.address },
        { name: 'account2', address: alice.address },
      ])
      const salt1 = '0x7a0c114de774424abcd5d60fc58658a35341c9181b09e94a16dfff7ba2192206'
      seedCouncilVote(
        {
          ...VOTE_DATA,
          commitment: calculateCommitment(bob.address, '0', salt1, 0),
          castBy: bob.address,
          voteForId: '0',
        },
        server.server
      )
      const salt2 = '0x58658a35341c9181b09e94a16dfff7ba21922067a0c114de774424abcd5d60fc'
      seedCouncilVote(
        { ...VOTE_DATA, commitment: calculateCommitment(alice.address, '0', salt2, 0), castBy: alice.address },
        server.server
      )
      window.localStorage.setItem(
        'votes:0',
        JSON.stringify([
          { salt: salt1, accountId: bob.address, optionId: '0' },
          { salt: salt2, accountId: alice.address, optionId: '0' },
        ])
      )

      renderComponent()

      expect(await screen.findByText('Reveal')).toBeDefined()
    })

    it('Two votes for different candidates, one of them revealed', async () => {
      stubAccounts([
        { name: 'account', address: bob.address },
        { name: 'account2', address: alice.address },
      ])
      seedCouncilCandidate({ ...CANDIDATE_DATA, id: '1', memberId: '1' }, server.server)
      const salt = '0x7a0c114de774424abcd5d60fc58658a35341c9181b09e94a16dfff7ba2192206'
      seedCouncilVote(
        {
          ...VOTE_DATA,
          commitment: calculateCommitment(bob.address, '0', salt, 0),
          castBy: bob.address,
          voteForId: '0',
        },
        server.server
      )
      seedCouncilVote(
        { ...VOTE_DATA, commitment: calculateCommitment(alice.address, '1', salt, 0), castBy: alice.address },
        server.server
      )
      window.localStorage.setItem(
        'votes:0',
        JSON.stringify([
          { salt, accountId: bob.address, optionId: '0' },
          { salt, accountId: alice.address, optionId: '1' },
        ])
      )

      renderComponent()

      expect(await screen.findByText('Reveal')).toBeDefined()
      expect(await screen.findByText('Revealed')).toBeDefined()

      const voteForAlice = await screen.findByText('alice')
      expect(voteForAlice).toBeDefined()
      expect(voteForAlice.parentElement?.parentElement?.parentElement?.parentElement?.textContent).toContain('Revealed')

      const voteForBob = await screen.findByText('bob')
      expect(voteForBob).toBeDefined()
      expect(voteForBob.parentElement?.parentElement?.parentElement?.parentElement?.textContent).toContain('Reveal')
    })
  })

  it('Set to display only my votes', async () => {
    window.localStorage.clear()

    seedCouncilCandidate({ ...CANDIDATE_DATA, id: '1', memberId: '1' }, server.server)
    const salt = '0x7a0c114de774424abcd5d60fc58658a35341c9181b09e94a16dfff7ba2192206'
    seedCouncilVote(
      {
        ...VOTE_DATA,
        commitment: calculateCommitment(bob.address, '0', salt, 0),
        castBy: bob.address,
      },
      server.server
    )
    seedCouncilVote(
      {
        ...VOTE_DATA,
        commitment: calculateCommitment(alice.address, '1', salt, 0),
        castBy: alice.address,
      },
      server.server
    )
    window.localStorage.setItem('votes:0', JSON.stringify([{ salt, accountId: bob.address, optionId: '0' }]))

    renderComponent(true)

    const voteForAlice = await screen.findByText('alice')
    const voteForBob = screen.queryByText('bob')
    expect(voteForAlice).toBeDefined()
    expect(voteForBob).toBeNull()
  })

  it('Display all my revealed votes', async () => {
    window.localStorage.clear()
    seedCouncilVote({ ...VOTE_DATA, castBy: bob.address, voteForId: '0' }, server.server)

    renderComponent(true)

    expect(await screen.findByText('alice')).toBeDefined()
  })

  const renderComponent = (onlyMyVotes = false) =>
    render(
      <MockQueryNodeProviders>
        <Results onlyMyVotes={onlyMyVotes} />
      </MockQueryNodeProviders>
    )
})
