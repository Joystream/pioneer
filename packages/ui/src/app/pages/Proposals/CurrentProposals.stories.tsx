import { linkTo } from '@storybook/addon-links'
import { expect, jest } from '@storybook/jest'
import { Meta, ReactRenderer, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, waitForElementToBeRemoved, within } from '@storybook/testing-library'
import { PlayFunction, PlayFunctionContext, StepFunction } from '@storybook/types'
import { FC } from 'react'

import { SearchMembersDocument } from '@/memberships/queries'
import { member } from '@/mocks/data/members'
import { generateProposals, MAX_ACTIVE_PROPOSAL, proposalsPagesChain } from '@/mocks/data/proposals'
import { Container, getButtonByText, getEditorByLabel, joy, selectFromDropdown, withinModal } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'
import { GetProposalVotesDocument, GetProposalsCountDocument, GetProposalsDocument } from '@/proposals/queries'
import { GetWorkingGroupDocument, GetWorkingGroupsDocument } from '@/working-groups/queries'

import { Proposals } from './Proposals'

const PROPOSAL_DATA = {
  title: 'Foo bar',
  description: '## est minus rerum sed\n\nAssumenda et laboriosam minus accusantium. Sed in quo illum.',
}

type Args = {
  isCouncilMember: boolean
  proposalCount: number
  onCreateProposal: jest.Mock
  onThreadChangeThreadMode: jest.Mock
  onConfirmStakingAccount: jest.Mock
  onAddStakingAccountCandidate: jest.Mock
  onVote: jest.Mock
}
type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Proposals/ProposalList/Current',
  component: Proposals,

  argTypes: {
    proposalCount: { control: { type: 'range', max: MAX_ACTIVE_PROPOSAL } },
    onCreateProposal: { action: 'ProposalsCodex.ProposalCreated' },
    onThreadChangeThreadMode: { action: 'proposalsDiscussion.ThreadModeChanged' },
    onConfirmStakingAccount: { action: 'Members.StakingAccountConfirmed' },
    onAddStakingAccountCandidate: { action: 'Members.StakingAccountAdded' },
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

      const forumWG = {
        id: 'forumWorkingGroup',
        name: 'forumWorkingGroup',
        budget: joy(100),
        workers: [{ stake: joy(parameters.wgLeadStake ?? 0) }, { stake: joy(50) }],
        leader: parameters.wgLeadStake
          ? {
              id: 'forumWorkingGroup-10',
              runtimeId: '10',
              stake: joy(parameters.wgLeadStake),
              rewardPerBlock: joy(5),
              membershipId: alice.id,
              isActive: true,
            }
          : undefined,
      }
      const storageWG = { id: 'storageWorkingGroup', name: 'storageWorkingGroup', budget: joy(100), workers: [] }

      return {
        accounts: { active: { member: alice } },

        chain: proposalsPagesChain(
          {
            activeProposalCount: args.proposalCount,
            onCreateProposal: args.onCreateProposal,
            onThreadChangeThreadMode: args.onThreadChangeThreadMode,
            onAddStakingAccountCandidate: args.onAddStakingAccountCandidate,
            onConfirmStakingAccount: args.onConfirmStakingAccount,
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

          {
            query: GetWorkingGroupsDocument,
            data: {
              workingGroups: [forumWG, storageWG],
            },
          },
          {
            query: GetWorkingGroupDocument,
            data: {
              workingGroupByUniqueInput: forumWG,
            },
          },
        ],
      }
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}

// ----------------------------------------------------------------------------
// Create proposal: General parameters tests
// ----------------------------------------------------------------------------

const alice = member('alice')
const waitForModal = (modal: Container, name: string) => modal.findByRole('heading', { name })

const hasStakingAccountParameters = {
  stakingAccountIdMemberStatus: {
    memberId: alice.id,
    confirmed: true,
    size: 1,
  },
}

export const AddNewProposalHappy: Story = {
  parameters: hasStakingAccountParameters,

  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    const closeModal = async (heading: string | HTMLElement) => {
      const headingElement = heading instanceof HTMLElement ? heading : modal.getByRole('heading', { name: heading })
      await userEvent.click(headingElement.nextElementSibling as HTMLElement)
      await userEvent.click(getButtonByText(modal, 'Close'))
    }

    await step('Warning Modal', async () => {
      const createProposalButton = getButtonByText(screen, 'Add new proposal')

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
        const createProposalButton = getButtonByText(screen, 'Add new proposal')
        await userEvent.click(createProposalButton)
        await waitForModal(modal, 'Creating new proposal')
        nextButton = getButtonByText(modal, 'Next step')

        // TODO test steps

        expect(nextButton).toBeDisabled()
        await userEvent.click(modal.getByText('Signal'))
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

        // Invalid title
        rationaleEditor.setData(PROPOSAL_DATA.description)
        await userEvent.clear(titleField)
        await userEvent.type(
          titleField,
          'Reprehenderit laborum veniam est ut magna velit velit deserunt reprehenderit dolore.'
        )
        const titleValidation = await modal.findByText('Title exceeds maximum length')
        expect(nextButton).toBeDisabled()

        // Invalid rational
        await userEvent.clear(titleField)
        await userEvent.type(titleField, PROPOSAL_DATA.title)
        rationaleEditor.setData(PROPOSAL_DATA.description.padEnd(3002, ' baz'))
        const rationaleValidation = await modal.findByText('Rationale exceeds maximum length')
        expect(titleValidation).not.toBeInTheDocument()
        expect(nextButton).toBeDisabled()

        // Valid
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

          // Invalid: too low
          await userEvent.type(blockInput, '10')
          expect(await modal.findByText(/The minimum block number is \d+/))
          expect(nextButton).toBeDisabled()

          // Invalid: too high
          await userEvent.type(blockInput, '999999999')
          await waitFor(() => expect(modal.queryByText(/The minimum block number is \d+/)).toBeNull())
          expect(await modal.findByText(/The maximum block number is \d+/))
          expect(nextButton).toBeDisabled()

          // Valid
          await userEvent.clear(blockInput)
          await userEvent.type(blockInput, '9999')
          await waitFor(() => expect(modal.queryByText(/The maximum block number is \d+/)).toBeNull())
          expect(await modal.findByText(/^≈.*/))
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

        await step('Specific parameters', async () => {
          const editor = await getEditorByLabel(modal, 'Signal')
          editor.setData('Lorem ipsum...')
          await waitFor(() => expect(nextButton).toBeEnabled())

          await userEvent.click(nextButton)
        })
      })

      await step('Sign Create Proposal transaction', async () => {
        expect(modal.getByText('You intend to create a proposal.'))
        await userEvent.click(modal.getByText('Sign transaction and Create'))
      })

      await step('Sign set discussion mode transaction', async () => {
        expect(await modal.findByText('You intend to change the proposal discussion thread mode.'))
        await userEvent.click(modal.getByText('Sign transaction and change mode'))
        expect(await waitForModal(modal, 'Success'))
      })

      step('Transaction parameters', () => {
        expect(args.onConfirmStakingAccount).toHaveBeenCalledWith(alice.id, alice.controllerAccount)

        const [generalParameters] = args.onCreateProposal.mock.calls.at(-1)
        expect(generalParameters).toEqual({
          memberId: alice.id,
          title: PROPOSAL_DATA.title,
          description: PROPOSAL_DATA.description,
          stakingAccountId: alice.controllerAccount,
          exactExecutionBlock: 9999,
        })

        const changeModeTxParams = args.onThreadChangeThreadMode.mock.calls.at(-1)
        expect(changeModeTxParams.length).toBe(3)
        const [memberId, threadId, mode] = changeModeTxParams
        expect(memberId).toBe(alice.id)
        expect(typeof threadId).toBe('number')
        expect(mode.toJSON()).toEqual({ closed: [] })
      })
    })
  },
}

// TODO:
// - No active member
// - Not enough funds

// ----------------------------------------------------------------------------
// Create proposal: Specific parameters tests helpers
// ----------------------------------------------------------------------------

const EXECUTION_WARNING_BOX = 'I understand the implications of overriding the execution constraints validation.'
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

type SpecificParametersTestFunction = (
  args: Pick<PlayFunctionContext<ReactRenderer, Args>, 'args' | 'parameters' | 'step'> & {
    modal: Container
    createProposal: (create: () => Promise<void>) => Promise<void>
  }
) => Promise<void>
const specificParametersTest =
  (proposalType: string, specificStep: SpecificParametersTestFunction): PlayFunction<ReactRenderer, Args> =>
  async ({ args, parameters, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    const createProposal = async (create: () => Promise<void>) => {
      localStorage.setItem('proposalCaution', 'true')

      await userEvent.click(getButtonByText(screen, 'Add new proposal'))

      await fillGeneralParameters(modal, step, proposalType)

      await step(`Specific parameters: ${proposalType}`, create)

      await step('Sign transaction and Create', async () => {
        await userEvent.click(modal.getByText('Sign transaction and Create'))
        expect(await waitForModal(modal, 'Success'))
      })
    }

    await specificStep({ args, parameters, createProposal, modal, step })
  }

// ----------------------------------------------------------------------------
// Create proposal: Specific parameters tests
// ----------------------------------------------------------------------------

export const SpecificParametersSignal: Story = {
  parameters: hasStakingAccountParameters,

  play: specificParametersTest('Signal', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const editor = await getEditorByLabel(modal, 'Signal')

      // Invalid
      editor.setData('')
      const validation = await modal.findByText('Field is required')
      expect(nextButton).toBeDisabled()

      // Valid
      editor.setData('Lorem ipsum...')
      await waitForElementToBeRemoved(validation)
      expect(nextButton).toBeEnabled()

      await userEvent.click(nextButton)
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toHuman()).toEqual({ Signal: 'Lorem ipsum...' })
    })
  }),
}

export const SpecificParametersFundingRequest: Story = {
  parameters: hasStakingAccountParameters,

  play: specificParametersTest('Funding Request', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const amountField = modal.getByTestId('amount-input')

      // Invalid
      await selectFromDropdown(modal, 'Recipient account', 'alice')
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '166667')
      expect(await modal.findByText(/Maximal amount allowed is \d+/))
      expect(nextButton).toBeDisabled()

      // Valid again
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '100')
      await waitFor(() => expect(modal.queryByText(/Maximal amount allowed is \d+/)).toBeNull())
      await expect(nextButton).toBeEnabled()

      await userEvent.click(nextButton)
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({
        fundingRequest: [{ account: alice.controllerAccount, amount: 100_0000000000 }],
      })
    })
  }),
}

export const SpecificParametersSetReferralCut: Story = {
  parameters: hasStakingAccountParameters,

  play: specificParametersTest('Set Referral Cut', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const amountField = modal.getByTestId('amount-input')

      // Valid
      await userEvent.type(amountField, '40')
      await waitFor(() => expect(nextButton).toBeEnabled())

      // Invalid: creation constraints
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '200')
      await waitFor(() => expect(nextButton).toBeDisabled())

      // Execution constraints warning
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '100')
      expect(await modal.findByText('Input must be equal or less than 50% for proposal to execute'))
      expect(nextButton).toBeDisabled()
      userEvent.click(modal.getByText(EXECUTION_WARNING_BOX))
      await waitFor(() => expect(nextButton).toBeEnabled())

      await userEvent.click(nextButton)
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({ setReferralCut: 100 })
    })
  }),
}

export const SpecificParametersDecreaseWorkingGroupLeadStake: Story = {
  parameters: { ...hasStakingAccountParameters, wgLeadStake: 1000 },

  play: specificParametersTest('Decrease Working Group Lead Stake', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const body = within(document.body)

      // WGs without a lead are disabled
      await userEvent.click(modal.getByPlaceholderText('Select Working Group or type group name'))
      const storageWG = body.getByText('Storage')
      expect(storageWG.nextElementSibling?.firstElementChild?.textContent).toMatch(/This group has no lead/)
      expect(storageWG).toHaveStyle({ 'pointer-events': 'none' })

      // NOTE: This should be valid but here the button is still disabled
      userEvent.click(body.getByText('Forum'))
      const stakeMessage = modal.getByText(/The actual stake for Forum Working Group Lead is/)
      expect(within(stakeMessage).getByText('1,000'))

      const amountField = modal.getByTestId('amount-input')

      await waitFor(() => expect(amountField).toHaveValue('500'))

      // Invalid: stake set to 0
      await userEvent.clear(amountField)
      expect(await modal.findByText('Amount must be greater than zero'))
      expect(nextButton).toBeDisabled()

      // Valid 1/3
      userEvent.click(modal.getByText('By 1/3'))
      waitFor(() => expect(modal.queryByText('Amount must be greater than zero')).toBeNull())
      expect(amountField).toHaveValue('333.3333333333')

      // Valid 1/2
      userEvent.click(modal.getByText('By half'))
      expect(amountField).toHaveValue('500')
      await waitFor(() => expect(nextButton).toBeEnabled())

      await userEvent.click(nextButton)
    })

    step('Transaction parameters', () => {
      const leaderId = 10 // Set on the mock QN query
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({
        decreaseWorkingGroupLeadStake: [leaderId, Number(joy(500)), 'Forum'],
      })
    })
  }),
}
