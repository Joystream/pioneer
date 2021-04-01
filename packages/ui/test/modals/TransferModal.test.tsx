import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'
import { Account } from '../../src/common/types'
import { TransferModal } from '../../src/modals/TransferModal/TransferModal'
import { ApiContext } from '../../src/providers/api/context'
import { ModalContext } from '../../src/providers/modal/context'
import { selectAccount } from '../helpers/selectAccount'

import { alice, bob } from '../mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../mocks/providers'
import { setupMockServer } from '../mocks/server'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../mocks/transactions'

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: true,
  allAccounts: [],
}

jest.mock('../../src/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

describe.skip('UI: TransferModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    useAccounts.allAccounts.push(alice, bob)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  setupMockServer()

  const api = stubApi()
  let transfer: any

  const mockModalContext = (data: { from?: Account; to?: Account }) => ({
    hideModal: () => null,
    modalData: { ...data, iconName: 'TransferIcon' },
    modal: null,
    showModal: () => null,
  })

  beforeEach(async () => {
    stubDefaultBalances(api)
    transfer = stubTransaction(api, 'api.tx.balances.transfer')
  })

  it('Renders a modal', () => {
    const { findByText } = renderModal({})

    expect(findByText('Transfer tokens')).toBeDefined()
  })

  it('Enables value input', async () => {
    const { getByLabelText, getByRole } = renderModal({})

    const input = getByLabelText(/number of tokens/i) as HTMLInputElement
    const useHalfButton = getByRole('button', { name: /use half/i }) as HTMLButtonElement
    const useMaxButton = getByRole('button', { name: /use max/i }) as HTMLButtonElement

    expect(input.disabled).toBe(true)
    expect(useHalfButton.disabled).toBe(true)
    expect(useMaxButton.disabled).toBe(true)

    await selectAccount('From', 'alice')

    expect(input.disabled).toBe(false)
    expect(useHalfButton.disabled).toBe(false)
    expect(useMaxButton.disabled).toBe(false)
  })

  it('Renders an Authorize transaction step', async () => {
    const { getByLabelText, getByText, getByRole } = renderModal({ from: alice, to: bob })

    const input = getByLabelText('Number of tokens')
    expect((getByText('Transfer tokens') as HTMLButtonElement).disabled).toBe(true)

    await fireEvent.change(input, { target: { value: '50' } })

    const button = getByRole('button', { name: /transfer tokens/i }) as HTMLButtonElement
    expect(button.disabled).toBe(false)

    fireEvent.click(button)

    expect(getByText('Authorize Transaction')).toBeDefined()
    expect(getByText(/Transaction fee:/i)?.parentNode?.textContent).toMatch(/^Transaction fee:25/)
  })

  describe('Signed transaction', () => {
    function renderAndSign() {
      const rendered = renderModal({ from: alice, to: bob })
      const { getByLabelText, getByText } = rendered

      fireEvent.change(getByLabelText('Number of tokens'), { target: { value: '50' } })
      fireEvent.click(getByText('Transfer tokens') as HTMLButtonElement)
      fireEvent.click(getByText(/^sign transaction and transfer$/i))

      return rendered
    }

    it('Renders wait for transaction step', async () => {
      set(transfer, 'signAndSend', () => of(set({}, 'status.isReady', true)))

      const { getByText } = renderAndSign()

      expect(getByText('Pending transaction')).toBeDefined()
    })

    describe('Success', () => {
      beforeEach(() => {
        stubTransactionSuccess(transfer, [alice.address, bob.address, 50])
      })

      it('Renders transaction success', async () => {
        const { findByText } = renderAndSign()

        expect(await findByText('Success')).toBeDefined()
      })

      it('Calculates balances before & after', async () => {
        const { getAllByText } = renderAndSign()

        const [alice, bob] = getAllByText('Transferable balance before:')

        expect(alice?.parentNode?.textContent).toMatch(/Transferable balance before:1,075/)
        expect(bob?.parentNode?.textContent).toMatch(/Transferable balance before:950/)
        expect(alice?.parentNode?.textContent).toMatch(/Transferable balance after:1,000/)
        expect(bob?.parentNode?.textContent).toMatch(/Transferable balance after:1,000/)
      })
    })

    describe('Failure', () => {
      it('Renders transaction failure', async () => {
        stubTransactionFailure(transfer)
        const { findByText } = renderAndSign()

        expect(await findByText('Failure')).toBeDefined()
      })
    })
  })

  function renderModal(data: { from?: Account; to?: Account }) {
    return render(
      <MockKeyringProvider>
        <ApiContext.Provider value={api}>
          <MockQueryNodeProviders>
            <ModalContext.Provider value={mockModalContext(data)}>
              <TransferModal />
            </ModalContext.Provider>
          </MockQueryNodeProviders>
        </ApiContext.Provider>
      </MockKeyringProvider>
    )
  }
})
