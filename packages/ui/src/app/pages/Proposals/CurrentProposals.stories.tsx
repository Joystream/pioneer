import { linkTo } from '@storybook/addon-links'
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { random } from 'faker'
import { FC } from 'react'

import { member } from '@/mocks/data/members'
import { generateProposals, MAX_ACTIVE_PROPOSAL, proposalsPagesChain } from '@/mocks/data/proposals'
import { getButtonByText } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'
import { GetProposalVotesDocument, GetProposalsCountDocument, GetProposalsDocument } from '@/proposals/queries'

import { Proposals } from './Proposals'

import { randomMarkdown } from '@/../dev/query-node-mocks/generators/utils'

const PROPOSAL_DATA = {
  title: random.words(4),
  description: randomMarkdown(),
}

type Args = {
  isCouncilMember: boolean
  proposalCount: number
  onVote: CallableFunction
}
type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Proposals/CurrentProposals',
  component: Proposals,

  argTypes: {
    proposalCount: { control: { type: 'range', max: MAX_ACTIVE_PROPOSAL } },
    onVote: { action: 'Voted' },
  },

  args: {
    isCouncilMember: false,
    proposalCount: 15,
  },

  parameters: {
    router: {
      href: '/proposals/current',
      actions: {
        '/proposals/past': linkTo('Pages/Proposals/PastProposals'),
      },
    },

    mocks: ({ args }: StoryContext<Args>): MocksParameters => {
      const alice = member('alice', { isCouncilMember: args.isCouncilMember })

      return {
        accounts: { active: { member: alice } },

        chain: proposalsPagesChain(args.proposalCount, {
          tx: {
            proposalsEngine: {
              vote: { event: 'Voted', onSend: args.onVote },
            },
          },
        }),

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
                    statuses: ['ProposalStatusGracing', 'ProposalStatusDormant', 'ProposalStatusDeciding'],
                    limit: variables?.limit,
                    offset: variables?.offset,
                  },
                  args.proposalCount
                ),
              },
            }),
          },

          {
            query: GetProposalVotesDocument,
            data: {
              proposalVotedEvents: [],
            },
          },
        ],
      }
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}

export const AddNewProposal: Story = {
  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    await userEvent.click(getButtonByText(screen, 'Add new proposal'))
  },
}
