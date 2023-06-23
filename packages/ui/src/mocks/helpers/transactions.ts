import BN from 'bn.js'
import { asyncScheduler, from, scheduled } from 'rxjs'

import { BLOCK_HASH } from '../providers/api'

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

export const currentStubErrorMessage = 'Balance too low to send value.'
const findMetaError = () => ({
  docs: [currentStubErrorMessage],
})

export const createErrorEvents = () => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: {
      index: '0x0001',
      data: [
        { Module: { index: new BN(5), error: new BN(3) }, isModule: true, registry: { findMetaError } },
        { weight: 190949000, class: 'Normal', paysFee: 'Yes' },
      ],
      section: 'system',
      method: 'ExtrinsicFailed',
    },
  },
]
