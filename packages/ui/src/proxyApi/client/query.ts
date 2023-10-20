import { AnyTuple } from '@polkadot/types/types'
import { uniqueId } from 'lodash'
import { filter, Observable, map, share } from 'rxjs'

import { ProxyApi } from '..'
import { deserializeMessage } from '../models/payload'
import { ApiKinds, PostMessage, RawWorkerMessageEvent } from '../types'
import { apiInterfaceProxy } from '../utils/proxy'

export type ApiQueryKinds = Exclude<ApiKinds, 'tx'>

export type ClientQueryMessage<K = ApiQueryKinds> = K extends ApiQueryKinds
  ? {
      messageType: K
      module: keyof ProxyApi[K]
      path: string[]
      callId: string
      payload: AnyTuple
    }
  : never

export type WorkerQueryMessage<K = ApiQueryKinds> = K extends ApiQueryKinds
  ? {
      messageType: K
      callId: string
      payload: any
    }
  : never

export const query = <K extends ApiQueryKinds>(
  apiKind: K,
  messages: Observable<RawWorkerMessageEvent>,
  postMessage: PostMessage<ClientQueryMessage>
) => {
  const queryMessages = messages.pipe(
    filter(({ data }) => data.messageType === apiKind),
    deserializeMessage<WorkerQueryMessage<K>>(),
    share()
  )

  return apiInterfaceProxy<K>((module, ...path) => (...params) => {
    const callId = uniqueId(`${apiKind}.${String(module)}.${path.join('.')}.`)

    postMessage({
      messageType: apiKind,
      module,
      path,
      callId,
      payload: params,
    } as ClientQueryMessage<K>)

    return queryMessages.pipe(
      filter((message) => message.callId === callId),
      map(({ payload }) => payload),
      share()
    )
  })
}
