import { Meta, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { GetPastElectionsDocument } from '@/council/queries'
import { MocksParameters } from '@/mocks/providers'

import { PastElections } from './PastElections'

type Story = StoryObj<FC>

export default {
  title: 'Pages/Election/PastElections/PastElections',
  component: PastElections,
  parameters: {
    mocks: (): MocksParameters => {
      return {
        gql: {
          queries: [
            {
              query: GetPastElectionsDocument,
              data: {
                electionRounds: [
                  {
                    id: '00000018',
                    cycleId: 44,
                    endedAtBlock: 11851230,
                    endedAtTime: '2025-03-14T04:00:48.000Z',
                    endedAtNetwork: 'OLYMPIA',
                    candidates: [
                      {
                        stake: '1666666666660000',
                      },
                      {
                        stake: '2500000000000000',
                      },
                      {
                        stake: '1666666666660000',
                      },
                      {
                        stake: '1666666666660000',
                      },
                      {
                        stake: '1666666666660000',
                      },
                    ],
                    castVotes: [
                      {
                        voteForId: null,
                        stake: '41000000000000000',
                      },
                      {
                        voteForId: null,
                        stake: '1666660000000000',
                      },
                      {
                        voteForId: null,
                        stake: '1754810000000000',
                      },
                      {
                        voteForId: null,
                        stake: '937830000000000',
                      },
                      {
                        voteForId: null,
                        stake: '1740630000000000',
                      },
                      {
                        voteForId: null,
                        stake: '945220000000000',
                      },
                      {
                        voteForId: null,
                        stake: '1533080000000000',
                      },
                      {
                        voteForId: null,
                        stake: '499940000000000',
                      },
                      {
                        voteForId: null,
                        stake: '937380000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '18000000000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '20900000000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '1666700000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '1779950000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '895000000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '1618390000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '17600240000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '3333330000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '15413050000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '554080000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '1060000000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '5500000000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '5500000000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '8500000000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '2200000000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '2000000000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '1392790000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '510000000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '1660000000000000',
                      },
                      {
                        voteForId: null,
                        stake: '8430000000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '1660000000000000',
                      },
                      {
                        voteForId: null,
                        stake: '2000000000000000',
                      },
                      {
                        voteForId: null,
                        stake: '8500000000000000',
                      },
                      {
                        voteForId: null,
                        stake: '10000000000000000',
                      },
                      {
                        voteForId: '00000072',
                        stake: '9000000000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '40000000000000000',
                      },
                      {
                        voteForId: '00000070',
                        stake: '11600000000000000',
                      },
                      {
                        voteForId: '0000006y',
                        stake: '143333330000000000',
                      },
                    ],
                    nextElectedCouncil: {
                      councilElections: [
                        {
                          cycleId: 44,
                        },
                      ],
                    },
                  },
                  {
                    id: '00000019',
                    cycleId: 45,
                    endedAtBlock: 12139230,
                    endedAtTime: '2025-04-03T04:25:48.000Z',
                    endedAtNetwork: 'OLYMPIA',
                    candidates: [
                      {
                        stake: '1666666666660000',
                      },
                    ],
                    castVotes: [],
                  },
                ],
              },
            },
          ],
        },
      }
    },
  },
} satisfies Meta

export const Default: Story = {}
