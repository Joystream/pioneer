import BN from 'bn.js'
import { set } from 'lodash'
import { of } from 'rxjs'
import { UseApi } from '../../src/providers/api/provider'
import { stubTransactionResult } from '../mocks/stubTransactionResult'

const getSuccessEvents = (data: number[]) => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: { index: '0x0502', data: data },
  },
  {
    phase: { ApplyExtrinsic: 2 },
    event: { index: '0x0000', data: [{ weight: 190949000, class: 'Normal', paysFee: 'Yes' }] },
  },
]

const getErrorEvents = () => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: {
      index: '0x0001',
      data: [{ Module: { index: 5, error: 3 } }, { weight: 190949000, class: 'Normal', paysFee: 'Yes' }],
      section: 'system',
      method: 'ExtrinsicFailed',
    },
  },
]

const getBatchSuccessEvents = () => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: {
      section: 'utility',
      method: 'BatchCompleted',
      index: '0x0502',
    },
  },
  {
    phase: { ApplyExtrinsic: 2 },
    event: { index: '0x0000', data: [{ weight: 190949000, class: 'Normal', paysFee: 'Yes' }] },
  },
]

const getBatchErrorEvents = () => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: {
      index: '0x0001',
      data: [{ Module: { index: 20, error: 5 } }, { weight: 190949000, class: 'Normal', paysFee: 'Yes' }],
      section: 'utility',
      method: 'BatchInterrupted',
    },
  },
]

export const stubTransactionFailure = (transaction: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(getErrorEvents()))
}

export const stubTransactionSuccess = (transaction: any, data: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(getSuccessEvents(data)))
}

export const stubBatchTransactionFailure = (transaction: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(getBatchErrorEvents()))
}

export const stubBatchTransactionSuccess = (transaction: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(getBatchSuccessEvents()))
}

export const stubTransaction = (api: UseApi, transactionPath: string) => {
  const transaction = {}
  set(transaction, 'paymentInfo', () => of(set({}, 'partialFee.toBn', () => new BN(25))))
  set(api, transactionPath, () => transaction)
  return transaction
}
