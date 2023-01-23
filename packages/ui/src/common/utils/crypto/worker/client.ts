import { uniqueId } from 'lodash'
import { filter, firstValueFrom, fromEvent, Observable } from 'rxjs'

import type { Request, RequestType, Response } from './worker'

let worker: Worker
let messages: Observable<MessageEvent<Response>>

const compute =
  (type: RequestType) =>
  async (file: Blob): Promise<string> => {
    if (!worker) {
      worker = new Worker(new URL('./worker', import.meta.url), { type: 'module' })
      messages = fromEvent<MessageEvent<Response>>(worker, 'message')
    }

    const request: Request = { type, id: uniqueId(), file }
    const result = messages.pipe(filter(({ data }) => data.id === request.id))

    worker.postMessage(request)
    return firstValueFrom(result).then(({ data: { error, value } }) => {
      if (error) {
        throw Error(value)
      }
      return value
    })
  }

export const hashFile = compute('HASH_FILE')

export const channelPayoutsComitmentFromPayload = compute('MERKLE_ROOT')
