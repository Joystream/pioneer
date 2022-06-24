import { ApiRx } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { AnyTuple } from '@polkadot/types/types'
import { catchError, map, Observable, of } from 'rxjs'

import { ClientTxMessage, TxModule, WorkerTxMessage } from '../client/tx'
import { PostMessage } from '../types'

export const transactionsRecord: Record<string, SubmittableExtrinsic<'rxjs'>> = {}

export const tx = <ModuleKey extends TxModule>(
  api: ApiRx,
  message: ClientTxMessage,
  postMessage: PostMessage<WorkerTxMessage>
) => {
  if (message.method === 'transaction') {
    const module = api.tx[message.module as ModuleKey]
    const tx = module[message.txKey as keyof ApiRx['tx'][ModuleKey]]

    if (typeof tx !== 'function') {
      throw Error(`api.${message.module}.${message.txKey} is not a function`)
    }

    transactionsRecord[message.txId] = tx.apply(module, message.payload)
  } else {
    const transaction = transactionsRecord[message.txId]
    const method = transaction[message.method.key] as (...params: AnyTuple) => Observable<any>

    method
      .apply(transaction, message.payload)
      .pipe(
        map((result) => ({ result })),
        catchError((error) => of({ error }))
      )
      .subscribe((payload) =>
        postMessage({
          messageType: 'tx',
          txId: message.txId,
          callId: message.method.id,
          payload,
        })
      )
  }
}
