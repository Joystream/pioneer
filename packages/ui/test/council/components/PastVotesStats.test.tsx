import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { PastVotesStats } from '@/council/components/PastVotes/PastVotesStats'
import {
  RawCouncilElectionMock,
  seedCouncilCandidate,
  seedCouncilElection,
  seedCounncilVote,
  seedMembers,
} from '@/mocks/data'

import { CANDIDATE_DATA, VOTE_DATA } from '../../_mocks/council'
import { alice, bob } from '../../_mocks/keyring'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('UI: PastVotesStats', () => {
  const server = setupMockServer()
  const useAccounts = {
    hasAccounts: false,
    allAccounts: [alice, bob],
  }

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

  describe('Displays votes total', () => {
    it('From single account', async () => {
      ;[0, 0, 0].forEach(() => seedCounncilVote({ ...VOTE_DATA }, server.server))
      renderComponent()
      const header = await screen.findByText('Times Voted')
      expect(header).toBeDefined()
      await waitFor(() => expect(header.parentElement?.parentElement?.children[1].textContent).toEqual('3 votes'))
    })

    it('From multiple accounts', async () => {
      ;[0, 0, 0].forEach(() => seedCounncilVote({ ...VOTE_DATA, castBy: alice.address }, server.server))
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address }, server.server)
      renderComponent()
      const header = await screen.findByText('Times Voted')
      expect(header).toBeDefined()
      await waitFor(() => expect(header.parentElement?.parentElement?.children[1].textContent).toEqual('4 votes'))
    })

    it('Past elections only', async () => {
      seedCounncilVote({ ...VOTE_DATA, castBy: alice.address }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address }, server.server)
      seedCounncilVote({ ...VOTE_DATA, castBy: bob.address, electionRoundId: '1' }, server.server)
      renderComponent()
      const header = await screen.findByText('Times Voted')
      expect(header).toBeDefined()
      await waitFor(() => expect(header.parentElement?.parentElement?.children[1].textContent).toEqual('2 votes'))
    })
  })

  const renderComponent = () =>
    render(
      <MockApolloProvider>
        <AccountsContext.Provider value={useAccounts}>
          <PastVotesStats />
        </AccountsContext.Provider>
      </MockApolloProvider>
    )
})
