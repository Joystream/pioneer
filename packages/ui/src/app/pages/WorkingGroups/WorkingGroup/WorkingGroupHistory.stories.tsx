import { linkTo } from '@storybook/addon-links'
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { member } from '@/mocks/data/members'
import { joy } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'
import {
  GetWorkersDocument,
  GetWorkingGroupDocument,
  GetWorkingGroupOpeningsDocument,
  CountWorkingGroupOpeningsDocument,
  GetWorkersCountDocument,
  GetPastWorkersDocument,
  GetGroupEventsDocument,
} from '@/working-groups/queries'

import { WorkingGroupHistory } from './WorkingGroupHistory'

type Args = {
  isLead: boolean
  onCreateOpening: jest.Mock
}

type Story = StoryObj<FC<Args>>

const WG_DATA = {
  id: 'membershipWorkingGroup',
  name: 'membership',
}

export default {
  title: 'Pages/Working Group/WorkingGroupHistory',
  component: WorkingGroupHistory,

  args: {
    isLead: true,
  },

  parameters: {
    router: {
      path: '/working-groups/:name/history',
      href: `/working-groups/${WG_DATA.name}/history`,
      actions: {
        '/working-groups/:name/openings': linkTo('Pages/Working Group/WorkingGroupOpenings'),
        '/working-groups/:name': linkTo('Pages/Working Group/WorkingGroup'),
      },
    },
    mocks: ({ args }: StoryContext<Args>): MocksParameters => {
      const alice = member('alice', {
        roles: [
          {
            __typename: 'Worker',
            id: `${WG_DATA.id}-0`,
            createdAt: '2021',
            isLead: args.isLead,
            isActive: true,
            group: {
              __typename: 'WorkingGroup',
              name: WG_DATA.name,
            },
          },
        ],
      })
      return {
        gql: {
          queries: [
            {
              query: GetWorkingGroupDocument,
              data: {
                workingGroupByUniqueInput: {
                  id: WG_DATA.id,
                  name: WG_DATA.name,
                  budget: joy(200),
                  workers: [],
                  leader: { membershipId: alice.id, isActive: args.isLead },
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
            {
              query: GetWorkingGroupOpeningsDocument,
              data: {
                workingGroupOpenings: [],
              },
            },
            {
              query: CountWorkingGroupOpeningsDocument,
              data: {
                workingGroupOpeningsConnection: {
                  totalCount: 0,
                },
              },
            },
            {
              query: GetWorkersCountDocument,
              data: {
                workersConnection: {
                  totalCount: 2,
                },
              },
            },
            {
              query: GetGroupEventsDocument,
              data: {
                appliedOnOpeningEvents: [],
                applicationWithdrawnEvents: [],
                budgetSpendingEvents: [],
                stakeDecreasedEvents: [],
                stakeIncreasedEvents: [],
                openingAddedEvents: [],
                openingCanceledEvents: [],
                openingFilledEvents: [],
                workerExitedEvents: [],
                statusTextChangedEvents: [],
                budgetSetEvents: [],
                stakeSlashedEvents: [],
                terminatedWorkerEvents: [],
                terminatedLeaderEvents: [],
                workerRewardAmountUpdatedEvents: [],
              },
            },
            {
              query: GetPastWorkersDocument,
              data: {
                workers: [
                  {
                    id: `${WG_DATA.id}-3`,
                    entry: {
                      createdAt: '2022-03-11T22:33:21.602Z',
                      inBlock: 99256,
                      network: 'OLYMPIA',
                    },
                    status: {
                      workerExitedEvent: {
                        createdAt: '2023-03-14T13:19:20.840Z',
                        inBlock: 102543,
                        network: 'OLYMPIA',
                      },
                    },
                    membership: member('dave'),
                  },
                ],
              },
            },
          ],
        },
      }
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}
