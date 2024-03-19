import { blake2AsHex } from '@polkadot/util-crypto'

import { createType } from '@/common/model/createType'
import { calculateCommitment } from '@/council/model/calculateCommitment'

import { accountsMap } from '../../../dev/node-mocks/data/addresses'

const TEST_SALT = '0x16dfff7ba21922067a0c114de774424abcd5d60fc58658a35341c9181b09e94a'
const ACCOUNT = accountsMap.alice
const OPTION = '0'
const CYCLE = 1

describe('Model: calculateCommitment', () => {
  // These are the commitment and payload expected for: ALICE_ADDRESS, '0', TEST_SALT, 1
  const expectedCommitment = '0x3db26e2bd023ccf2d1167fd42d48cc76b1c1e5c1de9003f61e63ec6a337b91a2'

  const expectedPayload = new Uint8Array([
    212, 53, 147, 199, 21, 253, 211, 28, 97, 20, 26, 189, 4, 169, 159, 214, 130, 44, 133, 88, 133, 76, 205, 227, 154,
    86, 132, 231, 165, 109, 162, 125, 0, 0, 0, 0, 0, 0, 0, 0, 128, 22, 223, 255, 123, 162, 25, 34, 6, 122, 12, 17, 77,
    231, 116, 66, 74, 188, 213, 214, 15, 197, 134, 88, 163, 83, 65, 201, 24, 27, 9, 233, 74, 1, 0, 0, 0, 0, 0, 0, 0,
  ])

  it('calculateCommitment', () => {
    expect(calculateCommitment(accountsMap.alice, '0', TEST_SALT, 1)).toBe(expectedCommitment)
  })

  it('payload', () => {
    const accountPayload = createType('AccountId', ACCOUNT).toU8a()
    const optionPayload = createType('MemberId', Number.parseInt(OPTION)).toU8a()
    const saltPayload = createType('Bytes', TEST_SALT).toU8a()
    const cyclePayload = createType('u64', CYCLE).toU8a()

    const payload = Buffer.concat([accountPayload, optionPayload, saltPayload, cyclePayload])
    expect(new Uint8Array(payload)).toStrictEqual(expectedPayload)
  })

  // Verify that if given the correct payload blake2AsHex returned the correct commitment
  it('blake2AsHex', () => {
    expect(blake2AsHex(Buffer.from(expectedPayload))).toBe(expectedCommitment)
  })
})
