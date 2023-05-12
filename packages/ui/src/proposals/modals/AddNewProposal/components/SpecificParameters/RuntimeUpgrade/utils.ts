import { ZstdInit } from '@oneidentity/zstd-js/decompress'

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
