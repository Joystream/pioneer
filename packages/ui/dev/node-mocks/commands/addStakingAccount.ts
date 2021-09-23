/* eslint-disable no-console */
import yargs from 'yargs'

import { getAccount } from '../data/addresses'
import { signAndSend, withApi } from '../lib/api'
import { controllerAccountOption, memberIdOption, stakingAccountOption } from '../lib/options'

const options = {
  c: controllerAccountOption,
  s: stakingAccountOption,
  m: memberIdOption,
}

type CommandOptions = yargs.InferredOptionTypes<typeof options>
export type AddStakingAccountArgs = yargs.Arguments<CommandOptions>

export const addStakingAccountCommand = async (args: AddStakingAccountArgs) => {
  await withApi(async (api) => {
    const memberId = args.m
    const stakingAccount = getAccount(args.s)
    const controllerAccount = getAccount(args.c)

    const stakingCandidateTx = api.tx.members.addStakingAccountCandidate(memberId)
    const stakingConfirmTx = api.tx.members.confirmStakingAccount(memberId, stakingAccount)

    await signAndSend(stakingCandidateTx, stakingAccount)
    await signAndSend(stakingConfirmTx, controllerAccount)
  })
}

export const addStakingAccountModule = {
  command: 'add-staking-account',
  describe: 'Add & confirm staking account',
  handler: addStakingAccountCommand,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
