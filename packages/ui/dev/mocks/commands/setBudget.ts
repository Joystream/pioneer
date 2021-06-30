/* eslint-disable no-console */
import yargs from 'yargs'

import { getSudoAccount } from '../data/addresses'
import { signAndSend, withApi } from '../lib/api'

const options = {
  b: { type: 'number', alias: 'budget', demandOption: true } as const,
}

type CommandOptions = yargs.InferredOptionTypes<typeof options>

export type SetBudgetArgs = yargs.Arguments<CommandOptions>

const setBudgetCommand = async (args: SetBudgetArgs) => {
  const budget = args.b

  await withApi(async (api) => {
    console.log('============== Set budget')
    const setBudgetTx = api.tx.sudo.sudo(api.tx.membershipWorkingGroup.setBudget(budget))

    await signAndSend(setBudgetTx, getSudoAccount())
  })
}

export const setBudgetModule = {
  command: 'set-budget',
  describe: 'Add & confirm staking account',
  handler: setBudgetCommand,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
