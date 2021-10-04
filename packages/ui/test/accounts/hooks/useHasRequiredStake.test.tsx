import { cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import React, { ReactNode } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { AccountsContextProvider } from '@/accounts/providers/accounts/provider'
import { Account, AddressToBalanceMap, LockType } from '@/accounts/types'
import { ApiContext } from '@/common/providers/api/context'

import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi } from '../../_mocks/transactions'

const useMyAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: true,
  allAccounts: [],
}

jest.mock('../../../src/accounts/hooks/useMyAccounts', () => {
  return {
    useMyAccounts: () => useMyAccounts,
  }
})

let balances: AddressToBalanceMap = {}

const useMyBalances = {
  useMyBalances: () => balances,
}

jest.mock('../../../src/accounts/hooks/useMyBalances', () => useMyBalances)

describe('useHasRequiredStake', () => {
  const useApi = stubApi()

  jest.useFakeTimers()

  beforeAll(async () => {
    useMyAccounts.hasAccounts = true
    useMyAccounts.allAccounts.push(alice, aliceStash, bob, bobStash)
  })

  afterEach(cleanup)

  const zeroBalance = {
    total: new BN(0),
    locked: new BN(0),
    transferable: new BN(0),
    recoverable: new BN(0),
    locks: [],
  }

  function renderUseTotalBalances(stake: number, lock: LockType) {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockKeyringProvider>
        <AccountsContextProvider>
          <ApiContext.Provider value={useApi}>{children}</ApiContext.Provider>
        </AccountsContextProvider>
      </MockKeyringProvider>
    )
    return renderHook(() => useHasRequiredStake(stake, lock), { wrapper })
  }

  it('One account, no locks, total balance equal stake', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(1000),
      },
    }
    const { result } = renderUseTotalBalances(1000, 'Voting')

    expect(result.current).toStrictEqual({
      hasRequiredStake: true,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('One account, no locks, total balance below stake', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(1000),
      },
    }
    const { result } = renderUseTotalBalances(2000, 'Voting')

    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('One account, compatible lock, total balance equal stake', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(900),
        locked: new BN(100),
        locks: [
          {
            amount: new BN(100),
            type: 'Staking Candidate',
            isRecoverable: true,
          },
        ],
      },
    }
    const { result } = renderUseTotalBalances(1000, 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: true,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('One account, incompatible lock, total balance equal stake', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(900),
        locked: new BN(100),
        locks: [
          {
            amount: new BN(100),
            type: 'Voting',
            isRecoverable: true,
          },
        ],
      },
    }
    const { result } = renderUseTotalBalances(1000, 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('Multiple accounts, no locks, some accounts have required stake', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(1000),
      },
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(500),
        transferable: new BN(500),
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(2000),
        transferable: new BN(2000),
      },
    }
    const { result } = renderUseTotalBalances(1000, 'Staking Candidate')
    expect(result.current).toStrictEqual({
      hasRequiredStake: true,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('Multiple accounts, no locks, no account with required stake', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(900),
        transferable: new BN(900),
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
    const { result } = renderUseTotalBalances(1000, 'Staking Candidate')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('Multiple accounts, compatible lock, one account with required stake', () => {
    balances = {
      [alice.address]: zeroBalance,
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(900),
        locked: new BN(100),
        locks: [
          {
            amount: new BN(100),
            type: 'Staking Candidate',
            isRecoverable: true,
          },
        ],
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(100),
        transferable: new BN(100),
      },
    }
    const { result } = renderUseTotalBalances(1000, 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: true,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('Multiple accounts, compatible lock, no required stake', () => {
    balances = {
      [alice.address]: zeroBalance,
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(900),
        transferable: new BN(800),
        locked: new BN(100),
        locks: [
          {
            amount: new BN(100),
            type: 'Staking Candidate',
            isRecoverable: true,
          },
        ],
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(50),
        transferable: new BN(50),
      },
    }
    const { result } = renderUseTotalBalances(1000, 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: null,
      accountsWithLockedFounds: null,
    })
  })

  it('Multiple accounts, no locks, transferable to account without locks', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(450),
        transferable: new BN(450),
      },
      [aliceStash.address]: {
        ...zeroBalance,
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(200),
        transferable: new BN(200),
      },
      [bobStash.address]: {
        ...zeroBalance,
        total: new BN(350),
        transferable: new BN(350),
      },
    }
    const { result } = renderUseTotalBalances(1000, 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: [alice.address, bobStash.address, bob.address],
      accountsWithLockedFounds: null,
    })
  })

  it('Multiple accounts, with incompatible locks, transferable to account without locks', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(450),
        transferable: new BN(450),
      },
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(1000),
        locked: new BN(1000),
        locks: [
          {
            amount: new BN(1000),
            type: 'Staking Candidate',
            isRecoverable: true,
          },
        ],
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(200),
        locked: new BN(800),
        locks: [
          {
            amount: new BN(800),
            type: 'Staking Candidate',
            isRecoverable: true,
          },
        ],
      },
      [bobStash.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(350),
        locked: new BN(650),
        locks: [
          {
            amount: new BN(650),
            type: 'Staking Candidate',
            isRecoverable: true,
          },
        ],
      },
    }
    const { result } = renderUseTotalBalances(1000, 'Staking Candidate')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: [alice.address, bobStash.address, bob.address],
      accountsWithLockedFounds: null,
    })
  })

  it('Multiple accounts, compatible lock, transferable to an account with locked founds', () => {
    balances = {
      [alice.address]: {
        ...zeroBalance,
        total: new BN(10),
        transferable: new BN(10),
      },
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(500),
        transferable: new BN(0),
        locked: new BN(500),
        locks: [
          {
            amount: new BN(500),
            type: 'Staking Candidate',
            isRecoverable: true,
          },
        ],
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(200),
        transferable: new BN(200),
      },
      [bobStash.address]: {
        ...zeroBalance,
        total: new BN(300),
        transferable: new BN(300),
      },
    }
    const { result } = renderUseTotalBalances(1000, 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      transferableAccounts: null,
      accountsWithLockedFounds: {
        [aliceStash.address]: [bobStash.address, bob.address],
      },
    })
  })
})
