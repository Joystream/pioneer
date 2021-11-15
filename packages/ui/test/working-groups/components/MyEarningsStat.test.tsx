import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { startOfToday, subDays } from 'date-fns'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedApplication, seedEvent, seedMember, seedOpening, seedWorker } from '@/mocks/data'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'

import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { APPLICATION_DATA, MEMBER_ALICE_DATA, OPENING_DATA, WORKER_DATA } from '../../_mocks/server/seeds'

describe('MyEarningsStat', () => {
  const mockServer = setupMockServer()

  const useAccounts: UseAccounts = {
    isLoading: false,
    hasAccounts: true,
    allAccounts: [alice, bob],
  }
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

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  it('Loading', () => {
    renderStat()

    expect(screen.getAllByText('-').length).toBe(2)
  })

  it('Loaded', async () => {
    seedWorkingGroups(mockServer.server)
    seedMember(MEMBER_ALICE_DATA, mockServer.server)
    seedOpening(OPENING_DATA, mockServer.server)
    seedApplication({ ...APPLICATION_DATA, applicantId: MEMBER_ALICE_DATA.id }, mockServer.server)
    seedWorker(WORKER_DATA, mockServer.server)

    const worker = mockServer.server?.schema.first('Worker')

    seedEvent(
      {
        id: '0',
        createdAt: new Date().toISOString(),
        groupId: String(worker?.attrs.groupId),
        workerId: String(worker?.attrs.id),
        rewardAccount: String(worker?.attrs.rewardAccount),
        amount: 100,
        type: 'REGULAR',
      },
      'RewardPaidEvent',
      mockServer.server
    )
    seedEvent(
      {
        id: '1',
        createdAt: subDays(startOfToday(), 10).toISOString(),
        groupId: String(worker?.attrs.groupId),
        workerId: String(worker?.attrs.id),
        rewardAccount: String(worker?.attrs.rewardAccount),
        amount: 500,
        type: 'REGULAR',
      },
      'RewardPaidEvent',
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
