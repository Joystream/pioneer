import { cryptoWaitReady } from '@polkadot/util-crypto'
import { prettyDOM, render, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { MyRole } from '@/app/pages/WorkingGroups/MyRoles/MyRole'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { seedApplications } from '@/mocks/data/mockApplications'
import { seedOpenings } from '@/mocks/data/mockOpenings'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'
import { RawWorker, seedWorker } from '@/mocks/data/seedWorkers'

import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { getDefaultWorker } from '../../_mocks/workers'

describe('UI: My Role Page', () => {
  const mockServer = setupMockServer()

  const mockWorker = getDefaultWorker(true)

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
      seedOpenings(mockServer.server)
      seedApplications(mockServer.server)
    })

    it('Rendered', async () => {
      seedWorker(mockWorker as RawWorker, mockServer.server)

      const { getByText } = renderPage()

      await waitForElementToBeRemoved(() => getByText('Loading...'))

      expect(getByText(`WORKER ID #${mockWorker.id}`)).toBeDefined()
    })

    describe('Stake', () => {
      it('Lower than minimal', async () => {
        seedWorker({ ...mockWorker, stake: 100 } as RawWorker, mockServer.server)

        const { getByText } = renderPage()

        await waitForElementToBeRemoved(() => getByText('Loading...'))
        expect(getByText('Minimal Stake:')).toBeDefined()
      })

      it('Higher than minimal', async () => {
        seedWorker(mockWorker as RawWorker, mockServer.server)

        const { getByText, queryByText } = renderPage()

        await waitForElementToBeRemoved(() => getByText('Loading...'))
        expect(queryByText('Minimal Height')).toBeNull()
      })
    })
  })

  // it('Loaded', async () => {
  //   seedMembers(mockServer.server)
  //   seedWorkingGroups(mockServer.server)
  //   seedOpenings(mockServer.server)
  //   seedApplications(mockServer.server)
  //   seedWorkers(mockServer.server)
  //
  //   const workerSchema = mockServer.server?.schema.first('Worker')
  //
  //   seedRewardPaidEvent(
  //     {
  //       id: '0',
  //       createdAt: new Date().toISOString(),
  //       eventId: '0',
  //       groupId: workerSchema?.attrs.groupId as string,
  //       workerId: workerSchema?.attrs.id as string,
  //       rewardAccount: workerSchema?.attrs.rewardAccount as string,
  //       amount: 100,
  //       type: 'REGULAR',
  //     },
  //     mockServer.server
  //   )
  //   seedRewardPaidEvent(
  //     {
  //       id: '1',
  //       createdAt: subDays(startOfToday(), 10).toISOString(),
  //       eventId: '0',
  //       groupId: workerSchema?.attrs.groupId as string,
  //       workerId: workerSchema?.attrs.id as string,
  //       rewardAccount: workerSchema?.attrs.rewardAccount as string,
  //       amount: 500,
  //       type: 'REGULAR',
  //     },
  //     mockServer.server
  //   )
  //
  //   renderStat()
  //
  //   await waitForElementToBeRemoved(() => screen.getAllByText('-')[0])
  //
  //   expect(screen.getByText('100')).toBeDefined()
  //   expect(screen.getByText('600')).toBeDefined()
  // })

  function renderPage() {
    return render(
      <MemoryRouter initialEntries={[`working-groups/my-roles/${mockWorker.id}`]}>
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
    )
  }
})
