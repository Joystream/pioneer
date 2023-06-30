import { linkTo } from '@storybook/addon-links'
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { random } from 'faker'
import { FC } from 'react'

import { member } from '@/mocks/data/members'
import { proposalTypes, generateProposals } from '@/mocks/data/proposals'
import { getButtonByText, joy } from '@/mocks/helpers'
import { proposalDetailsToConstantKey } from '@/mocks/helpers/proposalDetailsToConstantKey'
import { MocksParameters } from '@/mocks/providers'
import { GetProposalVotesDocument, GetProposalsCountDocument, GetProposalsDocument } from '@/proposals/queries'

import { Proposals } from './Proposals'

import { randomMarkdown } from '@/../dev/query-node-mocks/generators/utils'

const PROPOSAL_DATA = {
  title: random.words(4),
  description: randomMarkdown(),
}
const MAX_PROPOSAL = 20

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
    proposalCount: { control: { type: 'range', max: MAX_PROPOSAL } },
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

        chain: {
          consts: {
            content: {
              minimumCashoutAllowedLimit: joy(166),
              maximumCashoutAllowedLimit: joy(1_666_666),
            },

            members: {
              referralCutMaximumPercent: 50,
            },

            proposalsCodex: {
              fundingRequestProposalMaxTotalAmount: joy(166_666),
              setMaxValidatorCountProposalMaxValidators: 100,

              ...Object.fromEntries(
                proposalTypes.map((type) => [
                  proposalDetailsToConstantKey(type),
                  {
                    votingPeriod: 200,
                    gracePeriod: 100,
                    approvalQuorumPercentage: 80,
                    approvalThresholdPercentage: 100,
                    slashingQuorumPercentage: 60,
                    slashingThresholdPercentage: 80,
                    requiredStake: joy(20),
                    constitutionality: 2,
                  },
                ])
              ),
            },

            proposalsEngine: {
              maxActiveProposalLimit: MAX_PROPOSAL,
              descriptionMaxLength: 3000,
              titleMaxLength: 40,
            },
          },

          query: {
            proposalsEngine: {
              activeProposalCount: args.proposalCount,
            },

            staking: {
              minimumValidatorCount: 4,
            },
          },

          tx: {
            proposalsCodex: {
              createProposal: { event: 'Create' },
            },
            proposalsEngine: {
              vote: { event: 'Voted', onSend: args.onVote },
            },
            members: { confirmStakingAccount: {} },
            utility: { batch: {} },
          },
        },

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
