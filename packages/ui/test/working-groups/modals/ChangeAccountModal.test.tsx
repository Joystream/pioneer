import { createType } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { seedApplication } from '@/mocks/data/seedApplications'
import { seedOpening, seedOpeningStatuses } from '@/mocks/data/seedOpenings'
import { seedWorker } from '@/mocks/data/seedWorkers'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'
import { ChangeAccountModal } from '@/working-groups/modals/ChangeAccountModal/ChangeAccountModal'
import { ModalTypes } from '@/working-groups/modals/ChangeAccountModal/constants'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
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
import { WORKER as worker } from '../../_mocks/working-groups'

describe('UI: ChangeRoleModal', () => {
  const api = stubApi()
  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: undefined,
  }

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    hasMembers: true,
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
  }

  let useAccounts: UseAccounts
  let transaction: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation()
    await cryptoWaitReady()

    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice, bob],
    }

    seedMembers(server.server)
    seedWorkingGroups(server.server)
    seedOpeningStatuses(server.server)
    seedOpening(OPENING_DATA, server.server)
    seedApplication(APPLICATION_DATA, server.server)
    seedWorker(WORKER_DATA, server.server)
  })

  beforeEach(async () => {
    useMyMemberships.setActive(getMember('alice'))
    stubDefaultBalances(api)
  })

  describe('Change role account - authorize step', () => {
    async function renderSignStep() {
      useModal.modalData = { workerId: WORKER_DATA.id, type: ModalTypes.CHANGE_ROLE_ACCOUNT }
      transaction = stubTransaction(api, 'api.tx.forumWorkingGroup.updateRoleAccount')
      renderModal()
      fireEvent.click(await screen.findByPlaceholderText('Select account or paste account address'))
      fireEvent.click(await screen.findByText('bob'))
      fireEvent.click(await getButton('Change'))
    }

    it('Should render transaction success', async () => {
      await renderSignStep()
      stubTransactionSuccess(transaction, 'forumWorkingGroup', 'WorkerRoleAccountUpdated', [
        createType('WorkerId', parseInt(worker.id)),
        createType('AccountId', bob.address),
      ])
      fireEvent.click(await getButton('Sign and change role account'))
      expect(await screen.findByText('You have successfully changed the role account.')).toBeDefined()
    })

    it('Should render transaction failure', async () => {
      await renderSignStep()
      stubTransactionFailure(transaction)
      fireEvent.click(await getButton('Sign and change role account'))
      expect(await screen.findByText('There was a problem changing the role account.')).toBeDefined()
    })
  })

  describe('Change reward account - authorize step', () => {
    async function renderSignStep() {
      useModal.modalData = { workerId: WORKER_DATA.id, type: ModalTypes.CHANGE_REWARD_ACCOUNT }
      transaction = stubTransaction(api, 'api.tx.forumWorkingGroup.updateRewardAccount')
      renderModal()
      fireEvent.click(await screen.findByPlaceholderText('Select account or paste account address'))
      fireEvent.click(await screen.findByText('bob'))
      fireEvent.click(await getButton('Change'))
    }

    it('Should render transaction success', async () => {
      await renderSignStep()
      stubTransactionSuccess(transaction, 'forumWorkingGroup', 'WorkerRewardAccountUpdated', [
        createType('WorkerId', parseInt(worker.id)),
        createType('AccountId', bob.address),
      ])
      fireEvent.click(await getButton('Sign and change reward account'))
      expect(await screen.findByText('You have successfully changed the reward account.')).toBeDefined()
    })

    it('Should render transaction failure', async () => {
      await renderSignStep()
      stubTransactionFailure(transaction)
      fireEvent.click(await getButton('Sign and change reward account'))
      expect(await screen.findByText('There was a problem changing the reward account.')).toBeDefined()
    })
  })

  function renderModal() {
    return render(
      <MemoryRouter>
        <ModalContext.Provider value={useModal}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={useAccounts}>
                <MembershipContext.Provider value={useMyMemberships}>
                  <ApiContext.Provider value={api}>
                    <ChangeAccountModal />
                  </ApiContext.Provider>
                </MembershipContext.Provider>
              </AccountsContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ModalContext.Provider>
      </MemoryRouter>
    )
  }
})
