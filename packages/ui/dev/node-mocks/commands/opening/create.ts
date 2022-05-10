import { OpeningMetadata } from '@joystream/metadata-protobuf'

import { getDataFromEvent, metadataToBytes } from '../../../../src/common/model/JoystreamNode'
import { GroupIdName } from '../../../../src/working-groups/types'
import { getSudoAccount } from '../../data/addresses'
import { signAndSend, withApi } from '../../lib/api'

const GROUP = 'membershipWorkingGroup' // TODO pass as a parameter

export const addOpeningCommand = async ({ group = GROUP }: { group?: GroupIdName } = {}) => {
  const title = `Test ${group} opening`

  const openingMetadata = {
    title,
    shortDescription: title,
    description: `# ${title}`,
    expectedEndingTimestamp: new Date().getTime() + 10000,
    hiringLimit: 1,
    applicationDetails: 'Details',
    applicationFormQuestions: [
      { question: 'Question 1?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXT },
      { question: 'Question 2?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXTAREA },
    ],
  }

  return await withApi(async (api) => {
    const tx = api.tx[group].addOpening(
      metadataToBytes(OpeningMetadata, openingMetadata),
      'Leader',
      { stake_amount: api.consts[group].minimumApplicationStake, leaving_unstaking_period: 360_000 },
      '1337'
    )

    const events = await signAndSend(api.tx.sudo.sudo(tx), getSudoAccount())

    return String(getDataFromEvent(events, group, 'OpeningAdded'))
  })
}

export const createOpeningModule = {
  command: 'opening:create',
  describe: 'Create new opening',
  handler: async () => {
    await addOpeningCommand()
  },
}
