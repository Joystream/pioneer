import { OpeningMetadata } from '@joystream/metadata-protobuf'
import { expect } from '@storybook/jest'
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import BN from 'bn.js'
import { FC } from 'react'

import { metadataFromBytes } from '@/common/model/JoystreamNode'
import { member } from '@/mocks/data/members'
import { getButtonByText, getEditorByLabel, joy, withinModal } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'
import {
  GetWorkersDocument,
  GetWorkingGroupDocument,
  GetGroupDebtDocument,
  GetBudgetSpendingDocument,
  GetPastWorkersDocument,
  GetRoleAccountsDocument,
} from '@/working-groups/queries'

import { WorkingGroupsModule } from '../WorkingGroupsModule'

type Args = {
  isLead: boolean
  onCreateOpening: jest.Mock
}

type Story = StoryObj<FC<Args>>

const WG_DATA = {
  id: 'operationsWorkingGroupAlpha',
  name: 'operationsWorkingGroupAlpha',
}

const WG_OPENING_METADATA = {
  title: 'Builder worker role',
  shortDescription: 'Lorem Ipsum...',
  description: 'Bigger Lorem ipsum...',
  applicationDetails: 'Application process default',
  applicationFormQuestions: [
    { question: '🐁?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXT },
    { question: '🐘?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXTAREA },
  ],
  hiringLimit: 5,
  expectedEndingTimestamp: 2000,
}

const WG_JSON_OPENING = {
  ...WG_OPENING_METADATA,
  applicationFormQuestions: [
    { question: '🐁?', type: 'TEXT' },
    { question: '🐘?', type: 'TEXTAREA' },
  ],
  rewardPerBlock: 20_0000000000,
  stakingPolicy: {
    unstakingPeriod: 200,
    amount: 200_0000000000,
  },
}

export default {
  title: 'Pages/Working Group',
  component: WorkingGroupsModule,

  argTypes: {
    onCreateOpening: { action: 'OperationsWorkingGroupAlpha.OpeningCreated' },
  },

  args: {
    isLead: true,
  },

  parameters: {
    router: { path: '/working-groups/:name', href: '/working-groups/builders' },
    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const alice = member('alice')
      const charlie = member('charlie')

      const role = {
        __typename: 'Worker',
        id: `${WG_DATA.id}-0`,
        application: { opening: {} },
        entry: {},
        createdAt: '2021',
        isLead: args.isLead,
        isActive: true,
        status: 'WorkerStatusActive',
        group: { __typename: 'WorkingGroup', ...WG_DATA },
      } as const

      const workers = [
        { ...role, membership: alice },
        {
          id: `${WG_DATA.id}-1`,
          group: {
            id: WG_DATA.id,
            name: WG_DATA.name,
          },
          status: 'WorkerStatusActive',
          membership: charlie,
        },
      ]

      return {
        accounts: { active: { member: { ...alice, roles: [role] } } },

        chain: {
          tx: {
            operationsWorkingGroupAlpha: {
              addOpening: {
                event: 'OpeningCreated',
                onSend: args.onCreateOpening,
                failure: parameters.createOpeningFailure,
              },
            },
          },
          consts: {
            operationsWorkingGroupAlpha: {
              minimumApplicationStake: joy(10),
              minUnstakingPeriodLimit: 100,
            },
          },
        },

        gql: {
          queries: [
            // Common
            {
              query: GetWorkingGroupDocument,
              data: {
                workingGroupByUniqueInput: {
                  ...WG_DATA,
                  budget: joy(200),
                  workers: [],
                  leader: { membershipId: alice.id, isActive: args.isLead },
                },
              },
            },
            {
              query: GetWorkersDocument,
              data: { workers },
            },

            // Opening tab
            {
              query: GetRoleAccountsDocument,
              data: {
                workers: args.isLead ? [{ roleAccount: alice.controllerAccount }] : [],
              },
            },
            {
              query: GetGroupDebtDocument,
              data: {
                workers: [
                  {
                    missingRewardAmount: joy(12),
                  },
                  {
                    missingRewardAmount: joy(25),
                  },
                ],
              },
            },

            // About tab
            {
              query: GetBudgetSpendingDocument,
              data: {
                budgetSpendingEvents: [
                  {
                    id: 1,
                    groupId: WG_DATA.id,
                    reciever: '',
                    amount: joy(100),
                    rationale: 'first spending',
                  },
                  {
                    id: 2,
                    groupId: WG_DATA.id,
                    reciever: '',
                    amount: joy(42),
                    rationale: 'second spending',
                  },
                ],
              },
            },

            // History tab
            {
              query: GetPastWorkersDocument,
              data: {
                workers: [
                  {
                    id: `${WG_DATA.id}-3`,
                    entry: {
                      createdAt: '2022-03-11T22:33:21.602Z',
                      inBlock: 99256,
                      network: 'OLYMPIA',
                    },
                    status: {
                      workerExitedEvent: {
                        createdAt: '2023-03-14T13:19:20.840Z',
                        inBlock: 102543,
                        network: 'OLYMPIA',
                      },
                    },
                    membership: member('dave'),
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

// Preview

export const About: Story = {
  play: ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('heading', { name: 'Builders' }))
  },
}

export const Openings: Story = {
  parameters: {
    router: { path: '/working-groups/:name/openings', href: '/working-groups/builders/openings' },
  },
  play: ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('heading', { name: 'Builders' }))
  },
}

export const History: Story = {
  parameters: {
    router: { path: '/working-groups/:name/history', href: '/working-groups/builders/history' },
  },
  play: ({ canvasElement }) => {
    expect(within(canvasElement).getByRole('heading', { name: 'Builders' }))
  },
}

// Tests

export const CreateOpening: Story = {
  parameters: {
    router: { path: '/working-groups/:name/openings', href: '/working-groups/builders/openings' },
  },

  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await userEvent.click(screen.getByText('Add opening'))
    expect(modal.getByText('Create Opening'))
    const nextButton = getButtonByText(modal, 'Next step')

    await step('Working group & description', async () => {
      const openingTitleField = await modal.findByLabelText('Opening title')
      const shortDescriptionField = modal.getByLabelText('Short description')

      await waitFor(() => expect(nextButton).toBeDisabled())

      await userEvent.type(openingTitleField, 'Builder worker role')
      await userEvent.type(shortDescriptionField, 'Lorem Ipsum...')
      ;(await getEditorByLabel(modal, 'Description')).setData('Bigger Lorem ipsum...')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)
    })

    await step('Duration & Process', async () => {
      await waitFor(() => expect(nextButton).toBeDisabled())
      ;(await getEditorByLabel(modal, 'Application process')).setData('Application process default')
      await waitFor(() => expect(nextButton).toBeEnabled())
      const hiringTargetField = modal.getByLabelText('Hiring Target')
      await userEvent.clear(hiringTargetField)
      await userEvent.type(hiringTargetField, '5')
      await userEvent.click(modal.getByText('Limited'))
      const expectedLengthField = modal.getByLabelText('Expected length of the application period')
      await userEvent.clear(expectedLengthField)
      await userEvent.type(expectedLengthField, '2000')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)
    })

    await step('Application Form', async () => {
      await waitFor(() => expect(nextButton).toBeDisabled())
      await userEvent.type(modal.getByRole('textbox'), '🐁?')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(modal.getByText('Add new question'))
      await waitFor(() => expect(nextButton).toBeDisabled())
      await userEvent.click(modal.getAllByText('Long answer')[1])
      await userEvent.type(modal.getAllByRole('textbox')[1], '🐘?')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)
    })

    await step('Staking Policy & Reward', async () => {
      const createButton = getButtonByText(modal, 'Create Opening')
      expect(createButton).toBeDisabled()

      const stakeAmountField = modal.getByLabelText('Staking amount *')
      await userEvent.clear(stakeAmountField)
      await userEvent.type(stakeAmountField, '100')

      const coolDownField = modal.getByLabelText('Role cooldown period')
      await userEvent.clear(coolDownField)
      await userEvent.type(coolDownField, '1000')

      await userEvent.type(modal.getByLabelText('Reward amount per Block'), '0.1')
      await waitFor(() => expect(createButton).toBeEnabled())
      await userEvent.click(createButton)
    })

    await step('Sign transaction and Create', async () => {
      expect(await modal.findByText('You intend to create an Opening.'))
      await userEvent.click(modal.getByText('Sign transaction and Create'))
    })

    step('Transaction parameters', () => {
      const [signer, description, openingType, stakePolicy, rewardPerBlock] = args.onCreateOpening.mock.calls.at(-1)

      expect(signer).toBe(member('alice').controllerAccount)

      expect(stakePolicy.toJSON()).toEqual({
        stakeAmount: 100_0000000000,
        leavingUnstakingPeriod: 1000,
      })
      expect(new BN(rewardPerBlock).toNumber()).toEqual(1000000000)

      expect(openingType).toEqual('Regular')
      expect(metadataFromBytes(OpeningMetadata, description)).toEqual(WG_OPENING_METADATA)
    })

    await step('Link to new Opening', async () => {
      const openingLink = (await modal.findByText('See my Opening')).parentElement as Element
      expect(openingLink.getAttribute('href')).toBe('/working-groups/openings/builders-1')
    })
  },
}

export const CreateOpeningImport: Story = {
  parameters: {
    router: { path: '/working-groups/:name/openings', href: '/working-groups/builders/openings' },
  },

  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await userEvent.click(screen.getByText('Add opening'))
    expect(modal.getByText('Create Opening'))
    const nextButton = getButtonByText(modal, 'Next step')

    await step('Import File', async () => {
      const importButton = getButtonByText(modal, 'Import')

      await userEvent.click(importButton)

      const uploadField = await modal.findByText(/Browse for file/)
      expect(getButtonByText(modal, 'Preview Import')).toBeDisabled()

      await userEvent.upload(
        uploadField,
        new File([JSON.stringify(WG_JSON_OPENING)], 'file.json', { type: 'application/json' })
      )
    })

    await step('Check imported data', async () => {
      expect(await modal.findByText(/File imported successfully, preview your input/))

      const previewImportButton = getButtonByText(modal, 'Preview Import')
      await waitFor(() => expect(previewImportButton).toBeEnabled())
      await userEvent.click(previewImportButton)

      expect(await modal.findByLabelText('Opening title'))
      expect(nextButton).toBeEnabled()
      await userEvent.click(nextButton)

      expect(await modal.findByText('Opening Duration'))
      await userEvent.click(modal.getByText('Limited'))
      expect(nextButton).toBeEnabled()
      await userEvent.click(nextButton)

      expect(await modal.findByText('Application form'))
      expect(nextButton).toBeEnabled()
      await userEvent.click(nextButton)

      expect(await modal.getByLabelText('Staking amount *'))
      const createButton = getButtonByText(modal, 'Create Opening')
      await userEvent.click(createButton)
    })

    await step('Sign transaction and Create', async () => {
      expect(await modal.findByText('You intend to create an Opening.'))
      await userEvent.click(modal.getByText('Sign transaction and Create'))
    })

    step('Transaction parameters', () => {
      const [signer, description, openingType, stakePolicy, rewardPerBlock] = args.onCreateOpening.mock.calls.at(-1)

      expect(signer).toBe(member('alice').controllerAccount)

      expect(stakePolicy.toJSON()).toEqual({
        stakeAmount: 200_0000000000,
        leavingUnstakingPeriod: 200,
      })
      expect(new BN(rewardPerBlock).toNumber()).toEqual(200000000000)

      expect(openingType).toEqual('Regular')
      expect(metadataFromBytes(OpeningMetadata, description)).toEqual(WG_OPENING_METADATA)
    })
  },
}
