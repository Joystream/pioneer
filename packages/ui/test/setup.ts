import '@testing-library/jest-dom'
import BN from 'bn.js'

import { DECIMAL_PLACES } from '@/common/model/formatters'

jest.mock('@/common/hooks/useQueryNodeTransactionStatus', () => ({
  useQueryNodeTransactionStatus: () => 'confirmed',
}))

const mockFormatJoyValue = (value: BN, precision?: number) =>
  jest
    .requireActual('@/common/model/formatters')
    .formatJoyValue(value.mul(new BN(Math.pow(10, DECIMAL_PLACES))), precision)

jest.mock('@/common/model/formatters', () => ({
  ...jest.requireActual('@/common/model/formatters'),
  formatJoyValue: (props: any) => mockFormatJoyValue(props),
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
