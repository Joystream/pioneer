import { TextDecoder, TextEncoder } from 'util'

import { BN_THOUSAND } from '@polkadot/util'
import '@testing-library/jest-dom'
import { configure, screen } from '@testing-library/react'
import BN from 'bn.js'

import { UseTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { AddressToBalanceMap, Balances } from '@/accounts/types'
import { BN_ZERO } from '@/common/constants'
import { UseModal } from '@/common/providers/modal/types'

configure({ testIdAttribute: 'id' })

jest.mock('injectweb3-connect', () => {
  const wallet = {
    title: 'ExtraWallet',
    extensionName: 'polkadot-js',
    logo: { src: 'https://picsum.photos/100?grayscale&blur=2' },
    updateMetadata: jest.fn(() => Promise.resolve(true)),
  }
  const BaseDotsamaWallet = function () {
    return
  }
  BaseDotsamaWallet.prototype = wallet

  return {
    getWalletBySource: jest.fn(() => ({ ...wallet })),
    getAllWallets: jest.fn(() => [{ ...wallet }]),
    BaseDotsamaWallet,
  }
})

// Prevent jest from importing workers
jest.mock('@/common/utils/crypto/worker', () => jest.requireActual('@/common/utils/crypto'))

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

const defaultMockedTransactionFee: UseTransactionFee = {
  transaction: undefined,
  feeInfo: { transactionFee: BN_ZERO, canAfford: true },
  isLoading: false,
}

export const mockedTransactionFee = jest.fn<UseTransactionFee, [any, () => any, any[]] | []>(
  () => defaultMockedTransactionFee
)

export const mockTransactionFee = (value: Partial<UseTransactionFee>) => {
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

// Monkey patch `blob.arrayBuffer()` because despite what is on the doc it appears to not be implemented on the latest node 14
if (!Blob.prototype.arrayBuffer) {
  Blob.prototype.arrayBuffer = function (): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.readAsArrayBuffer(this)
    })
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

// multihases requires both TextEncoder and TextDecoder but is having trouble with resoving them
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any
