import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AccountsContext } from '../../../src/accounts/providers/accounts/context'
import { UseAccounts } from '../../../src/accounts/providers/accounts/provider'
import { ApiContext } from '../../../src/common/providers/api/context'
import { MembershipContext } from '../../../src/memberships/providers/membership/context'
import { MyMemberships } from '../../../src/memberships/providers/membership/provider'
import { seedMembers } from '../../../src/mocks/data'
import { seedWorkingGroups } from '../../../src/mocks/data/mockWorkingGroups'
import { LeaveRoleModal } from '../../../src/working-groups/modals/LeaveRoleModal/LeaveRoleModal'
import { WorkerWithDetails } from '../../../src/working-groups/types'
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

const WORKER: WorkerWithDetails = {
  membership: {
    id: '',
    controllerAccount: '',
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

  it('Renders the modal', async () => {
    await renderModal()
    expect(screen.findByText('Leaving a position?')).toBeDefined()
    expect(screen.findByText('Please remember that this action is irreversible.')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Leave the position anyway' })).toBeDefined()
  })

  describe('Sign step', () => {
    it("With member's controller account in keyring", async () => {
      await renderWithValidSigner()
      await fireEvent.click(screen.getByRole('button', { name: 'Leave the position anyway' }))
      expect(
        screen.findByText("The transaction can only be signed with the membership's controller account.")
      ).toBeDefined()
      expect(screen.getByRole('button', { name: 'Sign and leave role' })).not.toBeDisabled()
    })

    it("Without member's controller account in keyring", async () => {
      await renderWithoutValidSigner()
      await fireEvent.click(screen.getByRole('button', { name: 'Leave the position anyway' }))
      expect(
        screen.findByText("The transaction can only be signed with the membership's controller account.")
      ).toBeDefined()
      expect(screen.getByRole('button', { name: 'Sign and leave role' })).toBeDisabled()
    })
  })

  describe('Sign the transaction', () => {
    async function renderSignStep() {
      await renderWithValidSigner()
      await fireEvent.click(screen.getByRole('button', { name: 'Leave the position anyway' }))
    }

    it('Transaction success', async () => {
      await renderSignStep()
      stubTransactionSuccess(transaction, [WORKER.id], 'workingGroup', 'WorkerStartedLeaving')
      await fireEvent.click(screen.getByRole('button', { name: 'Sign and leave role' }))
      expect(screen.findByText('Success!')).toBeDefined()
    })

    it('Transaction failure', async () => {
      await renderSignStep()
      stubTransactionFailure(transaction)
      await fireEvent.click(screen.getByRole('button', { name: 'Sign and leave role' }))
      expect(screen.findByText('There was a problem leaving the role.')).toBeDefined()
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

  async function renderWithValidSigner() {
    return await renderModal({
      ...WORKER,
      membership: {
        id: '1',
        controllerAccount: alice.address,
      },
    })
  }

  async function renderWithoutValidSigner() {
    return await renderModal({
      ...WORKER,
      membership: {
        id: '1',
        controllerAccount: '5GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG',
      },
    })
  }
})
