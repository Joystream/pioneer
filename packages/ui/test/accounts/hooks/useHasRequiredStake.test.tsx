import { cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import React, { ReactNode } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { AccountsContextProvider } from '@/accounts/providers/accounts/provider'
import { Account, AddressToBalanceMap } from '@/accounts/types'
import { ApiContext } from '@/common/providers/api/context'

import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi } from '../../_mocks/transactions'

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: true,
  allAccounts: [],
}

jest.mock('../../../src/accounts/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

let balances: AddressToBalanceMap = {}

const useBalances = {
  useBalances: () => balances,
}

jest.mock('../../../src/accounts/hooks/useBalances', () => useBalances)

describe('useHasRequiredStake', () => {
  const useApi = stubApi()

  jest.useFakeTimers()

  beforeAll(async () => {
    useAccounts.hasAccounts = true
    useAccounts.allAccounts.push(alice, aliceStash, bob, bobStash)
  })

  afterEach(cleanup)

  const zeroBalance = {
    total: new BN(0),
    locked: new BN(0),
    transferable: new BN(0),
    recoverable: new BN(0),
    locks: [],
  }

  function renderUseTotalBalances(stake: number) {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockKeyringProvider>
        <AccountsContextProvider>
          <ApiContext.Provider value={useApi}>{children}</ApiContext.Provider>
        </AccountsContextProvider>
      </MockKeyringProvider>
    )
    return renderHook(() => useHasRequiredStake(stake), { wrapper })
  }

  it('Member has enough founds', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(1000),
      },
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(1000),
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(1000),
      },
    }
    const { result } = renderUseTotalBalances(1000)
    expect(result.current).toStrictEqual({
      hasRequiredStake: true,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('Member has not enough founds', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(10),
        transferable: new BN(10),
      },
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(50),
        transferable: new BN(50),
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(20),
        locked: new BN(20),
      },
    }
    const { result } = renderUseTotalBalances(1000)
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('Not enough funds with transferable funds', () => {
    balances = {
      [alice.address]: zeroBalance,
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(900),
        transferable: new BN(900),
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(100),
        transferable: new BN(100),
      },
    }
    const { result } = renderUseTotalBalances(1000)
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: [aliceStash, bob],
      accountsWithLockedFounds: null,
    })
  })

  it('Not enough funds with transferable to an account with locked founds', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(450),
        transferable: new BN(450),
      },
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(800),
        locked: new BN(600),
        transferable: new BN(200),
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(600),
        locked: new BN(600),
      },
      [bobStash.address]: {
        ...zeroBalance,
        total: new BN(500),
        locked: new BN(500),
      },
    }
    const { result } = renderUseTotalBalances(1000)
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: null,
      accountsWithLockedFounds: {
        [bob.address]: [alice, aliceStash],
        [bobStash.address]: [alice, aliceStash],
        [aliceStash.address]: [alice],
      },
    })
  })
})
