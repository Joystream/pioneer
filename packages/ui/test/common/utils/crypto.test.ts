import { generateJsonPayloadFromPayoutsVector, generateSerializedPayload } from '@joystream/js/content'
import { blake3 } from '@noble/hashes/blake3'
import { createTestKeyring } from '@polkadot/keyring'
import { encode as encodeHash, toB58String } from 'multihashes'

import { merkleRootFromBinary, hashFile } from '@/common/utils/crypto'

import { accountsMap } from '../../../dev/node-mocks/data/addresses'
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

  it('Polkadot signature', () => {
    const savedSignature =
      'e4 ae d1 a8 24 b1 fb f2 4f 36 4b 04 99 8d 53 e3 fb d1 6f 12 13 c7 89 a4 53 67 25 9c 45 a2 59 07 0e 32 1a ee 46 d5 4a f0 f2 30 db 64 4a b3 cb e4 cc c5 2c 37 eb 16 ad 80 58 bc a1 2e 13 d5 49 81'
    const saved = new Uint8Array(savedSignature.split(' ').map((byte) => parseInt(byte, 16)))

    const keyring = createTestKeyring()
    const keyPair = keyring.getPair(accountsMap.alice)
    const generated = keyPair.sign('foo')

    expect(keyPair.verify('foo', generated, keyPair.publicKey)).toBe(true)
    expect(keyPair.verify('bar', saved, keyPair.publicKey)).toBe(true)
  })
})

function stringifyU8A(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join(' ')
}
