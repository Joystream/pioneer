import { createType } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { RecoverBalanceModal, RecoverBalanceModalCall } from '@/accounts/modals/RecoverBalance'
import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
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

describe('UI: RecoverBalanceModal', () => {
  let useAccounts: UseAccounts
  const api = stubApi()
  const server = setupMockServer({ noCleanupAfterEach: true })
  let tx: any

  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    seedMembers(server.server, 2)
  })

  const useModal: UseModal<RecoverBalanceModalCall> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: {
      modal: 'RecoverBalance',
      data: {
        lock: {
          amount: new BN(300),
          type: 'Staking Candidate',
        },
        address: alice.address,
        memberId: '0',
      },
    },
  }

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  beforeEach(async () => {
    stubDefaultBalances(api)
    useMyMemberships.setActive(getMember('alice'))
    tx = stubTransaction(api, 'api.tx.council.releaseCandidacyStake')
    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  it('Transaction summary', async () => {
    renderModal()

    expect(await screen.findByRole('heading', { name: 'Recover balances' })).toBeDefined()
  })

  it('Success', async () => {
    stubTransactionSuccess(tx, 'council', 'CandidacyStakeRelease', [createType('MemberId', 0)])

    renderModal()
    fireEvent.click(await screen.findByText(/^sign transaction and transfer$/i))

    expect(await screen.findByText('Success')).toBeDefined()
  })

  it('Failure', async () => {
    stubTransactionFailure(tx)

    renderModal()
    fireEvent.click(await screen.findByText(/^sign transaction and transfer$/i))

    expect(await screen.findByText('Failure')).toBeDefined()
  })

  function renderModal() {
    render(
      <MockKeyringProvider>
        <MockQueryNodeProviders>
          <MembershipContext.Provider value={useMyMemberships}>
            <ApiContext.Provider value={api}>
              <AccountsContext.Provider value={useAccounts}>
                <ModalContext.Provider value={useModal}>
                  <RecoverBalanceModal />
                </ModalContext.Provider>
              </AccountsContext.Provider>
            </ApiContext.Provider>
          </MembershipContext.Provider>
        </MockQueryNodeProviders>
      </MockKeyringProvider>
    )
  }
})
