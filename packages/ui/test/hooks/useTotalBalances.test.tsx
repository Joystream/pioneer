import { beforeAll, expect } from '@jest/globals'
import { ApiRx } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import set from 'lodash/set'
import React, { ReactNode } from 'react'
import { of } from 'rxjs'

import { useTotalBalances } from '../../src/hooks/useTotalBalances'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { MockKeyringProvider } from '../helpers/providers'

describe('useTotalBalances', () => {
  const useApi: UseApi = {
    isConnected: false,
    api: ({} as unknown) as ApiRx,
  }

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
        <ApiContext.Provider value={useApi}>{children}</ApiContext.Provider>
      </MockKeyringProvider>
    )
    return renderHook(() => useTotalBalances(), { wrapper })
  }

  it('Returns zero balances when API not ready', () => {
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
