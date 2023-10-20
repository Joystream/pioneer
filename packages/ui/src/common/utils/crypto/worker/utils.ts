import { merkleRootFromBinary, hashFile, maybeDecompressRuntimeBlob } from '..'

export type WorkerRequestType = 'HASH_FILE' | 'MERKLE_ROOT' | 'DECOMPRESS_RUNTIME'
export type WorkerRequest = {
  type: WorkerRequestType
  id: string
  file: Blob | ArrayBuffer
}

export type WorkerResponse = {
  type: WorkerRequestType
  id: string
  value: any
  error?: boolean
}

export async function compute(type: WorkerRequestType, file: Blob | ArrayBuffer): Promise<any> {
  switch (type) {
    case 'HASH_FILE':
      return await hashFile(file as Blob)
    case 'MERKLE_ROOT':
      return await merkleRootFromBinary(file as Blob)
    case 'DECOMPRESS_RUNTIME':
      return await maybeDecompressRuntimeBlob(file as ArrayBuffer)
  }
}
