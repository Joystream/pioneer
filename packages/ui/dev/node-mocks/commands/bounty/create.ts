/* eslint-disable no-console */
import { BountyMetadata } from '@joystream/metadata-protobuf'
import { createType } from '@joystream/types'
import {
  AssuranceContractType,
  BountyActor,
  BountyCreationParameters,
  FundingType,
  FundingType_Perpetual,
} from '@joystream/types/augment'
import { MemberId } from '@joystream/types/common'

import { getDataFromEvent, metadataToBytes } from '../../../../src/common/model/JoystreamNode'
import memberData from '../../../../src/mocks/data/raw/members.json'
import { signAndSend, withApi } from '../../lib/api'

export const createBountyCommand = async () => {
  await withApi(async (api) => {
    const aliceMember = memberData[0]
    const bobMember = memberData[0]

    const bountyParameters = createType<BountyCreationParameters, 'BountyCreationParameters'>(
      'BountyCreationParameters',
      {
        oracle: createType<BountyActor, 'BountyActor'>('BountyActor', {
          Member: createType<MemberId, 'MemberId'>('MemberId', Number(aliceMember.id)),
        }),
        contract_type: createType<AssuranceContractType, 'AssuranceContractType'>('AssuranceContractType', {
          Open: null,
        }),
        creator: createType<BountyActor, 'BountyActor'>('BountyActor', {
          Member: createType<MemberId, 'MemberId'>('MemberId', Number(bobMember.id)),
        }),
        cherry: api.consts.bounty.minCherryLimit,
        entrant_stake: api.consts.bounty.minWorkEntrantStake,
        funding_type: createType<FundingType, 'FundingType'>('FundingType', {
          Perpetual: createType<FundingType_Perpetual, 'FundingType_Perpetual'>('FundingType_Perpetual', {
            target: api.consts.bounty.minFundingLimit,
          }),
        }),
        work_period: createType('u32', 11),
        judging_period: createType('u32', 12),
      }
    )

    const tx = api.tx.bounty.createBounty(
      bountyParameters,
      metadataToBytes(BountyMetadata, {
        title: 'Bounty test',
        description: 'Commodo aliquip cillum sint cillum ut dolore ea esse veniam.',
        bannerImageUri: 'https://picsum.photos/500/300',
        discussionThread: undefined,
      })
    )

    const events = await signAndSend(tx, aliceMember.controllerAccount)

    const bountyId = Number(getDataFromEvent(events, 'bounty', 'BountyCreated'))
    const bountyData = getDataFromEvent(events, 'bounty', 'BountyCreated', 1)
    console.log({ bountyId, ...bountyData?.toJSON() })
  })
}

export const createBountyModule = {
  command: 'bounty:create',
  describe: 'Create bounty',
  handler: createBountyCommand,
}
