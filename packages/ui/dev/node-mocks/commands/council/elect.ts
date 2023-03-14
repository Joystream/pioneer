import yargs from 'yargs'

import { MILLISECONDS_PER_BLOCK } from '../../../../src/common/model/formatters'
import { nextCouncilStageCommand } from '../../../helpers/nextCouncilStage'
import { withApi } from '../../lib/api'
import { createMembersCommand } from '../members/create'

import { announceCandidaciesCommand } from './announce'
import { revealVotesCommand } from './reveal'
import { castVotesCommand } from './vote'

const options = {
  blockTime: {
    number: true,
    default: MILLISECONDS_PER_BLOCK,
    alias: 'd',
  },
  to: {
    choices: ['VOTE', 'REVEAL', 'IDLE'],
    default: 'IDLE',
    alias: 't',
  },
}

export const electCouncilModule = {
  command: 'council:elect',
  describe: 'Elect a full council',
  handler: async ({ blockTime, to }: yargs.InferredOptionTypes<typeof options>) => {
    await createMembersCommand()
    await withApi(async (api) => {
      await announceCandidaciesCommand(api)
      if (to === 'VOTE') return
      await nextCouncilStageCommand(api, blockTime)

      await castVotesCommand(api)
      if (to === 'REVEAL') return
      await nextCouncilStageCommand(api, blockTime)

      await revealVotesCommand(api)
    })
  },
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
