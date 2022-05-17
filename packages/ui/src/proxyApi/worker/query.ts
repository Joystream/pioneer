import { ApiRx } from '@polkadot/api'
import { invoke } from 'lodash'

import { ApiQueryKinds, ClientQueryMessage, WorkerQueryMessage } from '../client/query'
import { PostMessage } from '../types'

export const query = <K extends ApiQueryKinds>(
  apiKind: K,
  api: ApiRx,
  message: ClientQueryMessage<K>,
  postMessage: PostMessage<WorkerQueryMessage<K>>
) =>
  invoke(api[apiKind], [message.module, ...message.path], ...message.payload).subscribe((payload: any) => {
    postMessage({
      messageType: apiKind,
      callId: message.callId,
      payload,
    } as WorkerQueryMessage<K>)
  })
