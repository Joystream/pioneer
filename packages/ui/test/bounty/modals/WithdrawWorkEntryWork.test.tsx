import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { WithdrawWorkEntryModal } from '@/bounty/modals/WithdrawWorkEntryModal'
import { BN_ZERO } from '@/common/constants'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import bounties from '@/mocks/data/raw/bounties.json'
import entries from '@/mocks/data/raw/bountyEntries.json'
import { getMember } from '@/mocks/helpers'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction, stubTransactionFailure, stubTransactionSuccess } from '../../_mocks/transactions'

const bounty = bounties[0]
const baseEntry = entries[1]
const entry = { ...baseEntry, worker: getMember('bob') }

const defaultBalance = {
  total: BN_ZERO,
  locked: BN_ZERO,
  recoverable: BN_ZERO,
  transferable: new BN(1000),
  locks: [],
}

describe('UI: WithdrawWorkEntryModal', () => {
  const api = stubApi()

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: {
      bounty: { ...bounty },
      entry: { ...entry },
    },
  }

  const useBalances = {
    [getMember('bob').controllerAccount]: { ...defaultBalance },
    [getMember('alice').controllerAccount]: defaultBalance,
  }

  let transaction: any
  let useAccounts: UseAccounts

  beforeAll(() => {
    transaction = stubTransaction(api, 'api.tx.bounty.withdrawWorkEntry', 100)

    useAccounts = {
      isLoading: false,
      hasAccounts: true,
      allAccounts: [bob, alice],
    }
  })

  it('Renders', async () => {
    renderModal()

    expect(screen.queryByText('modals.withdrawWorkEntry.title')).toBeDefined()
    expect(screen.queryByText('modals.withdrawWorkEntry.submitButton')).toBeDefined()
  })

  it('Displays correct bounty', () => {
    renderModal()

    expect(screen.queryByText(useModal.modalData.bounty.title)).toBeDefined()
  })

  it('Displays correct member', () => {
    renderModal()

    expect(screen.queryByText(useModal.modalData.entry.worker.handle)).toBeDefined()
  })

  it('Displays correct works', () => {
    renderModal()

    // TODO: better type for work
    useModal.modalData.entry.works.map((work: any) => expect(screen.queryByText(work.title)).toBeDefined())
  })

  it('Displays correct stake amount', () => {
    renderModal()

    expect(screen.queryByText(useModal.modalData.entry.stake)).toBeDefined()
  })

  describe('Transaction result', () => {
    beforeAll(() => {
      transaction = stubTransaction(api, 'api.tx.bounty.withdrawWorkEntry', 20)
    })

    it.only('Success', async () => {
      stubTransactionSuccess(transaction, 'bounty', 'WorkEntryWithdrawn')

      await renderModalAndProceedToTransaction()

      expect(screen.queryByText('common:success')).toBeDefined()
    })

    it('Error', async () => {
      stubTransactionFailure(transaction)

      await renderModalAndProceedToTransaction()

      expect(screen.queryByText('modals.withdrawWorkEntry.error')).toBeDefined()
    })
  })

  const renderModalAndProceedToAuthorization = async () => {
    renderModal()

    const button = await getButton('Withdraw')
    fireEvent.click(button)
  }

  const renderModalAndProceedToTransaction = async () => {
    await renderModalAndProceedToAuthorization()

    const button = await getButton('common:authorizeTransaction')
    fireEvent.click(button)
  }

  const renderModal = () => {
    render(
      <ModalContext.Provider value={useModal}>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <AccountsContext.Provider value={useAccounts}>
              <BalancesContext.Provider value={useBalances}>
                <WithdrawWorkEntryModal />
              </BalancesContext.Provider>
            </AccountsContext.Provider>
          </ApiContext.Provider>
        </MockKeyringProvider>
      </ModalContext.Provider>
    )
  }
})
