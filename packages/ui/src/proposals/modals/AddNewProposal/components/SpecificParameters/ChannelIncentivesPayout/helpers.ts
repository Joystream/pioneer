import * as multihash from 'multihashes'

export const calculateFileHash = async (file: File) => {
  const fileBuffer = new Uint8Array(await file.arrayBuffer())

  return multihash.toB58String(multihash.encode(fileBuffer, 'blake3'))
}
