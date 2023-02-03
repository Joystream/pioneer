import { merkleRootFromBinary, hashFile } from '..'

export type WorkerRequestType = 'HASH_FILE' | 'MERKLE_ROOT'
export type WorkerRequest = {
  type: WorkerRequestType
  id: string
  file: Blob
}

export type WorkerResponse = {
  type: WorkerRequestType
  id: string
  value: string
  error?: boolean
}

export const compute = async (type: WorkerRequestType, file: Blob): Promise<string> => {
  switch (type) {
    case 'HASH_FILE':
      return await hashFile(file)
    case 'MERKLE_ROOT':
      return await merkleRootFromBinary(file)
  }
}
