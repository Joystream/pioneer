import { act, fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { generatePath, Route, Switch } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { PastElection } from '@/app/pages/Election/PastElections/PastElection'
import { NotFound } from '@/app/pages/NotFound'
import { ApiContext } from '@/common/providers/api/context'
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

import { alice } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi } from '../../_mocks/transactions'

const TEST_CANDIDATES: RawCouncilCandidateMock[] = [
  {
    id: '1',
    electionRoundId: '1',
    memberId: getMember('alice').id,
    stake: 1000,
    stakingAccountId: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
    rewardAccountId: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
    noteMetadata: {
      header: 'molestiae in dolore eveniet',
      bulletPoints: [
        'exercitationem nihil autem sint architecto id neque ipsum',
        'voluptas autem esse mollitia aspernatur labore est modi',
        'veniam et officia culpa consequuntur non odit iure',
      ],
      bannerImageUri: 'https://picsum.photos/500/300',
      description: 'ipsum aliquam qui repudiandae aliquid aliquam veritatis officia corporis molestiae',
    },
  },
  {
    id: '2',
    electionRoundId: '1',
    memberId: getMember('bob').id,
    stake: 1000,
    stakingAccountId: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
    rewardAccountId: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
    noteMetadata: {
      header: 'molestiae in dolore eveniet',
      bulletPoints: [
        'exercitationem nihil autem sint architecto id neque ipsum',
        'voluptas autem esse mollitia aspernatur labore est modi',
        'veniam et officia culpa consequuntur non odit iure',
      ],
      bannerImageUri: 'https://picsum.photos/500/300',
      description: 'ipsum aliquam qui repudiandae aliquid aliquam veritatis officia corporis molestiae',
    },
  },
]

const TEST_VOTE = {
  electionRoundId: '1',
  stake: 1000,
  stakeLocked: false,
  castBy: getMember('bob').controllerAccount,
  voteForId: '1',
  commitment: '0x0000000000000000000000000000000000000000000000000000000000000000',
}

describe('UI: Past Election page', () => {
  const mockServer = setupMockServer()
  const api = stubApi()
  let pageElectionId = 1

  const useAccounts: UseAccounts = {
    isLoading: false,
    hasAccounts: true,
    allAccounts: [alice],
  }
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

  beforeEach(() => {
    pageElectionId = 1
    seedMembers(mockServer.server, 2)
    seedElectedCouncil(
      {
        id: '1',
        electedAtBlock: 0,
        endedAtBlock: null,
      },
      mockServer.server
    )
    seedCouncilElection({ id: '1', cycleId: 1, isFinished: true, electedCouncilId: '1' }, mockServer.server)
    TEST_CANDIDATES.map((candidate) => seedCouncilCandidate(candidate, mockServer.server))
    seedCouncilVote(TEST_VOTE, mockServer.server)
  })

  it('Renders', async () => {
    const { queryByText } = await renderComponent()

    expect(queryByText(/Election #1/i)).not.toBeNull()
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
        expect(queryAllByText(/My stake/i).length).toBe(1)
      })
    })
  })

  async function renderComponent() {
    const rendered = await render(
      <MemoryRouter initialEntries={[generatePath(ElectionRoutes.pastElection, { id: pageElectionId })]}>
        <ApiContext.Provider value={api}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={useAccounts}>
                <MembershipContext.Provider value={useMyMemberships}>
                  <Switch>
                    <Route path={ElectionRoutes.pastElection} component={PastElection} />
                    <Route path="/404" component={NotFound} />
                  </Switch>
                </MembershipContext.Provider>
              </AccountsContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ApiContext.Provider>
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => rendered.getByText('Loading...'))

    return rendered
  }
})
