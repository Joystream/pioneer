import { generateJsonPayloadFromPayoutsVector, generateSerializedPayload } from '@joystream/js/content'
import { blake3 } from '@noble/hashes/blake3'
import { encode as encodeHash, toB58String } from 'multihashes'

import { merkleRootFromBinary, hashFile } from '@/common/utils/crypto'

import ChannelPayoutsVector from '../../_mocks/proposals/ChannelPayoutsVector.json'

describe('Utils: Crypto', () => {
  const [commitment, channelPayouts] = generateJsonPayloadFromPayoutsVector(ChannelPayoutsVector)
  const serializedPayload = generateSerializedPayload(channelPayouts)
  const file = new Blob([serializedPayload])

  it('Merkle root from binary file', async () => {
    expect(await merkleRootFromBinary(file)).toBe(commitment)
  })

  it('File hash', async () => {
    expect(await hashFile(new Blob(['foo']))).toBe('gVwzhfDKQjym61HfkEEQr1tZtNH6Lwk52eziQLVdmRriit')
    expect(await hashFile(file)).toBe('gW22Sg9hMpHzog1XGwPAM7pz4As1NHDKuRoQvUpDybR6W5')
  })

  it('Blake3', () => {
    const digest = blake3(new Uint8Array([1, 2, 3]))
    const hashBytes = encodeHash(digest, 'blake3')
    const hashB58 = toB58String(hashBytes)

    expect(stringifyU8A(digest)).toBe(
      'b1 77 ec 1b f2 6d fb 3b 70 10 d4 73 e6 d4 47 13 b2 9b 76 5b 99 c6 e6 0e cb fa e7 42 de 49 65 43'
    )
    expect(stringifyU8A(hashBytes)).toBe(
      '1e 20 b1 77 ec 1b f2 6d fb 3b 70 10 d4 73 e6 d4 47 13 b2 9b 76 5b 99 c6 e6 0e cb fa e7 42 de 49 65 43'
    )
    expect(hashB58).toBe('gW9cRVpYEEwRnkdZR5ibFPDssBHBNJDHYo6rJNrhTeanjt')
  })
})

function stringifyU8A(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join(' ')
}
