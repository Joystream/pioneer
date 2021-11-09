import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { TransactionContextProvider } from '@/common/providers/transaction/provider'

import { getButton } from '../../_helpers/getButton'
import { alice } from '../../_mocks/keyring'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction, stubTransactionPending, stubTransactionSuccess } from '../../_mocks/transactions'

describe('UI: TransactionButton', () => {
  const api = stubApi()
  const txPath = 'api.tx.referendum.releaseVoteStake'
  let tx: any

  stubTransaction(api, txPath)

  const modalData = {
    address: alice.address,
    stake: new BN(200000),
  }

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData,
  }

  const useAccounts = {
    isLoading: false,
    allAccounts: [{ ...alice, name: 'Alice Account' }],
    hasAccounts: true,
  }

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  beforeEach(() => {
    tx = stubTransaction(api, txPath, 10)
  })

  it('Button is active', async () => {
    renderComponents()
    expect(await getButton('Start new transaction')).not.toBeDisabled()
  })

  it('Button is disabled when there is a pending transaction', async () => {
    stubTransactionPending(tx)
    renderComponents()
    expect(await getButton('Start new transaction')).not.toBeDisabled()

    await act(async () => {
      // use a real transaction modal to begin a transaction
      fireEvent.click(await getButton('Sign and recover stake'))
    })

    expect(await getButton('Start new transaction')).toBeDisabled()
  })

  it('Button is active after transaction ended successfully', async () => {
    renderComponents()
    expect(await getButton('Start new transaction')).not.toBeDisabled()

    stubTransactionSuccess(tx, 'referendum', 'StakeReleased')

    await act(async () => {
      fireEvent.click(await getButton('Sign and recover stake'))
    })

    expect(await getButton('Start new transaction')).not.toBeDisabled()
  })

  const renderComponents = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockKeyringProvider>
          <AccountsContext.Provider value={useAccounts}>
            <ApiContext.Provider value={api}>
              <TransactionContextProvider>
                <TransactionButton style="primary" size="large">
                  Start new transaction
                </TransactionButton>
              </TransactionContextProvider>
            </ApiContext.Provider>
          </AccountsContext.Provider>
        </MockKeyringProvider>
      </ModalContext.Provider>
    )
})
