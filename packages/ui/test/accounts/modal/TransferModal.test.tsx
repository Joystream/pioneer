import { createType } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { TransferModal } from '@/accounts/modals/TransferModal'
import { Account, Balances } from '@/accounts/types'
import { BN_ZERO } from '@/common/constants'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { alice, bob } from '../../_mocks/keyring'
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

const useMyBalances: { [k: string]: Balances } = {}

jest.mock('@/accounts/hooks/useMyAccounts', () => {
  return {
    useMyAccounts: () => useMyAccounts,
  }
})

jest.mock('@/accounts/hooks/useMyBalances', () => ({
  useMyBalances: () => useMyBalances,
}))

const BN_BALANCE = new BN(1000)

describe('UI: TransferModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    useMyAccounts.allAccounts.push(alice, bob)
    useMyBalances[alice.address] = {
      total: BN_BALANCE,
      locked: BN_ZERO,
      recoverable: BN_BALANCE,
      transferable: BN_BALANCE,
      locks: [],
    }
    useMyBalances[bob.address] = {
      total: BN_BALANCE,
      locked: BN_ZERO,
      recoverable: BN_BALANCE,
      transferable: BN_BALANCE,
      locks: [],
    }
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
    renderModal({})

    expect(await screen.findByRole('heading', { name: 'Transfer tokens' })).toBeDefined()
  })

  it('Enables value input', async () => {
    renderModal({})

    const input = await screen.findByLabelText(/number of tokens/i)
    const useHalfButton = await getButton(/use half/i)

    expect(input).toBeDisabled()
    expect(useHalfButton).toBeDisabled()

    await selectFromDropdown('From', 'alice')

    expect(input).not.toBeDisabled()
    expect(useHalfButton).not.toBeDisabled()
  })

  it('Renders an Authorize transaction step', async () => {
    renderModal({ from: alice, to: bob })

    const input = await screen.findByLabelText('Number of tokens')
    expect(await getButton('Transfer tokens')).toBeDisabled()

    fireEvent.change(input, { target: { value: '1' } })

    const button = await getButton(/transfer tokens/i)
    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    expect(await screen.findByText(/Authorize transaction/i)).toBeDefined()
    expect((await screen.findByText(/Transaction fee:/i))?.parentNode?.textContent).toMatch(/^Transaction fee:25/)
  })

  describe('Signed transaction', () => {
    async function renderAndSign() {
      renderModal({ from: alice, to: bob })

      fireEvent.change(await screen.findByLabelText('Number of tokens'), { target: { value: '50' } })

      await act(async () => {
        fireEvent.click(await screen.findByText('Transfer tokens'))
        fireEvent.click(await screen.findByText(/^sign transaction and transfer$/i))
      })
    }

    describe('Success', () => {
      beforeEach(() => {
        stubTransactionSuccess(transfer, 'balances', 'Transfer', [
          createType('AccountId', alice.address),
          createType('AccountId', bob.address),
          createType('Balance', 50),
        ])
      })

      it('Renders transaction success', async () => {
        await renderAndSign()

        expect(await screen.findByText('Success')).toBeDefined()
      })

      it('Calculates balances before & after', async () => {
        await renderAndSign()

        expect(await screen.findByText('Success')).toBeDefined()
        const [alice, bob] = screen.getAllByText('Transferable balance before:')

        expect(alice?.parentNode?.textContent).toMatch(/Transferable balance before:1,075/)
        expect(bob?.parentNode?.textContent).toMatch(/Transferable balance before:950/)
        expect(alice?.parentNode?.textContent).toMatch(/Transferable balance after:1,000/)
        expect(bob?.parentNode?.textContent).toMatch(/Transferable balance after:1,000/)
      })
    })

    describe('Failure', () => {
      it('Renders transaction failure', async () => {
        stubTransactionFailure(transfer)
        await renderAndSign()

        expect(await screen.findByText('Failure')).toBeDefined()
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
