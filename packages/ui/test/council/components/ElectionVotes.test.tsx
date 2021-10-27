import { render, screen } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { ElectionVotes } from '@/council/components/election/CandidateVote/ElectionVotes'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { calculateCommitment } from '@/council/model/calculateCommitment'
import {
  RawCouncilElectionMock,
  seedCouncilCandidate,
  seedCouncilElection,
  seedCouncilVote,
  seedMembers,
} from '@/mocks/data'

import { CANDIDATE_DATA, VOTE_DATA } from '../../_mocks/council'
import { bob } from '../../_mocks/keyring/signers'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const Results = () => {
  const { election } = useCurrentElection()
  return election ? <ElectionVotes election={election} /> : null
}

describe('UI: ElectionVotes', () => {
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
      // commitment: '0x9585f8fffe80ce07d5afb79ed6952d894f142d8b8f71ef50db6bc45767773de1'
      const salt = '0x7a0c114de774424abcd5d60fc58658a35341c9181b09e94a16dfff7ba2192206'
      const commitment = calculateCommitment(bob.address, '0', salt, 0)
      seedCouncilVote({ ...VOTE_DATA, commitment, castBy: bob.address }, server.server)
      window.localStorage.setItem('votes:0', JSON.stringify([{ salt, accountId: bob.address, optionId: '0' }]))
      renderComponent()

      expect(await screen.findByText('Reveal')).toBeDefined()
    })
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
