import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { TransferModal } from '@/accounts/modals/TransferModal'
import { Account } from '@/accounts/types'
import { ApiContext } from '@/api/providers/context'
import { createType } from '@/common/model/createType'
import { ModalContextProvider } from '@/common/providers/modal/provider'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubAccounts,
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockUseModalCall } from '../../setup'

interface ModalData {
  from?: Account
  to?: Account
  minValue?: BN
  maxValue?: BN
  initialValue?: BN
  transactionFactory?: (amount: BN) => SubmittableExtrinsic<'rxjs', ISubmittableResult>
}

describe('UI: TransferModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    stubAccounts([alice, bob])
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  setupMockServer()

  const api = stubApi()
  let transfer: any

  beforeEach(async () => {
    stubDefaultBalances()
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

  it('Disables when under min value', async () => {
    renderModal({ minValue: new BN(500), to: alice, from: bob })
    const submitButton = await getButton(/transfer tokens/i)
    await fillAmount(100)

    expect(submitButton).toBeDisabled()

    await fillAmount(600)

    expect(submitButton).not.toBeDisabled()
  })

  it('Disables when exceeds max value', async () => {
    renderModal({ maxValue: new BN(500), to: alice, from: bob })

    const submitButton = await getButton(/transfer tokens/i)
    await fillAmount(100)

    expect(submitButton).not.toBeDisabled()

    await fillAmount(600)

    expect(submitButton).toBeDisabled()
  })

  it('Sets up initial value', async () => {
    // renderModal({ initialValue: new BN(500 * DECIMAL_NUMBER), to: alice, from: bob })
    renderModal({ initialValue: new BN(500), to: alice, from: bob })

    const input = await screen.findByLabelText<HTMLInputElement>(/number of tokens/i)

    expect(input?.value).toBe('500')
  })

  it('Renders an Authorize transaction step', async () => {
    renderModal({ from: alice, to: bob })

    expect(await getButton('Transfer tokens')).toBeDisabled()
    await fillAmount(1)

    const button = await getButton(/transfer tokens/i)
    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    expect(await screen.findByText(/modals.authorizeTransaction.title/i)).toBeDefined()
    expect((await screen.findByText(/modals.transactionFee.label/i))?.parentNode?.textContent).toMatch(
      /^modals.transactionFee.label25/
    )
  })

  it('Calls transaction from factory', async () => {
    const stakeTransaction = stubTransaction(api, 'api.tx.storageWorkingGroup.increaseStake') as SubmittableExtrinsic<
      'rxjs',
      ISubmittableResult
    >
    const factory = jest.fn(() => stakeTransaction)
    stubTransactionSuccess(stakeTransaction, 'storageWorkingGroup', 'StakeIncreased', [])

    renderModal({ from: alice, to: bob, transactionFactory: factory })

    expect(await getButton('Transfer tokens')).toBeDisabled()
    await fillAmount(100)

    const button = await getButton(/transfer tokens/i)

    expect(button).not.toBeDisabled()
    fireEvent.click(button)

    expect(await screen.findByText(/modals.authorizeTransaction.title/i)).toBeDefined()

    const signButton = await getButton(/Sign transaction and Transfer/i)
    fireEvent.click(signButton)

    expect(factory).toBeCalledWith(new BN(100))
  })

  describe('Signed transaction', () => {
    async function renderAndSign() {
      renderModal({ from: alice, to: bob })

      await fillAmount(50)

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

  const fillAmount = async (value: number) => {
    const input = await screen.findByLabelText('Number of tokens')
    fireEvent.change(input, { target: { value: value } })
  }

  function renderModal(modalData: ModalData) {
    mockUseModalCall({ modalData })
    return render(
      <MockKeyringProvider>
        <ApiContext.Provider value={api}>
          <MockQueryNodeProviders>
            <ModalContextProvider>
              <TransferModal />
            </ModalContextProvider>
          </MockQueryNodeProviders>
        </ApiContext.Provider>
      </MockKeyringProvider>
    )
  }
})
