import { OpeningMetadata } from '@joystream/metadata-protobuf'
import { pick } from 'lodash'
import yargs from 'yargs'

import { createType } from '@/common/model/createType'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { isDefined } from '@/common/utils'

import { GROUP, GroupIdName } from '../../consts'
import { withApi } from '../../lib/api'
import { electCouncilCommand, electCouncilOptions } from '../council/elect'
import { approveProposal } from '../proposals/approve'
import { createProposal } from '../proposals/create'

const addOpeningOptions = pick(electCouncilOptions, 'blockTime')

type Args = yargs.InferredOptionTypes<typeof addOpeningOptions>
type Props = Partial<Args> & { group?: GroupIdName }

export const addOpeningCommand = async ({ group = GROUP, blockTime = MILLISECONDS_PER_BLOCK }: Props) => {
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
    const { minimumApplicationStake, minUnstakingPeriodLimit } = api.consts[group]
    const proposalDetails = createType('PalletProposalsCodexProposalDetails', {
      CreateWorkingGroupLeadOpening: {
        description: metadataToBytes(OpeningMetadata, openingMetadata),
        stakePolicy: { stakeAmount: minimumApplicationStake, leavingUnstakingPeriod: minUnstakingPeriodLimit },
        rewardPerBlock: '1337',
        group: 'membership',
      },
    })

    // 1. Elect a council
    await electCouncilCommand(api, { blockTime, replaceCurrent: false })

    // 2. Create a working lead opening proposal
    const [proposalId] = await createProposal(api, proposalDetails)
    if (!isDefined(proposalId)) throw 'Failed to create the proposal'

    // 3. Approve the proposal
    await approveProposal(api, proposalId)
  })
}

export const createOpeningModule = {
  command: 'opening:create',
  describe: 'Create new opening',
  handler: ({ blockTime }: Args) => addOpeningCommand({ blockTime }),
  builder: (argv: yargs.Argv<unknown>) => argv.options(addOpeningOptions),
}
