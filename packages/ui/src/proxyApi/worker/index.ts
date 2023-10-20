import '@joystream/types'
import { ApiRx, WsProvider } from '@polkadot/api'
import { getPolkadotApiChainInfo } from 'injectweb3-connect'
import { BehaviorSubject, filter, first, fromEvent, share } from 'rxjs'

import { isDefined } from '@/common/utils'
import { firstWhere } from '@/common/utils/rx'

import { ClientProxyMessage, deserializeMessage, deserializePayload, serializePayload } from '../models/payload'
import { ClientMessage, PostMessage, RawClientMessageEvent, WorkerMessage } from '../types'

import { query } from './query'
import { transactionsRecord, tx } from './tx'

const apiObserver = new BehaviorSubject<ApiRx | undefined>(undefined)

const postMessage: PostMessage<WorkerMessage> = (message, toJSON = false) =>
  self.postMessage({ ...message, payload: serializePayload(message.payload, { toJSON }) })

const messages = fromEvent<RawClientMessageEvent>(self, 'message')

const clientProxyMessage = messages.pipe(
  filter(({ data }) => data.messageType === 'proxy'),
  deserializeMessage<ClientProxyMessage>(),
  share()
)

messages.subscribe(({ data }) => {
  const payload = deserializePayload(data.payload, { messages: clientProxyMessage, postMessage, transactionsRecord })
  const message = { ...data, payload } as ClientMessage

  if (message.messageType === 'init') {
    const provider = new WsProvider(message.payload)
    ApiRx.create({ provider })
      .pipe(first())
      .subscribe((api) => {
        postMessage({ messageType: 'init', payload: { consts: api.consts } })
        postMessage({ messageType: 'isConnected', payload: true })
        api.on('connected', () => self.postMessage({ messageType: 'isConnected', payload: true }))
        api.on('disconnected', () => self.postMessage({ messageType: 'isConnected', payload: false }))

        apiObserver.next(api)
      })
  } else {
    apiObserver.pipe(firstWhere(isDefined)).subscribe(async (api) => {
      if (!api) return

      switch (message.messageType) {
        case 'derive':
          return query('derive', api, message, postMessage)

        case 'query':
          return query('query', api, message, postMessage)

        case 'rpc':
          return query('rpc', api, message, postMessage)

        case 'tx':
          return tx(api, message, postMessage)

        case 'chain-metadata':
          return postMessage({ messageType: 'chain-metadata', payload: await getPolkadotApiChainInfo(api) }, true)
      }
    })
  }
})
