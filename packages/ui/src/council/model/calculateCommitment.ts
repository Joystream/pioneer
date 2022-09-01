import { blake2AsHex } from '@polkadot/util-crypto'

import { createType } from '../../common/model/createType'

export function calculateCommitment(accountId: string, optionId: string, salt: string, cycleId: number) {
  // See https://github.com/Joystream/joystream/blob/db3885858a7812377a19390968bdbf65221f0270/tests/integration-tests/src/fixtures/council/ElectCouncilFixture.ts#L62
  // Should mirror the runtime implementation:
  // https://github.com/Joystream/joystream/blob/db3885858a7812377a19390968bdbf65221f0270/runtime-modules/referendum/src/lib.rs#L638

  const accountPayload = createType('AccountId', accountId).toU8a()
  const optionPayload = createType('MemberId', Number.parseInt(optionId)).toU8a()
  const saltPayload = createType('Bytes', salt).toU8a()
  const cyclePayload = createType('u64', cycleId).toU8a()

  const payload = Buffer.concat([accountPayload, optionPayload, saltPayload, cyclePayload])
  return blake2AsHex(payload)
}
