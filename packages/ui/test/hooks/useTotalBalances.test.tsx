import BN from 'bn.js'
import { expect } from 'chai'
import React, { ReactNode } from 'react'
import { of } from 'rxjs'
import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { renderHook } from '@testing-library/react-hooks'
import set from 'lodash/set'

import { useTotalBalances } from '../../src/hooks/useTotalBalances'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'

describe('useTotalBalances', () => {
  const keyring = new Keyring()
  const useApi: UseApi = {
    isConnected: false,
    api: ({} as unknown) as ApiRx,
  }

  before(async () => {
    await cryptoWaitReady()
    keyring.loadAll({ isDevelopment: true })
  })

  beforeEach(() => {
    set(useApi, 'api.derive.balances.all', () =>
      of({
        freeBalance: new BN(100),
        lockedBalance: new BN(10),
      })
    )
  })

  function renderUseTotalBalances() {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <KeyringContext.Provider value={keyring}>
        <ApiContext.Provider value={useApi}>{children}</ApiContext.Provider>
      </KeyringContext.Provider>
    )
    return renderHook(() => useTotalBalances(), { wrapper })
  }

  it('Returns zero balances when API not ready', () => {
    const { result } = renderUseTotalBalances()

    expect(result.current).to.be.deep.equal({
      total: new BN(0),
      transferable: new BN(0),
      locked: new BN(0),
      recoverable: new BN(0),
    })
  })

  it('Returns total balances', () => {
    useApi.isConnected = true

    const { result } = renderUseTotalBalances()

    expect(result.current).to.be.deep.equal({
      total: new BN(880),
      transferable: new BN(800),
      locked: new BN(80),
      recoverable: new BN(0),
    })
  })
})
