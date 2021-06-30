/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'
import yargs from 'yargs'

import { getAccount } from '../data/addresses'
import { getApi, signAndSend } from '../lib/api'

import { memberIdOption, stakingAccountOption } from './addStakingAccount'

async function removeStakingAccount(api: ApiPromise, account: string, memberId: string) {
  console.log('============== Remove staking')
  const removeStakingTx = api.tx.members.removeStakingAccount(memberId)

  await signAndSend(removeStakingTx, account)
}

export const removeStakingOptions = {
  s: stakingAccountOption,
  m: memberIdOption,
}

export type RemoveStakingAccountCommandOptions = yargs.InferredOptionTypes<typeof removeStakingOptions>
export type RemoveStakingAccountArgs = yargs.Arguments<RemoveStakingAccountCommandOptions>

export const removeStakingAccountCommand = async (args: RemoveStakingAccountArgs) => {
  const api = await getApi()

  await removeStakingAccount(api, getAccount(args.s), args.m)

  await api.disconnect()
}

export const removeStakingAccountModule = {
  command: 'remove-staking-account',
  describe: 'Remove staking account',
  handler: removeStakingAccountCommand,
  builder: (argv: yargs.Argv) => argv.options(removeStakingOptions),
}
