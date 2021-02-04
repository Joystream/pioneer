import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import React, { ReactNode } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import { expect } from 'chai'

import { useTotalBalances } from '../../src/hooks/useTotalBalances'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'

describe('useTotalBalances', () => {
  const keyring = new Keyring()

  before(async () => {
    await cryptoWaitReady()
    keyring.loadAll({ isDevelopment: true })
  })

  it('Returns zero balances when no accounts', () => {
    const useApi: UseApi = {
      isConnected: false,
      api: ({} as unknown) as ApiRx,
    }

    const wrapper = ({ children }: { children: ReactNode }) => (
      <KeyringContext.Provider value={keyring}>
        <ApiContext.Provider value={useApi}>{children}</ApiContext.Provider>
      </KeyringContext.Provider>
    )
    const { result } = renderHook(() => useTotalBalances(), { wrapper })

    expect(result.current).to.be.deep.equal({
      total: new BN(0),
      transferable: new BN(0),
      locked: new BN(0),
      recoverable: new BN(0),
    })
  })
})
