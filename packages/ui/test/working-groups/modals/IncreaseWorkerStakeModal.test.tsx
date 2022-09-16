import { cryptoWaitReady } from '@polkadot/util-crypto'
import { configure, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { IncreaseWorkerStakeModal } from '@/working-groups/modals/IncreaseWorkerStakeModal'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import {
  stubAccounts,
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockUseModalCall } from '../../setup'

configure({ testIdAttribute: 'id' })

describe('UI: IncreaseWorkerStakeModal', () => {
  const api = stubApi()
  let transfer: any

  beforeAll(async () => {
    await cryptoWaitReady()
    mockUseModalCall({
      modalData: {
        worker: {
          minStake: new BN(300),
          stake: new BN(100),
          roleAccount: alice.address,
          id: 'workerId',
          group: {
            id: 'storageWorkingGroup',
          },
          runtimeId: 88,
        },
      },
    })
    stubAccounts([alice, bob])
  })

  beforeEach(async () => {
    stubDefaultBalances()
    transfer = stubTransaction(api, 'api.tx.storageWorkingGroup.increaseStake')
  })

  describe('Form step', () => {
    it('Renders modal', async () => {
      renderModal()

      expect(screen.queryByText('Add stake')).toBeDefined()
    })

    it('Setup minimal stake', async () => {
      renderModal()

      const input = await getStakeInput()
      const submitButton = await getButton('Increase Stake')
      expect(input?.value).toBe('200')
      expect(submitButton).not.toBeDisabled()
    })

    it('Too low stake', async () => {
      renderModal()

      const input = await getStakeInput()
      const submitButton = await getButton('Increase Stake')

      fireEvent.change(input, { target: { value: '100' } })

      expect(submitButton).toBeDisabled()
    })

    it('Stake exceed balance', async () => {
      renderModal()

      const input = await getStakeInput()
      const submitButton = await getButton('Increase Stake')

      fireEvent.change(input, { target: { value: '10000' } })

      expect(submitButton).toBeDisabled()
    })
  })

  describe('Sign step', () => {
    it('Goes to sign modal', async () => {
      await renderModalAndProceedToSign()

      expect(screen.queryByText('modals.authorizeTransaction.title')).toBeDefined()
    })

    it('Transaction exceed balance', async () => {
      renderModal()

      const input = await getStakeInput()
      const submitButton = await getButton('Increase Stake')

      fireEvent.change(input, { target: { value: '1' } })
      fireEvent.click(submitButton)

      expect(submitButton).toBeDisabled()
    })

    describe('Success', () => {
      beforeEach(async () => {
        stubTransactionSuccess(transfer, 'storageWorkingGroup', 'StakeIncreased')
      })

      it('Renders transaction success', async () => {
        await renderModalAndProceedToSign()
        await signTransaction()

        expect(await screen.findByText('Success')).toBeDefined()
      })
    })

    describe('Failure', () => {
      it('Renders transaction failure', async () => {
        stubTransactionFailure(transfer)
        await renderModalAndProceedToSign()
        await signTransaction()

        expect(await screen.queryByText('Failure')).toBeDefined()
      })
    })
  })

  const renderModalAndProceedToSign = async () => {
    renderModal()

    const submitButton = await getButton('Increase Stake')
    fireEvent.click(submitButton)
  }

  const getStakeInput = () => {
    return screen.getByTestId<HTMLInputElement>('amount-input')
  }

  const signTransaction = async () => {
    const signButton = await getButton('Sign transaction and Stake')
    fireEvent.click(signButton)
  }

  const renderModal = () => {
    render(
      <MockApolloProvider>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <ModalContextProvider>
              <IncreaseWorkerStakeModal />
            </ModalContextProvider>
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockApolloProvider>
    )
  }
})
