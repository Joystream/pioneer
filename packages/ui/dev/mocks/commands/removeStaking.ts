/* eslint-disable no-console */
import yargs from 'yargs'

import { getAccount } from '../data/addresses'
import { signAndSend, withApi } from '../lib/api'
import { memberIdOption, stakingAccountOption } from '../lib/options'

const options = {
  s: stakingAccountOption,
  m: memberIdOption,
}

type CommandOptions = yargs.InferredOptionTypes<typeof options>
export type RemoveStakingAccountArgs = yargs.Arguments<CommandOptions>

export const removeStakingAccountCommand = async (args: RemoveStakingAccountArgs) => {
  const account = getAccount(args.s)
  const memberId = args.m

  await withApi(async (api) => {
    console.log('============== Remove staking')
    const removeStakingTx = api.tx.members.removeStakingAccount(memberId)

    await signAndSend(removeStakingTx, account)
  })
}

export const removeStakingAccountModule = {
  command: 'remove-staking-account',
  describe: 'Remove staking account',
  handler: removeStakingAccountCommand,
  builder: (argv: yargs.Argv) => argv.options(options),
}
