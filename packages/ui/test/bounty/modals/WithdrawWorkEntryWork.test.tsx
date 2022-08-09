import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { WithdrawWorkEntryModal } from '@/bounty/modals/WithdrawWorkEntryModal'
import { formatTokenValue } from '@/common/model/formatters'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import bounties from '@/mocks/data/raw/bounties.json'
import entries from '@/mocks/data/raw/bountyEntries.json'
import { getMember } from '@/mocks/helpers'

import { generateWork } from '../../../dev/query-node-mocks/generators/generateBounties'
import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider, MockApolloProvider } from '../../_mocks/providers'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockDefaultBalance, mockedTransactionFee } from '../../setup'

const bounty = bounties[0]
const baseEntry = entries[1]
const entry = { ...baseEntry, worker: getMember('bob'), works: [generateWork()] }

const defaultBalance = {
  ...mockDefaultBalance,
  transferable: new BN(1000),
}

describe('UI: WithdrawWorkEntryModal', () => {
  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: {
      bounty: { ...bounty, entries: [entry] },
    },
  }

  const api = stubApi()
  const txPath = 'api.tx.bounty.withdrawWorkEntry'
  let tx = stubTransaction(api, txPath)

  const useMyMemberships: MyMemberships = {
    active: getMember('bob'),
    members: [getMember('alice'), getMember('bob')],
    setActive: (member) => (useMyMemberships.active = member),

    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  const useAccounts = {
    isLoading: false,
    hasAccounts: true,
    allAccounts: [bob, alice],
  }

  const useBalances = {
    [getMember('bob').controllerAccount]: { ...defaultBalance },
    [getMember('alice').controllerAccount]: defaultBalance,
  }

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  beforeEach(async () => {
    stubDefaultBalances()
    tx = stubTransaction(api, txPath)
    mockedTransactionFee.feeInfo = { transactionFee: new BN(100), canAfford: true }
    mockedTransactionFee.transaction = tx as any
  })

  it('Renders', async () => {
    renderModal()

    expect(screen.getByText('modals.withdrawWorkEntry.title')).not.toBeNull()
    expect(await getButton('modals.withdrawWorkEntry.submitButton')).not.toBeNull()
  })

  it('Insufficient funds', async () => {
    mockedTransactionFee.feeInfo = { transactionFee: new BN(100), canAfford: false }

    renderModal()

    expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
  })

  it('Displays correct bounty', () => {
    renderModal()

    expect(screen.queryByText(useModal.modalData.bounty.title)).not.toBeNull()
  })

  it('Displays correct member', () => {
    renderModal()

    expect(screen.queryByText(entry.worker.handle)).not.toBeNull()
  })

  it('Displays correct works', () => {
    renderModal()

    entry.works.map((work: { title: string }) => expect(screen.queryByText(work.title)).not.toBeNull())
  })

  it('Displays correct stake amount', () => {
    renderModal()

    expect(screen.queryByText(formatTokenValue(entry.stake))).not.toBeNull()
  })

  describe('Transaction result', () => {
    beforeAll(() => {
      tx = stubTransaction(api, 'api.tx.bounty.withdrawWorkEntry', 20)
    })

    it('Success', async () => {
      stubTransactionSuccess(tx, 'bounty', 'WorkEntryWithdrawn')

      await renderModalAndProceedToTransaction()

      expect(screen.queryByText('common:success')).toBeDefined()
    })

    it('Error', async () => {
      stubTransactionFailure(tx)

      await renderModalAndProceedToTransaction()

      expect(screen.queryByText('modals.withdrawWorkEntry.error')).toBeDefined()
    })
  })

  const renderModalAndProceedToAuthorization = async () => {
    renderModal()

    const button = await getButton('modals.withdrawWorkEntry.submitButton')
    fireEvent.click(button)
  }

  const renderModalAndProceedToTransaction = async () => {
    await renderModalAndProceedToAuthorization()

    const button = await getButton('modals.withdrawWorkEntry.submitButton')
    fireEvent.click(button)
  }

  const renderModal = () => {
    render(
      <MockApolloProvider>
        <ModalContext.Provider value={useModal}>
          <MockKeyringProvider>
            <AccountsContext.Provider value={useAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ApiContext.Provider value={api}>
                  <BalancesContext.Provider value={useBalances}>
                    <WithdrawWorkEntryModal />
                  </BalancesContext.Provider>
                </ApiContext.Provider>
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </MockKeyringProvider>
        </ModalContext.Provider>
      </MockApolloProvider>
    )
  }
})
