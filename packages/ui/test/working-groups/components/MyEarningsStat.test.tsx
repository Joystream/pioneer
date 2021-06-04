import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { startOfToday, subDays } from 'date-fns'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
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

import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('MyEarningsStat', () => {
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

    const worker = mockServer.server?.schema.first('Worker')

    seedRewardPaidEvent(
      {
        id: '0',
        createdAt: new Date().toISOString(),
        eventId: '0',
        groupId: String(worker?.attrs.groupId),
        workerId: String(worker?.attrs.id),
        rewardAccount: String(worker?.attrs.rewardAccount),
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
        groupId: String(worker?.attrs.groupId),
        workerId: String(worker?.attrs.id),
        rewardAccount: String(worker?.attrs.rewardAccount),
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
      <MemoryRouter>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <AccountsContext.Provider value={useAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <MyEarningsStat />
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
