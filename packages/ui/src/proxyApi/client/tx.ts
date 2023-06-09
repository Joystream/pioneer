import { SubmittableExtrinsic } from '@polkadot/api/types'
import { AnyTuple } from '@polkadot/types/types'
import { uniqueId } from 'lodash'
import { filter, map, Observable, share } from 'rxjs'

import { ProxyApi } from '..'
import { deserializeMessage } from '../models/payload'
import { PostMessage, ProxyPromisePayload, RawWorkerMessageEvent } from '../types'
import { apiInterfaceProxy } from '../utils/proxy'

type ObservableMethods = (typeof ObservableMethods)[number]

export type TxModule = keyof ProxyApi['tx']

export type ClientTxMessage = {
  messageType: 'tx'
  module: TxModule
  txKey: string
  txId: string
} & (
  | { method: 'transaction'; payload: AnyTuple }
  | { method: { key: ObservableMethods; id: string }; payload: AnyTuple }
)

export type WorkerTxMessage = {
  messageType: 'tx'
  txId: string
  callId: string
  payload: ProxyPromisePayload<
    ReturnType<SubmittableExtrinsic<'rxjs'>[ObservableMethods]> extends Observable<infer T> ? T : never
  >
}

const ObservableMethods = ['paymentInfo', 'signAndSend'] as const

export const tx = (messages: Observable<RawWorkerMessageEvent>, postMessage: PostMessage<ClientTxMessage>) => {
  const txMessages = messages.pipe(
    filter(({ data }) => data.messageType === 'tx'),
    deserializeMessage<WorkerTxMessage>(),
    share()
  )

  return apiInterfaceProxy<'tx'>((module, txKey) => (...params) => {
    const transaction = {
      kind: 'SubmittableExtrinsicProxy',
      txId: uniqueId(`tx.${module}.${txKey}.`),
      ...Object.fromEntries(ObservableMethods.map(addObservableMethodEntry)),
    }

    const _messages = txMessages.pipe(
      filter(({ txId }) => txId === transaction.txId),
      share()
    ) as Observable<WorkerTxMessage>
    const _postMessage = (message: Pick<ClientTxMessage, 'method' | 'payload'>) =>
      postMessage({ messageType: 'tx', module, txKey, txId: transaction.txId, ...message })

    _postMessage({ method: 'transaction', payload: params })

    return transaction

    function addObservableMethodEntry(method: ObservableMethods) {
      return [
        method,
        (...params: AnyTuple) => {
          const callId = uniqueId(`tx.${module}.${txKey}.${method}.`)
          _postMessage({ method: { key: method, id: callId }, payload: params })
          return _messages.pipe(
            filter((message) => message.callId === callId),
            map(({ payload: { error, result } }) => {
              if (error) {
                throw error
              } else {
                return result
              }
            }),
            share()
          )
        },
      ]
    }
  })
}
