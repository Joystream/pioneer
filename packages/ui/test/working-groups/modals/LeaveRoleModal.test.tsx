import { createType } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/api/providers/context'
import { ModalContext } from '@/common/providers/modal/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { seedApplication } from '@/mocks/data/seedApplications'
import { seedOpening, seedOpeningStatuses } from '@/mocks/data/seedOpenings'
import { seedWorker } from '@/mocks/data/seedWorkers'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'
import { LeaveRoleModal } from '@/working-groups/modals/LeaveRoleModal/LeaveRoleModal'

import { getButton } from '../../_helpers/getButton'
import { alice } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { APPLICATION_DATA, OPENING_DATA, WORKER_DATA } from '../../_mocks/server/seeds'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { WORKER } from '../../_mocks/working-groups'

jest.mock('@/common/hooks/useQueryNodeTransactionStatus', () => ({
  useQueryNodeTransactionStatus: () => 'confirmed',
}))

describe('UI: LeaveRoleModal', () => {
  const api = stubApi()

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    hasMembers: true,
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  let useAccounts: UseAccounts
  let transaction: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation()
    await cryptoWaitReady()

    seedMembers(server.server)
    seedWorkingGroups(server.server)
    seedOpeningStatuses(server.server)
    seedOpening(OPENING_DATA, server.server)
    seedApplication(APPLICATION_DATA, server.server)
    seedWorker(WORKER_DATA, server.server)

    useAccounts = {
      isLoading: false,
      hasAccounts: true,
      allAccounts: [alice],
    }
  })

  beforeEach(async () => {
    useMyMemberships.setActive(getMember('alice'))
    stubDefaultBalances(api)
    transaction = stubTransaction(api, 'api.tx.forumWorkingGroup.leaveRole')
  })

  it('Prepare step', async () => {
    renderModal()
    expect(await screen.findByText('Leaving a position?')).toBeDefined()
    expect(await screen.findByText('Please remember that this action is irreversible.')).toBeDefined()
    expect(await screen.findByText('Unstaking period takes 14409 blocks.')).toBeDefined()
    expect(await getButton('Leave the position anyway')).toBeDefined()
  })

  describe('Authorize step', () => {
    async function renderSignStep() {
      renderModal()
      fireEvent.click(await getButton('Leave the position anyway'))
    }

    it('Transaction success', async () => {
      await renderSignStep()
      stubTransactionSuccess(transaction, 'forumWorkingGroup', 'WorkerStartedLeaving', [
        createType('WorkerId', parseInt(WORKER.id)),
      ])
      fireEvent.click(await getButton('Sign and leave role'))
      expect(await screen.findByText('Success!')).toBeDefined()
    })

    it('Transaction failure', async () => {
      await renderSignStep()
      stubTransactionFailure(transaction)
      fireEvent.click(await getButton('Sign and leave role'))
      expect(await screen.findByText('There was a problem leaving the role.')).toBeDefined()
    })
  })

  function renderModal() {
    const modalContext = {
      modal: 'LeaveRole',
      modalData: { workerId: 'forumWorkingGroup-1' },
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
