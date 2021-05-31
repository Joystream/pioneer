import { cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import React, { ReactNode } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { AccountsContextProvider } from '@/accounts/providers/accounts/provider'
import { Account, AddressToBalanceMap, Balances } from '@/accounts/types'
import { ApiContext } from '@/common/providers/api/context'

import { alice, aliceStash, bob } from '../../_mocks/keyring'
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

let balance: Balances | null = null

const useBalance = {
  useBalance: () => balance,
}

jest.mock('../../../src/accounts/hooks/useBalance', () => useBalance)

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
    useAccounts.allAccounts.push(alice, aliceStash, bob)
  })

  afterEach(cleanup)

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
    balance = {
      total: new BN(1000),
      locked: new BN(0),
      transferable: new BN(1000),
      recoverable: new BN(0),
      locks: [],
    }
    balances = {
      [alice.address]: balance,
      [aliceStash.address]: {
        total: new BN(1000),
        locked: new BN(0),
        transferable: new BN(1000),
        recoverable: new BN(0),
        locks: [],
      },
      [bob.address]: {
        total: new BN(1000),
        locked: new BN(0),
        transferable: new BN(1000),
        recoverable: new BN(0),
        locks: [],
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
    balance = {
      total: new BN(10),
      locked: new BN(0),
      transferable: new BN(10),
      recoverable: new BN(0),
      locks: [],
    }
    balances = {
      [alice.address]: balance,
      [aliceStash.address]: {
        total: new BN(50),
        locked: new BN(0),
        transferable: new BN(50),
        recoverable: new BN(0),
        locks: [],
      },
      [bob.address]: {
        total: new BN(20),
        locked: new BN(20),
        transferable: new BN(0),
        recoverable: new BN(0),
        locks: [],
      },
    }
    const { result } = renderUseTotalBalances(1000)
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('Not enough funds with transferrable funds', () => {
    balance = {
      total: new BN(0),
      locked: new BN(0),
      transferable: new BN(0),
      recoverable: new BN(0),
      locks: [],
    }
    balances = {
      [alice.address]: balance,
      [aliceStash.address]: {
        total: new BN(900),
        locked: new BN(0),
        transferable: new BN(900),
        recoverable: new BN(0),
        locks: [],
      },
      [bob.address]: {
        total: new BN(100),
        locked: new BN(0),
        transferable: new BN(100),
        recoverable: new BN(0),
        locks: [],
      },
    }
    const { result } = renderUseTotalBalances(1000)
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: [aliceStash, bob],
      accountsWithLockedFounds: null,
    })
  })

  it('Not enough funds with transferrable to an account with locked founds', () => {
    balance = {
      total: new BN(50),
      locked: new BN(0),
      transferable: new BN(50),
      recoverable: new BN(0),
      locks: [],
    }
    balances = {
      [alice.address]: balance,
      [aliceStash.address]: {
        total: new BN(250),
        locked: new BN(200),
        transferable: new BN(50),
        recoverable: new BN(0),
        locks: [],
      },
      [bob.address]: {
        total: new BN(700),
        locked: new BN(400),
        transferable: new BN(300),
        recoverable: new BN(0),
        locks: [],
      },
    }
    const { result } = renderUseTotalBalances(1000)
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: null,
      accountsWithLockedFounds: {
        [bob.address]: [aliceStash],
        [aliceStash.address]: [bob],
        [alice.address]: [aliceStash, bob],
      },
    })
  })
})
