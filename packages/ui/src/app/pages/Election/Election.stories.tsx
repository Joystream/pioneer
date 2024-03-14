import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { GetCurrentElectionDocument } from '@/council/queries'
import { joy } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { Election } from './Election'

type Args = {
  electionStage: 'inactive' | 'announcing' | 'revealing' | 'voting'
  remainingPeriod: number
}

type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Election/Election',
  component: Election,
  argTypes: {
    electionStage: {
      control: { type: 'radio' },
      options: ['inactive', 'announcing', 'voting', 'revealing'],
    },
  },
  args: {
    electionStage: 'announcing',
    remainingPeriod: 10000,
  },
  parameters: {
    currentBlock: 480_2561,
    idlePeriodDuration: 14400,
    budgetRefillPeriod: 14400,
    announcingPeriodDuration: 129600,
    voteStageDuration: 43200,
    revealStageDuration: 43200,
    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const councilStageDuration =
        parameters[args.electionStage === 'inactive' ? 'idlePeriodDuration' : 'announcingPeriodDuration']
      return {
        chain: {
          consts: {
            council: {
              councilSize: 3,
              idlePeriodDuration: parameters.idlePeriodDuration,
              announcingPeriodDuration: parameters.announcingPeriodDuration,
              budgetRefillPeriod: parameters.budgetRefillPeriod,
              minCandidateStake: joy(166_666.666666),
            },
            referendum: {
              voteStageDuration: parameters.voteStageDuration,
              revealStageDuration: parameters.revealStageDuration,
              minimumStake: joy(166.666666666),
            },
          },
          rpc: {
            chain: {
              subscribeNewHeads: {
                number: parameters.currentBlock,
              },
            },
          },
          query: {
            council: {
              stage: {
                stage: {
                  isIdle: args.electionStage === 'inactive',
                  isAnnouncing: args.electionStage === 'announcing',
                },
                changedAt: Math.max(0, parameters.currentBlock - councilStageDuration + args.remainingPeriod),
              },
            },
            referendum: {
              stage: {
                isVoting: args.electionStage === 'voting',
                isRevealing: args.electionStage === 'revealing',
                asVoting: {
                  started: Math.max(0, parameters.currentBlock - parameters.voteStageDuration + args.remainingPeriod),
                },
                asRevealing: {
                  started: Math.max(0, parameters.currentBlock - parameters.revealStageDuration + args.remainingPeriod),
                },
              },
            },
          },
        },
        gql: {
          queries: [
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
                          rootAccount: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
                          controllerAccount: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
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
        },
      }
    },
  },
} satisfies Meta<Args>

export const Idle: Story = {
  args: { electionStage: 'inactive' },
}
export const Announcing: Story = {
  args: { electionStage: 'announcing' },
}
export const Voting: Story = {
  args: { electionStage: 'voting' },
}
export const Revealing: Story = {
  args: { electionStage: 'revealing' },
}
