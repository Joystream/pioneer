import { registry, types } from '@joystream/types'
import '@joystream/types/augment/augment-api'
import '@joystream/types/augment/augment-types'
import { ApiRx, WsProvider } from '@polkadot/api'
import rpc from '@polkadot/types/interfaces/jsonrpc'
import { BehaviorSubject, filter, first, fromEvent } from 'rxjs'

import { isDefined } from '@/common/utils'
import { firstWhere } from '@/common/utils/rx'

import { ClientProxyMessage, deserializeMessage, deserializePayload, serializePayload } from '../models/payload'
import { ClientMessage, PostMessage, RawClientMessageEvent, WorkerMessage } from '../types'

import { query } from './query'
import { transactionsRecord, tx } from './tx'

const apiObserver = new BehaviorSubject<ApiRx | undefined>(undefined)

const postMessage: PostMessage<WorkerMessage> = (message) =>
  self.postMessage({ ...message, payload: serializePayload(message.payload) })

const messages = fromEvent<RawClientMessageEvent>(self, 'message')

const clientProxyMessage = messages.pipe(
  filter(({ data }) => data.messageType === 'proxy'),
  deserializeMessage<ClientProxyMessage>()
)

messages.subscribe(({ data }) => {
  const payload = deserializePayload(data.payload, clientProxyMessage, postMessage, transactionsRecord)
  const message = { ...data, payload } as ClientMessage

  if (message.messageType === 'init') {
    const provider = new WsProvider(message.payload)
    ApiRx.create({ provider, rpc, types, registry })
      .pipe(first())
      .subscribe((api) => {
        postMessage({ messageType: 'init', payload: { consts: api.consts } })
        postMessage({ messageType: 'isConnected', payload: true })

        api.on('connected', () => self.postMessage({ messageType: 'isConnected', payload: true }))
        api.on('disconnected', () => self.postMessage({ messageType: 'isConnected', payload: false }))

        apiObserver.next(api)
      })
  } else {
    apiObserver.pipe(firstWhere(isDefined)).subscribe((api) => {
      switch (message.messageType) {
        case 'derive':
          return query('derive', api as ApiRx, message, postMessage)

        case 'query':
          return query('query', api as ApiRx, message, postMessage)

        case 'rpc':
          return query('rpc', api as ApiRx, message, postMessage)

        case 'tx':
          return tx(api as ApiRx, message, postMessage)
      }
    })
  }
})
