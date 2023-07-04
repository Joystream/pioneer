import { linkTo } from '@storybook/addon-links'
import { expect, jest } from '@storybook/jest'
import { Meta, ReactRenderer, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { PlayFunction, StepFunction } from '@storybook/types'
import { FC } from 'react'

import { member } from '@/mocks/data/members'
import { generateProposals, MAX_ACTIVE_PROPOSAL, proposalsPagesChain } from '@/mocks/data/proposals'
import { Container, getButtonByText, getEditorByLabel, selectFromDropdown, withinModal } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'
import { GetProposalVotesDocument, GetProposalsCountDocument, GetProposalsDocument } from '@/proposals/queries'

import { Proposals } from './Proposals'

const PROPOSAL_DATA = {
  title: 'Foo bar',
  description: '## est minus rerum sed\n\nAssumenda et laboriosam minus accusantium. Sed in quo illum.',
}

type Args = {
  isCouncilMember: boolean
  proposalCount: number
  onCreateProposal: jest.Mock
  onConfirmStakingAccount: jest.Mock
  onStakingAccountAdded: jest.Mock
  onVote: jest.Mock
}
type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Proposals/ProposalList/Current',
  component: Proposals,

  argTypes: {
    proposalCount: { control: { type: 'range', max: MAX_ACTIVE_PROPOSAL } },
    onCreateProposal: { action: 'ProposalsCodex.ProposalCreated' },
    onConfirmStakingAccount: { action: 'Members.StakingAccountConfirmed' },
    onStakingAccountAdded: { action: 'Members.StakingAccountAdded' },
    onVote: { action: 'ProposalsEngine.Voted' },
  },

  args: {
    isCouncilMember: false,
    proposalCount: 15,
  },

  parameters: {
    router: {
      href: '/proposals/current',
      actions: {
        '/proposals/past': linkTo('Pages/Proposals/ProposalList/Past'),
      },
    },

    stakingAccountIdMemberStatus: {
      memberId: 0,
      confirmed: false,
      size: 0,
    },

    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const alice = member('alice', { isCouncilMember: args.isCouncilMember })

      return {
        accounts: { active: { member: alice } },

        chain: proposalsPagesChain(
          {
            activeProposalCount: args.proposalCount,
            onCreateProposal: args.onCreateProposal,
            onConfirmStakingAccount: args.onConfirmStakingAccount,
            onStakingAccountAdded: args.onStakingAccountAdded,
          },
          {
            query: {
              members: {
                stakingAccountIdMemberStatus: parameters.stakingAccountIdMemberStatus,
              },
            },
            tx: {
              proposalsEngine: {
                vote: { event: 'Voted', onSend: args.onVote },
              },
            },
          }
        ),

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

// ----------------------------------------------------------------------------
// Create proposal tests
// ----------------------------------------------------------------------------

const alice = member('alice')
const fillGeneralParameters = async (
  modal: Container,
  step: StepFunction<ReactRenderer, Args>,
  proposalType: string
) => {
  await step('General Parameters: Proposal type', async () => {
    expect(await modal.findByRole('heading', { name: 'Creating new proposal' }))
    const nextButton = getButtonByText(modal, 'Next step')
    await userEvent.click(modal.getByText(proposalType))
    await waitFor(() => expect(nextButton).not.toBeDisabled())
    await userEvent.click(nextButton)
  })

  await step('General Parameters: Stake', async () => {
    const nextButton = getButtonByText(modal, 'Next step')
    await selectFromDropdown(modal, 'Select account for Staking', 'alice')
    await waitFor(() => expect(nextButton).toBeEnabled())
    await userEvent.click(nextButton)
  })

  await step('General Parameters: Details', async () => {
    const nextButton = getButtonByText(modal, 'Next step')
    const rationaleEditor = await getEditorByLabel(modal, 'Rationale')
    await userEvent.type(modal.getByLabelText('Proposal title'), PROPOSAL_DATA.title)
    rationaleEditor.setData(PROPOSAL_DATA.description)
    await waitFor(() => expect(nextButton).toBeEnabled())
    await userEvent.click(nextButton)
  })

  await step('General Parameters: Discussion', async () => {
    const nextButton = getButtonByText(modal, 'Next step')
    await waitFor(() => expect(nextButton).toBeEnabled())
    await userEvent.click(nextButton)
  })
}

export const AddNewProposalHappy: Story = {
  parameters: {
    stakingAccountIdMemberStatus: {
      memberId: alice.id,
      confirmed: true,
      size: 1,
    },
  },

  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)
    const createProposalButton = getButtonByText(screen, 'Add new proposal')

    await step('Warning Modal', async () => {
      const closeModal = async (name: string) => {
        const closeButton = (await modal.findByRole('heading', { name })).nextElementSibling
        await userEvent.click(closeButton as HTMLElement)
        await userEvent.click(getButtonByText(modal, 'Close'))
      }

      await step('Temporarily close ', async () => {
        await userEvent.click(createProposalButton)
        expect(await modal.findByRole('heading', { name: 'Caution' }))
        const nextButton = getButtonByText(modal, 'Create A Proposal')
        expect(nextButton).toBeDisabled()
        await userEvent.click(
          modal.getByLabelText("I'm aware of the possible risks associated with creating a proposal.")
        )
        await userEvent.click(nextButton)

        await closeModal('Creating new proposal')

        expect(localStorage.getItem('proposalCaution')).toBe(null)
      })

      await step('Permanently close ', async () => {
        await userEvent.click(createProposalButton)
        expect(await modal.findByRole('heading', { name: 'Caution' }))
        const nextButton = getButtonByText(modal, 'Create A Proposal')
        await userEvent.click(modal.getByLabelText('Do not show this message again.'))
        expect(nextButton).toBeDisabled()
        await userEvent.click(
          modal.getByLabelText("I'm aware of the possible risks associated with creating a proposal.")
        )
        await userEvent.click(nextButton)

        await closeModal('Creating new proposal')

        await userEvent.click(createProposalButton)
        await closeModal('Creating new proposal')

        expect(localStorage.getItem('proposalCaution')).toBe('true')
      })
    })

    const createProposal = async (proposalType: string, specificStep: PlayFunction<ReactRenderer, Args>) => {
      await userEvent.click(createProposalButton)

      await fillGeneralParameters(modal, step, 'Signal')

      await step(`Specific parameters: ${proposalType}`, specificStep)

      await step('Sign transaction and Create', async () => {
        const signButton = getButtonByText(modal, 'Sign transaction and Create')
        await userEvent.click(signButton)
        const closeButton = (await modal.findByRole('heading', { name: 'Success' })).nextElementSibling
        await userEvent.click(closeButton as HTMLElement)
      })
    }

    await step('Signal', async () => {
      await createProposal('Signal', async () => {
        const nextButton = getButtonByText(modal, 'Create proposal')
        const editor = await getEditorByLabel(modal, 'Signal')
        editor.setData('Lorem ipsum...')
        await waitFor(() => expect(nextButton).toBeEnabled())
        await userEvent.click(nextButton)
      })

      const [generalParameters, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toHuman()).toEqual({ Signal: 'Lorem ipsum...' })
      expect(generalParameters).toEqual({
        memberId: alice.id,
        title: PROPOSAL_DATA.title,
        description: PROPOSAL_DATA.description,
        stakingAccountId: alice.controllerAccount,
      })

      expect(args.onConfirmStakingAccount).toHaveBeenCalledWith(alice.id, alice.controllerAccount)
    })
  },
}
