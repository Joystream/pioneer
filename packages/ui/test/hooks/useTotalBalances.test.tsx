import { cryptoWaitReady } from '@polkadot/util-crypto'
import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import set from 'lodash/set'
import React, { ReactNode } from 'react'
import { of } from 'rxjs'

import { useTotalBalances } from '../../src/accounts/hooks/useTotalBalances'
import { AccountsContextProvider } from '../../src/app/providers/accounts/provider'
import { ApiContext } from '../../src/app/providers/api/context'
import { MockKeyringProvider } from '../mocks/providers'
import { stubApi } from '../mocks/transactions'

describe('useTotalBalances', () => {
  const useApi = stubApi()

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  beforeEach(() => {
    set(useApi, 'api.derive.balances.all', () =>
      of({
        availableBalance: new BN(100),
        lockedBalance: new BN(10),
      })
    )
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

  it('Returns zero balances when API not ready', () => {
    useApi.isConnected = false
    const { result } = renderUseTotalBalances()

    expect(result.current).toEqual({
      total: new BN(0),
      transferable: new BN(0),
      locked: new BN(0),
      recoverable: new BN(0),
    })
  })

  it('Returns total balances', () => {
    useApi.isConnected = true

    const { result } = renderUseTotalBalances()

    expect(result.current).toEqual({
      total: new BN(880),
      transferable: new BN(800),
      locked: new BN(80),
      recoverable: new BN(0),
    })
  })
})
