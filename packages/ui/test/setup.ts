import { BN_THOUSAND } from '@polkadot/util'
import '@testing-library/jest-dom'
import { configure, screen } from '@testing-library/react'
import BN from 'bn.js'

import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { AddressToBalanceMap, Balances } from '@/accounts/types'
import { BN_ZERO } from '@/common/constants'
import { UseModal } from '@/common/providers/modal/types'
import { UseTransaction } from '@/common/providers/transactionFees/context'

configure({ testIdAttribute: 'id' })

export const loaderSelector = (multiple = false) =>
  multiple ? screen.getAllByTestId('loading-spinner') : screen.queryByTestId('loading-spinner')

export const mockUseModalCall = (props: Partial<UseModal<any>>) => {
  mockUseModal.mockReturnValue({ ...mockUseModal(), ...props })
}

const mockUseModal = jest.fn<UseModal<any>, []>(() => ({
  hideModal: jest.fn(),
  showModal: jest.fn(),
  modal: null,
  modalData: null,
}))

jest.mock('@/common/hooks/useModal', () => ({
  useModal: () => ({
    ...jest.requireActual('@/common/hooks/useModal').useModal(),
    ...mockUseModal(),
  }),
}))

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

const defaultMockedTransactionFee: UseTransaction = {
  transaction: undefined,
  setTransaction: () => undefined,
  setSigner: () => undefined,
  feeInfo: { transactionFee: BN_ZERO, canAfford: true },
}

const mockedTransactionFee = jest.fn(() => defaultMockedTransactionFee)

export const mockTransactionFee = (value: Partial<UseTransaction>) => {
  mockedTransactionFee.mockReturnValue({ ...mockedTransactionFee(), ...value })
}

jest.mock('@/accounts/hooks/useTransactionFee', () => ({
  useTransactionFee: mockedTransactionFee,
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

global.URL.createObjectURL = jest.fn()
global.URL.revokeObjectURL = jest.fn()

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
