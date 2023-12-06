import { Args, Meta,/* StoryContext,*/ StoryObj } from '@storybook/react'
import { FC } from 'react'

import { MocksParameters } from '@/mocks/providers'

import { BlacklistedAccounts } from './BlacklistedAccounts'

type Story = StoryObj<FC<Args>>

export default {
    title: 'Pages/Blacklisted Accounts',
    component: BlacklistedAccounts,
  
    // argTypes: {
    //   onCreateOpening: { action: 'MembershipWorkingGroup.OpeningCreated' },
    // },
  
    // args: {
    //   isLead: true,
    // },
  
    parameters: {
      mocks: (/*{ args, parameters }: StoryContext<Args>*/): MocksParameters => {
        return {
        //   accounts: { active: { member: alice } },
  
          chain: {
            // tx: {
            //   membershipWorkingGroup: {
            //     addOpening: {
            //       event: 'OpeningCreated',
            //       onSend: args.onCreateOpening,
            //       failure: parameters.createOpeningFailure,
            //     },
            //   },
            // },
            // consts: {
            //   membershipWorkingGroup: {
            //     minimumApplicationStake: joy(10),
            //     minUnstakingPeriodLimit: 100,
            //   },
            // },
            query:{
              council:{
                stage: { stage: { isIdle: true }, changedAt: 123 },
              },
              referendum: {
                accountsOptedOut: {
                  keys: ['5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY','5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY','5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY']
                },
                stage: {}
              }
            }
          },
  
        //   gql: {
        //     queries: [
        //       {
        //         query: GetWorkingGroupDocument,
        //         data: {
        //           workingGroupByUniqueInput: {
        //             id: WG_DATA.id,
        //             name: WG_DATA.name,
        //             budget: joy(200),
        //             workers: [],
        //             leader: { membershipId: alice.id, isActive: args.isLead },
        //           },
        //         },
        //       },
        //       {
        //         query: GetWorkersDocument,
        //         data: {
        //           workers: [
        //             {
        //               id: `${WG_DATA.id}-0`,
        //               group: {
        //                 id: WG_DATA.id,
        //                 name: WG_DATA.name,
        //               },
        //               status: 'WorkerStatusActive',
        //               membership: alice,
        //             },
        //             {
        //               id: `${WG_DATA.id}-1`,
        //               group: {
        //                 id: WG_DATA.id,
        //                 name: WG_DATA.name,
        //               },
        //               status: 'WorkerStatusActive',
        //               membership: member('charlie'),
        //             },
        //           ],
        //         },
        //       },
        //     ],
        //   },
        }
      },
    },
  } satisfies Meta<Args>
  
export const Default: Story = {}