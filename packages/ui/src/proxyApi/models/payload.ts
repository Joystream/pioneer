import { createType } from '@joystream/types'
import { TypeRegistry } from '@polkadot/types'
import { EventRecord } from '@polkadot/types/interfaces'
import { SpRuntimeDispatchError } from '@polkadot/types/lookup'
import { AnyTuple, Codec } from '@polkadot/types/types'
import BN from 'bn.js'
import { get, isArray, isFunction, startCase, uniqueId } from 'lodash'
import { filter, firstValueFrom, map, Observable } from 'rxjs'

import { error } from '@/common/logger'
import { DispatchedError } from '@/common/model/JoystreamNode'
import { AnyObject } from '@/common/types'
import { recursiveProxy } from '@/common/utils/proxy'

import { AnyMessage, PostMessage, ProxyPromisePayload, RawMessageEvent, TransactionsRecord } from '../types'

export interface WorkerProxyMessage {
  messageType: 'proxy'
  proxyId: string
  method: string
  payload: AnyTuple
}

export interface ClientProxyMessage {
  messageType: 'proxy'
  proxyId: string
  payload: ProxyPromisePayload
}

interface serializationOptions {
  messages?: Observable<WorkerProxyMessage>
  postMessage?: PostMessage<ClientProxyMessage>
  toJSON?: boolean
}

export const serializePayload = (payload: any, { messages, postMessage, toJSON }: serializationOptions = {}): any => {
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
    if (isFunction(value)) {
      return undefined
    } else if (typeof value !== 'object' || value === null) {
      return value
    } else if (isCodec(value)) {
      return toJSON ? value.toJSON() : serializeCodec(value)
    } else if (value instanceof BN) {
      return { kind: 'BN', value: value.toArray() }
    } else if (value.kind === 'SubmittableExtrinsicProxy') {
      return { kind: value.kind, txId: value.txId }
    } else if (isSigner(value)) {
      return serializeProxy(value, {}, ['signPayload'], 'signer', messages, postMessage)
    } else {
      const result = isArray(value) ? [...value] : serializeObject(value)
      stack.push(result)
      return result
    }
  }
}

const serializeObject = (value: Record<any, any>): Record<string, any> => {
  try {
    const properties = Object.getOwnPropertyNames(value)
    if (properties.length > Object.keys(value).length) {
      return Object.fromEntries(properties.map((key) => [key, value[key]]))
    }
  } catch (err) {
    // Nothing
  }
  return { ...value }
}

interface deSerializationOptions {
  messages?: Observable<ClientProxyMessage>
  postMessage?: PostMessage<WorkerProxyMessage>
  transactionsRecord?: TransactionsRecord
}

// WARNING this mutate the serialized payload
export const deserializePayload = (
  payload: any,
  { messages, postMessage, transactionsRecord }: deSerializationOptions = {}
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
        if ('value' in (Object.getOwnPropertyDescriptor(current, key) ?? {})) {
          current[key] = deserializeValue(current[key])
        }
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
          return 'properties' in value ? deserializeExtendedCodec(value) : deserializeCodec(value)
        case 'BN':
          return new BN(value.value)
        case 'SubmittableExtrinsicProxy':
          return transactionsRecord?.[value.txId]
        case 'proxy':
          return deserializeProxy(value.json, value.methods, value.proxyId, messages, postMessage)
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
  methods: string[] = [],
  name = '',
  messages?: Observable<WorkerProxyMessage>,
  postMessage?: PostMessage<ClientProxyMessage>
) => {
  if (!messages || !postMessage) {
    throw Error('Serializing proxies from the Web Worker is not supported yet')
  }

  const proxyId = uniqueId(`${name}.`)
  messages.pipe(filter((message) => message.proxyId === proxyId)).subscribe(async ({ method, payload: params }) => {
    try {
      const result = await obj[method](...params)
      postMessage({ messageType: 'proxy', proxyId, payload: { result } })
    } catch (err: any) {
      const error: string = err.message ?? String(err)
      postMessage({ messageType: 'proxy', proxyId, payload: { error } })
    }
  })
  return { kind: 'proxy', proxyId, json, methods }
}

const deserializeProxy = (
  json: any,
  methods: string[],
  proxyId: string,
  messages?: Observable<ClientProxyMessage>,
  postMessage?: PostMessage<WorkerProxyMessage>
) => {
  if (!messages || !postMessage) {
    throw Error('Deserializing object is currently only supported from the Web Worker')
  }

  return new Proxy(json, {
    get(json, prop: string) {
      if (prop in json) {
        return json[prop]
      } else if (methods.includes(prop)) {
        return async (...params: AnyTuple) => {
          postMessage({ messageType: 'proxy', proxyId, method: prop, payload: params })
          const { payload } = await firstValueFrom(messages.pipe(filter((message) => message.proxyId === proxyId)))
          return payload.error ? Promise.reject(payload.error) : payload.result
        }
      }
    },
  })
}

interface SerializedCodec {
  kind: 'codec'
  type: string
  value: any
  properties?: any
}

const serializeCodec = (codec: Codec): SerializedCodec => {
  const type = codec.toRawType()

  if (!type) {
    error('Unrecognized codec object', codec, codec.toHuman())
  }

  const serializedCodec: SerializedCodec = { kind: 'codec', type, value: codec.toJSON() }

  if (isEventRecord(codec)) {
    const { data, index, meta, method, section, typeDef } = codec.event
    const serializedData = data.map((data) => {
      const result = serializeCodec(data)
      if (isDispatchError(data)) {
        const error = serializePayload(findMetaError(data))
        return { ...result, properties: { ...result.value, error } }
      }
      return result
    })
    const event = {
      data: serializedData,
      index: index.toJSON(),
      meta: meta.toJSON(),
      method,
      section,
      typeDef,
    }
    return { ...serializedCodec, properties: { event } }
  }

  const properties = (Object.getOwnPropertyNames(Object.getPrototypeOf(codec)) as (keyof Codec)[])
    .map<[keyof Codec, Codec[keyof Codec]]>((key) => [key, codec[key]])
    .filter(
      ([key, prop]) =>
        !['encodedLength', 'hash', 'initialU8aLength', 'isEmpty', 'registry', 'createdAtHash'].includes(key) &&
        !isFunction(prop) &&
        !Object.getOwnPropertyDescriptor(codec, key)
    )

  return properties.length > 0
    ? { ...serializedCodec, properties: serializePayload(Object.fromEntries(properties)) }
    : serializedCodec
}

const isDispatchError = (data: Codec): data is SpRuntimeDispatchError => {
  const error = data as SpRuntimeDispatchError
  const methods = ['isBadOrigin', 'isModule'] as const
  return error.type && methods.every((method) => typeof error[method] === 'boolean')
}

const findMetaError = (data: SpRuntimeDispatchError): DispatchedError => {
  type ValidGetters = 'asModule' | 'asToken' | 'asArithmetic' | 'asTransactional'
  const getter: `as${SpRuntimeDispatchError['type']}` = `as${data.type}`
  const errorIndex = getter in data && data[getter as ValidGetters]
  return errorIndex && !errorIndex.isEmpty
    ? data.registry.findMetaError(errorIndex.toU8a())
    : { section: 'Error', name: data.type, docs: [`${startCase(data.type)} error`] }
}

const isCodec = (obj: any): obj is Codec => typeof obj?.registry === 'object' && obj.registry instanceof TypeRegistry

const isEventRecord = (codec: Codec): codec is EventRecord => 'event' in codec

const deserializeCodec = (serialized: SerializedCodec) => createType(serialized.type, serialized.value) as Codec

const deserializeExtendedCodec = (serialized: SerializedCodec) =>
  recursiveProxy(deserializeCodec(serialized), {
    get: ({ value, property }) => bindIfFunction(value[property], value),
    default: ({ path }) => deserializePayload(get(serialized.properties, path)),
  })

const bindIfFunction = (value: any, context: any) => (isFunction(value) ? value.bind(context) : value)

const isSigner = (obj: any) => typeof obj.signPayload === 'function' && typeof obj.signRaw === 'function'
