/* eslint-disable no-console */
import yargs from 'yargs'

import { getAccount } from '../data/addresses'
import { signAndSend, withApi } from '../lib/api'
import { accountChoices } from '../lib/options'

const options = {
  from: {
    choices: accountChoices,
    alias: 'f',
    demand: true,
  },
  to: {
    choices: accountChoices,
    alias: 't',
    demand: true,
  },
  amount: {
    type: 'number',
    alias: 'a',
    demand: true,
  },
} as const

type CommandOptions = yargs.InferredOptionTypes<typeof options>
export type TransferArgs = yargs.Arguments<CommandOptions>

export const handler = async ({ amount, from, to }: TransferArgs) => {
  await withApi(async (api) => {
    const fromAccount = getAccount(from)
    const toAccount = getAccount(to)

    const tx = api.tx.balances.transfer(toAccount, amount)

    await signAndSend(tx, fromAccount)
  })
}

export const transferModule = {
  command: 'transfer',
  describe: 'Transfer tokens',
  handler,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
