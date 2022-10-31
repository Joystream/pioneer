import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, waitForElementToBeRemoved, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'

import { ApiContext } from '@/api/providers/context'
import { MyRole } from '@/app/pages/WorkingGroups/MyRoles/MyRole'
import { createType } from '@/common/model/createType'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { seedApplication } from '@/mocks/data/seedApplications'
import { seedOpening } from '@/mocks/data/seedOpenings'
import { seedWorker } from '@/mocks/data/seedWorkers'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'

import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { APPLICATION_DATA, OPENING_DATA, WORKER_DATA } from '../../_mocks/server/seeds'
import { stubAccounts, stubApi, stubConst } from '../../_mocks/transactions'
import { loaderSelector } from '../../setup'

describe('UI: My Role Page', () => {
  const mockServer = setupMockServer()

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [getMember('alice'), getMember('bob')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }
  const api = stubApi()
  stubConst(api, 'forumWorkingGroup.rewardPeriod', createType('u32', 14410))

  beforeAll(async () => {
    stubAccounts([alice, bob])
    await cryptoWaitReady()
  })

  it('Loading', () => {
    renderPage()

    expect(loaderSelector()).toBeInTheDocument()
  })

  describe('After loading', () => {
    beforeEach(() => {
      seedMembers(mockServer.server)
      seedWorkingGroups(mockServer.server)
      seedOpening(OPENING_DATA, mockServer.server)
      seedApplication(APPLICATION_DATA, mockServer.server)
    })

    it('Rendered', async () => {
      seedWorker(WORKER_DATA, mockServer.server)

      const { getByText } = renderPage()

      await waitForElementToBeRemoved(() => loaderSelector())

      expect(getByText(`WORKER ID #${WORKER_DATA.id}`)).toBeDefined()
    })

    describe('Stake', () => {
      it('Lower than minimal', async () => {
        seedWorker({ ...WORKER_DATA, stake: 100 }, mockServer.server)

        const { getByText } = renderPage()

        await waitForElementToBeRemoved(() => loaderSelector())
        expect(getByText('Minimal Stake:')).toBeDefined()
      })

      it('Higher than minimal', async () => {
        seedWorker({ ...WORKER_DATA, stake: 7000 }, mockServer.server)

        const { queryByText } = renderPage()

        await waitForElementToBeRemoved(() => loaderSelector())
        expect(queryByText('Minimal Stake:')).toBeNull()
      })
    })

    it('Not own role', async () => {
      const worker = { ...WORKER_DATA, membershipId: 5, status: { type: 'WorkerStatusActive' } }
      seedWorker(worker, mockServer.server)

      renderPage()

      await waitForElementToBeRemoved(() => loaderSelector())
      expect(screen.queryByText(/leave this position/i)).toBeNull()
      expect(screen.queryByText(/change role account/i)).toBeNull()
      expect(screen.queryByText(/change reward account/i)).toBeNull()
    })
  })

  function renderPage() {
    return render(
      <ApiContext.Provider value={api}>
        <MemoryRouter initialEntries={[`working-groups/my-roles/${WORKER_DATA.id}`]}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <MembershipContext.Provider value={useMyMemberships}>
                <Route path="working-groups/my-roles/:id">
                  <MyRole />
                </Route>
              </MembershipContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </MemoryRouter>
      </ApiContext.Provider>
    )
  }
})
