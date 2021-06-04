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
import { RawApplication, seedApplication } from '@/mocks/data/mockApplications'
import { seedOpening, seedOpeningStatuses } from '@/mocks/data/mockOpenings'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'
import { seedWorker } from '@/mocks/data/seedWorkers'
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

const OPENING_DATA = {
  groupId: '1',
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

const WORKER_DATA = {
  id: '1',
  membershipId: '0',
  groupId: 1,
  applicationId: '1',
  nextPaymentAt: '',
  rewardPerBlock: 0,
  earnedTotal: 2000,
  stake: 2000,
  status: '',
  hiredAtBlockId: '1',
}

const APPLICATION_DATA: RawApplication = {
  openingId: '1',
  applicantId: '41',
  answers: [],
  status: 'pending',
  createdAtBlockId: 1,
}

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
    seedOpeningStatuses(server.server)
    seedOpening(OPENING_DATA, server.server)
    seedApplication(APPLICATION_DATA, server.server)
    seedWorker(WORKER_DATA, server.server)
    useMyMemberships.setActive(getMember('alice'))
    stubDefaultBalances(api)
  })

  describe('Change role account - authorize step', () => {
    async function renderSignStep() {
      useModal.modalData = { workerId: '1', type: ModalTypes.CHANGE_ROLE_ACCOUNT }
      transaction = stubTransaction(api, 'api.tx.storageWorkingGroup.updateRoleAccount')
      renderModal()
      fireEvent.click(await screen.findByPlaceholderText('Select account or paste account address'))
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
      useModal.modalData = { workerId: '1', type: ModalTypes.CHANGE_REWARD_ACCOUNT }
      transaction = stubTransaction(api, 'api.tx.storageWorkingGroup.updateRewardAccount')
      renderModal()
      fireEvent.click(await screen.findByPlaceholderText('Select account or paste account address'))
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
