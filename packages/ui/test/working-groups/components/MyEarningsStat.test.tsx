import { cryptoWaitReady } from '@polkadot/util-crypto'
import { screen, render, waitForElementToBeRemoved } from '@testing-library/react'
import { startOfToday, subDays } from 'date-fns'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { seedApplications } from '@/mocks/data/mockApplications'
import { seedEvent } from '@/mocks/data/mockEvents'
import { seedOpenings } from '@/mocks/data/mockOpenings'
import { seedRewardPaidEvent } from '@/mocks/data/mockRewardPaidEvents'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'
import { seedWorkers } from '@/mocks/data/seedWorkers'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'

import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('MyEarningsStat', () => {
  const mockServer = setupMockServer()
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  it('Loading', () => {
    renderStat()

    expect(screen.getAllByText('-').length).toBe(2)
  })

  it('Loaded', async () => {
    seedMembers(mockServer.server)
    seedWorkingGroups(mockServer.server)
    seedOpenings(mockServer.server)
    seedApplications(mockServer.server)
    seedWorkers(mockServer.server)
    seedEvent({ id: '0', createdAt: new Date().toISOString(), type: 'RewardPaid' }, mockServer.server)
    seedRewardPaidEvent(
      {
        id: '0',
        createdAt: new Date().toISOString(),
        eventId: '0',
        groupId: '0',
        workerId: '0',
        rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
        amount: 100,
        type: 'REGULAR',
      },
      mockServer.server
    )
    seedRewardPaidEvent(
      {
        id: '1',
        createdAt: subDays(startOfToday(), 10).toISOString(),
        eventId: '0',
        groupId: '0',
        workerId: '0',
        rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
        amount: 500,
        type: 'REGULAR',
      },
      mockServer.server
    )

    renderStat()

    await waitForElementToBeRemoved(() => screen.getAllByText('-')[0])

    expect(screen.getByText('100')).toBeDefined()
    expect(screen.getByText('600')).toBeDefined()
  })

  function renderStat() {
    render(
      <HashRouter>
        <MockApolloProvider>
          <MembershipContext.Provider value={useMyMemberships}>
            <MyEarningsStat />
          </MembershipContext.Provider>
        </MockApolloProvider>
      </HashRouter>
    )
  }
})
