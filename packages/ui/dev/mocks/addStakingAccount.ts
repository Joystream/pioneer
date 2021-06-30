/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'
import yargs from 'yargs'

import { getAccount, KnownAccount } from './data/addresses'
import { getApi, signAndSend } from './lib/api'

async function staking(api: ApiPromise, controllerAccount: string, stakingAccount: string, memberId: string) {
  const stakingCandidateTx = api.tx.members.addStakingAccountCandidate(memberId)
  const stakingConfirmTx = api.tx.members.confirmStakingAccount(memberId, stakingAccount)

  await signAndSend(stakingCandidateTx, stakingAccount)
  await signAndSend(stakingConfirmTx, controllerAccount)
}

const accountChoices: ReadonlyArray<KnownAccount> = ['alice', 'alice_stash', 'bob', 'bob_stash']

export const options = {
  c: { choices: accountChoices, default: 'alice' as KnownAccount, alias: 'controllerAccount' },
  s: { choices: accountChoices, default: 'charlie' as KnownAccount, alias: 'stakingAccount' },
  m: { type: 'string', default: '0', alias: 'memberId' } as const,
}

export type AddMembersCommandArgs = yargs.InferredOptionTypes<typeof options>

export const addStakingAccountCommand = async (args: yargs.Arguments<AddMembersCommandArgs>) => {
  const api = await getApi()

  await staking(api, getAccount(args.c), getAccount(args.s), args.m)

  await api.disconnect()
}
