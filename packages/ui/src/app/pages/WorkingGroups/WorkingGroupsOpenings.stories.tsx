import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { member } from '@/mocks/data/members'
import { MocksParameters } from '@/mocks/providers'

import { WorkingGroupsOpenings } from './WorkingGroupsOpenings'

type Args = {
  isLead: boolean
  isLoggedIn: boolean
}

type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Working Groups/Openings',
  component: WorkingGroupsOpenings,

  args: {
    isLoggedIn: true,
    isLead: true,
  },

  parameters: {
    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const alice = member('alice', {
        roles: [
          {
            __typename: 'Worker',
            id: 'string',
            createdAt: '2021',
            isLead: args.isLead,
            group: {
              __typename: 'WorkingGroup',
              name: 'string',
            },
          },
        ],
      })
      return {
        accounts: parameters.isLoggedIn ? { active: { member: alice } } : { list: [{ member: alice }] },

        chain: undefined,

        queryNode: [],
      }
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}
