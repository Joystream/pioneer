import { uniqueId } from 'lodash'
import { filter, firstValueFrom, fromEvent, Observable } from 'rxjs'

import { WorkerRequest, WorkerRequestType, WorkerResponse } from './utils'

let worker: Worker
let messages: Observable<MessageEvent<WorkerResponse>>

export const hashFile = computeInWorker('HASH_FILE')

export const merkleRootFromBinary = computeInWorker('MERKLE_ROOT')

function computeInWorker(type: WorkerRequestType) {
  return async (file: Blob): Promise<string> => {
    if (!worker) {
      worker = new Worker(new URL('./worker', import.meta.url), { type: 'module' })
      messages = fromEvent<MessageEvent<WorkerResponse>>(worker, 'message')
    }

    const request: WorkerRequest = { type, id: uniqueId(), file }
    const resultObservable = messages.pipe(filter(({ data }) => data.id === request.id))

    worker.postMessage(request)

    const { data } = await firstValueFrom(resultObservable)
    if (data.error) throw Error(data.value)
    return data.value
  }
}
