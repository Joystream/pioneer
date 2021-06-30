import { KnownAccount } from '../data/addresses'

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
