import { createType, registry } from '@joystream/types'
import { EventRecord } from '@polkadot/types/interfaces'
import { AnyTuple, Codec } from '@polkadot/types/types'
import { Constructor } from '@polkadot/util/types'
import BN from 'bn.js'
import { get, merge, uniqueId } from 'lodash'
import { filter, firstValueFrom, map, Observable } from 'rxjs'

import { AnyObject } from '@/common/types'
import { mapObject } from '@/common/utils/object'
import { recursiveProxy } from '@/common/utils/proxy'

import { AnyMessage, PostMessage, RawMessageEvent, TransactionsRecord } from '../types'

export interface WorkerProxyMessage {
  messageType: 'proxy'
  proxyId: string
  method: string
  payload: AnyTuple
}

export interface ClientProxyMessage {
  messageType: 'proxy'
  proxyId: string
  payload: any
}

export const serializePayload = (
  payload: any,
  messages?: Observable<WorkerProxyMessage>,
  postMessage?: PostMessage<ClientProxyMessage>
): any => {
  if (typeof payload === 'function') {
    return
  } else if (typeof payload !== 'object' || payload === null) {
    return payload
  } else if (isCodec(payload)) {
    return serializeCodec(payload)
  } else if (payload instanceof BN) {
    // TODO add support for Long
    return { type: 'BN', value: payload.toArray() }
  } else if (payload.kind === 'SubmittableExtrinsicProxy') {
    return { kind: payload.kind, txId: payload.txId }
  } else if (isSigner(payload)) {
    return serializeProxy(payload, {}, 'signer', messages, postMessage)
  } else {
    return mapObject(payload, (payload) => serializePayload(payload, messages, postMessage))
  }
}

export const deserializePayload = <T>(
  payload: any,
  messages?: Observable<ClientProxyMessage>,
  postMessage?: PostMessage<WorkerProxyMessage>,
  transactionsRecord?: TransactionsRecord
): T => {
  if (typeof payload !== 'object' || payload === null) {
    return payload
  } else if (isSerializedCodec(payload)) {
    return deserializeCodec(payload) as unknown as T
  } else if (payload.type === 'BN') {
    return new BN(payload.value) as unknown as T
  } else if (transactionsRecord && payload.kind === 'SubmittableExtrinsicProxy') {
    return transactionsRecord[payload.txId] as unknown as T
  } else if (payload.kind === 'proxy') {
    return deserializeProxy(payload.json, payload.proxyId, messages, postMessage)
  } else {
    return mapObject(payload, (payload) => deserializePayload(payload, messages, postMessage, transactionsRecord)) as T
  }
}

export const deserializeMessage =
  <Message extends AnyMessage>() =>
  (source: Observable<RawMessageEvent>) =>
    source.pipe(map(({ data }) => ({ ...data, payload: deserializePayload(data.payload) } as Message)))

const serializeProxy = (
  obj: AnyObject,
  json: AnyObject = {},
  name = '',
  messages?: Observable<WorkerProxyMessage>,
  postMessage?: PostMessage<ClientProxyMessage>
) => {
  if (!messages || !postMessage) {
    throw Error('Serializing proxies from the Web Worker is not supported yet')
  }

  const proxyId = uniqueId(`${name}.`)
  messages.pipe(filter((message) => message.proxyId === proxyId)).subscribe(({ method, payload: params }) => {
    obj[method](...params).then((payload: any) => postMessage({ messageType: 'proxy', proxyId, payload }))
  })
  return { kind: 'proxy', proxyId, json }
}

const deserializeProxy = (
  json: any,
  proxyId: string,
  messages?: Observable<ClientProxyMessage>,
  postMessage?: PostMessage<WorkerProxyMessage>
) => {
  if (!messages || !postMessage) {
    throw Error('Deserializing object is currently only supported from the Web Worker')
  }

  return new Proxy(json, {
    get(json, prop: string) {
      return prop in json
        ? json[prop]
        : (...payload: AnyTuple) => {
            postMessage({ messageType: 'proxy', proxyId, method: prop, payload })
            return firstValueFrom(
              messages.pipe(
                filter((message) => message.proxyId === proxyId),
                map(({ payload }) => payload)
              )
            )
          }
    },
  })
}

interface SerializedCodec {
  kind: 'codec'
  type: string
  value: any
}

const serializeCodec = (codec: Codec) => {
  const type = registry.getClassName(codec.constructor as Constructor)

  if (!type) {
    throw new Error('Unrecognized codec object')
  }

  if (isEventRecord(type, codec)) {
    const { meta, method, section, typeDef } = codec.event
    const json = merge(codec.toJSON(), { event: { meta: meta.toJSON(), method, section, typeDef } })
    return { kind: 'codec', type, value: json }
  }

  return { kind: 'codec', type, value: codec.toJSON() }
}

const isCodec = (obj: any): obj is Codec => obj.constructor?.name && registry.hasClass(obj.constructor.name)

const isEventRecord = (type: string, codec: Codec): codec is EventRecord => type === 'EventRecord'

const deserializeCodec = (serialized: SerializedCodec) => {
  const codec = createType(serialized.type, serialized.value)

  if (serialized.type === 'EventRecord') {
    return recursiveProxy(codec, {
      get: (target, path) => get(target, path) ?? get(serialized.value, path),
    })
  }

  return codec
}

const isSerializedCodec = (obj: any): obj is SerializedCodec =>
  'kind' in obj && obj.kind === 'codec' && 'type' in obj && typeof obj.type === 'string' && 'value' in obj

const isSigner = (obj: any) => typeof obj.signPayload === 'function' && typeof obj.signRaw === 'function'
