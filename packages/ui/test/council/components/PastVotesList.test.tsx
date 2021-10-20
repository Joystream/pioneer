import { render, screen } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { PastVotesList } from '@/council/components/PastVotes/PastVotesList'
import {
  RawCouncilElectionMock,
  seedCouncilCandidate,
  seedCouncilElection,
  seedCounncilVote,
  seedMembers,
} from '@/mocks/data'

import { CANDIDATE_DATA, VOTE_DATA } from '../../_mocks/council'
import { alice } from '../../_mocks/keyring/signers'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('UI: PastVotesList', () => {
  const server = setupMockServer()

  const useAccounts = {
    hasAccounts: true,
    allAccounts: [{ name: 'account', address: alice.address }],
  }

  beforeEach(() => {
    seedMembers(server.server, 2)
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

  it('No votes', async () => {
    renderComponent()
    expect(await screen.findByText('You have no past votes.')).toBeDefined()
  })

  it('One unrevealed vote', async () => {
    seedCounncilVote(VOTE_DATA, server.server)
    renderComponent()
    expect(await screen.findByText('not revealed')).toBeDefined()
  })

  it('One revealed vote', async () => {
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0' }, server.server)
    renderComponent()
    expect(await screen.findByText('alice')).toBeDefined()
  })

  it('Only voted in present election', async () => {
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0', electionRoundId: '1' }, server.server)
    renderComponent()
    expect(await screen.findByText('You have no past votes.')).toBeDefined()
  })

  it('One past vote, one in current election', async () => {
    seedCounncilVote({ ...VOTE_DATA, voteForId: '0' }, server.server)
    seedCounncilVote({ ...VOTE_DATA, voteForId: '1', electionRoundId: '1' }, server.server)
    renderComponent()
    expect(await screen.findByText('alice')).toBeDefined()
    expect(screen.queryByText('bob')).toBeNull()
  })

  const renderComponent = () =>
    render(
      <AccountsContext.Provider value={useAccounts}>
        <MockQueryNodeProviders>
          <PastVotesList />
        </MockQueryNodeProviders>
      </AccountsContext.Provider>
    )
})
