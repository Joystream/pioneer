import { linkTo } from '@storybook/addon-links'
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { random } from 'faker'
import { FC } from 'react'

import { member } from '@/mocks/data/members'
import { generateProposals, proposalsPagesChain } from '@/mocks/data/proposals'
import { MocksParameters } from '@/mocks/providers'
import { GetProposalsCountDocument, GetProposalsDocument } from '@/proposals/queries'

import { PastProposals } from './PastProposals'

import { randomMarkdown } from '@/../dev/query-node-mocks/generators/utils'

const PROPOSAL_DATA = {
  title: random.words(4),
  description: randomMarkdown(),
}

const alice = member('alice')

type Args = {
  proposalCount: number
}
type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Proposals/ProposalList/Past',
  component: PastProposals,

  argTypes: {
    proposalCount: { control: { type: 'range', max: 30 } },
  },

  args: {
    proposalCount: 15,
  },

  parameters: {
    router: {
      href: '/proposals/past',
      actions: {
        '/proposals/current': linkTo('Pages/Proposals/ProposalList/Current'),
      },
    },

    mocks: ({ args }: StoryContext<Args>): MocksParameters => {
      return {
        chain: proposalsPagesChain({ activeProposalCount: 5 }),

        queryNode: [
          {
            query: GetProposalsCountDocument,
            data: { proposalsConnection: { totalCount: args.proposalCount } },
          },

          {
            query: GetProposalsDocument,
            resolver: ({ variables } = {}) => ({
              loading: false,
              data: {
                proposals: generateProposals(
                  {
                    title: PROPOSAL_DATA.title,
                    description: PROPOSAL_DATA.description,
                    creator: alice,
                    statuses: [
                      'ProposalStatusCanceledByRuntime',
                      'ProposalStatusCancelled',
                      'ProposalStatusExecuted',
                      'ProposalStatusExecutionFailed',
                      'ProposalStatusExpired',
                      'ProposalStatusRejected',
                      'ProposalStatusSlashed',
                      'ProposalStatusVetoed',
                    ],
                    limit: variables?.limit,
                    offset: variables?.offset,
                  },
                  args.proposalCount
                ),
              },
            }),
          },
        ],
      }
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}
