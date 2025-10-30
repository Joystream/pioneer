import { generateCommitmentFromPayloadFile } from '@joystream/js/content'
import { blake3 } from '@noble/hashes/blake3'
import { ZstdInit } from '@oneidentity/zstd-js/decompress'
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

// https://github.com/paritytech/substrate/blob/master/primitives/maybe-compressed-blob/src/lib.rs
// Convert blob to Buffer type to make it easier work with (compare|subarray),
// although it is adding a copy step.
// Looks for 8-byte magic prefix in blob to determine if it is compressed with zstd algorithm.
// If compressed, strips the prefix and decompresses remaining bytes returning
// decompressed value, otherwise returns original blob.
export const maybeDecompressRuntimeBlob = async (blob: ArrayBuffer): Promise<Buffer | Uint8Array> => {
  const ZSTD_PREFIX = Buffer.from([82, 188, 83, 118, 70, 219, 142, 5])
  let wasm: Buffer | Uint8Array = Buffer.from(blob)
  const prefix = wasm.subarray(0, 8)
  const isCompressed = Buffer.compare(prefix, ZSTD_PREFIX) === 0
  if (isCompressed) {
    const { ZstdStream } = await ZstdInit()
    // strip the prefix and decompress the rest
    wasm = ZstdStream.decompress(wasm.subarray(8))
  }
  return wasm
}
