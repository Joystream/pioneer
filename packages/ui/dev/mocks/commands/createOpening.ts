/* eslint-disable no-console */
import { OpeningMetadata } from '@joystream/metadata-protobuf'

import { metadataToBytes } from '../../../src/common/model/JoystreamNode'
import { getSudoAccount } from '../data/addresses'
import { signAndSend, withApi } from '../lib/api'

const opening = async () => {
  await withApi(async (api) => {
    const tx = api.tx.membershipWorkingGroup.addOpening(
      metadataToBytes(OpeningMetadata, {
        shortDescription: 'Test opening',
        description: '# Test opening',
        expectedEndingTimestamp: new Date().getTime() + 10000,
        hiringLimit: 1,
        applicationDetails: 'Details',
        applicationFormQuestions: [
          { question: 'Question 1?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXT },
          { question: 'Question 2?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXTAREA },
        ],
      }),
      'Leader',
      { stake_amount: 10_000, leaving_unstaking_period: 360_000 },
      '1337'
    )

    await signAndSend(api.tx.sudo.sudo(tx), getSudoAccount())
  })
}

export const createOpeningModule = {
  command: 'opening:create',
  describe: 'Create new opening in Membership Working Group',
  handler: opening,
}
