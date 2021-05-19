import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/common/providers/api/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'
import { LeaveRoleModal } from '@/working-groups/modals/LeaveRoleModal/LeaveRoleModal'
import { Worker } from '@/working-groups/types'

import { alice } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

const WORKER: Worker = {
  membership: {
    id: '1',
    controllerAccount: alice.address,
  },
  group: {
    name: 'forum',
    id: '1',
  },
  isLeader: false,
  rewardPerBlock: 100,
  earnedTotal: 2000,
  stake: 2000,
  status: '',
  id: '1',
}

describe('UI: LeaveRoleModal', () => {
  const api = stubApi()

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
  }

  let useAccounts: UseAccounts
  let transaction: any

  const server = setupMockServer()

  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation()
    await cryptoWaitReady()

    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice],
    }
  })

  beforeEach(async () => {
    seedMembers(server.server)
    seedWorkingGroups(server.server)
    useMyMemberships.setActive(getMember('alice'))
    stubDefaultBalances(api)
    transaction = stubTransaction(api, 'api.tx.forumWorkingGroup.leaveRole')
  })

  it('Prepare step', async () => {
    renderModal()
    expect(await screen.findByText('Leaving a position?')).toBeDefined()
    expect(await screen.findByText('Please remember that this action is irreversible.')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Leave the position anyway' })).toBeDefined()
  })

  describe('Authorize step', () => {
    async function renderSignStep() {
      renderModal()
      fireEvent.click(screen.getByRole('button', { name: 'Leave the position anyway' }))
    }

    it('Transaction success', async () => {
      await renderSignStep()
      stubTransactionSuccess(transaction, [WORKER.id], 'workingGroup', 'WorkerStartedLeaving')
      fireEvent.click(screen.getByRole('button', { name: 'Sign and leave role' }))
      expect(await screen.findByText('Success!')).toBeDefined()
    })

    it('Transaction failure', async () => {
      await renderSignStep()
      stubTransactionFailure(transaction)
      fireEvent.click(screen.getByRole('button', { name: 'Sign and leave role' }))
      expect(await screen.findByText('There was a problem leaving the role.')).toBeDefined()
    })
  })

  function renderModal(worker = WORKER) {
    return render(
      <BrowserRouter>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <AccountsContext.Provider value={useAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ApiContext.Provider value={api}>
                  <LeaveRoleModal worker={worker} onClose={() => null} />
                </ApiContext.Provider>
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </BrowserRouter>
    )
  }
})
