import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'
import { ChangeAccountModal } from '@/working-groups/modals/ChangeAccountModal/ChangeAccountModal'
import { ModalTypes } from '@/working-groups/modals/ChangeAccountModal/constants'

import { alice, bob } from '../../_mocks/keyring'
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

import { WORKER as worker } from './constants'

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

  const server = setupMockServer()

  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation()
    await cryptoWaitReady()

    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  beforeEach(async () => {
    seedMembers(server.server)
    seedWorkingGroups(server.server)
    useMyMemberships.setActive(getMember('alice'))
    stubDefaultBalances(api)
  })

  describe('Change role account - authorize step', () => {
    async function renderSignStep() {
      useModal.modalData = { worker, type: ModalTypes.CHANGE_ROLE_ACCOUNT }
      transaction = stubTransaction(api, 'api.tx.forumWorkingGroup.updateRoleAccount')
      renderModal()
      fireEvent.click(screen.getByPlaceholderText('Select account or paste account address'))
      fireEvent.click(await screen.findByText('bob'))
      fireEvent.click(await screen.findByRole('button', { name: 'Change' }))
    }

    it('Should render transaction success', async () => {
      await renderSignStep()
      stubTransactionSuccess(transaction, [worker.id, bob.address], 'workingGroup', 'WorkerRoleAccountUpdated')
      fireEvent.click(await screen.findByRole('button', { name: 'Sign and change role account' }))
      expect(await screen.findByText('You have successfully changed the role account.')).toBeDefined()
    })

    it('Should render transaction failure', async () => {
      await renderSignStep()
      stubTransactionFailure(transaction)
      fireEvent.click(screen.getByRole('button', { name: 'Sign and change role account' }))
      expect(await screen.findByText('There was a problem changing the role account.')).toBeDefined()
    })
  })

  describe('Change reward account - authorize step', () => {
    async function renderSignStep() {
      transaction = stubTransaction(api, 'api.tx.forumWorkingGroup.updateRewardAccount')
      useModal.modalData = { worker, type: ModalTypes.CHANGE_REWARD_ACCOUNT }
      renderModal()
      fireEvent.click(screen.getByPlaceholderText('Select account or paste account address'))
      fireEvent.click(await screen.findByText('bob'))
      fireEvent.click(await screen.findByRole('button', { name: 'Change' }))
    }

    it('Should render transaction success', async () => {
      await renderSignStep()
      stubTransactionSuccess(transaction, [worker.id, bob.address], 'workingGroup', 'WorkerRewardAccountUpdated')
      fireEvent.click(await screen.findByRole('button', { name: 'Sign and change reward account' }))
      expect(await screen.findByText('You have successfully changed the reward account.')).toBeDefined()
    })

    it('Should render transaction failure', async () => {
      await renderSignStep()
      stubTransactionFailure(transaction)
      fireEvent.click(screen.getByRole('button', { name: 'Sign and change reward account' }))
      expect(await screen.findByText('There was a problem changing the reward account.')).toBeDefined()
    })
  })

  function renderModal() {
    return render(
      <BrowserRouter>
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
      </BrowserRouter>
    )
  }
})
