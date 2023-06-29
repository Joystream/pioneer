import { createType } from '@joystream/types'
import BN from 'bn.js'
import { asyncScheduler, from, of, scheduled } from 'rxjs'

import { whenDefined } from '@/common/utils'

import { Balance } from '../providers/accounts'
import { BLOCK_HASH } from '../providers/api'

import { joy } from '.'
import { asChainData } from './asChainData'

export type TxMock = {
  data?: any[] | any
  failure?: string
  event?: string
  fee?: Balance
  onCall?: CallableFunction
  onSend?: CallableFunction
}

export const fromTxMock = (
  { data, failure, event: eventName = 'Default Event', fee = 5, onCall, onSend }: TxMock,
  moduleName: string
) => {
  const eventData = whenDefined(data, (data) => [asChainData(data)].flat()) ?? []
  const event = failure ? createErrorEvents(failure) : createSuccessEvents(eventData, moduleName, eventName)
  const txResult = stubTransactionResult(event)

  const paymentInfo = () => of({ partialFee: createType('BalanceOf', joy(fee)) })

  return (...args: any[]) => {
    onCall?.(...args)
    return {
      paymentInfo,
      signAndSend: () => {
        onSend?.(...args)
        return txResult
      },
    }
  }
}

export const stubTransactionResult = (events: any[]) =>
  scheduled(
    from([
      {
        status: { isReady: true, type: 'Ready' },
      },
      {
        status: { type: 'InBlock', isInBlock: true, asInBlock: BLOCK_HASH },
        events: [...events],
      },
      {
        status: { type: 'Finalized', isFinalized: true, asFinalized: BLOCK_HASH },
        events: [...events],
      },
    ]),
    asyncScheduler
  )

export const createSuccessEvents = (data: any[], section: string, method: string) => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: { index: '0x0502', data, method, section },
  },
  {
    phase: { ApplyExtrinsic: 2 },
    event: { index: '0x0000', data: [{ weight: 190949000, class: 'Normal', paysFee: 'Yes' }] },
  },
]

export const createErrorEvents = (errorMessage: string) => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: {
      index: '0x0001',
      data: [
        {
          Module: { index: new BN(5), error: new BN(3) },
          isModule: true,
          registry: { findMetaError: () => ({ docs: [errorMessage] }) },
        },
        { weight: 190949000, class: 'Normal', paysFee: 'Yes' },
      ],
      section: 'system',
      method: 'ExtrinsicFailed',
    },
  },
]
