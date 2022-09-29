import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import React, { ReactNode } from 'react'

import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'

import { createBalance } from '../../_mocks/chainTypes'
import { alice, aliceStash } from '../../_mocks/keyring'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubAccounts, stubBalances } from '../../_mocks/transactions'
import { mockedMyBalances, zeroBalance } from '../../setup'

describe('useMyTotalBalances', () => {
  jest.useFakeTimers()

  beforeAll(async () => {
    stubAccounts([alice, aliceStash])
    await cryptoWaitReady()
  })

  it('Returns zero balances when API not ready', () => {
    mockedMyBalances.mockReturnValue(undefined)

    const { result } = renderUseTotalBalances()

    expect(result.current).toEqual({
      ...zeroBalance,
    })
  })

  it('Returns total balances', () => {
    stubBalances({ available: 100, locked: 10, lockId: 'Bound Staking Account' })

    const { result } = renderUseTotalBalances()

    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(result.current).toEqual({
      ...zeroBalance,
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
    const wrapper = ({ children }: { children: ReactNode }) => <MockKeyringProvider>{children}</MockKeyringProvider>
    return renderHook(() => useMyTotalBalances(), { wrapper })
  }
})
