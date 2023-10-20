import { uniqueId } from 'lodash'
import { filter, firstValueFrom, fromEvent, Observable } from 'rxjs'

import { WorkerRequest, WorkerRequestType, WorkerResponse } from './utils'

let worker: Worker
let messages: Observable<MessageEvent<WorkerResponse>>

export const hashFile = computeInWorker('HASH_FILE')

export const merkleRootFromBinary = computeInWorker('MERKLE_ROOT')

export const maybeDecompressRuntimeBlob = computeInWorker('DECOMPRESS_RUNTIME')

function computeInWorker(type: 'HASH_FILE' | 'MERKLE_ROOT'): (file: Blob) => Promise<string>
function computeInWorker(type: 'DECOMPRESS_RUNTIME'): (file: ArrayBuffer) => Promise<Buffer | Uint8Array>
function computeInWorker(type: WorkerRequestType): (file: any) => Promise<any> {
  return async (file) => {
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
