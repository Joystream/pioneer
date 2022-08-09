import { BN_THOUSAND } from '@polkadot/util'
import '@testing-library/jest-dom'
import BN from 'bn.js'
import React from 'react'

import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { AddressToBalanceMap, Balances } from '@/accounts/types'
import { BN_ZERO } from '@/common/constants'
import { UseTransaction } from '@/common/providers/transactionFees/context'

jest.mock('@/common/hooks/useQueryNodeTransactionStatus', () => ({
  useQueryNodeTransactionStatus: () => 'confirmed',
}))

export const zeroBalance = {
  total: BN_ZERO,
  locked: BN_ZERO,
  recoverable: BN_ZERO,
  transferable: BN_ZERO,
  locks: [],
  vestingTotal: BN_ZERO,
  vestedClaimable: BN_ZERO,
  vestedBalance: BN_ZERO,
  vestingLocked: BN_ZERO,
  vesting: [],
}

export const mockDefaultBalance = {
  ...zeroBalance,
  total: BN_THOUSAND,
}

export const mockedTransactionFee: UseTransaction = {
  transaction: undefined,
  setTransaction: () => undefined,
  setSigner: () => undefined,
  feeInfo: { transactionFee: BN_ZERO, canAfford: true },
}

jest.mock('@/accounts/hooks/useTransactionFee', () => ({
  useTransactionFee: jest.fn(() => mockedTransactionFee),
}))

export const mockedUseMyAccounts = jest.fn<UseAccounts, []>(() => ({
  allAccounts: [],
  hasAccounts: false,
  isLoading: true,
}))

jest.mock('@/accounts/hooks/useMyAccounts', () => ({
  useMyAccounts: mockedUseMyAccounts,
}))

export const mockedBalances = jest.fn<Balances | null, []>(() => mockDefaultBalance)

jest.mock('@/accounts/hooks/useBalance', () => ({
  useBalance: mockedBalances,
}))

export const mockedMyBalances = jest.fn<AddressToBalanceMap | undefined, []>(() => ({} as AddressToBalanceMap))

jest.mock('@/accounts/hooks/useMyBalances', () => ({
  useMyBalances: mockedMyBalances,
}))

jest.mock('@/accounts/providers/balances/provider', () => ({
  BalancesContextProvider: ({ children }: { children: React.ReactNode }) => children,
}))

jest.mock('@/accounts/providers/accounts/context', () => ({
  AccountsContext: {
    Provider: ({ children, value }: { children: React.ReactNode; value: UseAccounts }) => {
      mockedUseMyAccounts.mockReturnValue(value)
      const balance = mockedBalances()
      if (balance) {
        mockedMyBalances.mockReturnValue(Object.fromEntries(value.allAccounts.map(({ address }) => [address, balance])))
      }
      return children
    },
  },
}))

jest.mock('@/common/constants/numbers', () => ({
  ...jest.requireActual('@/common/constants/numbers'),
  JOY_DECIMAL_PLACES: 0,
}))

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeBN(expected: BN): R
    }
  }
}

expect.extend({
  toBeBN: (received: any, expected: BN) => {
    if (!BN.isBN(received)) {
      return {
        pass: false,
        message: () => 'The result is not BN',
      }
    }

    if (!received.eq(expected)) {
      return {
        pass: false,
        message: () => `Expected ${received.toString()} to equal ${expected.toString()}`,
      }
    }

    return {
      pass: true,
      message: () => 'OK',
    }
  },
})
