import { WorkerConnectMessage, WorkerInitMessage } from './client/api'
import { ClientQueryMessage, WorkerQueryMessage } from './client/api-query'
import { ClientTxMessage, WorkerTxMessage } from './client/api-tx'
import { ClientProxyMessage, WorkerProxyMessage } from './models/payload'

export type PostMessage<Message extends ClientMessage = ClientMessage> = (message: Message) => void

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

export type WorkerMessage =
  | WorkerInitMessage
  | WorkerConnectMessage
  | WorkerQueryMessage
  | WorkerTxMessage
  | WorkerProxyMessage

export type ClientMessage =
  | { messageType: 'init'; payload: string }
  | ClientQueryMessage
  | ClientTxMessage
  | ClientProxyMessage

export type AnyMessage = WorkerMessage | ClientMessage
