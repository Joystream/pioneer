import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, waitForElementToBeRemoved, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { MyRole } from '@/app/pages/WorkingGroups/MyRoles/MyRole'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { seedApplication } from '@/mocks/data/seedApplications'
import { seedOpening } from '@/mocks/data/seedOpenings'
import { seedWorker } from '@/mocks/data/seedWorkers'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'

import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockApiProvider, MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { APPLICATION_DATA, OPENING_DATA, WORKER_DATA } from '../../_mocks/server/seeds'

describe('UI: My Role Page', () => {
  const mockServer = setupMockServer()

  const useAccounts: UseAccounts = {
    hasAccounts: true,
    allAccounts: [alice, bob],
  }
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [getMember('alice'), getMember('bob')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  it('Loading', () => {
    const { getByText } = renderPage()

    expect(getByText('Loading...')).toBeDefined()
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

      await waitForElementToBeRemoved(() => getByText('Loading...'))

      expect(getByText(`WORKER ID #${WORKER_DATA.id}`)).toBeDefined()
    })

    describe('Stake', () => {
      it('Lower than minimal', async () => {
        seedWorker({ ...WORKER_DATA, stake: 100 }, mockServer.server)

        const { getByText } = renderPage()

        await waitForElementToBeRemoved(() => getByText('Loading...'))
        expect(getByText('Minimal Stake:')).toBeDefined()
      })

      it('Higher than minimal', async () => {
        seedWorker({ ...WORKER_DATA, stake: 7000 }, mockServer.server)

        const { getByText, queryByText } = renderPage()

        await waitForElementToBeRemoved(() => getByText('Loading...'))
        expect(queryByText('Minimal Stake:')).toBeNull()
      })
    })

    it('Not own role', async () => {
      const worker = { ...WORKER_DATA, membershipId: 5, status: { status: 'WorkerStatusActive' } }
      seedWorker(worker, mockServer.server)

      renderPage()

      await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
      expect(screen.queryByText(/leave this position/i)).toBeNull()
      expect(screen.queryByText(/change role account/i)).toBeNull()
      expect(screen.queryByText(/change reward account/i)).toBeNull()
    })
  })

  function renderPage() {
    return render(
      <MockApiProvider>
        <MemoryRouter initialEntries={[`working-groups/my-roles/${WORKER_DATA.id}`]}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={useAccounts}>
                <MembershipContext.Provider value={useMyMemberships}>
                  <Route path="working-groups/my-roles/:id">
                    <MyRole />
                  </Route>
                </MembershipContext.Provider>
              </AccountsContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </MemoryRouter>
      </MockApiProvider>
    )
  }
})
