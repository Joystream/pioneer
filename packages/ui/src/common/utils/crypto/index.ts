import { generateCommitmentFromPayloadFile } from '@joystream/js/content'
import { blake3 } from '@noble/hashes/blake3'
import { encode as encodeHash, toB58String } from 'multihashes'

// FROM Atlas 5e5f2fed Klaudiusz Dembler (2022-01-11 11:09): Giza: update content extrinsics, enable uploads (#1882)
export const hashFile = async (file: Blob): Promise<string> => {
  const fileBuffer = await file.arrayBuffer()
  const digest = blake3(new Uint8Array(fileBuffer))
  return toB58String(encodeHash(digest, 'blake3'))
}

export const merkleRootFromBinary = (file: Blob): Promise<string> => {
  // It should be `end + 1` because the second parametter of `Blob.start() is the "the first byte that will *not* be included"
  // (ref: https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice#end)
  const read = async (start: number, end: number) => new Uint8Array(await file.slice(start, end + 1).arrayBuffer())
  return generateCommitmentFromPayloadFile(read)
}
