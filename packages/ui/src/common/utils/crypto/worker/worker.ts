import { merkleRoot, hashFile } from '..'

export type RequestType = 'HASH_FILE' | 'MERKLE_ROOT'
export type Request = {
  type: RequestType
  id: string
  file: Blob
}

export type Response = {
  type: RequestType
  id: string
  value: string
  error?: boolean
}

self.onmessage = async ({ data: { type, id, file } }: MessageEvent<Request>) => {
  try {
    const response: Response = { type, id, value: await compute(type, file) }
    self.postMessage(response)
  } catch (error) {
    self.postMessage({ type, id, error: true, value: String(error) })
  }
}

const compute = async (type: RequestType, file: Blob): Promise<string> => {
  switch (type) {
    case 'HASH_FILE':
      return await hashFile(file)
    case 'MERKLE_ROOT':
      return await merkleRoot(file)
  }
}
