import { OpeningMetadata, WorkingGroupMetadataAction } from '@joystream/metadata-protobuf'
import Long from 'long'

import { metadataToBytes } from '../../../../src/common/model/JoystreamNode'
import members from '../../../../src/mocks/data/raw/members.json'
import { GROUP, GroupIdName } from '../../consts'
import { signAndSend, withApi } from '../../lib/api'
import { setLeadCommand } from '../setLead'

const getUpcomingOpeningMetadata = ({ group = GROUP }: { group?: GroupIdName } = {}) => {
  const title = `Test ${group} upcoming opening`

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

  const upcomingOpeningMetadata = {
    expectedStart: 100_000_000_000_000,
    rewardPerBlock: Long.fromNumber(1000, true),
    minApplicationStake: Long.fromNumber(10_000, true),
    metadata: openingMetadata,
  }

  const metadata = { addUpcomingOpening: { metadata: upcomingOpeningMetadata } }

  return metadataToBytes(WorkingGroupMetadataAction, metadata)
}

const handler = async ({ group = GROUP }: { group?: GroupIdName } = {}) => {
  // Make Alice the group leader
  setLeadCommand({ group })

  // Alice adds an upcoming opening
  await withApi(async (api) => {
    const metadata = getUpcomingOpeningMetadata({ group })
    const alice = members[0]

    const tx = api.tx[group].setStatusText(metadata)
    await signAndSend(tx, alice.controllerAccount)
  })
}

export const createUpcomingOpeningModule = {
  command: 'upcoming-opening:create',
  describe: 'Create new upcoming opening',
  handler,
}
