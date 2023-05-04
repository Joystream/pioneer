import { ApiRx } from '@polkadot/api'
import { Events } from '@polkadot/api/base/Events'
import { distinctUntilChanged, filter, fromEvent, map, Observable, share } from 'rxjs'

import { firstWhere } from '@/common/utils/rx'

import { deserializeMessage, serializePayload, WorkerProxyMessage } from '../models/payload'
import { ClientMessage, PostMessage, RawWorkerMessageEvent, WorkerConnectMessage, WorkerInitMessage } from '../types'

import { AsyncProps, _async } from './_async'
import { query } from './query'
import { tx } from './tx'

export class ProxyApi extends Events {
  isConnected = true

  derive: ApiRx['derive']
  query: ApiRx['query']
  rpc: ApiRx['rpc']
  tx: ApiRx['tx']
  consts: ApiRx['consts']
  _async: AsyncProps

  static create(providerEndpoint: string) {
    const worker = new Worker(new URL('../worker', import.meta.url), { type: 'module' })

    const messages = fromEvent<RawWorkerMessageEvent>(worker, 'message')

    const workerProxyMessages = messages.pipe(
      filter(({ data }) => data.messageType === 'proxy'),
      deserializeMessage<WorkerProxyMessage>(),
      share()
    )
    const postMessage: PostMessage<ClientMessage> = (message) =>
      worker.postMessage({
        ...message,
        payload: serializePayload(message.payload, { messages: workerProxyMessages, postMessage }),
      })

    postMessage({ messageType: 'init', payload: providerEndpoint })

    return messages.pipe(
      firstWhere(({ data }) => data.messageType === 'init'),
      deserializeMessage<WorkerInitMessage>(),
      map(({ payload }) => new ProxyApi(messages, postMessage, payload.consts)),
      share()
    )
  }

  constructor(
    messages: Observable<RawWorkerMessageEvent>,
    postMessage: PostMessage<ClientMessage>,
    consts: ProxyApi['consts']
  ) {
    super()
    {
      this.consts = consts
      this.derive = query('derive', messages, postMessage)
      this.query = query('query', messages, postMessage)
      this.rpc = query('rpc', messages, postMessage)
      this.tx = tx(messages, postMessage)
      this._async = _async(messages, postMessage)
    }

    messages
      .pipe(
        filter(({ data }) => data.messageType === 'isConnected'),
        map(({ data }) => data as WorkerConnectMessage),
        distinctUntilChanged()
      )
      .subscribe(({ payload }) => {
        this.isConnected = payload
        this.emit(payload ? 'connected' : 'disconnected')
      })

    // TODO emit errors too
  }
}
