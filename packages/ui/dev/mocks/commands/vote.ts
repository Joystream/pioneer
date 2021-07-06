/* eslint-disable no-console */
import { blake2AsHex } from '@polkadot/util-crypto'
import chalk from 'chalk'
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
  o: {
    type: 'string',
    default: '0',
    alias: 'openingId',
  } as const,
  voteStake: {
    type: 'number',
    default: 12_000,
    alias: 'v',
  },
} as const

type CommandOptions = yargs.InferredOptionTypes<typeof options>
export type VoteArgs = yargs.Arguments<CommandOptions>

const opening = async (args: VoteArgs) => {
  await withApi(async (api) => {
    const stage = await api.query.referendum.stage()

    await wait(() => isStage(api, 'Voting'))

    if (!stage.isVoting) {
      console.log(`${chalk.red('Cannot vote!')} Current stage is: ${chalk.blue(stage.type)}`)

      return
    }

    const cycleId = stage.asVoting.current_cycle_id

    const accountId = api.createType('AccountId', args.c)
    const optionId = api.createType('Option<U8>', args.m)
    const salt = api.createType('Bytes', `salt${0}`)

    const payload = Buffer.concat([accountId.toU8a(), optionId.toU8a(), salt.toU8a(), cycleId.toU8a()])
    const commitment = blake2AsHex(payload)
    const tx = api.tx.referendum.vote(commitment, args.voteStake)

    await signAndSend(tx, getAccount(args.c))
  })
}

export const voteModule = {
  command: 'referendum:vote',
  describe: 'Vote in referendum',
  handler: opening,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
