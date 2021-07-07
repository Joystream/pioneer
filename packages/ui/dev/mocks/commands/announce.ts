/* eslint-disable no-console */
import yargs from 'yargs'

import { getAccount } from '../data/addresses'
import { signAndSend, withApi } from '../lib/api'
import { isStage } from '../lib/isStage'
import { controllerAccountOption, memberIdOption, stakingAccountOption } from '../lib/options'
import { wait } from '../lib/wait'

const options = {
  c: controllerAccountOption,
  s: stakingAccountOption,
  m: memberIdOption,
  voteStake: {
    type: 'number',
    default: 12_000,
    alias: 'v',
  },
} as const

type CommandOptions = yargs.InferredOptionTypes<typeof options>
export type AnnounceArgs = yargs.Arguments<CommandOptions>

const opening = async (args: AnnounceArgs) => {
  await withApi(async (api) => {
    await wait(() => isStage(api, 'Announcing'))

    const tx = api.tx.council.announceCandidacy(0, getAccount(args.s), getAccount(args.c), args.voteStake)

    await signAndSend(tx, getAccount(args.c))
  })
}

export const announceModule = {
  command: 'referendum:announce',
  describe: 'Announce candidacy in referendum',
  handler: opening,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
