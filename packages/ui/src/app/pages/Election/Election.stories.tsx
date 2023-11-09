import { Meta, StoryContext, StoryObj } from '@storybook/react'
import BN from 'bn.js'
import { FC } from 'react'

import { GetCurrentElectionDocument } from '@/council/queries'
import { MocksParameters } from '@/mocks/providers'

import { Election } from './Election'

type Args = {
  electionStage: 'announcing' | 'revealing' | 'voting' | 'idle'
  remainingPeriod?: number | BN
  currentBlock?: number | BN
}

type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Election/Election',
  component: Election,
  args: {
    electionStage: 'announcing',
    remainingPeriod: 40000,
    currentBlock: 4802561,
  },
  parameters: {
    router: { path: '', href: '' },
    mocks: ({ args }: StoryContext<Args>): MocksParameters => {
      return {
        chain: {
          consts: {
            council: {
              councilSize: new BN(3),
              idlePeriodDuration: new BN(1),
              announcingPeriodDuration: new BN(129600),
              budgetRefillPeriod: new BN(14400),
              minCandidateStake: new BN(1666666666660000),
            },
            referendum: {
              voteStageDuration: new BN(43200),
              revealStageDuration: new BN(43200),
              minimumStake: new BN(1666666666660),
            },
          },
          rpc: {
            chain: {
              subscribeNewHeads: {
                number: args.currentBlock,
              },
            },
          },
          query: {
            council: {
              stage: {
                stage: {
                  isIdle: args.electionStage === 'idle' ? true : false,
                  isAnnouncing: args.electionStage === 'announcing' ? true : false,
                },
                changedAt: Number(args.currentBlock) - Number(new BN(129600)) + Number(args.remainingPeriod),
              },
            },
            referendum: {
              stage: {
                isVoting: args.electionStage === 'voting' ? true : false,
                isRevealing: args.electionStage === 'revealing' ? true : false,
                asVoting: {
                  started: Number(args.currentBlock) - Number(new BN(43200)) + Number(args.remainingPeriod),
                },
                asRevealing: {
                  started: Number(args.currentBlock) - Number(new BN(43200)) + Number(args.remainingPeriod),
                },
              },
            },
          },
        },
        queryNode: [
          {
            query: GetCurrentElectionDocument,
            data: {
              electionRounds: [
                {
                  __typename: 'ElectionRound',
                  cycleId: 23,
                  candidates: [
                    {
                      id: '0000003s',
                      member: {
                        id: '0',
                        name: 'Jennifer_123',
                        rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
                        controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
                        handle: 'Jennifer_123',
                        isVerified: true,
                        isFoundingMember: true,
                        isCouncilMember: false,
                        roles: [
                          {
                            __typename: 'Worker',
                            id: 'membershipWorkingGroup-0',
                            createdAt: '2021',
                            isLead: true,
                            group: {
                              __typename: 'WorkingGroup',
                              name: 'Jennifer_123',
                            },
                          },
                        ],
                        boundAccounts: [],
                        inviteCount: 0,
                        createdAt: '',
                        metadata: {
                          name: 'Jennifer_123',
                        },
                      },
                      noteMetadata: {
                        header: 'Jennifer_123',
                        bannerUri:
                          'https://upload.wikimedia.org/wikipedia/commons/b/be/Bliss_location%2C_Sonoma_Valley_in_2006.jpg',
                        bulletPoints: [
                          'Amet minim mollit non deserunt ullamco est sit liqua dolor',
                          'Amet minim mollit non deserunt ullamco est sit liqua dolor',
                          'Amet minim mollit non deserunt ullamco est sit liqua dolor Amet minim mollit non deserunt ullamco est sit liqua dolor Amet minim mollit non deserunt ullamco est sit liqua dolor Amet minim mollit non deserunt ullamco est sit liqua dolor',
                        ],
                        description: 'Test member',
                      },
                      stake: '16660000000000',
                      stakingAccountId: 'j4Sba211111111',
                      status: 'ACTIVE',
                      votesReceived: [],
                    },
                  ],
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
