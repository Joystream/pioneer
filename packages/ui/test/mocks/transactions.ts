import { ApiRx } from '@polkadot/api'
import BN from 'bn.js'
import { set } from 'lodash'
import { from, of } from 'rxjs'
import { UseApi } from '../../src/providers/api/provider'

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

export const stubTransactionResult = (events: any[]) =>
  from([
    {
      status: { isReady: true, type: 'Ready' },
    },
    {
      status: { type: 'InBlock', isInBlock: true, asInBlock: '0x93XXX' },
      events: [...events],
    },
    {
      status: { type: 'Finalized', isFinalized: true, asFinalized: '0x93XXX' },
      events: [...events],
    },
  ])

export const stubTransactionFailure = (transaction: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(getErrorEvents()))
}

export const stubTransactionSuccess = (transaction: any, data: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(getSuccessEvents(data)))
}

export const stubTransaction = (api: UseApi, transactionPath: string) => {
  const transaction = {}
  set(transaction, 'paymentInfo', () => of(set({}, 'partialFee.toBn', () => new BN(25))))
  set(api, transactionPath, () => transaction)
  return transaction
}

export const stubApi = () => {
  const api: UseApi = {
    api: ({} as unknown) as ApiRx,
    isConnected: true,
  }
  return api
}
