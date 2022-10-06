import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { useMachine } from '@xstate/react'
import { BaseDotsamaWallet } from 'injectweb3-connect'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { ApiContext } from '@/api/providers/context'
import { ButtonPrimary } from '@/common/components/buttons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { transactionMachine } from '@/common/model/machines'
import { TransactionContextProvider } from '@/common/providers/transaction/provider'

import { getButton } from '../../_helpers/getButton'
import { alice } from '../../_mocks/keyring'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction, stubTransactionPending, stubTransactionSuccess } from '../../_mocks/transactions'

describe('UI: TransactionButton', () => {
  const api = stubApi()
  const txPath = 'api.tx.referendum.releaseVoteStake'
  let tx: any

  stubTransaction(api, txPath)

  const useAccounts = {
    isLoading: false,
    allAccounts: [{ ...alice, name: 'Alice Account' }],
    hasAccounts: true,
    wallet: new BaseDotsamaWallet({ title: 'ExtraWallet' }),
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

    // Buttons gets disabled eventually
    await waitFor(async () => {
      expect(await getButton('Start new transaction')).not.toBeDisabled()
    })
  })

  const TestButton = () => {
    const [, , service] = useMachine(transactionMachine)
    const { sign } = useSignAndSendTransaction({
      transaction: tx,
      signer: alice.address,
      service,
    })

    return (
      <ButtonPrimary size="large" onClick={sign}>
        Sign and recover stake
      </ButtonPrimary>
    )
  }

  const renderComponents = () =>
    render(
      <MockKeyringProvider>
        <MockApolloProvider>
          <AccountsContext.Provider value={useAccounts}>
            <ApiContext.Provider value={api}>
              <TransactionContextProvider>
                <TestButton />
                <TransactionButton style="primary" size="large">
                  Start new transaction
                </TransactionButton>
              </TransactionContextProvider>
            </ApiContext.Provider>
          </AccountsContext.Provider>
        </MockApolloProvider>
      </MockKeyringProvider>
    )
})
