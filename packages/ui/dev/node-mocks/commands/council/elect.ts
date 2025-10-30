import { ApiPromise } from '@polkadot/api'
import yargs from 'yargs'

import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'

import { nextCouncilStageCommand } from '../../../helpers/nextCouncilStage'
import { withApi } from '../../lib/api'

import { announceCandidaciesCommand } from './announce'
import { revealVotesCommand } from './reveal'
import { castVotesCommand } from './vote'

export const electCouncilOptions = {
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

type Args = yargs.InferredOptionTypes<typeof electCouncilOptions>
type Props = Partial<Args> & { replaceCurrent?: boolean }

export const electCouncilCommand = async (
  api: ApiPromise,
  { blockTime = MILLISECONDS_PER_BLOCK, to = 'IDLE', replaceCurrent = true }: Props
) => {
  if (!replaceCurrent) {
    const councilors = await api.query.council.councilMembers()
    if (councilors.length > 0) return
  }

  await announceCandidaciesCommand(api)
  await nextCouncilStageCommand(api, blockTime)
  if (to === 'VOTE') return

  await castVotesCommand(api)
  await nextCouncilStageCommand(api, blockTime)
  if (to === 'REVEAL') return

  await revealVotesCommand(api)
  await nextCouncilStageCommand(api, blockTime)
}

export const electCouncilModule = {
  command: 'council:elect',
  describe: 'Elect a full council',
  handler: ({ blockTime, to }: Args) => withApi((api) => electCouncilCommand(api, { blockTime, to })),
  builder: (argv: yargs.Argv<unknown>) => argv.options(electCouncilOptions),
}
