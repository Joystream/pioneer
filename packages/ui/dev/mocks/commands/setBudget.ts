/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'
import yargs from 'yargs'

import { getSudoAccount } from '../data/addresses'
import { getApi, signAndSend } from '../lib/api'

async function budget(api: ApiPromise, budget: number) {
  console.log('============== Set budget')
  const setBudgetTx = api.tx.sudo.sudo(api.tx.membershipWorkingGroup.setBudget(budget))

  await signAndSend(setBudgetTx, getSudoAccount())
}

export const options = {
  b: { type: 'number', alias: 'budget', demandOption: true } as const,
}

type CommandOptions = yargs.InferredOptionTypes<typeof options>

export type SetBudgetArgs = yargs.Arguments<CommandOptions>

const setBudgetCommand = async (args: SetBudgetArgs) => {
  const api = await getApi()

  await budget(api, args.b)

  await api.disconnect()
}

export const setBudgetModule = {
  command: 'set-budget',
  describe: 'Add & confirm staking account',
  handler: setBudgetCommand,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
