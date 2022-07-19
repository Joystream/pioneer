/* eslint-disable no-console */
import { BountyMetadata } from '@joystream/metadata-protobuf'

import { createType } from '../../../../src/common/model/createType'
import { getDataFromEvent, metadataToBytes } from '../../../../src/common/model/JoystreamNode'
import memberData from '../../../../src/mocks/data/raw/members.json'
import { signAndSend, withApi } from '../../lib/api'

export const createBountyCommand = async () => {
  await withApi(async (api) => {
    const aliceMember = memberData[0]
    const bobMember = memberData[0]

    const bountyParameters = createType('BountyCreationParameters', {
      oracle: createType('BountyActor', {
        Member: createType('MemberId', Number(aliceMember.id)),
      }),
      contract_type: createType('AssuranceContractType', {
        Open: null,
      }),
      creator: createType('BountyActor', {
        Member: createType('MemberId', Number(bobMember.id)),
      }),
      cherry: api.consts.bounty.minCherryLimit,
      entrantStake: api.consts.bounty.minWorkEntrantStake,
      fundingType: createType('FundingType', {
        Perpetual: createType('FundingType_Perpetual', {
          target: api.consts.bounty.minFundingLimit,
        }),
      }),
      workPeriod: createType('u32', 11),
      judgingPeriod: createType('u32', 12),
    })

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

    // TODO fix in bounty v2
    // const bountyId = Number(getDataFromEvent(events, 'bounty', 'BountyCreated'))
    // const bountyData = getDataFromEvent(events, 'bounty', 'BountyCreated', 1)
    // console.log({ bountyId, ...bountyData?.toJSON() })
  })
}

export const createBountyModule = {
  command: 'bounty:create',
  describe: 'Create bounty',
  handler: createBountyCommand,
}
