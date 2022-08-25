import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { BountyCancelModal } from '@/bounty/modals/CancelBountyModal'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import bounties from '@/mocks/data/raw/bounties.json'
import { getMember } from '@/mocks/helpers'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import {
  stubAccounts,
  stubApi,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockUseModalCall } from '../../setup'

const bounty = bounties[0]
const creator = getMember('alice')

describe('UI: BountyCancelModal', () => {
  const api = stubApi()
  let transaction: any
  const modalData = {
    bounty: { ...bounty },
    creator: { ...creator },
  }

  beforeAll(() => {
    mockUseModalCall({ modalData })
    transaction = stubTransaction(api, 'api.tx.bounty.cancelBounty', 100)
    stubAccounts([alice, bob])
  })

  it('Renders', async () => {
    renderModal()

    expect(await screen.queryByText('modals.bountyCancel.title')).toBeDefined()
    expect(await screen.queryByText('modals.bountyCancel.authorization.button')).toBeDefined()
  })

  it('Displays correct bounty', () => {
    renderModal()

    expect(screen.queryByText(modalData.bounty.title)).toBeDefined()
  })

  it('Displays correct member', () => {
    renderModal()

    expect(screen.queryByText(modalData.creator.handle)).toBeDefined()
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
        <ModalContextProvider>
          <MockKeyringProvider>
            <ApiContext.Provider value={api}>
              <BountyCancelModal />
            </ApiContext.Provider>
          </MockKeyringProvider>
        </ModalContextProvider>
      </MockApolloProvider>
    )
  }
})
