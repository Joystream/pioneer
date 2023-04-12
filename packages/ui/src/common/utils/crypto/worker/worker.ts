import { compute, WorkerRequest, WorkerResponse } from './utils'

self.onmessage = async ({ data: { type, id, file } }: MessageEvent<WorkerRequest>) => {
  try {
    const response: WorkerResponse = { type, id, value: await compute(type, file) }
    self.postMessage(response)
  } catch (error) {
    self.postMessage({ type, id, error: true, value: String(error) })
  }
}
