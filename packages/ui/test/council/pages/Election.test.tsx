import { act, fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react'
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
  seedElectedCouncil,
  seedMembers,
} from '@/mocks/data'
import { getMember } from '@/mocks/helpers'

import { alice } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi, stubCouncilAndReferendum } from '../../_mocks/transactions'

const TEST_CANDIDATES: RawCouncilCandidateMock[] = [
  {
    id: '1',
    cycleIdId: '1',
    memberId: getMember('bob').id,
    stake: 1000,
  },
  {
    id: '2',
    cycleIdId: '1',
    memberId: getMember('bob').id,
    stake: 1000,
  },
]

describe('UI: Election page', () => {
  const mockServer = setupMockServer()
  const api = stubApi()

  const useAccounts: UseAccounts = {
    hasAccounts: true,
    allAccounts: [alice],
  }
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [getMember('alice')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  beforeEach(() => {
    seedMembers(mockServer.server)
    seedElectedCouncil(
      {
        id: '1',
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
            const candidates = TEST_CANDIDATES
            candidates[0].memberId = getMember('alice').id
            candidates.map((candidate) => seedCouncilCandidate(candidate, mockServer.server))
            TEST_CANDIDATES.map((candidate) => seedCouncilCandidate(candidate, mockServer.server))

            const { queryAllByText, findByText } = await renderComponent()

            const myCandidatesTab = await findByText(/My candidates/i)

            act(() => {
              fireEvent.click(myCandidatesTab)
            })

            expect(queryAllByText(/newcomer/i).length).toBe(1)
            expect(queryAllByText(/my stake/i).length).toBe(1)
          })
        })
      })
    })

    it('Voting stage', async () => {
      stubCouncilAndReferendum(api, 'Election', 'Voting')

      const { queryByText } = await renderComponent()

      expect(queryByText(/Voting period/i)).not.toBeNull()
    })

    it('Revealing stage', async () => {
      stubCouncilAndReferendum(api, 'Election', 'Revealing')

      const { queryByText } = await renderComponent()

      expect(queryByText(/Revealing period/i)).not.toBeNull()
    })
  })

  async function renderComponent() {
    const rendered = await render(
      <MemoryRouter>
        <ApiContext.Provider value={api}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={useAccounts}>
                <MembershipContext.Provider value={useMyMemberships}>
                  <Election />
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
