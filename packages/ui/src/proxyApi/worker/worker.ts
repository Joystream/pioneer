import { registry, types } from '@joystream/types'
import '@joystream/types/augment/augment-api'
import '@joystream/types/augment/augment-types'
import { ApiRx, WsProvider } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import rpc from '@polkadot/types/interfaces/jsonrpc'
import { AnyTuple, ISubmittableResult } from '@polkadot/types/types'
import { invoke } from 'lodash'
import { BehaviorSubject, filter, first, fromEvent, scan } from 'rxjs'

import { isDefined } from '@/common/utils'
import { firstWhere } from '@/common/utils/rx'

import { ApiQueryKinds, ClientQueryMessage } from '../client/api-query'
import { ClientTxMessage } from '../client/api-tx'
import { ClientProxyMessage, deserializeMessage, deserializePayload, serializePayload } from '../models/payload'
import { ClientMessage, RawClientMessageEvent, WorkerMessage } from '../types'

const api = new BehaviorSubject<ApiRx | undefined>(undefined)

const postMessage = (message: WorkerMessage) =>
  self.postMessage({ ...message, payload: serializePayload(message.payload) })

const messages = fromEvent<RawClientMessageEvent>(self, 'message')

const clientProxyMessage = messages.pipe(
  filter(({ data }) => data.messageType === 'proxy'),
  deserializeMessage<ClientProxyMessage>()
)

messages.subscribe(({ data }) => {
  const message = {
    ...data,
    payload: deserializePayload(data.payload, clientProxyMessage, postMessage),
  } as ClientMessage

  if (message.messageType === 'init') {
    const provider = new WsProvider(message.payload)
    ApiRx.create({ provider, rpc, types, registry })
      .pipe(first())
      .subscribe((_api) => {
        postMessage({
          messageType: 'init',
          payload: { consts: _api.consts },
        })

        postMessage({ messageType: 'isConnected', payload: true })

        _api.on('connected', () => {
          self.postMessage({ messageType: 'isConnected', payload: true })
        })
        _api.on('disconnected', () => self.postMessage({ messageType: 'isConnected', payload: false }))

        api.next(_api)
      })
  } else {
    api.pipe(firstWhere(isDefined)).subscribe((api) => {
      switch (message.messageType) {
        case 'derive':
          return query('derive', api as ApiRx, message)

        case 'query':
          return query('query', api as ApiRx, message)

        case 'rpc':
          return query('rpc', api as ApiRx, message)

        case 'tx':
          return tx(api as ApiRx, message)
      }
    })
  }
})

// const transactions: Record<string, SubmittableExtrinsic<'rxjs', ISubmittableResult>> = {}
type TxRecord = Record<string, SubmittableExtrinsic<'rxjs', ISubmittableResult>>
const newTransaction = new BehaviorSubject<TxRecord>({})
const transactions = newTransaction.pipe(scan<TxRecord, TxRecord>((txs, tx) => ({ ...txs, ...tx })))

const tx = (api: ApiRx, message: ClientTxMessage) => {
  if (message.method === 'transaction') {
    type TxKey = keyof ApiRx['tx'][typeof message.module]
    type Tx = (...params: AnyTuple) => SubmittableExtrinsic<'rxjs'>
    const tx = api.tx[message.module][message.txKey as TxKey] as Tx
    const transaction = tx(...message.payload)
    newTransaction.next({ [message.txId]: transaction })
  } else {
    return transactions.pipe(firstWhere((txs) => message.txId in txs)).subscribe(({ [message.txId]: tx }) => {
      tx[message.method.key](...message.payload).subscribe((payload) =>
        postMessage({
          messageType: 'tx',
          txId: message.txId,
          callId: message.method.id,
          payload,
        })
      )
    })
  }
}

const query = <K extends ApiQueryKinds>(apiKind: K, api: ApiRx, message: ClientQueryMessage<K>) =>
  invoke(api[apiKind], [message.module, ...message.path], ...message.payload).subscribe((payload: any) => {
    postMessage({
      messageType: apiKind,
      callId: message.callId,
      payload,
    })
  })
