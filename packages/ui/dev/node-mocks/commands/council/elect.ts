import yargs from 'yargs'

import { MILLISECONDS_PER_BLOCK } from '../../../../src/common/model/formatters'
import { nextCouncilStageCommand } from '../../../helpers/nextCouncilStage'
import { withApi } from '../../lib/api'
import { createMembersCommand } from '../members/create'

import { announceCandidaciesCommand } from './announce'
import { revealVotesCommand } from './reveal'
import { castVotesCommand } from './vote'

const options = {
  blockLength: {
    number: true,
    default: MILLISECONDS_PER_BLOCK,
    alias: 'd',
  },
}

export const electCouncilModule = {
  command: 'council:elect',
  describe: 'Elect a full council',
  handler: async ({ blockLength }: yargs.InferredOptionTypes<typeof options>) => {
    await createMembersCommand()
    await withApi(async (api) => {
      await announceCandidaciesCommand(api)
      await nextCouncilStageCommand(api, blockLength)
      await castVotesCommand(api)
      await nextCouncilStageCommand(api, blockLength)
      await revealVotesCommand(api)
    })
  },
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
