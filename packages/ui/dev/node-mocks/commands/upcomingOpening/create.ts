import { OpeningMetadata, WorkingGroupMetadataAction } from '@joystream/metadata-protobuf'
import Long from 'long'

import { metadataToBytes } from '../../../../src/common/model/JoystreamNode'
import members from '../../../../src/mocks/data/raw/members.json'
import { GroupIdName } from '../../../../src/working-groups/types'
import { signAndSend, withApi } from '../../lib/api'
import { createMembersCommand } from '../members/create'
import { applyOnOpeningCommand } from '../opening/apply'
import { addOpeningCommand } from '../opening/create'
import { fillOpeningCommand } from '../opening/fill'

const GROUP = 'membershipWorkingGroup' // TODO pass as a parameter

const addUpcomingOpeningCommand = async ({ group = GROUP }: { group?: GroupIdName } = {}) => {
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

  const alice = members[0]

  await withApi(async (api) => {
    const metadata = { addUpcomingOpening: { metadata: upcomingOpeningMetadata } }
    const tx = api.tx[group].setStatusText(metadataToBytes(WorkingGroupMetadataAction, metadata))

    await signAndSend(tx, alice.controllerAccount)
  })
}

const handler = async ({ group = GROUP }: { group?: GroupIdName } = {}) => {
  // Add members mock data
  await createMembersCommand()

  // Make Alice the group leader
  const openingId = await addOpeningCommand({ group })
  const applicationId = await applyOnOpeningCommand({ group, openingId })
  await fillOpeningCommand({ group, openingId, applicationId })

  // Alice adds an upcoming opening
  await addUpcomingOpeningCommand()
}

export const createUpcomingOpeningModule = {
  command: 'upcoming-opening:create',
  describe: 'Create new upcoming opening',
  handler,
}
