import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'
import { LeaveRoleModal } from '@/working-groups/modals/LeaveRoleModal/LeaveRoleModal'

import { seedOpening, seedOpeningStatuses } from '../../../src/mocks/data/mockOpenings'
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

import { WORKER } from './constants'

const OPENING_DATA = {
  groupId: '0',
  type: 'REGULAR',
  status: 'open',
  stakeAmount: 2000,
  applications: null,
  metadata: {
    shortDescription: 'Distribution Worker',
    description: '# Description',
    hiringLimit: 1,
    expectedEnding: '2022-03-09T10:18:04.155Z',
    applicationDetails: 'Details... ?',
    applicationFormQuestions: [],
  },
  unstakingPeriod: '14409',
  rewardPerBlock: 200,
  createdAtBlockId: '5',
}

describe('UI: LeaveRoleModal', () => {
  const api = stubApi()

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    hasMembers: true,
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
    seedOpeningStatuses(server.server)
    seedOpening(OPENING_DATA, server.server)
    useMyMemberships.setActive(getMember('alice'))
    stubDefaultBalances(api)
    transaction = stubTransaction(api, 'api.tx.forumWorkingGroup.leaveRole')
  })

  it('Prepare step', async () => {
    const openingId = server.server!.schema.first('WorkingGroupOpening')!.id!
    renderModal({ ...WORKER, openingId })
    expect(await screen.findByText('Leaving a position?')).toBeDefined()
    expect(await screen.findByText('Please remember that this action is irreversible.')).toBeDefined()
    expect(await screen.findByText('Unstaking period takes 14409 blocks.')).toBeDefined()
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
    const modalContext = {
      modal: 'LeaveRole',
      modalData: { worker },
      showModal: () => null,
      hideModal: () => null,
    }

    return render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <AccountsContext.Provider value={useAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ApiContext.Provider value={api}>
                  <ModalContext.Provider value={modalContext}>
                    <LeaveRoleModal />
                  </ModalContext.Provider>
                </ApiContext.Provider>
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
