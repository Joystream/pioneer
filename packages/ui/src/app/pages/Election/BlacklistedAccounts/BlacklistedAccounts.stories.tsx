import { Args, Meta, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { member } from '@/mocks/data/members'
import { MocksParameters } from '@/mocks/providers'

import { BlacklistedAccounts } from './BlacklistedAccounts'

type Story = StoryObj<FC<Args>>

const allAccounts = [
  { member: member('bob'), balance: 200 },
  { member: member('charlie'), balance: 300 },
  { member: member('alice'), balance: 500 },
]

export default {
  title: 'Pages/Election/Blacklisted Accounts',
  component: BlacklistedAccounts,
  parameters: {
    mocks: (): MocksParameters => {
      return {
        accounts: { list: allAccounts },
        chain: {
          query: {
            council: {
              stage: { stage: { isIdle: true }, changedAt: 123 },
            },
            referendum: {
              accountsOptedOut: {
                keys: Array.from({ length: 23 }).map(
                  (_, index) => allAccounts[index % allAccounts.length].member.controllerAccount
                ),
              },
              stage: {},
            },
          },
        },
      }
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}
