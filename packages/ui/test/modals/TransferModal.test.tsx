import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'
import { Account } from '../../src/common/types'
import { TransferModal } from '../../src/modals/TransferModal'
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

describe('UI: TransferModal', () => {
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
    modalData: data,
    modal: null,
    showModal: () => null,
  })

  beforeEach(async () => {
    stubDefaultBalances(api)
    transfer = stubTransaction(api, 'api.tx.balances.transfer')
  })

  it('Renders a modal', async () => {
    const { findByRole } = renderModal({})

    expect(await findByRole('heading', { name: 'Transfer tokens' })).toBeDefined()
  })

  it('Enables value input', async () => {
    const { findByLabelText, findByRole } = renderModal({})

    const input = await findByLabelText(/number of tokens/i)
    const useHalfButton = await findByRole('button', { name: /use half/i })
    const useMaxButton = await findByRole('button', { name: /use max/i })

    expect(input).toBeDisabled()
    expect(useHalfButton).toBeDisabled()
    expect(useMaxButton).toBeDisabled()

    await selectAccount('From', 'alice')

    expect(input).not.toBeDisabled()
    expect(useHalfButton).not.toBeDisabled()
    expect(useMaxButton).not.toBeDisabled()
  })

  it('Renders an Authorize transaction step', async () => {
    const { findByLabelText, findByText, findByRole } = renderModal({ from: alice, to: bob })

    const input = await findByLabelText('Number of tokens')
    expect(await findByText('Transfer tokens')).toBeDisabled()

    await fireEvent.change(input, { target: { value: '50' } })

    const button = await findByRole('button', { name: /transfer tokens/i })
    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    expect(await findByText('Authorize Transaction')).toBeDefined()
    expect((await findByText(/Transaction fee:/i))?.parentNode?.textContent).toMatch(/^Transaction fee:25/)
  })

  describe('Signed transaction', () => {
    async function renderAndSign() {
      const rendered = renderModal({ from: alice, to: bob })
      const { findByLabelText, findByText } = rendered

      fireEvent.change(await findByLabelText('Number of tokens'), { target: { value: '50' } })
      fireEvent.click(await findByText('Transfer tokens'))
      fireEvent.click(await findByText(/^sign transaction and transfer$/i))

      return rendered
    }

    it.skip('Renders wait for transaction step', async () => {
      set(transfer, 'signAndSend', () => of(set({}, 'status.isReady', true)))

      const { findByText } = await renderAndSign()

      expect(await findByText('Pending transaction')).toBeDefined()
    })

    describe('Success', () => {
      beforeEach(() => {
        stubTransactionSuccess(transfer, [alice.address, bob.address, 50])
      })

      it('Renders transaction success', async () => {
        const { findByText } = await renderAndSign()

        expect(await findByText('Success')).toBeDefined()
      })

      it('Calculates balances before & after', async () => {
        const { getAllByText } = await renderAndSign()

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
        const { findByText } = await renderAndSign()

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
