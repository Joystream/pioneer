import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { BountyCancelModal } from '@/bounty/modals/CancelBountyModal'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import bounties from '@/mocks/data/raw/bounties.json'
import { getMember } from '@/mocks/helpers'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction, stubTransactionFailure, stubTransactionSuccess } from '../../_mocks/transactions'
import { mockDefaultBalance } from '../../setup'

const bounty = bounties[0]
const creator = getMember('alice')

const defaultBalance = {
  ...mockDefaultBalance,
  transferable: new BN(1000),
}

describe('UI: BountyCancelModal', () => {
  const api = stubApi()

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: {
      bounty: { ...bounty },
      creator: { ...creator },
    },
  }

  const useBalances = {
    [getMember('bob').controllerAccount]: { ...defaultBalance },
    [getMember('alice').controllerAccount]: defaultBalance,
  }

  let transaction: any
  let useAccounts: UseAccounts

  beforeAll(() => {
    transaction = stubTransaction(api, 'api.tx.bounty.cancelBounty', 100)

    useAccounts = {
      isLoading: false,
      hasAccounts: true,
      allAccounts: [bob, alice],
    }
  })

  it('Renders', async () => {
    renderModal()

    expect(await screen.queryByText('modals.bountyCancel.title')).toBeDefined()
    expect(await screen.queryByText('modals.bountyCancel.authorization.button')).toBeDefined()
  })

  it('Displays correct bounty', () => {
    renderModal()

    expect(screen.queryByText(useModal.modalData.bounty.title)).toBeDefined()
  })

  it('Displays correct member', () => {
    renderModal()

    expect(screen.queryByText(useModal.modalData.creator.handle)).toBeDefined()
  })

  describe('AuthorizeModal', () => {
    it('Renders', async () => {
      await renderModalAndProceedToAuthorization()

      expect(screen.queryByText('modals.bounty.cancel.authorization.title'))
    })

    it('Displays correct fee', async () => {
      await renderModalAndProceedToAuthorization()

      const valueContainer = screen.getByText('modals.transactionFee.label')?.nextSibling

      expect(valueContainer?.textContent).toBe('100')
    })

    it('Enable button on sufficient balance', async () => {
      await renderModalAndProceedToAuthorization()

      expect(await getButton('common:authorizeTransaction')).not.toBeDisabled()
    })

    it('Disable button on insufficient balance', async () => {
      stubTransaction(api, 'api.tx.bounty.cancelBounty', 99999)
      await renderModalAndProceedToAuthorization()

      expect(await getButton('common:authorizeTransaction')).toBeDisabled()
    })
  })

  describe('Transaction result', () => {
    beforeAll(() => {
      transaction = stubTransaction(api, 'api.tx.bounty.cancelBounty', 20)
    })

    it('Success', async () => {
      stubTransactionSuccess(transaction, 'bounty', 'BountyCanceled')

      await renderModalAndProceedToTransaction()

      expect(screen.queryByText('common:success')).toBeDefined()
    })

    it('Error', async () => {
      stubTransactionFailure(transaction)

      await renderModalAndProceedToTransaction()

      expect(screen.queryByText('modals.bountyCancel.error')).toBeDefined()
    })
  })

  const renderModalAndProceedToAuthorization = async () => {
    renderModal()

    const button = await getButton('modals.bountyCancel.authorization.button')
    fireEvent.click(button)
  }

  const renderModalAndProceedToTransaction = async () => {
    await renderModalAndProceedToAuthorization()

    const button = await getButton('common:authorizeTransaction')
    fireEvent.click(button)
  }

  const renderModal = () => {
    render(
      <MockApolloProvider>
        <ModalContext.Provider value={useModal}>
          <MockKeyringProvider>
            <ApiContext.Provider value={api}>
              <AccountsContext.Provider value={useAccounts}>
                <BalancesContext.Provider value={useBalances}>
                  <BountyCancelModal />
                </BalancesContext.Provider>
              </AccountsContext.Provider>
            </ApiContext.Provider>
          </MockKeyringProvider>
        </ModalContext.Provider>
      </MockApolloProvider>
    )
  }
})
