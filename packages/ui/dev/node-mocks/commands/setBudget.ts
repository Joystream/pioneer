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
    const budgetTx = api.tx.membershipWorkingGroup.setBudget(budget)

    const tx = api.tx.sudo.sudo(budgetTx)

    await signAndSend(tx, getSudoAccount(), budgetTx)
  })
}

export const setBudgetModule = {
  command: 'set-budget',
  describe: 'Set membership working group budget',
  handler: setBudgetCommand,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
