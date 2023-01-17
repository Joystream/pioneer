import { verifyChannelPayoutProof } from '@joystream/js/content'
import { ChannelPayoutsMetadata } from '@joystream/metadata-protobuf'
import { Reader, Writer } from 'protobufjs'

export const channelPayoutsComitmentFromPayload = (payload: Blob): Promise<string> => {
  // It should be `end + 1` because the second parametter of `Blob.start() is the "the first byte that will *not* be included"
  // (ref: https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice#end)
  const read = async (start: number, end: number) => new Uint8Array(await payload.slice(start, end + 1).arrayBuffer())
  return generateCommitmentFromPayloadFile(read)
}

// TODO patch these changes in @joystream/js:

type ReadBytes = (start: number, end: number) => Promise<Uint8Array>

/**
 * Generate merkle root from the serialized payload
 * @param read getter which returns the requested sequence of bytes
 * @returns merkle root of the cashout vector
 */
async function generateCommitmentFromPayloadFile(read: ReadBytes): Promise<string> {
  const serializedHeader = await serializedPayloadHeader(read)
  const header = ChannelPayoutsMetadata.Header.decode(serializedHeader)

  // Any payout Proof can be used to generate the merkle root,
  // here first Proof from channel payouts payload is used
  const ProofByteOffset = Number(header.channelPayoutByteOffsets.shift()?.byteOffset)
  const proof = await channelPayoutProofAtByteOffset(read, ProofByteOffset)
  return verifyChannelPayoutProof(proof)
}

/**
 * calculates byte length of message `size` - encoded as varint. Protobuf encodes the
 * message as `varint_encoded_message_size+serialized_message` e.g., for serialized
 * message of 10 bytes, protobuf encoded message would look like: `0a+0b0c0d0e0f1a1b1c1d1e`.
 * Since `size` of example message is encoded in 1 byte so the function will return 1.
 * @param protobufMessageLength length of serialized message in number of bytes
 * @return length of varint encoded message size in number of bytes
 */
function lengthOfVarintEncodedMessageSize(protobufMessageLength: number): number {
  return Writer.create().uint32(protobufMessageLength).finish().byteLength
}

/**
 * We don't have any prior knowledge of how many bytes are used to encode the size information of the message,
 * so we arbitrary read `n` bytes from the payload based on the assumption that the size of the header CAN BE
 * encoded in `n` bytes. For reference, if serialized message is over 4 TB then its size information can be
 * encoded in just 6 bytes
 * @param read getter which returns the requested sequence of bytes
 * @param messageOffset byte offset of message in serialized payload
 * @returns length of serialized message in number of bytes
 */
async function lengthOfProtobufMessage(read: ReadBytes, messageOffset: number): Promise<number> {
  // TODO: improve the implementation by reading size info byte by byte
  // TODO: and checking most significant bit (msb) of each byte.
  const arbitraryBytes = await read(messageOffset, messageOffset + 10)
  const lengthOfMessage = Reader.create(arbitraryBytes).uint32()
  return lengthOfMessage
}

/**
 * Get serialized payload header from a local file.
 * @param read getter which returns the requested sequence of bytes
 * @return bytes of payload header
 **/
async function serializedPayloadHeader(read: ReadBytes): Promise<Uint8Array> {
  // skip the first byte which is the Tag(key) of `Header` message
  const lengthOfSerializedHeader = await lengthOfProtobufMessage(read, 1)
  const lengthOfVarintEncodedHeaderSize = lengthOfVarintEncodedMessageSize(lengthOfSerializedHeader)
  const serializedHeader = await read(
    1 + lengthOfVarintEncodedHeaderSize,
    lengthOfVarintEncodedHeaderSize + lengthOfSerializedHeader
  )

  return serializedHeader
}

/**
 * Get channel payout Proof from local serialized payload file.
 * @param read getter which returns the requested sequence of bytes
 * @param byteOffset byte offset of channel payout Proof in serialized payload
 * @return channel payout Proof
 **/
async function channelPayoutProofAtByteOffset(
  read: ReadBytes,
  byteOffset: number
): Promise<ChannelPayoutsMetadata.Body.ChannelPayoutProof> {
  const lengthOfSerializedProof = await lengthOfProtobufMessage(read, byteOffset)
  const lengthOfVarintEncodedProofSize = lengthOfVarintEncodedMessageSize(lengthOfSerializedProof)
  const serializedPayoutProof = await read(
    byteOffset + lengthOfVarintEncodedProofSize,
    byteOffset + lengthOfSerializedProof + 1
  )
  const proof = ChannelPayoutsMetadata.Body.ChannelPayoutProof.decode(serializedPayoutProof)
  return proof
}
