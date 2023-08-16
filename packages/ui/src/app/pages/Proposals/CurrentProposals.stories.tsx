import { OpeningMetadata } from '@joystream/metadata-protobuf'
import { linkTo } from '@storybook/addon-links'
import { expect, jest } from '@storybook/jest'
import { Meta, ReactRenderer, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, waitForElementToBeRemoved, within } from '@storybook/testing-library'
import { PlayFunction, PlayFunctionContext, StepFunction } from '@storybook/types'
import { FC } from 'react'

import { metadataFromBytes } from '@/common/model/JoystreamNode/metadataFromBytes'
import { GetMemberDocument, SearchMembersDocument } from '@/memberships/queries'
import { member } from '@/mocks/data/members'
import { generateProposals, MAX_ACTIVE_PROPOSAL, proposalsPagesChain } from '@/mocks/data/proposals'
import {
  Container,
  getButtonByText,
  getEditorByLabel,
  isoDate,
  joy,
  selectFromDropdown,
  withinModal,
} from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'
import {
  GetProposalsEventsDocument,
  GetProposalVotesDocument,
  GetProposalsCountDocument,
  GetProposalsDocument,
} from '@/proposals/queries'
import {
  GetWorkingGroupApplicationsDocument,
  GetWorkingGroupDocument,
  GetWorkingGroupOpeningsDocument,
  GetWorkingGroupsDocument,
} from '@/working-groups/queries'

import { Proposals } from './Proposals'

const PROPOSAL_DATA = {
  title: 'Foo bar',
  description: '## est minus rerum sed\n\nAssumenda et laboriosam minus accusantium. Sed in quo illum.',
}

const OPENING_DATA = {
  id: 'storageWorkingGroup-12',
  runtimeId: 12,
  groupId: 'storageWorkingGroup',
  group: {
    name: 'storageWorkingGroup',
    budget: '962651993476422',
    leaderId: 'storageWorkingGroup-0',
  },
  type: 'LEADER',
  stakeAmount: '2500000000000000',
  rewardPerBlock: '1930000000',
  createdInEvent: { inBlock: 123, createdAt: isoDate('2023/01/02') },
  metadata: {
    title: 'Hire Storage Working Group Lead',
    applicationDetails: 'answers to questions',
    shortDescription: 'Hire Storage Working Group Lead',
    description: 'Lorem ipsum...',
    hiringLimit: 1,
    expectedEnding: null,
  },
  status: { __typename: 'OpeningStatusOpen' },
}

type Args = {
  isCouncilMember: boolean
  proposalCount: number
  onAddStakingAccountCandidate: jest.Mock
  onConfirmStakingAccount: jest.Mock
  onCreateProposal: jest.Mock
  onChangeThreadMode: jest.Mock
  onVote: jest.Mock
}
type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Proposals/ProposalList/Current',
  component: Proposals,

  argTypes: {
    proposalCount: { control: { type: 'range', max: MAX_ACTIVE_PROPOSAL } },
    onAddStakingAccountCandidate: { action: 'Members.StakingAccountAdded' },
    onConfirmStakingAccount: { action: 'Members.StakingAccountConfirmed' },
    onCreateProposal: { action: 'ProposalsCodex.ProposalCreated' },
    onChangeThreadMode: { action: 'proposalsDiscussion.ThreadModeChanged' },
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

    isLoggedIn: true,
    balance: 100,

    stakingAccountIdMemberStatus: {
      memberId: 0,
      confirmed: { isTrue: true },
      size: 1,
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
        accounts: parameters.isLoggedIn
          ? { active: { member: alice, balances: parameters.balance } }
          : { list: [{ member: alice }] },

        chain: proposalsPagesChain(
          {
            activeProposalCount: args.proposalCount,
            minimumValidatorCount: parameters.minimumValidatorCount,
            setMaxValidatorCountProposalMaxValidators: parameters.setMaxValidatorCountProposalMaxValidators,
            initialInvitationCount: parameters.initialInvitationCount,
            initialInvitationBalance: parameters.initialInvitationBalance,

            councilSize: parameters.councilSize,
            councilBudget: parameters.councilBudget,
            councilorReward: parameters.councilorReward,
            nextRewardPayments: parameters.nextRewardPayments,

            onAddStakingAccountCandidate: args.onAddStakingAccountCandidate,
            onConfirmStakingAccount: args.onConfirmStakingAccount,
            onCreateProposal: args.onCreateProposal,
            onChangeThreadMode: args.onChangeThreadMode,

            addStakingAccountCandidateFailure: parameters.addStakingAccountCandidateFailure,
            confirmStakingAccountFailure: parameters.confirmStakingAccountFailure,
            createProposalFailure: parameters.createProposalFailure,
            changeThreadModeFailure: parameters.changeThreadModeFailure,
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
            query: GetProposalsEventsDocument,
            data: { events: [] },
          },

          {
            query: SearchMembersDocument,
            data: {
              memberships: [alice],
            },
          },
          {
            query: GetMemberDocument,
            data: {
              membershipByUniqueInput: alice,
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
          {
            query: GetWorkingGroupOpeningsDocument,
            data: {
              workingGroupOpenings: [OPENING_DATA],
            },
          },
          {
            query: GetWorkingGroupApplicationsDocument,
            data: {
              workingGroupApplications: [
                {
                  id: 'storageWorkingGroup-15',
                  runtimeId: 15,
                  opening: OPENING_DATA,
                  answers: [
                    { answer: 'Foo', question: { question: '🐁?' } },
                    { answer: 'Bar', question: { question: '🐘?' } },
                  ],
                  status: { __typename: 'ApplicationStatusPending' },
                  applicant: alice,
                  createdInEvent: { inBlock: 234, createdAt: isoDate('2023/01/04') },
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

// ----------------------------------------------------------------------------
// Create proposal: Happy case
// ----------------------------------------------------------------------------

const alice = member('alice')
const waitForModal = (modal: Container, name: string) => modal.findByRole('heading', { name })

const fillSetReferralCutStep = async (modal: Container, step: StepFunction<ReactRenderer, Args>) => {
  await step('Specific parameters', async () => {
    const nextButton = getButtonByText(modal, 'Create proposal')
    await userEvent.type(modal.getByTestId('amount-input'), '40')
    await waitFor(() => expect(nextButton).toBeEnabled())
    await userEvent.click(nextButton)
  })
}

export const AddNewProposalHappy: Story = {
  parameters: {
    isLoggedIn: false,

    stakingAccountIdMemberStatus: {
      memberId: 0,
      confirmed: { isTrue: false },
      size: 0,
    },
  },

  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    const closeModal = async (heading: string | HTMLElement) => {
      const headingElement = heading instanceof HTMLElement ? heading : modal.getByRole('heading', { name: heading })
      await userEvent.click(headingElement.nextElementSibling as HTMLElement)
      await userEvent.click(getButtonByText(modal, 'Close'))
    }

    await step('Select Membership Modal', async () => {
      await userEvent.click(screen.getByText('Add new proposal'))
      expect(modal.getByText('Select Membership'))
      await userEvent.click(modal.getByText('alice'))
    })

    await step('Warning Modal', async () => {
      const createProposalButton = getButtonByText(screen, 'Add new proposal')

      await step('Temporarily close ', async () => {
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

        expect(nextButton).toBeDisabled()
        await userEvent.click(modal.getByText('Set Referral Cut'))
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
          await waitFor(() => expect(nextButton).toBeEnabled())
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

        await fillSetReferralCutStep(modal, step)
      })

      await step('Bind Staking Account', async () => {
        expect(modal.getByText('You intend to bind account for staking'))
        expect(modal.getAllByText('alice')).toHaveLength(2)
        await userEvent.click(modal.getByText('Sign transaction and Bind Staking Account'))
      })

      await step('Sign Create Proposal transaction', async () => {
        expect(await modal.findByText('You intend to create a proposal.'))
        await userEvent.click(modal.getByText('Sign transaction and Create'))
      })

      await step('Sign set discussion mode transaction', async () => {
        expect(await modal.findByText('You intend to change the proposal discussion thread mode.'))
        await userEvent.click(modal.getByText('Sign transaction and change mode'))
        expect(await waitForModal(modal, 'Success'))
      })

      step('Transaction parameters', () => {
        expect(args.onAddStakingAccountCandidate).toHaveBeenCalledWith(alice.id)

        expect(args.onConfirmStakingAccount).toHaveBeenCalledWith(alice.id, alice.controllerAccount)

        const [generalParameters] = args.onCreateProposal.mock.calls.at(-1)
        expect(generalParameters).toEqual({
          memberId: alice.id,
          title: PROPOSAL_DATA.title,
          description: PROPOSAL_DATA.description,
          stakingAccountId: alice.controllerAccount,
          exactExecutionBlock: 9999,
        })

        const changeModeTxParams = args.onChangeThreadMode.mock.calls.at(-1)
        expect(changeModeTxParams.length).toBe(3)
        const [memberId, threadId, mode] = changeModeTxParams
        expect(memberId).toBe(alice.id)
        expect(typeof threadId).toBe('number')
        expect(mode.toJSON()).toEqual({ closed: [] })
      })
    })
  },
}

// ----------------------------------------------------------------------------
// Create proposal: Failure cases
// ----------------------------------------------------------------------------

export const NotEnoughFunds: Story = {
  parameters: { balance: 1 },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)
    await userEvent.click(screen.getByText('Add new proposal'))
    expect(
      await modal.findByText(
        /^Unfortunately the account associated with the currently selected membership has insufficient balance/
      )
    )
    expect(modal.getByText('Move funds'))
  },
}

const fillGeneralParameters = async (
  modal: Container,
  step: StepFunction<ReactRenderer, Args>,
  proposalType: string,
  closeDiscussion = false
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
      if (closeDiscussion) await userEvent.click(modal.getByText('Closed'))
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)
    })
  })
}

const completeForms = async (canvasElement: HTMLElement, step: StepFunction<ReactRenderer, Args>) => {
  const screen = within(canvasElement)
  const modal = withinModal(canvasElement)

  localStorage.setItem('proposalCaution', 'true')
  await userEvent.click(getButtonByText(screen, 'Add new proposal'))
  await fillGeneralParameters(modal, step, 'Set Referral Cut', true)
  await fillSetReferralCutStep(modal, step)
}

export const BindAccountFailure: Story = {
  parameters: {
    stakingAccountIdMemberStatus: {
      memberId: 0,
      confirmed: { isTrue: false },
      size: 0,
    },
    addStakingAccountCandidateFailure: 'It failed 🙀',
  },

  play: async ({ args, canvasElement, step }) => {
    const modal = withinModal(canvasElement)
    await completeForms(canvasElement, step)
    await userEvent.click(modal.getByText('Sign transaction and Bind Staking Account'))

    expect(await modal.findByText('It failed 🙀'))
    within(document.body).getByText('Transaction failed')

    expect(args.onAddStakingAccountCandidate).toHaveBeenCalled()
    expect(args.onConfirmStakingAccount).not.toHaveBeenCalled()
    expect(args.onCreateProposal).not.toHaveBeenCalled()
    expect(args.onChangeThreadMode).not.toHaveBeenCalled()
  },
}

export const BindAccountThenCreateProposalFailure: Story = {
  parameters: {
    stakingAccountIdMemberStatus: {
      memberId: 0,
      confirmed: { isTrue: false },
      size: 0,
    },
    createProposalFailure: 'It failed 🙀',
  },

  play: async ({ args, canvasElement, step }) => {
    const modal = withinModal(canvasElement)
    await completeForms(canvasElement, step)
    await userEvent.click(modal.getByText('Sign transaction and Bind Staking Account'))
    await userEvent.click(await modal.findByText('Sign transaction and Create'))

    expect(await modal.findByText('It failed 🙀'))
    within(document.body).getByText('Transaction failed')

    expect(args.onAddStakingAccountCandidate).toHaveBeenCalled()
    expect(args.onConfirmStakingAccount).toHaveBeenCalled()
    expect(args.onCreateProposal).toHaveBeenCalled()
    expect(args.onChangeThreadMode).not.toHaveBeenCalled()
  },
}

export const ConfirmAccountThenCreateProposalFailure: Story = {
  parameters: {
    stakingAccountIdMemberStatus: {
      memberId: 0,
      confirmed: { isTrue: false },
      size: 1,
    },
    createProposalFailure: 'It failed 🙀',
  },

  play: async ({ args, canvasElement, step }) => {
    const modal = withinModal(canvasElement)
    await completeForms(canvasElement, step)
    await userEvent.click(await modal.findByText('Sign transaction and Create'))

    expect(await modal.findByText('It failed 🙀'))
    within(document.body).getByText('Transaction failed')

    expect(args.onAddStakingAccountCandidate).not.toHaveBeenCalled()
    expect(args.onConfirmStakingAccount).toHaveBeenCalled()
    expect(args.onCreateProposal).toHaveBeenCalled()
    expect(args.onChangeThreadMode).not.toHaveBeenCalled()
  },
}

export const CreateProposalFailure: Story = {
  parameters: {
    createProposalFailure: 'It failed 🙀',
  },

  play: async ({ args, canvasElement, step }) => {
    const modal = withinModal(canvasElement)
    await completeForms(canvasElement, step)
    await userEvent.click(await modal.findByText('Sign transaction and Create'))

    expect(await modal.findByText('It failed 🙀'))
    within(document.body).getByText('Transaction failed')

    expect(args.onAddStakingAccountCandidate).not.toHaveBeenCalled()
    expect(args.onConfirmStakingAccount).not.toHaveBeenCalled()
    expect(args.onCreateProposal).toHaveBeenCalled()
    expect(args.onChangeThreadMode).not.toHaveBeenCalled()
  },
}

export const ChangeThreadModeFailure: Story = {
  parameters: {
    changeThreadModeFailure: 'It failed 🙀',
  },

  play: async ({ args, canvasElement, step }) => {
    const modal = withinModal(canvasElement)
    await completeForms(canvasElement, step)
    await userEvent.click(await modal.findByText('Sign transaction and Create'))
    await userEvent.click(await modal.findByText('Sign transaction and change mode'))

    expect(await modal.findByText('It failed 🙀'))
    // within(document.body).getByText('Transaction failed')

    expect(args.onAddStakingAccountCandidate).not.toHaveBeenCalled()
    expect(args.onConfirmStakingAccount).not.toHaveBeenCalled()
    expect(args.onCreateProposal).toHaveBeenCalled()
    expect(args.onChangeThreadMode).toHaveBeenCalled()
  },
}

// ----------------------------------------------------------------------------
// Create proposal: Specific parameters tests
// ----------------------------------------------------------------------------

const EXECUTION_WARNING_BOX = 'I understand the implications of overriding the execution constraints validation.'
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
        await waitFor(async () => {
          const createButton = modal.queryByText('Create proposal')
          if (createButton) {
            await waitFor(() => expect(createButton).toBeEnabled())
            await userEvent.click(createButton)
          }
          await userEvent.click(modal.getByText('Sign transaction and Create'))
        })
        expect(await waitForModal(modal, 'Success'))
      })
    }

    await specificStep({ args, parameters, createProposal, modal, step })
  }

export const SpecificParametersSignal: Story = {
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
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toHuman()).toEqual({ Signal: 'Lorem ipsum...' })
    })
  }),
}

export const SpecificParametersFundingRequest: Story = {
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
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({
        fundingRequest: [{ account: alice.controllerAccount, amount: 100_0000000000 }],
      })
    })
  }),
}

export const SpecificParametersMultipleFundingRequest: Story = {
  play: specificParametersTest('Funding Request', async ({ args, createProposal, modal, step }) => {
    const bob = member('bob')
    const charlie = member('charlie')
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      await userEvent.click(modal.getByTestId('pay-multiple'))

      const csvField = modal.getByTestId('accounts-amounts')

      // Invalid
      await userEvent.clear(csvField)
      await userEvent.type(csvField, `${alice.controllerAccount},500${bob.controllerAccount},500`)
      expect(await modal.findByText(/Not valid CSV format/))
      // ensure its not being open-able while the CSV syntax is valid
      const previewButton = getButtonByText(modal, 'Preview and Validate')
      expect(previewButton).toBeDisabled()
      await waitFor(() => expect(modal.queryByTestId('sidePanel-overlay')).toBeNull())
      expect(nextButton).toBeDisabled()

      // Invalid Accounts error
      await userEvent.clear(csvField)
      await userEvent.type(csvField, `5GNJqTPy,500\n${bob.controllerAccount},500`)

      await waitFor(() => expect(modal.queryByText(/Not valid CSV format/)).toBeNull())
      expect(await modal.findByText(/Please preview and validate the inputs to proceed/))
      expect(nextButton).toBeDisabled()
      expect(previewButton).toBeEnabled()

      await userEvent.click(previewButton)
      expect(await modal.findByText(/Incorrect destination accounts detected/))
      await userEvent.click(modal.getByTestId('sidePanel-overlay'))

      // Max Amount error
      await userEvent.clear(csvField)
      await userEvent.type(csvField, `${alice.controllerAccount},166667\n${bob.controllerAccount},500`)
      expect(await modal.findByText(/Please preview and validate the inputs to proceed/))
      expect(nextButton).toBeDisabled()
      await waitFor(() => expect(previewButton).toBeEnabled())
      await userEvent.click(previewButton)
      expect(await modal.findByText(/Max payment amount is exceeded/))
      await userEvent.click(modal.getByTestId('sidePanel-overlay')) //ensure create proposal is still disabled
      expect(nextButton).toBeDisabled()

      // Max Allowed Accounts error
      await userEvent.clear(csvField)
      await userEvent.type(
        csvField,
        `${alice.controllerAccount},400\n${bob.controllerAccount},500\n${charlie.controllerAccount},500`
      )
      expect(await modal.findByText(/Please preview and validate the inputs to proceed/))
      expect(nextButton).toBeDisabled()
      await waitFor(() => expect(previewButton).toBeEnabled())
      await userEvent.click(previewButton)
      expect(await modal.findByText(/Maximum allowed accounts exceeded/))
      await userEvent.click(modal.getByTestId('sidePanel-overlay')) //ensure create proposal is still disabled
      expect(nextButton).toBeDisabled()

      //  delete one account from the list'
      await waitFor(() => expect(previewButton).toBeEnabled())
      await userEvent.click(previewButton)
      await userEvent.click(modal.getByTestId('removeAccount-2'))
      await waitFor(() => expect(modal.queryByText(/Maximum allowed accounts exceeded/)).toBeNull())
      await userEvent.click(modal.getByTestId('sidePanel-overlay'))

      // Valid
      await userEvent.clear(csvField)
      await userEvent.type(csvField, `${alice.controllerAccount},500\n${bob.controllerAccount},500`)
      expect(nextButton).toBeDisabled()

      await waitFor(() => expect(previewButton).toBeEnabled())
      await userEvent.click(previewButton)
      await userEvent.click(modal.getByTestId('sidePanel-overlay'))
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({
        fundingRequest: [
          { account: alice.controllerAccount, amount: 500_0000000000 },
          { account: bob.controllerAccount, amount: 500_0000000000 },
        ],
      })
    })
  }),
}

export const SpecificParametersSetReferralCut: Story = {
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
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({ setReferralCut: 100 })
    })
  }),
}

export const SpecificParametersDecreaseWorkingGroupLeadStake: Story = {
  parameters: { wgLeadStake: 1000 },

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
    })

    step('Transaction parameters', () => {
      const leaderId = 10 // Set on the mock QN query
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({
        decreaseWorkingGroupLeadStake: [leaderId, 500_0000000000, 'Forum'],
      })
    })
  }),
}

export const SpecificParametersTerminateWorkingGroupLead: Story = {
  parameters: { wgLeadStake: 1000 },

  play: specificParametersTest('Terminate Working Group Lead', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const body = within(document.body)

      // WGs without a lead are disabled
      await userEvent.click(modal.getByPlaceholderText('Select Working Group or type group name'))
      const storageWG = body.getByText('Storage')
      expect(storageWG.nextElementSibling?.firstElementChild?.textContent).toMatch(/This group has no lead/)
      expect(storageWG).toHaveStyle({ 'pointer-events': 'none' })

      // Valid: Don't Slash lead
      userEvent.click(body.getByText('Forum'))
      expect(await modal.findByText('alice'))
      await waitFor(() => expect(nextButton).toBeEnabled())

      // Valid: Slash the lead 2000 JOY
      userEvent.click(modal.getByText('Yes'))
      const amountField = modal.getByTestId('amount-input')
      expect(amountField).toHaveValue('')
      userEvent.type(amountField, '2000')
    })

    step('Transaction parameters', () => {
      const leaderId = 10 // Set on the mock QN query
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({
        terminateWorkingGroupLead: {
          workerId: leaderId,
          slashingAmount: 2000_0000000000,
          group: 'Forum',
        },
      })
    })
  }),
}

export const SpecificParametersCreateWorkingGroupLeadOpening: Story = {
  parameters: { wgLeadStake: 1000 },

  play: specificParametersTest('Create Working Group Lead Opening', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Next step')
      expect(nextButton).toBeDisabled()

      const body = within(document.body)

      // WGs without a lead are enabled
      await userEvent.click(modal.getByPlaceholderText('Select Working Group or type group name'))
      const storageWG = body.getByText('Storage')
      expect(storageWG).not.toHaveStyle({ 'pointer-events': 'none' })

      // Step 1 valid
      await userEvent.click(body.getByText('Forum'))
      await userEvent.type(modal.getByLabelText('Opening title'), 'Foo')
      await userEvent.type(modal.getByLabelText('Short description'), 'Bar')
      ;(await getEditorByLabel(modal, 'Description')).setData('Baz')
      expect(nextButton).toBeDisabled()
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)

      // Step 2
      expect(nextButton).toBeDisabled()
      ;(await getEditorByLabel(modal, 'Application process')).setData('Lorem ipsum...')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(modal.getByText('Limited'))
      await waitFor(() => expect(nextButton).toBeDisabled())
      await userEvent.type(modal.getByLabelText('Expected length of the application period'), '1000')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)

      // Step 3
      expect(nextButton).toBeDisabled()
      await userEvent.type(modal.getByRole('textbox'), '🐁?')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(modal.getByText('Add new question'))
      await waitFor(() => expect(nextButton).toBeDisabled())
      await userEvent.click(modal.getAllByText('Long answer')[1])
      await userEvent.type(modal.getAllByRole('textbox')[1], '🐘?')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)

      // Step 4
      expect(nextButton).toBeDisabled()
      await userEvent.type(modal.getByLabelText('Staking amount *'), '100')
      await userEvent.type(modal.getByLabelText('Role cooldown period'), '0')
      await userEvent.type(modal.getByLabelText('Reward amount per Block'), '0.1')
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      const { description, ...data } = specificParameters.asCreateWorkingGroupLeadOpening.toJSON()

      expect(data).toEqual({
        rewardPerBlock: 1000000000,
        stakePolicy: {
          stakeAmount: 100_0000000000,
          leavingUnstakingPeriod: 0,
        },
        group: 'Forum',
      })

      expect(metadataFromBytes(OpeningMetadata, description)).toEqual({
        title: 'Foo',
        shortDescription: 'Bar',
        description: 'Baz',
        hiringLimit: 1,
        expectedEndingTimestamp: 1000,
        applicationDetails: 'Lorem ipsum...',
        applicationFormQuestions: [
          { question: '🐁?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXT },
          { question: '🐘?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXTAREA },
        ],
      })
    })
  }),
}

export const SpecificParametersSetWorkingGroupLeadReward: Story = {
  parameters: { wgLeadStake: 1000 },

  play: specificParametersTest('Set Working Group Lead Reward', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const body = within(document.body)

      // WGs without a lead are disabled
      await userEvent.click(modal.getByPlaceholderText('Select Working Group or type group name'))
      const storageWG = body.getByText('Storage')
      expect(storageWG.nextElementSibling?.firstElementChild?.textContent).toMatch(/This group has no lead/)
      expect(storageWG).toHaveStyle({ 'pointer-events': 'none' })

      // Valid
      userEvent.click(body.getByText('Forum'))
      expect(await modal.findByText('alice'))
      const stakeMessage = modal.getByText(/Current reward per block for Forum Working Group Lead is/)
      expect(within(stakeMessage).getByText('5'))
      expect(nextButton).toBeDisabled()
      const amountField = modal.getByTestId('amount-input')
      await userEvent.type(amountField, '1')
      await waitFor(() => expect(nextButton).toBeEnabled())

      // Invalid
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '0')
      await waitFor(() => expect(nextButton).toBeDisabled())

      // Valid again
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '10')
    })

    step('Transaction parameters', () => {
      const leaderId = 10 // Set on the mock QN query
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({
        setWorkingGroupLeadReward: [leaderId, 10_0000000000, 'Forum'],
      })
    })
  }),
}

export const SpecificParametersSetMaxValidatorCount: Story = {
  parameters: { minimumValidatorCount: 4, setMaxValidatorCountProposalMaxValidators: 100 },

  play: specificParametersTest('Set Max Validator Count', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const amountField = modal.getByTestId('amount-input')

      // Invalid: too low
      await userEvent.type(amountField, '1')
      const validation = await modal.findByText('Minimal amount allowed is 4')
      expect(validation)
      expect(nextButton).toBeDisabled()

      // Invalid: too high
      await userEvent.type(amountField, '999')
      // console.log(validation)
      await waitFor(() => expect(validation).toHaveTextContent('Maximal amount allowed is 100'))
      expect(nextButton).toBeDisabled()

      // Valid
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '10')
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({ setMaxValidatorCount: 10 })
    })
  }),
}

export const SpecificParametersCancelWorkingGroupLeadOpening: Story = {
  play: specificParametersTest('Cancel Working Group Lead Opening', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const body = within(document.body)

      // Valid
      await userEvent.click(modal.getByPlaceholderText('Choose opening to cancel'))
      userEvent.click(body.getByText('Hire Storage Working Group Lead'))
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({ cancelWorkingGroupLeadOpening: [12, 'Storage'] })
    })
  }),
}

export const SpecificParametersSetCouncilBudgetIncrement: Story = {
  play: specificParametersTest('Set Council Budget Increment', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const amountField = modal.getByTestId('amount-input')

      // Invalid budget 0
      await userEvent.type(amountField, '1')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '0')
      await waitFor(() => expect(nextButton).toBeDisabled())

      // The value remains less than 2^128
      await userEvent.clear(amountField)
      await userEvent.type(amountField, ''.padEnd(39, '9'))
      const value = Number((amountField as HTMLInputElement).value.replace(/,/g, ''))
      expect(value).toBeLessThan(2 ** 128)

      // Valid
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '500')
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({ setCouncilBudgetIncrement: 500_0000000000 })
    })
  }),
}

export const SpecificParametersSetCouncilorReward: Story = {
  play: specificParametersTest('Set Councilor Reward', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const amountField = modal.getByTestId('amount-input')

      // Invalid budget 0
      await userEvent.type(amountField, '1')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '0')
      await waitFor(() => expect(nextButton).toBeDisabled())

      // Valid
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '10')
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({ setCouncilorReward: 10_0000000000 })
    })
  }),
}

export const SpecificParametersSetMembershipLeadInvitationQuota: Story = {
  parameters: { wgLeadStake: 1000 },

  play: specificParametersTest(
    'Set Membership Lead Invitation Quota',
    async ({ args, createProposal, modal, step }) => {
      await createProposal(async () => {
        const nextButton = getButtonByText(modal, 'Create proposal')
        expect(nextButton).toBeDisabled()

        const amountField = modal.getByTestId('amount-input')

        // Invalid budget 0
        await userEvent.type(amountField, '1')
        await waitFor(() => expect(nextButton).toBeEnabled())
        await userEvent.clear(amountField)
        await userEvent.type(amountField, '0')
        await waitFor(() => expect(nextButton).toBeDisabled())

        // The value remains less than 2^32
        await userEvent.clear(amountField)
        await userEvent.type(amountField, ''.padEnd(39, '9'))
        const value = Number((amountField as HTMLInputElement).value.replace(/,/g, ''))
        expect(value).toBeLessThan(2 ** 32)

        // Valid
        await userEvent.clear(amountField)
        await userEvent.type(amountField, '3')
      })

      step('Transaction parameters', () => {
        const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
        expect(specificParameters.toJSON()).toEqual({ setMembershipLeadInvitationQuota: 3 })
      })
    }
  ),
}

export const SpecificParametersFillWorkingGroupLeadOpening: Story = {
  play: specificParametersTest('Fill Working Group Lead Opening', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const body = within(document.body)

      // Select Opening
      await userEvent.click(modal.getByPlaceholderText('Choose opening to fill'))
      userEvent.click(body.getByText('Hire Storage Working Group Lead'))

      // Select Application
      const applicationSelector = await modal.findByPlaceholderText('Choose application')
      const options = await waitFor(async () => {
        await userEvent.click(applicationSelector)
        const options = document.getElementById('select-popper-wrapper')
        expect(options).not.toBeNull()
        return within(options as HTMLElement)
      })
      expect(nextButton).toBeDisabled()
      userEvent.click(options.getByText('alice'))

      // Check application
      expect(await modal.findByText('🐁?'))
      expect(modal.getByText('Foo'))
      expect(modal.getByText('🐘?'))
      expect(modal.getByText('Bar'))
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({
        fillWorkingGroupLeadOpening: {
          applicationId: 15,
          openingId: 12,
          workingGroup: 'Storage',
        },
      })
    })
  }),
}

export const SpecificParametersSetInitialInvitationCount: Story = {
  parameters: { initialInvitationCount: 5 },

  play: specificParametersTest('Set Initial Invitation Count', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      expect(modal.getByText('The current initial invitation count is 5.'))

      const countField = modal.getByLabelText('New Count')

      // Invalid 0 invitations
      await userEvent.type(countField, '0')
      expect(await modal.findByText('Amount must be greater than zero'))
      expect(nextButton).toBeDisabled()

      // The value remains less than 2^32
      await userEvent.clear(countField)
      await userEvent.type(countField, ''.padEnd(39, '9'))
      const value = Number((countField as HTMLInputElement).value.replace(/,/g, ''))
      expect(value).toBeLessThan(2 ** 32)

      // Valid
      await userEvent.clear(countField)
      await userEvent.type(countField, '7')
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({ setInitialInvitationCount: 7 })
    })
  }),
}

export const SpecificParametersSetInitialInvitationBalance: Story = {
  parameters: { initialInvitationBalance: joy(5) },

  play: specificParametersTest('Set Initial Invitation Balance', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const current = modal.getByText(/The current balance is/)
      expect(within(current).getByText('5'))

      const amountField = modal.getByTestId('amount-input')

      // Invalid balance 0
      await userEvent.type(amountField, '0')
      expect(await modal.findByText('Amount must be greater than zero'))
      expect(nextButton).toBeDisabled()

      // Valid
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '7')
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({ setInitialInvitationBalance: 7_0000000000 })
    })
  }),
}

export const SpecificParametersSetMembershipPrice: Story = {
  play: specificParametersTest('Set Membership Price', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const amountField = modal.getByTestId('amount-input')

      // Invalid price set to 0
      await userEvent.type(amountField, '0')
      expect(await modal.findByText('Amount must be greater than zero'))
      expect(nextButton).toBeDisabled()

      // Valid
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '8')
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({ setMembershipPrice: 8_0000000000 })
    })
  }),
}

export const SpecificParametersUpdateWorkingGroupBudget: Story = {
  parameters: {
    councilSize: 3,
    councilBudget: joy(2000),
    councilorReward: joy(100),
    nextRewardPayments: 12345,
  },

  play: specificParametersTest('Update Working Group Budget', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const amountField = modal.getByTestId('amount-input')

      const currentCouncilBudget = modal.getByText(/Current budget for Council is/)
      expect(within(currentCouncilBudget).getByText('2,000'))

      const councilSummary = modal.getByText(/Next Council payment is in/)
      expect(within(councilSummary).getByText('12,345')) // Next reward payment block
      expect(within(councilSummary).getByText(100 * 3)) // Next reward payment block

      expect(
        modal.getByText(
          'If the Councils budget is less than provided amount at attempted execution, this proposal will fail to execute, and the budget size will not be changed.'
        )
      )

      userEvent.click(modal.getByText('Yes'))
      expect(
        modal.getByText(
          'If the budget is less than provided amount at attempted execution, this proposal will fail to execute and the budget size will not be changed'
        )
      )

      // Select working group
      await userEvent.click(modal.getByPlaceholderText('Select Working Group or type group name'))
      userEvent.click(within(document.body).getByText('Forum'))

      const currentWgBudget = modal.getByText(/Current budget for Forum Working Group is/)
      expect(within(currentWgBudget).getByText('100'))

      // Invalid price set to 0
      await userEvent.type(amountField, '0')
      expect(await modal.findByText('Amount must be greater than zero'))
      expect(nextButton).toBeDisabled()

      // Valid
      await userEvent.clear(amountField)
      await userEvent.type(amountField, '99')
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({
        updateWorkingGroupBudget: [99_0000000000, 'Forum', 'Negative'],
      })
    })
  }),
}

export const SpecificParametersRuntimeUpgrade: Story = {
  play: specificParametersTest('Runtime Upgrade', async ({ args, createProposal, modal, step }) => {
    await createProposal(async () => {
      const nextButton = getButtonByText(modal, 'Create proposal')
      expect(nextButton).toBeDisabled()

      const uploadField = modal.getByTestId('runtime-upgrade-input')

      // Invalid
      await userEvent.upload(uploadField, new File([], 'invalid.wasm', { type: 'application/wasm' }))
      const validation = await modal.findByText(/was not loaded because of: "not valid WASM file"./)
      expect(within(validation).getByText('invalid.wasm'))

      // Valid
      const setIsValidWASM = jest.fn()
      const validFile = Object.defineProperties(new File([], 'valid.wasm', { type: 'application/wasm' }), {
        isValidWASM: { get: () => true, set: setIsValidWASM },
        arrayBuffer: { value: () => Promise.resolve(new ArrayBuffer(1)) },
        size: { value: 1 },
      })
      await userEvent.upload(uploadField, validFile)
      await waitFor(() => expect(setIsValidWASM).toHaveBeenCalledWith(false))
      const confirmation = await modal.findByText(/was loaded successfully!/)
      expect(within(confirmation).getByText('valid.wasm'))
    })

    step('Transaction parameters', () => {
      const [, specificParameters] = args.onCreateProposal.mock.calls.at(-1)
      expect(specificParameters.toJSON()).toEqual({ runtimeUpgrade: '0x' })
    })
  }),
}
