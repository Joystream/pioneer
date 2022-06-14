import { createType } from '@joystream/types'
import { TypeRegistry } from '@polkadot/types'
import { EventRecord } from '@polkadot/types/interfaces'
import { AnyTuple, Codec } from '@polkadot/types/types'
import { Constructor } from '@polkadot/util/types'
import BN from 'bn.js'
import { get, isArray, isFunction, merge, uniqueId } from 'lodash'
import { filter, firstValueFrom, map, Observable } from 'rxjs'

import { error } from '@/common/logger'
import { AnyObject } from '@/common/types'
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
  const stack: AnyObject[] = []
  const result = serializeValue(payload)

  while (stack.length) {
    const current = stack.pop() as AnyObject
    if (Array.isArray(current)) {
      for (let index = 0; index < current.length; index++) {
        current[index] = serializeValue(current[index])
      }
    } else {
      for (const key of Object.keys(current)) {
        current[key] = serializeValue(current[key])
      }
    }
  }

  return result

  function serializeValue(value: any) {
    if (typeof value === 'function') {
      return undefined
    } else if (typeof value !== 'object' || value === null) {
      return value
    } else if (isCodec(value)) {
      return serializeCodec(value)
    } else if (value instanceof BN) {
      return { kind: 'BN', value: value.toArray() }
    } else if (value.kind === 'SubmittableExtrinsicProxy') {
      return { kind: value.kind, txId: value.txId }
    } else if (isSigner(value)) {
      return serializeProxy(value, {}, 'signer', messages, postMessage)
    } else {
      const result = isArray(value) ? [...value] : { ...value }
      stack.push(result)
      return result
    }
  }
}

// WARNING this mutate the serialized payload
export const deserializePayload = (
  payload: any,
  messages?: Observable<ClientProxyMessage>,
  postMessage?: PostMessage<WorkerProxyMessage>,
  transactionsRecord?: TransactionsRecord
): any => {
  const stack: AnyObject[] = []
  const result = deserializeValue(payload)

  while (stack.length) {
    const current = stack.pop() as AnyObject
    if (Array.isArray(current)) {
      for (let index = 0; index < current.length; index++) {
        current[index] = deserializeValue(current[index])
      }
    } else {
      for (const key of Object.keys(current)) {
        current[key] = deserializeValue(current[key])
      }
    }
  }

  return result

  function deserializeValue(value: any) {
    if (typeof value !== 'object' || value === null) {
      return value
    } else if ('kind' in value) {
      switch (value.kind) {
        case 'codec':
          return deserializeCodec(value)
        case 'BN':
          return new BN(value.value)
        case 'SubmittableExtrinsicProxy':
          return transactionsRecord?.[value.txId]
        case 'proxy':
          return deserializeProxy(value.json, value.proxyId, messages, postMessage)
      }
    }

    stack.push(value)
    return value
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
  const type =
    (codec as any).meta?.type ?? codec.registry.getClassName(codec.constructor as Constructor) ?? codec.toRawType()

  if (!type) {
    error('Unrecognized codec object', codec, codec.toHuman())
  }

  if (isEventRecord(type, codec)) {
    const { meta, method, section, typeDef } = codec.event
    const json = merge(codec.toJSON(), { event: { meta: meta.toJSON(), method, section, typeDef } })
    return { kind: 'codec', type, value: json }
  }

  return { kind: 'codec', type, value: codec.toJSON() }
}

const isCodec = (obj: any): obj is Codec => typeof obj?.registry === 'object' && obj.registry instanceof TypeRegistry

const isEventRecord = (type: string, codec: Codec): codec is EventRecord => type === 'EventRecord'

const deserializeCodec = (serialized: SerializedCodec) => {
  const codec = createType(serialized.type, serialized.value)

  if (serialized.type === 'EventRecord') {
    return recursiveProxy(codec, {
      get: (target, path) =>
        bindIfFunction(get(target, path) ?? get(serialized.value, path), () =>
          path.length > 1 ? get(target, path.slice(0, -1)) : target
        ),
    })
  }

  return codec
}

const bindIfFunction = (value: any, getContext: () => any) => (isFunction(value) ? value.bind(getContext()) : value)

const isSigner = (obj: any) => typeof obj.signPayload === 'function' && typeof obj.signRaw === 'function'
