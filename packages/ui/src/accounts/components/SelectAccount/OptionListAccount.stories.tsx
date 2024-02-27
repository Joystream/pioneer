import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { member } from '@/mocks/data/members'
import { MocksParameters } from '@/mocks/providers'
import { AccountMock } from '@/mocks/providers/accounts'

import { OptionListAccount as OptionListAccountComponent } from './OptionListAccount'

export const mockAccounts: AccountMock[] = [
  { member: member('alice'), balances: { transferable: 0.00001, locks: ['Apps Worker'] } },
  {
    member: member('bob'),
    balances: { transferable: 101_300_098.123, locks: ['Councilor', 'Voting', 'Council Candidate'] },
  },
  { member: member('charlie'), balances: 200 },
  { member: member('dave'), balances: { transferable: 0, locks: ['Bound Staking Account'] } },
  { member: member('eve'), balances: { transferable: 1000, locks: ['Staking'] } },
  { member: member('ferdie'), balances: 500 },
]

export default {
  title: 'Accounts/SelectAccount/OptionListAccount',
  component: OptionListAccountComponent,

  parameters: {
    mocks: {
      accounts: { list: mockAccounts },
    } satisfies MocksParameters,
  },

  excludeStories: ['mockAccounts'],
} satisfies Meta

export const OptionListAccount: StoryFn = () => {
  const { allAccounts } = useMyAccounts()

  const free = allAccounts.slice(0, 3)

  const optionLocks = [['insufficientFunds', 'boundMembership'], ['rivalrousLock', 'recoverableLock'], ['optOutLock']]
  const locked = allAccounts.slice(3).map((account, i) => ({ ...account, optionLocks: optionLocks[i] }))

  return <AccountsOptions options={[...free, ...locked]} />
}

const AccountsOptions = styled(OptionListAccountComponent)`
  position: static;
  transform: none;
  max-height: none;
  max-width: 856px;
`
