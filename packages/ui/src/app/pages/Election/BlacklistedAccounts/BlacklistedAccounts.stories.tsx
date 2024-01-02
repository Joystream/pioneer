import { Args, Meta, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { member } from '@/mocks/data/members'
import { joy } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { BlacklistedAccounts } from './BlacklistedAccounts'

type Story = StoryObj<FC<Args>>

const allAccounts = [
  { member: member('bob'), balance: joy(20) },
  { member: member('charlie'), balance: joy(20) },
  { member: member('alice'), balance: joy(20) },
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
                keys: Array.from({ length: 5 })
                  .fill(allAccounts.map(({ member }) => member.controllerAccount))
                  .flat(),
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
