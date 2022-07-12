import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import React, { ReactNode } from 'react'

import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'
import { AccountsContext } from '@/accounts/providers/accounts/context'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { ApiContext } from '@/common/providers/api/context'
import { UseApi } from '@/common/providers/api/provider'

import { createBalance } from '../../_mocks/chainTypes'
import { alice, aliceStash } from '../../_mocks/keyring'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubBalances } from '../../_mocks/transactions'

describe('useMyTotalBalances', () => {
  let useApi: UseApi = stubApi()

  jest.useFakeTimers()

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  beforeEach(() => {
    stubBalances(useApi, { available: 100, locked: 10, lockId: 'Bound Staking Account' })
  })

  it('Returns zero balances when API not ready', () => {
    useApi = {
      connectionState: 'connecting',
      isConnected: false,
      api: undefined,
    }
    const { result } = renderUseTotalBalances()

    expect(result.current).toEqual({
      total: new BN(0),
      transferable: new BN(0),
      locked: new BN(0),
      recoverable: new BN(0),
      locks: [],
    })
  })

  it('Returns total balances', () => {
    useApi.isConnected = true

    const { result } = renderUseTotalBalances()

    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(result.current).toEqual({
      locked: new BN(20),
      locks: new Array(2).fill({
        amount: createBalance(10),
        type: 'Bound Staking Account',
      }),
      recoverable: new BN(0),
      total: new BN(220),
      transferable: new BN(200),
    })
  })

  function renderUseTotalBalances() {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockKeyringProvider>
        <AccountsContext.Provider
          value={{
            isLoading: false,
            allAccounts: [
              {
                address: alice.address,
                name: 'Alice',
              },
              {
                address: aliceStash.address,
                name: 'AliceStash',
              },
            ],
            hasAccounts: true,
          }}
        >
          <ApiContext.Provider value={useApi}>
            <BalancesContextProvider>{children}</BalancesContextProvider>
          </ApiContext.Provider>
        </AccountsContext.Provider>
      </MockKeyringProvider>
    )
    return renderHook(() => useMyTotalBalances(), { wrapper })
  }
})
