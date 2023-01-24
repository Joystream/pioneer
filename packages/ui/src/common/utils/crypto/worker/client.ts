import { uniqueId } from 'lodash'
import { filter, firstValueFrom, fromEvent, Observable } from 'rxjs'

import { compute, WorkerRequest, WorkerRequestType, WorkerResponse } from './utils'

let worker: Worker
let messages: Observable<MessageEvent<WorkerResponse>>

const computeInWorker =
  (type: WorkerRequestType) =>
  async (file: Blob): Promise<string> => {
    if (!worker) {
      try {
        worker = new Worker(new URL('./worker', import.meta.url), { type: 'module' })
        messages = fromEvent<MessageEvent<WorkerResponse>>(worker, 'message')
      } catch {
        return compute(type, file)
      }
    }

    const request: WorkerRequest = { type, id: uniqueId(), file }
    const result = messages.pipe(filter(({ data }) => data.id === request.id))

    worker.postMessage(request)

    const { data } = await firstValueFrom(result)
    if (data.error) throw Error(data.value)
    return data.value
  }

export const hashFile = computeInWorker('HASH_FILE')

export const channelPayoutsComitmentFromPayload = computeInWorker('MERKLE_ROOT')
