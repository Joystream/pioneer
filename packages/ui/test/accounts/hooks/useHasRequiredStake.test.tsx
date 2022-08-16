import { cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import React, { ReactNode } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { LockType } from '@/accounts/types'
import { ApiContext } from '@/api/providers/context'

import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubAccounts, stubApi } from '../../_mocks/transactions'
import { mockedMyBalances, zeroBalance } from '../../setup'

describe('useHasRequiredStake', () => {
  const useApi = stubApi()

  jest.useFakeTimers()

  beforeAll(async () => {
    stubAccounts([alice, aliceStash, bob, bobStash])
  })

  afterEach(cleanup)

  function renderUseTotalBalances(stake: BN, lock: LockType) {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockKeyringProvider>
        <ApiContext.Provider value={useApi}>{children}</ApiContext.Provider>
      </MockKeyringProvider>
    )
    return renderHook(() => useHasRequiredStake(stake, lock), { wrapper })
  }

  it('One account, no locks, total balance equal stake', () => {
    mockedMyBalances.mockReturnValue({
      [alice.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(1000),
      },
    })
    const { result } = renderUseTotalBalances(new BN(1000), 'Voting')

    expect(result.current).toStrictEqual({
      hasRequiredStake: true,
      accountsWithTransferableBalance: null,
      accountsWithCompatibleLocks: null,
    })
  })

  it('One account, no locks, total balance below stake', () => {
    mockedMyBalances.mockReturnValue({
      [alice.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(1000),
      },
    })
    const { result } = renderUseTotalBalances(new BN(2000), 'Voting')

    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      accountsWithTransferableBalance: null,
      accountsWithCompatibleLocks: null,
    })
  })

  it('One account, compatible lock, total balance equal stake', () => {
    mockedMyBalances.mockReturnValue({
      [alice.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(900),
        locked: new BN(100),
        locks: [
          {
            amount: new BN(100),
            type: 'Storage Worker',
          },
        ],
      },
    })
    const { result } = renderUseTotalBalances(new BN(1000), 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: true,
      accountsWithTransferableBalance: null,
      accountsWithCompatibleLocks: null,
    })
  })

  it('One account, incompatible lock, total balance equal stake', () => {
    mockedMyBalances.mockReturnValue({
      [alice.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(900),
        locked: new BN(100),
        locks: [
          {
            amount: new BN(100),
            type: 'Storage Worker',
          },
        ],
      },
    })
    const { result } = renderUseTotalBalances(new BN(1000), 'Storage Worker')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      accountsWithTransferableBalance: null,
      accountsWithCompatibleLocks: null,
    })
  })

  it('Multiple accounts, no locks, some accounts have required stake', () => {
    mockedMyBalances.mockReturnValue({
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
    })
    const { result } = renderUseTotalBalances(new BN(1000), 'Bound Staking Account')
    expect(result.current).toStrictEqual({
      hasRequiredStake: true,
      accountsWithTransferableBalance: null,
      accountsWithCompatibleLocks: null,
    })
  })

  it('Multiple accounts, no locks, no account with required stake', () => {
    mockedMyBalances.mockReturnValue({
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
    })
    const { result } = renderUseTotalBalances(new BN(1000), 'Bound Staking Account')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      accountsWithTransferableBalance: null,
      accountsWithCompatibleLocks: null,
    })
  })

  it('Multiple accounts, compatible lock, one account with required stake', () => {
    mockedMyBalances.mockReturnValue({
      [alice.address]: zeroBalance,
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(1000),
        transferable: new BN(900),
        locked: new BN(100),
        locks: [
          {
            amount: new BN(100),
            type: 'Bound Staking Account',
          },
        ],
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(100),
        transferable: new BN(100),
      },
    })
    const { result } = renderUseTotalBalances(new BN(1000), 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: true,
      accountsWithTransferableBalance: null,
      accountsWithCompatibleLocks: null,
    })
  })

  it('Multiple accounts, compatible lock, no required stake', () => {
    mockedMyBalances.mockReturnValue({
      [alice.address]: zeroBalance,
      [aliceStash.address]: {
        ...zeroBalance,
        total: new BN(900),
        transferable: new BN(800),
        locked: new BN(100),
        locks: [
          {
            amount: new BN(100),
            type: 'Bound Staking Account',
          },
        ],
      },
      [bob.address]: {
        ...zeroBalance,
        total: new BN(50),
        transferable: new BN(50),
      },
    })
    const { result } = renderUseTotalBalances(new BN(1000), 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      accountsWithTransferableBalance: null,
      accountsWithCompatibleLocks: null,
    })
  })

  it('Multiple accounts, no locks, transferable to account without locks', () => {
    mockedMyBalances.mockReturnValue({
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
    })
    const { result } = renderUseTotalBalances(new BN(1000), 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      accountsWithTransferableBalance: [alice.address, bobStash.address, bob.address],
      accountsWithCompatibleLocks: null,
    })
  })

  it('Multiple accounts, with incompatible locks, transferable to account without locks', () => {
    mockedMyBalances.mockReturnValue({
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
            type: 'Bound Staking Account',
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
            type: 'Bound Staking Account',
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
            type: 'Bound Staking Account',
          },
        ],
      },
    })
    const { result } = renderUseTotalBalances(new BN(1000), 'Bound Staking Account')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      accountsWithTransferableBalance: [alice.address, bobStash.address, bob.address],
      accountsWithCompatibleLocks: null,
    })
  })

  it('Multiple accounts, compatible lock, transferable to an account with locked founds', () => {
    mockedMyBalances.mockReturnValue({
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
            type: 'Bound Staking Account',
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
    })
    const { result } = renderUseTotalBalances(new BN(1000), 'Voting')
    expect(result.current).toStrictEqual({
      hasRequiredStake: false,
      accountsWithTransferableBalance: null,
      accountsWithCompatibleLocks: {
        [aliceStash.address]: [bobStash.address, bob.address],
      },
    })
  })
})
