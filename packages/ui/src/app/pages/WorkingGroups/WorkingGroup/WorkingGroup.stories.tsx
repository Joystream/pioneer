import { expect } from '@storybook/jest'
/* eslint-disable no-console */
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { FC } from 'react'

import { member } from '@/mocks/data/members'
import { getButtonByText, getEditorByLabel, joy, withinModal } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'
import { GetWorkersDocument, GetWorkingGroupDocument } from '@/working-groups/queries'

import { WorkingGroup } from './WorkingGroup'

type Args = {
  isLead: boolean
}

type Story = StoryObj<FC<Args>>

const WG_DATA = {
  id: 'membershipWorkingGroup',
  name: 'membership',
}

export default {
  title: 'Pages/Working Group/WorkingGroup',
  component: WorkingGroup,

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

        // chain: undefined,

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
  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    const closeModal = async (heading: string | HTMLElement) => {
      const headingElement = heading instanceof HTMLElement ? heading : modal.getByRole('heading', { name: heading })
      await userEvent.click(headingElement.nextElementSibling as HTMLElement)
      await userEvent.click(getButtonByText(modal, 'Close'))
    }

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
      await waitFor(() => expect(nextButton).toBeDisabled())
      await userEvent.type(modal.getByLabelText('Expected length of the application period'), '1000')
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
      await userEvent.type(modal.getByLabelText('Role cooldown period'), '0')
      await userEvent.type(modal.getByLabelText('Reward amount per Block'), '0.1')
    })
  },
}
