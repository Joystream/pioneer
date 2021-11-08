import { act, fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { Election } from '@/app/pages/Council/Election'
import { ApiContext } from '@/common/providers/api/context'
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

import { getButton } from '../../_helpers/getButton'
import { VOTE_DATA } from '../../_mocks/council'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi, stubCouncilAndReferendum } from '../../_mocks/transactions'

const mockCandidateStats = {
  isLoading: false,
  total: 0,
  withdrawn: 0,
  successful: 0,
  failed: 0,
}

jest.mock('../../../src/memberships/hooks/useMemberCandidacyStats', () => ({
  useMemberCandidacyStats: () => mockCandidateStats,
}))

const TEST_CANDIDATES: RawCouncilCandidateMock[] = [
  {
    id: '1',
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

describe('UI: Election page', () => {
  const mockServer = setupMockServer()
  const api = stubApi()

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
    seedMembers(mockServer.server)
    seedElectedCouncil(
      {
        id: '1',
        electedAtBlock: 0,
        endedAtBlock: null,
      },
      mockServer.server
    )
    seedCouncilElection({ id: '1', cycleId: 1, isFinished: false, electedCouncilId: '1' }, mockServer.server)
  })

  it('Inactive', async () => {
    stubCouncilAndReferendum(api, 'Idle', 'Inactive')

    const { queryByText } = await renderComponent()

    expect(queryByText('Stage')).toBeNull()
  })

  describe('Active', () => {
    it('Displays election round', async () => {
      stubCouncilAndReferendum(api, 'Announcing', 'Inactive')

      const { queryByText } = await renderComponent()

      expect(queryByText(/1 round/i)).not.toBeNull()
    })

    describe('Announcing stage', () => {
      beforeEach(() => {
        stubCouncilAndReferendum(api, 'Announcing', 'Inactive')
      })

      it('Displays stage', async () => {
        const { queryByText } = await renderComponent()

        expect(queryByText(/Announcing period/i)).not.toBeNull()
      })

      describe('Tabs', () => {
        describe('Candidates', () => {
          it('No candidates', async () => {
            const { queryByText } = await renderComponent()

            expect(queryByText(/There are no candidates yet/i)).not.toBeNull()
          })

          it('Has candidates', async () => {
            TEST_CANDIDATES.map((candidate) => seedCouncilCandidate(candidate, mockServer.server))

            const { queryAllByText } = await renderComponent()

            expect(queryAllByText(/newcomer/i).length).toBe(2)
          })
        })

        describe('My candidates', () => {
          it('No my candidates', async () => {
            TEST_CANDIDATES.map((candidate) => seedCouncilCandidate(candidate, mockServer.server))

            const { queryByText } = await renderComponent()

            expect(queryByText(/There are no candidates yet/i)).toBeNull()
            expect(queryByText('My candidates')).toBeNull()
          })

          it('Has my candidates', async () => {
            TEST_CANDIDATES.forEach((candidate, index) =>
              seedCouncilCandidate(index === 0 ? { ...candidate, memberId: '0' } : candidate, mockServer.server)
            )

            const { queryAllByText, findByText } = await renderComponent()

            const myCandidatesTab = await findByText(/My candidates/i)

            act(() => {
              fireEvent.click(myCandidatesTab)
            })

            expect(queryAllByText(/newcomer/i).length).toBe(1)
            expect(queryAllByText(/my stake/i).length).toBe(1)
            expect(await getButton(/^Withdraw Candidacy/)).toBeDefined()
          })
        })
      })
    })

    describe('Voting stage', () => {
      const prepareVoteWithSalt = (salt: string) => {
        TEST_CANDIDATES.forEach((candidate, index) =>
          seedCouncilCandidate(index === 0 ? { ...candidate, memberId: '0' } : candidate, mockServer.server)
        )
        seedCouncilVote({ ...VOTE_DATA, electionRoundId: '1' }, mockServer.server)
        window.localStorage.setItem(
          'votes:1',
          `[{"salt":"${salt}","accountId":"5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY","optionId":"0"}]`
        )
      }

      beforeEach(() => {
        stubCouncilAndReferendum(api, 'Election', 'Voting')
        window.localStorage.clear()
      })

      it('Displays stage', async () => {
        const { queryByText } = await renderComponent()

        expect(queryByText(/Voting period/i)).not.toBeNull()
      })

      it('No accounts', async () => {
        TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))

        await renderComponent({ isLoading: false, hasAccounts: false, allAccounts: [] })

        expect(screen.queryByText(/My Votes/i)).toBeNull()
        expect(screen.queryByText('Vote')).toBeNull()
      })

      it('No votes', async () => {
        TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))

        await renderComponent()

        expect(screen.queryByText(/My Votes/i)).toBeNull()
        expect(await screen.findAllByText('Vote')).toHaveLength(2)
      })

      it('One account and One valid vote', async () => {
        prepareVoteWithSalt('0x16dfff7ba21922067a0c114de774424abcd5d60fc58658a35341c9181b09e94a')

        await renderComponent()

        expect(await screen.findByText(/My Votes/i)).toBeDefined()
        expect(screen.queryByText('Vote')).toBeNull()
        expect(screen.queryByText('Vote again')).toBeNull()
      })

      it('Multiple accounts and One valid vote', async () => {
        prepareVoteWithSalt('0x16dfff7ba21922067a0c114de774424abcd5d60fc58658a35341c9181b09e94a')

        await renderComponent({ isLoading: false, hasAccounts: true, allAccounts: [alice, bob] })

        expect(await screen.findByText(/My Votes/i)).toBeDefined()
        expect(await screen.findAllByText('Vote')).toHaveLength(1)
        expect(await screen.findAllByText('Vote again')).toHaveLength(1)
      })

      it('One vote not matching query node', async () => {
        prepareVoteWithSalt('0x000000000000000000000000e774424abcd5d60fc58658a35341c9181b09e94a')

        await renderComponent()

        expect(screen.queryByText(/My Votes/i)).toBeNull()
        expect(await screen.findAllByText('Vote')).toHaveLength(2)
        expect(screen.queryByText('Vote again')).toBeNull()
      })
    })

    it('Revealing stage', async () => {
      stubCouncilAndReferendum(api, 'Election', 'Revealing')

      const { queryByText } = await renderComponent()

      expect(queryByText(/Revealing period/i)).not.toBeNull()
    })
  })

  async function renderComponent(account = useAccounts) {
    const rendered = await render(
      <MemoryRouter>
        <ApiContext.Provider value={api}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={account}>
                <MembershipContext.Provider value={useMyMemberships}>
                  <Election />
                </MembershipContext.Provider>
              </AccountsContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ApiContext.Provider>
      </MemoryRouter>
    )

    const loader = rendered.queryByText('Loading candidates...')
    if (loader) {
      await waitForElementToBeRemoved(loader)
    }

    return rendered
  }
})
