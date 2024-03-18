import { readFileSync } from 'fs'

import { generateJsonPayloadFromPayoutsVector, generateSerializedPayload } from '@joystream/js/content'
import { blake3 } from '@noble/hashes/blake3'
import { createTestKeyring } from '@polkadot/keyring'
import { encode as encodeHash, toB58String } from 'multihashes'

import { merkleRootFromBinary, hashFile } from '@/common/utils/crypto'

import { accountsMap } from '../../../dev/node-mocks/data/addresses'
import ChannelPayoutsVector from '../../_mocks/proposals/ChannelPayoutsVector.json'

describe('Utils: Crypto', () => {
  const expectSerializedPayload = new Uint8Array(readFileSync('test/_mocks/proposals/SerializedChannelPayouts.bin'))

  const [commitment, channelPayouts] = generateJsonPayloadFromPayoutsVector(ChannelPayoutsVector)
  const generatedSerializedPayload = generateSerializedPayload(channelPayouts)

  const fileFromExpectedPayload = new Blob([expectSerializedPayload])
  const fileFromGeneratedPayload = new Blob([generatedSerializedPayload])

  it('Merkle root from binary file', async () => {
    expect(await merkleRootFromBinary(fileFromGeneratedPayload)).toBe(commitment)

    // const expectedCommitment = '0xbefab4c53ab253d6d5b160ee75856304d67442f8bcd84dc7cbedd0ed613d750f'
    // expect(await merkleRootFromBinary(fileFromExpectedPayload)).toBe(expectedCommitment)
    // expect(commitment).toBe(expectedCommitment)
  })

  it.skip('serializedPayload', () => {
    // TODO generatedSerializedPayload should be a Uint8Array, ATM it is a Buffer (despite what the type says).
    expect(new Uint8Array(generatedSerializedPayload)).toStrictEqual(expectSerializedPayload)
  })

  it('File hash', async () => {
    expect(await hashFile(new Blob(['foo']))).toBe('gVwzhfDKQjym61HfkEEQr1tZtNH6Lwk52eziQLVdmRriit')
    expect(await hashFile(fileFromExpectedPayload)).toBe('gW22Sg9hMpHzog1XGwPAM7pz4As1NHDKuRoQvUpDybR6W5')
    // expect(await hashFile(fileFromGeneratedPayload)).toBe('gW22Sg9hMpHzog1XGwPAM7pz4As1NHDKuRoQvUpDybR6W5')
  })

  it('Blake3', () => {
    const digest = blake3(new Uint8Array([1, 2, 3]))
    const hashBytes = encodeHash(digest, 'blake3')
    const hashB58 = toB58String(hashBytes)

    expect(digest).toStrictEqual(
      new Uint8Array([
        177, 119, 236, 27, 242, 109, 251, 59, 112, 16, 212, 115, 230, 212, 71, 19, 178, 155, 118, 91, 153, 198, 230, 14,
        203, 250, 231, 66, 222, 73, 101, 67,
      ])
    )
    expect(hashBytes).toStrictEqual(
      new Uint8Array([
        30, 32, 177, 119, 236, 27, 242, 109, 251, 59, 112, 16, 212, 115, 230, 212, 71, 19, 178, 155, 118, 91, 153, 198,
        230, 14, 203, 250, 231, 66, 222, 73, 101, 67,
      ])
    )
    expect(hashB58).toBe('gW9cRVpYEEwRnkdZR5ibFPDssBHBNJDHYo6rJNrhTeanjt')
  })

  it('Polkadot signature', () => {
    const keyring = createTestKeyring()
    const keyPair = keyring.getPair(accountsMap.alice)
    const generated = keyPair.sign('foo')

    const saved = new Uint8Array([
      228, 174, 209, 168, 36, 177, 251, 242, 79, 54, 75, 4, 153, 141, 83, 227, 251, 209, 111, 18, 19, 199, 137, 164, 83,
      103, 37, 156, 69, 162, 89, 7, 14, 50, 26, 238, 70, 213, 74, 240, 242, 48, 219, 100, 74, 179, 203, 228, 204, 197,
      44, 55, 235, 22, 173, 128, 88, 188, 161, 46, 19, 213, 73, 129,
    ])

    expect(keyPair.verify('foo', generated, keyPair.publicKey)).toBe(true)
    expect(keyPair.verify('bar', saved, keyPair.publicKey)).toBe(true)
  })
})
