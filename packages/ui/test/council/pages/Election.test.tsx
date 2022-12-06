import { act, configure, fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/api/providers/context'
import { Election } from '@/app/pages/Election/Election'
import { calculateCommitment } from '@/council/model/calculateCommitment'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import {
  RawCouncilCandidateMock,
  seedCouncilCandidate,
  seedCouncilElections,
  seedCouncilVote,
  seedElectedCouncils,
  seedMembers,
} from '@/mocks/data'
import { getMember } from '@/mocks/helpers'

import { getButton } from '../../_helpers/getButton'
import { CANDIDATE_DATA, VOTE_DATA } from '../../_mocks/council'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubAccounts, stubApi, stubCouncilAndReferendum, stubCouncilConstants } from '../../_mocks/transactions'
import { loaderSelector } from '../../setup'

configure({ testIdAttribute: 'id' })

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

const aliceMemberId = getMember('alice').id
const bobMemberId = getMember('bob').id

// NOTE in these tests, ids of candidates and members/options are used interchangeably for simplicity
const aliceCandidateId = aliceMemberId
const bobCandidateId = bobMemberId

const TEST_CANDIDATES: RawCouncilCandidateMock[] = [
  {
    ...CANDIDATE_DATA,
    id: aliceCandidateId,
    electionRoundId: '1',
    memberId: aliceMemberId,
  },
  {
    ...CANDIDATE_DATA,
    id: bobCandidateId,
    electionRoundId: '1',
    memberId: bobMemberId,
  },
]

const TEST_SALT = '0x16dfff7ba21922067a0c114de774424abcd5d60fc58658a35341c9181b09e94a'
const TEST_COMMITMENT = '0x3db26e2bd023ccf2d1167fd42d48cc76b1c1e5c1de9003f61e63ec6a337b91a2'

describe('UI: Election page', () => {
  const mockServer = setupMockServer()
  const api = stubApi()

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

  const castVote = (
    castBy: string,
    optionId: string,
    salt: string,
    commitment = calculateCommitment(castBy, optionId, salt, 1)
  ) => {
    seedCouncilVote({ ...VOTE_DATA, castBy, voteForId: optionId, commitment, electionRoundId: '1' }, mockServer.server)
    const oldVotes = JSON.parse(window.localStorage.getItem('votes:1') ?? '[]')
    const newVotes = [...oldVotes, { salt, accountId: castBy, optionId }]
    window.localStorage.setItem('votes:1', JSON.stringify(newVotes))
  }

  beforeEach(() => {
    seedMembers(mockServer.server, 2)
    seedElectedCouncils(mockServer.server, [{}, { endedAtBlock: undefined }])
    seedCouncilElections(mockServer.server, [{}, { isFinished: false }])

    const commitment = '0x0000000000000000000000000000000000000000000000000000000000000000'
    seedCouncilVote({ ...VOTE_DATA, castBy: alice.address, commitment, electionRoundId: '0' }, mockServer.server)

    stubCouncilConstants(api)
  })

  it('Inactive', async () => {
    stubCouncilAndReferendum(api, 'Idle', 'Inactive')

    const { queryByText } = await renderComponent()

    expect(queryByText('Stage')).not.toBeNull()
  })

  describe('Active', () => {
    describe('Announcing stage', () => {
      beforeEach(() => {
        stubCouncilAndReferendum(api, 'Announcing', 'Inactive')
      })

      it('Displays stage and round', async () => {
        const { queryByText } = await renderComponent()

        expect(queryByText('Announcing Period')).toBeInTheDocument()
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
            TEST_CANDIDATES.forEach((candidate) =>
              seedCouncilCandidate({ ...candidate, memberId: bobMemberId }, mockServer.server)
            )

            const { queryByText } = await renderComponent()

            expect(queryByText(/There are no candidates yet/i)).toBeNull()
            expect(queryByText('My candidates')).toBeNull()
          })

          it('Has my candidates', async () => {
            TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))

            const { queryAllByText, findByText } = await renderComponent()

            const myCandidatesTab = await findByText(/My candidates/i)

            act(() => {
              fireEvent.click(myCandidatesTab)
            })

            expect(queryAllByText(/newcomer/i).length).toBe(1)
            expect(queryAllByText(/Staked/i).length).toBe(1)
            expect(await getButton(/^Withdraw Candidacy/)).toBeDefined()
          })
        })
      })
    })

    describe('Voting stage', () => {
      beforeEach(() => {
        stubCouncilAndReferendum(api, 'Election', 'Voting')
        window.localStorage.clear()
      })

      it('Displays election round', async () => {
        await renderComponent()

        expect((await screen.findByTestId('election-round-value')).textContent).toBe('1')
      })

      it('Displays stage', async () => {
        const { queryByText } = await renderComponent()

        expect(queryByText(/Voting period/i)).not.toBeNull()
      })

      it('No accounts', async () => {
        TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))

        await renderComponent([])
        await screen.findAllByText(/newcomer/i) // Wait for the candidate list to render

        expect(screen.queryByText(/My Votes/i)).toBeDefined()
        expect(screen.queryByText('Vote')).toBeDefined()
      })

      it('No votes', async () => {
        TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))

        await renderComponent()

        expect(await screen.findAllByText('Vote')).toHaveLength(2)
        expect(screen.queryByText('Vote again')).toBeNull()
      })

      it('One account and One valid vote', async () => {
        TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))
        castVote(alice.address, aliceCandidateId, TEST_SALT, TEST_COMMITMENT)

        await renderComponent()

        expect(await screen.findByText(/My Votes/i)).toBeDefined()
        expect(screen.queryByText('Vote')).toBeNull()
        expect(screen.queryByText('Vote again')).toBeNull()
      })

      it('Multiple accounts and One valid vote', async () => {
        TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))
        castVote(alice.address, aliceCandidateId, TEST_SALT, TEST_COMMITMENT)

        await renderComponent([alice, bob])

        expect(await screen.findByText(/My Votes/i)).toBeDefined()
        expect(await screen.findAllByText('Vote')).toHaveLength(1)
        expect(await screen.findAllByText('Vote again')).toHaveLength(1)
      })

      it('One vote not matching query node', async () => {
        TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))
        const salt = '0x000000000000000000000000e774424abcd5d60fc58658a35341c9181b09e94a'
        castVote(alice.address, aliceCandidateId, salt, TEST_COMMITMENT)

        await renderComponent()
        await screen.findAllByText(/newcomer/i) // Wait for the candidate list to render

        expect(screen.queryByText(/My Votes/i)).toBeDefined()
        expect(screen.queryByText('Vote')).toBeNull()
        expect(screen.queryByText('Vote again')).toBeNull()
      })

      describe('Votes count', () => {
        it('Two votes for different candidates', async () => {
          TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))
          castVote(alice.address, aliceCandidateId, TEST_SALT, TEST_COMMITMENT)
          castVote(bob.address, bobCandidateId, TEST_SALT)

          await renderComponent([alice, bob])

          const myVotesTab = await screen.findByText(/My votes/i)
          expect(myVotesTab.firstElementChild).toHaveTextContent('2')
        })

        it('Two votes for the same candidate', async () => {
          TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))
          castVote(alice.address, aliceCandidateId, TEST_SALT, TEST_COMMITMENT)
          castVote(bob.address, aliceCandidateId, TEST_SALT)

          await renderComponent([alice, bob])

          const myVotesTab = await screen.findByText(/My Votes/i)
          expect(myVotesTab.firstElementChild).toHaveTextContent('2')
        })
      })
    })

    describe('Revealing stage', () => {
      beforeEach(() => {
        stubCouncilAndReferendum(api, 'Election', 'Revealing')
        window.localStorage.clear()
      })

      it('Displays stage, remaining length, and no election round', async () => {
        const { queryByText } = await renderComponent()

        expect(queryByText(/Revealing period/i)).toBeInTheDocument()
        expect(queryByText(/period remaining length/i)?.parentElement?.nextElementSibling).toHaveTextContent('< 1 min')
        expect(loaderSelector(true)).toHaveLength(1)
      })

      describe('Votes count', () => {
        it('Two votes for different candidates', async () => {
          TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))
          castVote(alice.address, aliceCandidateId, TEST_SALT, TEST_COMMITMENT)
          castVote(bob.address, bobCandidateId, TEST_SALT)

          await renderComponent([alice, bob])

          const myVotesTab = await screen.findByText(/My Votes/i)
          expect(myVotesTab.firstElementChild).toHaveTextContent('2')
        })

        it('Two votes for the same candidate', async () => {
          TEST_CANDIDATES.forEach((candidate) => seedCouncilCandidate(candidate, mockServer.server))
          castVote(alice.address, aliceCandidateId, TEST_SALT, TEST_COMMITMENT)
          castVote(bob.address, aliceCandidateId, TEST_SALT)

          await renderComponent([alice, bob])

          const myVotesTab = await screen.findByText(/My Votes/i)
          expect(myVotesTab.firstElementChild).toHaveTextContent('2')
        })
      })
    })
  })

  async function renderComponent(accounts = [alice]) {
    stubAccounts(accounts)

    await act(async () => {
      render(
        <MemoryRouter>
          <ApiContext.Provider value={api}>
            <MockQueryNodeProviders>
              <MockKeyringProvider>
                <MembershipContext.Provider value={useMyMemberships}>
                  <Election />
                </MembershipContext.Provider>
              </MockKeyringProvider>
            </MockQueryNodeProviders>
          </ApiContext.Provider>
        </MemoryRouter>
      )
    })

    const loader = loaderSelector()
    if (loader) {
      await waitForElementToBeRemoved(loader)
    }

    return screen
  }
})
