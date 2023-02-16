import { act, fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { generatePath, Route, Switch } from 'react-router-dom'

import { ApiContext } from '@/api/providers/context'
import { PastElection } from '@/app/pages/Election/PastElections/PastElection'
import { NotFound } from '@/app/pages/NotFound'
import { ElectionRoutes } from '@/council/constants'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import {
  RawCouncilCandidateMock,
  seedCouncilCandidate,
  seedCouncilElection,
  seedCouncilVote,
  seedElectedCouncil,
  seedMembers,
} from '@/mocks/data'
import { getMember } from '@/mocks/helpers'
import { randomRawBlock } from '@/mocks/helpers/randomBlock'

import { CANDIDATE_DATA } from '../../_mocks/council'
import { alice } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubAccounts, stubApi } from '../../_mocks/transactions'
import { loaderSelector } from '../../setup'

const TEST_CANDIDATES: RawCouncilCandidateMock[] = [
  {
    ...CANDIDATE_DATA,
    id: '1',
    electionRoundId: '1',
    memberId: getMember('alice').id,
  },
  {
    ...CANDIDATE_DATA,
    id: '2',
    electionRoundId: '1',
    memberId: getMember('bob').id,
  },
]

const TEST_VOTE = {
  electionRoundId: '1',
  stake: 1000,
  stakeLocked: false,
  castBy: getMember('bob').controllerAccount,
  voteForId: '1',
  commitment: '0x0000000000000000000000000000000000000000000000000000000000000000',
  voteCastEvent: randomRawBlock(),
}

describe('UI: Past Election page', () => {
  const mockServer = setupMockServer()
  const api = stubApi()
  let pageElectionId = 1

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [getMember('alice')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  beforeAll(() => {
    stubAccounts([alice])
  })

  beforeEach(() => {
    pageElectionId = 1
    seedMembers(mockServer.server, 2)
    seedElectedCouncil(
      {
        id: '1',
        electedAtBlock: 0,
        electedAtTime: '2022-01-01',
        electedAtNetwork: 'OLYMPIA',
      },
      mockServer.server
    )
    const endedAtBlock = randomRawBlock()
    seedCouncilElection(
      {
        id: '1',
        cycleId: 1,
        isFinished: true,
        endedAtBlock: endedAtBlock.inBlock,
        endedAtTime: endedAtBlock.createdAt,
        endedAtNetwork: endedAtBlock.network,
        electedCouncilId: '1',
      },
      mockServer.server
    )
    TEST_CANDIDATES.map((candidate) => seedCouncilCandidate(candidate, mockServer.server))
    seedCouncilVote(TEST_VOTE, mockServer.server)
  })

  it('Renders', async () => {
    const { queryByText, findAllByText } = await renderComponent()

    expect(await findAllByText(/Election #1/i)).toHaveLength(2)
    expect(queryByText(/Voting results/i)).not.toBeNull()
  })

  it('No such election', async () => {
    pageElectionId = 2
    const { queryByText } = await renderComponent()

    expect(queryByText(/not found/i)).not.toBeNull()
  })

  describe('Tabs', () => {
    it('Renders voting results', async () => {
      const { queryAllByText } = await renderComponent()

      expect(queryAllByText(/Total stake/i).length).toBe(2)
    })

    describe('My votes', () => {
      it('Has no', async () => {
        const { queryByText } = await renderComponent()

        expect(queryByText(/My votes/i)).toBeNull()
        expect(queryByText(/My stake/i)).toBeNull()
      })

      it('Has', async () => {
        seedCouncilVote(
          {
            ...TEST_VOTE,
            stake: 2000,
            castBy: getMember('alice').controllerAccount,
            voteForId: getMember('bob').id,
          },
          mockServer.server
        )
        const { queryByText, queryAllByText, findByText } = await renderComponent()

        expect(queryByText(/My votes/i)).not.toBeNull()

        const myVotesTab = await findByText(/My votes/i)

        act(() => {
          fireEvent.click(myVotesTab)
        })

        expect(queryAllByText(/Total stake/i).length).toBe(1)
        expect(queryAllByText(/My contributed votes/i).length).toBe(1)
      })
    })
  })

  async function renderComponent() {
    const rendered = await render(
      <MemoryRouter initialEntries={[generatePath(ElectionRoutes.pastElection, { id: pageElectionId })]}>
        <ApiContext.Provider value={api}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <MembershipContext.Provider value={useMyMemberships}>
                <Switch>
                  <Route path={ElectionRoutes.pastElection} component={PastElection} />
                  <Route path="/404" component={NotFound} />
                </Switch>
              </MembershipContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ApiContext.Provider>
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => loaderSelector())

    return rendered
  }
})
