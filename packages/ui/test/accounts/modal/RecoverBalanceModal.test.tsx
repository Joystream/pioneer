import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { RecoverBalanceModal } from '@/accounts/modals/RecoverBalance'
import { Account } from '@/accounts/types'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

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

const useMyAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: true,
  allAccounts: [],
}

jest.mock('@/accounts/hooks/useMyAccounts', () => {
  return {
    useMyAccounts: () => useMyAccounts,
  }
})

describe('UI: RecoverBalanceModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    useMyAccounts.allAccounts.push(alice, bob)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  const api = stubApi()
  const server = setupMockServer()
  let tx: any

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: undefined,
  }

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  beforeEach(async () => {
    seedMembers(server.server)
    stubDefaultBalances(api)
    useMyMemberships.setActive(getMember('alice'))
    tx = stubTransaction(api, 'api.tx.council.releaseCandidacyStake')
  })

  it('No active member', async () => {
    useMyMemberships.active = undefined

    renderModal()

    expect(useModal.showModal).toBeCalledWith({ modal: 'SwitchMember' })
  })

  it('Transaction summary', async () => {
    renderModal()

    expect(await screen.findByRole('heading', { name: 'Recover balances' })).toBeDefined()
  })

  it('Success', async () => {
    stubTransactionSuccess(tx, [alice.address, bob.address, 50])

    renderModal()
    await fireEvent.click(await screen.findByText(/^sign transaction and transfer$/i))

    expect(await screen.findByText('Success')).toBeDefined()
  })

  it('Failure', async () => {
    stubTransactionFailure(tx)

    renderModal()
    await fireEvent.click(await screen.findByText(/^sign transaction and transfer$/i))

    expect(await screen.findByText('Failure')).toBeDefined()
  })

  function renderModal() {
    render(
      <MockKeyringProvider>
        <MockQueryNodeProviders>
          <MembershipContext.Provider value={useMyMemberships}>
            <ApiContext.Provider value={api}>
              <ModalContext.Provider value={useModal}>
                <RecoverBalanceModal onClose={() => undefined} />
              </ModalContext.Provider>
            </ApiContext.Provider>
          </MembershipContext.Provider>
        </MockQueryNodeProviders>
      </MockKeyringProvider>
    )
  }
})
