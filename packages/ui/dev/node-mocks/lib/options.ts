import { accountsMap, KnownAccount } from '../data/addresses'

export const accountChoices: ReadonlyArray<KnownAccount> = Object.keys(accountsMap) as KnownAccount[]

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
