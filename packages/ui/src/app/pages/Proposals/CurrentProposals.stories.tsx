import { linkTo } from '@storybook/addon-links'
import { expect, jest } from '@storybook/jest'
import { Meta, ReactRenderer, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, waitForElementToBeRemoved, within } from '@storybook/testing-library'
import { PlayFunction, StepFunction } from '@storybook/types'
import { FC } from 'react'

import { SearchMembersDocument } from '@/memberships/queries'
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

          {
            query: SearchMembersDocument,
            data: {
              memberships: [alice],
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
const waitForModal = (modal: Container, name: string) => modal.findByRole('heading', { name })
const fillGeneralParameters = async (
  modal: Container,
  step: StepFunction<ReactRenderer, Args>,
  proposalType: string
) => {
  let nextButton: HTMLElement

  await step('Fill General Parameters', async () => {
    await step('Proposal type', async () => {
      await waitForModal(modal, 'Creating new proposal')
      nextButton = getButtonByText(modal, 'Next step')

      await userEvent.click(modal.getByText(proposalType))
      await waitFor(() => expect(nextButton).not.toBeDisabled())
      await userEvent.click(nextButton)
    })

    await step('Staking account', async () => {
      await selectFromDropdown(modal, 'Select account for Staking', 'alice')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)
    })

    await step('Proposal details', async () => {
      const rationaleEditor = await getEditorByLabel(modal, 'Rationale')
      await userEvent.type(modal.getByLabelText('Proposal title'), PROPOSAL_DATA.title)
      rationaleEditor.setData(PROPOSAL_DATA.description)
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)
    })

    await step('Trigger & Discussion', async () => {
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)
    })
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

    // Helpers:

    const closeModal = async (heading: string | HTMLElement) => {
      const headingElement = heading instanceof HTMLElement ? heading : modal.getByRole('heading', { name: heading })
      await userEvent.click(headingElement.nextElementSibling as HTMLElement)
      await userEvent.click(getButtonByText(modal, 'Close'))
    }

    const createProposal = async (proposalType: string, specificStep: PlayFunction<ReactRenderer, Args>) => {
      await userEvent.click(createProposalButton)

      await fillGeneralParameters(modal, step, proposalType)

      await step(`Specific parameters: ${proposalType}`, specificStep)

      await step('Sign transaction and Create', async () => {
        const signButton = getButtonByText(modal, 'Sign transaction and Create')
        await userEvent.click(signButton)
        const heading = await waitForModal(modal, 'Success')
        await userEvent.click(heading?.nextElementSibling as HTMLElement)
      })
    }

    // Tests:

    await step('Warning Modal', async () => {
      await step('Temporarily close ', async () => {
        await userEvent.click(createProposalButton)
        await waitForModal(modal, 'Caution')

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
        await waitForModal(modal, 'Caution')

        const nextButton = getButtonByText(modal, 'Create A Proposal')
        await userEvent.click(modal.getByLabelText('Do not show this message again.'))
        expect(nextButton).toBeDisabled()
        await userEvent.click(
          modal.getByLabelText("I'm aware of the possible risks associated with creating a proposal.")
        )
        await userEvent.click(nextButton)

        await closeModal('Creating new proposal')

        await userEvent.click(createProposalButton)
        await closeModal(await waitForModal(modal, 'Creating new proposal'))

        expect(localStorage.getItem('proposalCaution')).toBe('true')
      })
    })

    await step('General parameters', async () => {
      let nextButton: HTMLElement

      await step('Proposal type', async () => {
        await userEvent.click(createProposalButton)
        await waitForModal(modal, 'Creating new proposal')
        nextButton = getButtonByText(modal, 'Next step')

        // TODO test steps

        expect(nextButton).toBeDisabled()
        await userEvent.click(modal.getByText('Funding Request'))
        await waitFor(() => expect(nextButton).not.toBeDisabled())
        await userEvent.click(nextButton)
      })

      await step('Staking account', async () => {
        expect(nextButton).toBeDisabled()
        await selectFromDropdown(modal, 'Select account for Staking', 'alice')
        await waitFor(() => expect(nextButton).toBeEnabled())
        await userEvent.click(nextButton)
      })

      await step('Proposal details', async () => {
        const titleField = modal.getByLabelText('Proposal title')
        const rationaleEditor = await getEditorByLabel(modal, 'Rationale')

        expect(nextButton).toBeDisabled()

        // Somehow reason the validation for the title field stop working once the editor setData
        // However it only happens with tests `userEvent` and not when interacting manually with the story
        await userEvent.type(titleField, PROPOSAL_DATA.title.padEnd(41, ' baz'))
        rationaleEditor.setData(PROPOSAL_DATA.description)
        const titleValidation = await modal.findByText('Title exceeds maximum length')

        expect(titleValidation)
        expect(nextButton).toBeDisabled()

        await userEvent.clear(titleField)
        await userEvent.type(titleField, PROPOSAL_DATA.title)

        await waitForElementToBeRemoved(titleValidation)
        expect(nextButton).toBeEnabled()

        rationaleEditor.setData(PROPOSAL_DATA.description.padEnd(3002, ' baz'))
        const rationaleValidation = await modal.findByText('Rationale exceeds maximum length')

        expect(rationaleValidation)
        expect(nextButton).toBeDisabled()

        rationaleEditor.setData(PROPOSAL_DATA.description)

        await waitForElementToBeRemoved(rationaleValidation)
        expect(nextButton).toBeEnabled()

        await userEvent.click(nextButton)
      })

      await step('Trigger & Discussion', async () => {
        await step('Trigger', async () => {
          expect(nextButton).toBeEnabled()

          await userEvent.click(modal.getByText('Yes'))
          expect(nextButton).toBeDisabled()
          const blockInput = modal.getByRole('textbox')
          await userEvent.type(blockInput, '5000')

          await waitFor(() => expect(nextButton).toBeEnabled())

          await userEvent.clear(blockInput)
          await userEvent.type(blockInput, '10')

          expect(await modal.findByText(/The minimum block number is \d+/))
          expect(nextButton).toBeDisabled()

          // This "too high" test case seems to fail due to a RHF validation bug
          // await userEvent.type(blockInput, '999999999')

          await userEvent.clear(blockInput)
          await userEvent.type(blockInput, '9999')

          expect(await modal.findByText(/^≈.*/))
          expect(modal.queryByText(/The minimum block number is \d+/)).toBeNull()
          expect(nextButton).toBeEnabled()
        })

        await step('Discussion Mode', async () => {
          await userEvent.click(modal.getByText('Closed'))

          await waitFor(() => expect(nextButton).toBeDisabled())
          await selectFromDropdown(modal, 'Add member to whitelist', 'alice')

          expect(await modal.findByText('alice'))
          expect(nextButton).toBeEnabled()

          userEvent.click(screen.getByTestId('removeMember'))
          expect(modal.queryByText('alice')).toBeNull()
          await waitFor(() => expect(nextButton).toBeEnabled())

          await userEvent.click(nextButton)

          expect(modal.getByText('Specific parameters', { selector: 'h4' }))
        })
      })
    })

    closeModal('Creating new proposal: Funding Request')
    await waitFor(() => expect(createProposalButton).toBeEnabled())

    await step('Specific parameters', async () => {
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
    })
  },
}

// TODO:
// - No active member
// - Not enough funds
