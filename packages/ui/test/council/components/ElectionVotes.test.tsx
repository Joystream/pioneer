import { render, screen } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { RevealingStageVotes } from '@/council/components/election/CandidateVote/RevealingStageVotes'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { useElectionVotes } from '@/council/hooks/useElectionVotes'
import { calculateCommitment } from '@/council/model/calculateCommitment'
import {
  RawCouncilElectionMock,
  seedCouncilCandidate,
  seedCouncilElection,
  seedCouncilVote,
  seedMembers,
} from '@/mocks/data'

import { CANDIDATE_DATA, VOTE_DATA } from '../../_mocks/council'
import { alice, bob } from '../../_mocks/keyring/signers'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const Results = ({ onlyMyVotes }: { onlyMyVotes: boolean }) => {
  const { election } = useCurrentElection()
  const { votesPerCandidate, sumOfStakes: totalStake, isLoading: votesLoading } = useElectionVotes(election)
  return election ? (
    <RevealingStageVotes
      isLoading={votesLoading}
      totalStake={totalStake}
      votesPerCandidate={votesPerCandidate}
      onlyMyVotes={onlyMyVotes}
    />
  ) : null
}

describe('UI: RevealingStageVotes', () => {
  const server = setupMockServer()

  const useAccounts = {
    hasAccounts: true,
    allAccounts: [{ name: 'account', address: bob.address }],
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
    useAccounts.allAccounts = [{ name: 'account', address: bob.address }]
  })

  it('No votes revealed', async () => {
    seedCouncilVote(VOTE_DATA, server.server)

    renderComponent()

    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('0')
    expect((await screen.findByText(/revealed votes/i)).nextSibling?.textContent).toEqual('0')
  })

  it('Vote revealed', async () => {
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', stake: 1337 }, server.server)

    renderComponent()

    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('1,337')
    expect((await screen.findByText(/revealed votes/i)).nextSibling?.textContent).toEqual('1')
  })

  it('Multiple revealed votes', async () => {
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', stake: 2000 }, server.server)
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', stake: 900 }, server.server)
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', stake: 45 }, server.server)

    renderComponent()

    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('2,945')
    expect((await screen.findByText(/revealed votes/i)).nextSibling?.textContent).toEqual('3')
  })

  it('Multiple revealed votes, unrevealed votes', async () => {
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', stake: 2000 }, server.server)
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', stake: 900 }, server.server)
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', stake: 45 }, server.server)
    seedCouncilVote({ ...VOTE_DATA, stake: 7000 }, server.server)
    seedCouncilVote({ ...VOTE_DATA, stake: 3000 }, server.server)

    renderComponent()

    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('2,945')
    expect((await screen.findByText(/revealed votes/i)).nextSibling?.textContent).toEqual('3')
  })

  it('Multiple candidates, ordered by votes number', async () => {
    seedCouncilCandidate({ ...CANDIDATE_DATA, id: '1', memberId: '1' }, server.server)
    seedCouncilVote({ ...VOTE_DATA, voteForId: '1', stake: 2000 }, server.server)
    seedCouncilVote({ ...VOTE_DATA, voteForId: '1', stake: 900 }, server.server)
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', stake: 1337 }, server.server)

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

  it('Own stake', async () => {
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', stake: 1000 }, server.server)
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', stake: 2000, castBy: bob.address }, server.server)

    renderComponent()

    expect((await screen.findByText(/total stake/i)).nextSibling?.textContent).toEqual('3,000')
    expect((await screen.findByText(/my stake/i)).nextSibling?.textContent).toEqual('2,000')
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
      useAccounts.allAccounts = [
        { name: 'account', address: bob.address },
        { name: 'account2', address: alice.address },
      ]
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
      useAccounts.allAccounts = [
        { name: 'account', address: bob.address },
        { name: 'account2', address: alice.address },
      ]
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
      expect(voteForAlice.parentElement?.parentElement?.parentElement?.textContent).toContain('Revealed')

      const voteForBob = await screen.findByText('bob')
      expect(voteForBob).toBeDefined()
      expect(voteForBob.parentElement?.parentElement?.parentElement?.textContent).toContain('Reveal')
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
        voteForId: '0',
      },
      server.server
    )
    seedCouncilVote(
      {
        ...VOTE_DATA,
        commitment: calculateCommitment(alice.address, '1', salt, 0),
        castBy: alice.address,
        voteForId: '1',
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

  const renderComponent = (onlyMyVotes = false) =>
    render(
      <AccountsContext.Provider value={useAccounts}>
        <MockQueryNodeProviders>
          <Results onlyMyVotes={onlyMyVotes} />
        </MockQueryNodeProviders>
      </AccountsContext.Provider>
    )
})
