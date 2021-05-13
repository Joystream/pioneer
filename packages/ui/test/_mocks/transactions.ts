import { ApiRx } from '@polkadot/api'
import BN from 'bn.js'
import { set } from 'lodash'
import { from, of } from 'rxjs'

import { UseApi } from '../../src/common/providers/api/provider'

import { toRuntimeDispatchInfo } from './chainTypes'

const getSuccessEvents = (data: number[], section: string, method: string) => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: { index: '0x0502', data, method, section },
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

export const stubTransactionSuccess = (transaction: any, data: any, section = '', method = '') => {
  set(transaction, 'signAndSend', () => stubTransactionResult(getSuccessEvents(data, section, method)))
}

export const stubBatchTransactionFailure = (transaction: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(getBatchErrorEvents()))
}

export const stubBatchTransactionSuccess = (transaction: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(getBatchSuccessEvents()))
}

export const stubTransaction = (api: UseApi, transactionPath: string, fee = 25) => {
  const transaction = {}
  set(transaction, 'paymentInfo', () => of(toRuntimeDispatchInfo(fee)))
  set(api, transactionPath, () => transaction)
  return transaction
}

export const stubQuery = (api: UseApi, querySubPath: string, response: unknown) => {
  return set(api, `api.query.${querySubPath}`, () => of(response))
}

export const stubApi = () => {
  const api: UseApi = {
    api: ({} as unknown) as ApiRx,
    isConnected: true,
  }
  return api
}

export const stubDefaultBalances = (api: UseApi) => {
  stubBalances(api, {
    available: 1000,
    locked: 0,
  })
}

export const stubBalances = (api: UseApi, balances: { available?: number; locked?: number }) => {
  set(api, 'api.derive.balances.all', () =>
    from([
      {
        availableBalance: new BN(balances.available ?? 0),
        lockedBalance: new BN(balances.locked ?? 0),
      },
    ])
  )
}
