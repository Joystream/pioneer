/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'
import yargs from 'yargs'

import { getAccount, KnownAccount } from '../data/addresses'
import { getApi, signAndSend } from '../lib/api'

async function staking(api: ApiPromise, controllerAccount: string, stakingAccount: string, memberId: string) {
  const stakingCandidateTx = api.tx.members.addStakingAccountCandidate(memberId)
  const stakingConfirmTx = api.tx.members.confirmStakingAccount(memberId, stakingAccount)

  await signAndSend(stakingCandidateTx, stakingAccount)
  await signAndSend(stakingConfirmTx, controllerAccount)
}

const accountChoices: ReadonlyArray<KnownAccount> = ['alice', 'alice_stash', 'bob', 'bob_stash']

export const memberIdOption = { type: 'string', default: '0', alias: 'memberId' } as const
export const controllerAccountOption = {
  choices: accountChoices,
  default: 'alice' as KnownAccount,
  alias: 'controllerAccount',
}
export const stakingAccountOption = {
  choices: accountChoices,
  default: 'charlie' as KnownAccount,
  alias: 'stakingAccount',
}

export const addStakingAccountOptions = {
  c: controllerAccountOption,
  s: stakingAccountOption,
  m: memberIdOption,
}

export type AddStakingAccountCommandOptions = yargs.InferredOptionTypes<typeof addStakingAccountOptions>
export type AddStakingAccountArgs = yargs.Arguments<AddStakingAccountCommandOptions>

export const addStakingAccountCommand = async (args: AddStakingAccountArgs) => {
  const api = await getApi()

  await staking(api, getAccount(args.c), getAccount(args.s), args.m)

  await api.disconnect()
}

export const addStakingAccountModule = {
  command: 'add-staking-account',
  describe: 'Add & confirm staking account',
  handler: addStakingAccountCommand,
  builder: (argv: yargs.Argv<unknown>) => argv.options(addStakingAccountOptions),
}
