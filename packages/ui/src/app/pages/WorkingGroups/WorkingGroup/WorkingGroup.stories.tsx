import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { member } from '@/mocks/data/members'
import { joy } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'
import { GetWorkersDocument, GetWorkingGroupDocument } from '@/working-groups/queries'

import { WorkingGroup } from './WorkingGroup'

type Args = {
  isLead: boolean
  isLoggedIn: boolean
}

type Story = StoryObj<FC<Args>>

const WG_DATA = {
  id: 'membershipWorkingGroup',
  name: 'membership',
}

export default {
  title: 'Pages/Working Group/WorkingGroup',
  component: WorkingGroup,

  args: {
    isLoggedIn: true,
    isLead: true,
  },

  parameters: {
    router: { path: '/:name', href: `/${WG_DATA.name}` },
    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const alice = member('alice', {
        roles: [
          {
            __typename: 'Worker',
            id: `${WG_DATA.id}-0`,
            createdAt: '2021',
            isLead: args.isLead,
            group: {
              __typename: 'WorkingGroup',
              name: WG_DATA.name,
            },
          },
        ],
      })
      return {
        accounts: parameters.isLoggedIn ? { active: { member: alice } } : { list: [{ member: alice }] },

        // chain: undefined,

        queryNode: [
          {
            query: GetWorkingGroupDocument,
            data: {
              workingGroupByUniqueInput: {
                id: WG_DATA.id,
                name: WG_DATA.name,
                budget: joy(200),
                workers: [],
                leader: { membershipId: alice.id, isActive: true },
              },
            },
          },
          {
            query: GetWorkersDocument,
            data: {
              workers: [
                {
                  id: `${WG_DATA.id}-0`,
                  group: {
                    id: WG_DATA.id,
                    name: WG_DATA.name,
                  },
                  status: 'WorkerStatusActive',
                  membership: alice,
                },
                {
                  id: `${WG_DATA.id}-1`,
                  group: {
                    id: WG_DATA.id,
                    name: WG_DATA.name,
                  },
                  status: 'WorkerStatusActive',
                  membership: member('charlie'),
                },
              ],
            },
          },
        ],
      }
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}
