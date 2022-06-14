import { ApplicationMetadata } from '@joystream/metadata-protobuf'
import { AnyNumber } from '@polkadot/types/types'

import { getDataFromEvent, metadataToBytes } from '../../../../src/common/model/JoystreamNode'
import memberData from '../../../../src/mocks/data/raw/members.json'
import { GROUP, GroupIdName } from '../../consts'
import { signAndSend, withApi } from '../../lib/api'

interface Params {
  openingId?: AnyNumber
  group?: GroupIdName
}

export const applyOnOpeningCommand = async ({ openingId = 0, group = GROUP }: Params = {}) =>
  await withApi(async (api) => {
    const alice = memberData[0]

    const tx = api.tx[group].applyOnOpening({
      member_id: alice.id,
      opening_id: openingId,
      role_account_id: alice.controllerAccount,
      reward_account_id: alice.controllerAccount,
      description: metadataToBytes(ApplicationMetadata, {}),
      stake_parameters: {
        stake: api.consts[group].minimumApplicationStake,
        staking_account_id: alice.controllerAccount,
      },
    })

    const events = await signAndSend(tx, alice.controllerAccount)

    return String(getDataFromEvent(events, group, 'AppliedOnOpening', 1))
  })
