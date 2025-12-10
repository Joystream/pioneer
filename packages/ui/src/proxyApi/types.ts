import { ApiRx } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'

import { ClientAsyncMessage, WorkerAsyncMessage } from './client/_async'
import { ClientQueryMessage, WorkerQueryMessage } from './client/query'
import { ClientTxMessage, WorkerTxMessage } from './client/tx'
import { ClientProxyMessage, WorkerProxyMessage } from './models/payload'

export type TransactionsRecord = Record<string, SubmittableExtrinsic<'rxjs'>>

export interface ProxyPromisePayload<T = any> {
  error?: any
  result?: T
}

export type PostMessage<Message extends AnyMessage = AnyMessage> = (message: Message, asJSON?: boolean) => void

export type ApiKinds = 'derive' | 'query' | 'rpc' | 'tx'

export type RawWorkerMessageEvent = MessageEvent<{
  messageType: WorkerMessage['messageType']
  payload?: any
}>

export type RawClientMessageEvent = MessageEvent<{
  messageType: ClientMessage['messageType']
  payload?: any
}>

export type RawMessageEvent = RawWorkerMessageEvent | RawClientMessageEvent

type WorkerInitPayload = {
  consts: ApiRx['consts']
  genesisHash: ApiRx['genesisHash']
  runtimeVersion: ApiRx['runtimeVersion']
  runtimeMetadata: `0x${string}`
}

export type WorkerInitMessage = {
  messageType: 'init'
  payload: WorkerInitPayload
}
export type ClientInitMessage = { messageType: 'init'; payload: string }
export type WorkerConnectMessage = { messageType: 'isConnected'; payload: boolean }

export type WorkerMessage =
  | WorkerInitMessage
  | WorkerConnectMessage
  | WorkerQueryMessage
  | WorkerTxMessage
  | WorkerProxyMessage
  | WorkerAsyncMessage

export type ClientMessage =
  | ClientInitMessage
  | ClientQueryMessage
  | ClientTxMessage
  | ClientProxyMessage
  | ClientAsyncMessage

export type AnyMessage = WorkerMessage | ClientMessage
