import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import React, { ReactNode } from 'react'

import { useTotalBalances } from '@/accounts/hooks/useTotalBalances'
import { AccountsContextProvider } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/common/providers/api/context'

import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubBalances } from '../../_mocks/transactions'

describe('useTotalBalances', () => {
  const useApi = stubApi()

  jest.useFakeTimers()

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  beforeEach(() => {
    stubBalances(useApi, { available: 100, locked: 10 })
  })

  it('Returns zero balances when API not ready', () => {
    useApi.isConnected = false
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
      locked: new BN(80),
      locks: [],
      recoverable: new BN(0),
      total: new BN(880),
      transferable: new BN(800),
    })
  })

  function renderUseTotalBalances() {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockKeyringProvider>
        <AccountsContextProvider>
          <ApiContext.Provider value={useApi}>{children}</ApiContext.Provider>
        </AccountsContextProvider>
      </MockKeyringProvider>
    )
    return renderHook(() => useTotalBalances(), { wrapper })
  }
})
