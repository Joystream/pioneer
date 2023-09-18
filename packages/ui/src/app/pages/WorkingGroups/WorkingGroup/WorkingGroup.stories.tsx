import { OpeningMetadata } from '@joystream/metadata-protobuf'
import { expect } from '@storybook/jest'
/* eslint-disable no-console */
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import BN from 'bn.js'
import { FC } from 'react'

import { metadataFromBytes } from '@/common/model/JoystreamNode'
import { member } from '@/mocks/data/members'
import { getButtonByText, getEditorByLabel, joy, withinModal } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'
import { GetWorkersDocument, GetWorkingGroupDocument } from '@/working-groups/queries'

import { WorkingGroup } from './WorkingGroup'

type Args = {
  isLead: boolean
  onCreateOpening: jest.Mock
}

type Story = StoryObj<FC<Args>>

const WG_DATA = {
  id: 'membershipWorkingGroup',
  name: 'membership',
}

const WG_OPENING_DATA = {
  title: 'Membership worker role',
  shortDescription: 'Lorem Ipsum...',
  description: 'Bigger Lorem ipsum...',
  applicationDetails: 'Application process default',
  applicationFormQuestions: [
    { question: '🐁?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXT },
    { question: '🐘?', type: OpeningMetadata.ApplicationFormQuestion.InputType.TEXTAREA },
  ],
  hiringLimit: 1,
  expectedEndingTimestamp: 2000,
}

export default {
  title: 'Pages/Working Group/WorkingGroup',
  component: WorkingGroup,

  argTypes: {
    onCreateOpening: { action: 'MembershipWorkingGroup.OpeningCreated' },
  },

  args: {
    isLead: true,
  },

  parameters: {
    router: { path: '/:name', href: `/${WG_DATA.name}` },
    isLoggedIn: true,
    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const alice = member('alice', {
        roles: [
          {
            __typename: 'Worker',
            id: `${WG_DATA.id}-0`,
            createdAt: '2021',
            isLead: args.isLead,
            group: {
              __typename: 'WorkingGroup',
              name: WG_DATA.name,
            },
          },
        ],
      })
      return {
        accounts: parameters.isLoggedIn ? { active: { member: alice } } : { list: [{ member: alice }] },

        chain: {
          tx: {
            membershipWorkingGroup: {
              addOpening: {
                event: 'OpeningCreated',
                onSend: args.onCreateOpening,
                failure: parameters.createOpeningFailure,
              },
            },
          },
        },

        queryNode: [
          {
            query: GetWorkingGroupDocument,
            data: {
              workingGroupByUniqueInput: {
                id: WG_DATA.id,
                name: WG_DATA.name,
                budget: joy(200),
                workers: [],
                leader: { membershipId: alice.id, isActive: true },
              },
            },
          },
          {
            query: GetWorkersDocument,
            data: {
              workers: [
                {
                  id: `${WG_DATA.id}-0`,
                  group: {
                    id: WG_DATA.id,
                    name: WG_DATA.name,
                  },
                  status: 'WorkerStatusActive',
                  membership: alice,
                },
                {
                  id: `${WG_DATA.id}-1`,
                  group: {
                    id: WG_DATA.id,
                    name: WG_DATA.name,
                  },
                  status: 'WorkerStatusActive',
                  membership: member('charlie'),
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

export const CreateOpening: Story = {
  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    // const closeModal = async (heading: string | HTMLElement) => {
    //   const headingElement = heading instanceof HTMLElement ? heading : modal.getByRole('heading', { name: heading })
    //   await userEvent.click(headingElement.nextElementSibling as HTMLElement)
    //   await userEvent.click(getButtonByText(modal, 'Close'))
    // }

    await userEvent.click(screen.getByText('Add opening'))
    expect(modal.getByText('Create Opening'))
    const nextButton = getButtonByText(modal, 'Next step')

    // // console.log('Modal here ',modal)

    await step('Working group & description', async () => {
      await waitFor(() => expect(nextButton).toBeDisabled())
      await waitFor(() => expect(modal.getByTestId('opening-title')), { timeout: 3000 })

      const openingTitleField = modal.getByTestId('opening-title')
      const shortDescriptionField = modal.getByTestId('short-description')

      await userEvent.type(await openingTitleField, 'Membership worker role')
      await userEvent.type(shortDescriptionField, 'Lorem Ipsum...')
      ;(await getEditorByLabel(modal, 'Description')).setData('Bigger Lorem ipsum...')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)
    })
    await step('Duration & Process', async () => {
      expect(nextButton).toBeDisabled()
      ;(await getEditorByLabel(modal, 'Application process')).setData('Application process default')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(modal.getByText('Limited'))
      const expectedLengthField = modal.getByLabelText('Expected length of the application period')
      await userEvent.clear(expectedLengthField)
      await userEvent.type(expectedLengthField, '2000')
      await waitFor(() => expect(nextButton).toBeEnabled())
      await userEvent.click(nextButton)
    })
    await step('Application Form', async () => {
      expect(nextButton).toBeDisabled()
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
      expect(nextButton).toBeDisabled()
      await userEvent.type(modal.getByLabelText('Staking amount *'), '100')
      await userEvent.type(modal.getByLabelText('Role cooldown period'), '1000')
      await userEvent.type(modal.getByLabelText('Reward amount per Block'), '0.1')
      // await waitFor(
      //   async () => {
      //     await userEvent.type(modal.getByLabelText('Reward amount per Block'), '0.1')
      //   },
      //   { timeout: 3000 }
      // )
    })

    await step('Sign transaction and Create', async () => {
      await waitFor(async () => {
        const createButton = getButtonByText(modal, 'Create Opening')
        if (createButton) {
          await waitFor(() => expect(createButton).toBeEnabled())
          await userEvent.click(createButton)
        }
        await userEvent.click(modal.getByText('Sign transaction and Create'))
      })
      // expect(await waitForModal(modal, 'Success'))
    })

    step('Transaction parameters', () => {
      const [description, openingType, stakePolicy, rewardPerBlock] = args.onCreateOpening.mock.calls.at(-1)

      console.log('Stake policy === ', stakePolicy)
      console.log('Reward per Block === ', rewardPerBlock)

      // const { description, ...data } = specificParameters.asCreateWorkingGroupLeadOpening.toJSON()

      expect(stakePolicy).toEqual({
        stakeAmount: new BN(100),
        leavingUnstakingPeriod: new BN(1000),
      })
      // expect(rewardPerBlock).toEqual(1000000000)

      expect(openingType).toEqual('Regular')
      expect(metadataFromBytes(OpeningMetadata, description)).toEqual({ ...WG_OPENING_DATA })
    })
  },
}
