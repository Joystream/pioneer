import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/api/providers/context'
import { createType } from '@/common/model/createType'
import { ModalContextProvider } from '@/common/providers/modal/provider'
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
  currentStubErrorMessage,
  stubAccounts,
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { WORKER as worker } from '../../_mocks/working-groups'
import { mockUseModalCall } from '../../setup'

describe('UI: ChangeRoleModal', () => {
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

  let transaction: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation()
    await cryptoWaitReady()
    stubAccounts([alice, bob])
    seedMembers(server.server)
    seedWorkingGroups(server.server)
    seedOpeningStatuses(server.server)
    seedOpening(OPENING_DATA, server.server)
    seedApplication(APPLICATION_DATA, server.server)
    seedWorker(WORKER_DATA, server.server)
  })

  beforeEach(async () => {
    useMyMemberships.setActive(getMember('alice'))
    stubDefaultBalances()
  })

  describe('Change role account - authorize step', () => {
    async function renderSignStep() {
      mockUseModalCall({ modalData: { workerId: WORKER_DATA.id, type: ModalTypes.CHANGE_ROLE_ACCOUNT } })
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
      expect(await screen.findByText(currentStubErrorMessage)).toBeDefined()
    })
  })

  describe('Change reward account - authorize step', () => {
    async function renderSignStep() {
      mockUseModalCall({ modalData: { workerId: WORKER_DATA.id, type: ModalTypes.CHANGE_REWARD_ACCOUNT } })
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
      expect(await screen.findByText(currentStubErrorMessage)).toBeDefined()
    })
  })

  function renderModal() {
    return render(
      <MemoryRouter>
        <ModalContextProvider>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <MembershipContext.Provider value={useMyMemberships}>
                <ApiContext.Provider value={api}>
                  <ChangeAccountModal />
                </ApiContext.Provider>
              </MembershipContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ModalContextProvider>
      </MemoryRouter>
    )
  }
})
