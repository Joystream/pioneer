import { render, screen } from '@testing-library/react'
import React from 'react'

import { PastVotesList } from '@/council/components/PastVotes/PastVotesList'
import {
  RawCouncilElectionMock,
  seedCouncilCandidate,
  seedCouncilElection,
  seedCouncilVote,
  seedMembers,
} from '@/mocks/data'

import { CANDIDATE_DATA, VOTE_DATA } from '../../_mocks/council'
import { alice } from '../../_mocks/keyring'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubAccounts } from '../../_mocks/transactions'

describe('UI: PastVotesList', () => {
  const server = setupMockServer()

  beforeAll(() => {
    stubAccounts([{ name: 'account', address: alice.address }])
  })

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
    seedCouncilCandidate({ ...CANDIDATE_DATA, id: '1', memberId: '1' }, server.server)
  })

  it('No votes', async () => {
    renderComponent()
    expect(await screen.findByText('You have no past votes.')).toBeDefined()
  })

  it('One unrevealed vote', async () => {
    seedCouncilVote(VOTE_DATA, server.server)
    renderComponent()
    expect(await screen.findByText('not revealed')).toBeDefined()
  })

  it('One revealed vote', async () => {
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0' }, server.server)
    renderComponent()
    expect(await screen.findByText('alice')).toBeDefined()
  })

  it('Only voted in present election', async () => {
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0', electionRoundId: '1' }, server.server)
    renderComponent()
    expect(await screen.findByText('You have no past votes.')).toBeDefined()
  })

  it('One past vote, one in current election', async () => {
    seedCouncilVote({ ...VOTE_DATA, voteForId: '0' }, server.server)
    seedCouncilVote({ ...VOTE_DATA, voteForId: '1', electionRoundId: '1' }, server.server)
    renderComponent()
    expect(await screen.findByText('alice')).toBeDefined()
    expect(screen.queryByText('bob')).toBeNull()
  })

  const renderComponent = () =>
    render(
      <MockQueryNodeProviders>
        <PastVotesList />
      </MockQueryNodeProviders>
    )
})
