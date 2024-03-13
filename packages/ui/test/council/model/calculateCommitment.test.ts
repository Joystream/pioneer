import { blake2AsHex } from '@polkadot/util-crypto'

import { calculateCommitment } from '@/council/model/calculateCommitment'

import { accountsMap } from '../../../dev/node-mocks/data/addresses'

describe('Model: calculateCommitment', () => {
  const aliceExpectedCommitment = '0x3db26e2bd023ccf2d1167fd42d48cc76b1c1e5c1de9003f61e63ec6a337b91a2'
  const bobExpectedCommitment = '0xf94e151db1bbcd27018ee12400b05b8d5ad495dc8d481421fdc366639d42be75'

  const TEST_SALT = '0x16dfff7ba21922067a0c114de774424abcd5d60fc58658a35341c9181b09e94a'
  const aliceCommitment = calculateCommitment(accountsMap.alice, '0', TEST_SALT, 1)
  const bobCommitment = calculateCommitment(accountsMap.bob, '0', TEST_SALT, 1)

  // This is the main test the 2 others are just for debugging in case this is failing
  it('calculateCommitment', () => {
    expect(aliceCommitment).toBe(aliceExpectedCommitment)
    expect(bobCommitment).toBe(bobExpectedCommitment)
  })

  // This is the payload of: ALICE_ADDRESS, '0', TEST_SALT, 1
  const aliceVotePayload = Buffer.from(
    new Uint8Array([
      0xd4, 0x35, 0x93, 0xc7, 0x15, 0xfd, 0xd3, 0x1c, 0x61, 0x14, 0x1a, 0xbd, 0x4, 0xa9, 0x9f, 0xd6, 0x82, 0x2c, 0x85,
      0x58, 0x85, 0x4c, 0xcd, 0xe3, 0x9a, 0x56, 0x84, 0xe7, 0xa5, 0x6d, 0xa2, 0x7d, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
      0x0, 0x80, 0x16, 0xdf, 0xff, 0x7b, 0xa2, 0x19, 0x22, 0x6, 0x7a, 0xc, 0x11, 0x4d, 0xe7, 0x74, 0x42, 0x4a, 0xbc,
      0xd5, 0xd6, 0xf, 0xc5, 0x86, 0x58, 0xa3, 0x53, 0x41, 0xc9, 0x18, 0x1b, 0x9, 0xe9, 0x4a, 0x1, 0x0, 0x0, 0x0, 0x0,
      0x0, 0x0, 0x0,
    ])
  )

  // If this fails => something is wrong with the payload generation
  it('payload', () => {
    expect(blake2AsHex(aliceVotePayload)).toBe(aliceCommitment)
  })

  // If this fails => something is wrong with the blake2AsHex function
  it('blake2AsHex', () => {
    expect(blake2AsHex(aliceVotePayload)).toBe(aliceExpectedCommitment)
  })
})
