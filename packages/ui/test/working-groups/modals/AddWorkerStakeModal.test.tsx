import { cryptoWaitReady } from '@polkadot/util-crypto'
import { configure, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Account } from '@/accounts/types'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { AddWorkerStakeModal } from '@/working-groups/modals/AddStakeModal'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider } from '../../_mocks/providers'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

configure({ testIdAttribute: 'id' })

const useMyAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: true,
  allAccounts: [],
}

jest.mock('@/accounts/hooks/useMyAccounts', () => {
  return {
    useMyAccounts: () => useMyAccounts,
  }
})

describe('UI: AddStakeModal', () => {
  const api = stubApi()
  let transfer: any

  const mockModalContext = {
    hideModal: jest.fn(),
    modalData: {
      worker: {
        minStake: 300,
        stake: 100,
        roleAccount: alice.address,
        id: 'workerId',
        group: {
          id: 'storageWorkingGroup',
        },
        runtimeId: 88,
      },
    },
    modal: null,
    showModal: jest.fn(),
  }

  beforeAll(async () => {
    await cryptoWaitReady()
    useMyAccounts.allAccounts.push(alice, bob)
  })

  beforeEach(async () => {
    stubDefaultBalances(api)
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
      const submitButton = await getButton('Add Stake')

      expect(input?.value).toBe('200')
      expect(submitButton).not.toBeDisabled()
    })

    it('Too low stake', async () => {
      renderModal()

      const input = await getStakeInput()
      const submitButton = await getButton('Add Stake')

      fireEvent.change(input, { target: { value: '100' } })

      expect(submitButton).toBeDisabled()
    })

    it('Stake exceed balance', async () => {
      renderModal()

      const input = await getStakeInput()
      const submitButton = await getButton('Add Stake')

      fireEvent.change(input, { target: { value: '10000' } })

      expect(submitButton).toBeDisabled()
    })
  })

  describe('Sign step', () => {
    it('Goes to sign modal', async () => {
      await renderModalAndProceedToSign()

      expect(screen.queryByText('Authorize transaction')).toBeDefined()
    })

    it('Transaction exceed balance', async () => {
      renderModal()

      const input = await getStakeInput()
      const submitButton = await getButton('Add Stake')

      fireEvent.change(input, { target: { value: '1000' } })
      fireEvent.click(submitButton)

      const signButton = await getButton('Sign transaction and Stake')

      expect(signButton).toBeDisabled()
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

    const submitButton = await getButton('Add Stake')
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
      <MockKeyringProvider>
        <ApiContext.Provider value={api}>
          <ModalContext.Provider value={mockModalContext}>
            <AddWorkerStakeModal />
          </ModalContext.Provider>
        </ApiContext.Provider>
      </MockKeyringProvider>
    )
  }
})
