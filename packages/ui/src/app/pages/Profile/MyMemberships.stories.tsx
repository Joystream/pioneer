import { expect } from '@storybook/jest'
import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { FC } from 'react'

import {
  GetMemberActionDetailsDocument,
  GetMemberDocument,
  GetMembersCountDocument,
  GetMembersWithDetailsDocument,
} from '@/memberships/queries'
import { Membership, member } from '@/mocks/data/members'
import { Container, getButtonByText, joy, selectFromDropdown, withinModal } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { MyMemberships } from './MyMemberships'

const alice = member('alice')
const bob = member('bob')
const charlie = member('charlie')

const NEW_MEMBER_DATA = {
  id: alice.id,
  handle: 'realbobbybob',
  metadata: {
    name: 'BobbyBob',
    about: 'Lorem ipsum...',
    avatar: { avatarUri: 'https://api.dicebear.com/6.x/bottts-neutral/svg?seed=bob' },
  },
}

type Args = {
  onUpdateProfile: jest.Mock
  onUpdateAccounts: jest.Mock
  onAddStakingAccount: jest.Mock
  onConfirmStakingAccount: jest.Mock
  onRemoveStakingAccount: jest.Mock
  batchTx: jest.Mock
}

export default {
  title: 'Pages/MyProfile/MyMemberships',
  component: MyMemberships,

  argTypes: {
    onUpdateProfile: { action: 'UpdateProfile' },
    onUpdateAccounts: { action: 'UpdateAccounts' },
    onAddStakingAccount: { action: 'AddStakingAccount' },
    onConfirmStakingAccount: { action: 'ConfirmStakingAccount' },
    onRemoveStakingAccount: { action: 'RemoveStakingAccount' },
    batchTx: { action: 'BatchTx' },
  },

  parameters: {
    totalBalance: 100,
    router: {
      href: '/profile/memberships',
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const account = (member: Membership) => ({
        balances: parameters.totalBalance,
        ...{ member },
      })
      return {
        accounts: {
          active: 'alice',
          list: [account(alice), account(bob), account(charlie)],
          hasWallet: true,
        },
        chain: {
          query: {
            members: { membershipPrice: joy(20) },
            membershipWorkingGroup: { budget: joy(166666_66) },
            staking: {
              bonded: {
                multi: [
                  'j4RLnWh3DWgc9u4CMprqxfBhq3kthXhvZDmnpjEtETFVm446D',
                  'j4RbTjvPyaufVVoxVGk5vEKHma1k7j5ZAQCaAL9qMKQWKAswW',
                  'j4Rc8VUXGYAx7FNbVZBFU72rQw3GaCuG2AkrUQWnWTh5SpemP',
                  'j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz',
                  'j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa',
                  'j4RuqkJ2Xqf3NTVRYBUqgbatKVZ31mbK59fWnq4ZzfZvhbhbN',
                  'j4RxTMa1QVucodYPfQGA2JrHxZP944dfJ8qdDDYKU4QbJCWNP',
                  'j4Rxkb1w9yB6WXroB2npKjRJJxwxbD8JjSQwMZFB31cf5aZAJ',
                  'j4RyLBbSUBvipuQLkjLyUGeFWEzmrnfYdpteDa2gYNoM13qEg',
                  'j4ShWRXxTG4K5Q5H7KXmdWN8HnaaLwppqM7GdiSwAy3eTLsJt',
                  'j4WfB3TD4tFgrJpCmUi8P3wPp3EocyC5At9ZM2YUpmKGJ1FWM',
                ],
              },
              validators: {
                entries: [
                  [
                    { args: ['j4RLnWh3DWgc9u4CMprqxfBhq3kthXhvZDmnpjEtETFVm446D'] },
                    { commission: 0.05 * 10 ** 9, blocked: false },
                  ],
                  [
                    { args: ['j4RbTjvPyaufVVoxVGk5vEKHma1k7j5ZAQCaAL9qMKQWKAswW'] },
                    { commission: 0.1 * 10 ** 9, blocked: false },
                  ],
                  [
                    { args: ['j4Rc8VUXGYAx7FNbVZBFU72rQw3GaCuG2AkrUQWnWTh5SpemP'] },
                    { commission: 0.05 * 10 ** 9, blocked: false },
                  ],
                  [
                    { args: ['j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz'] },
                    { commission: 0.15 * 10 ** 9, blocked: false },
                  ],
                  [
                    { args: ['j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa'] },
                    { commission: 0.2 * 10 ** 9, blocked: false },
                  ],
                  [
                    { args: ['j4RuqkJ2Xqf3NTVRYBUqgbatKVZ31mbK59fWnq4ZzfZvhbhbN'] },
                    { commission: 0.01 * 10 ** 9, blocked: false },
                  ],
                  [
                    { args: ['j4RxTMa1QVucodYPfQGA2JrHxZP944dfJ8qdDDYKU4QbJCWNP'] },
                    { commission: 0.03 * 10 ** 9, blocked: false },
                  ],
                  [
                    { args: ['j4Rxkb1w9yB6WXroB2npKjRJJxwxbD8JjSQwMZFB31cf5aZAJ'] },
                    { commission: 0.05 * 10 ** 9, blocked: false },
                  ],
                  [
                    { args: ['j4RyLBbSUBvipuQLkjLyUGeFWEzmrnfYdpteDa2gYNoM13qEg'] },
                    { commission: 0.05 * 10 ** 9, blocked: false },
                  ],
                  [
                    { args: ['j4ShWRXxTG4K5Q5H7KXmdWN8HnaaLwppqM7GdiSwAy3eTLsJt'] },
                    { commission: 0.05 * 10 ** 9, blocked: false },
                  ],
                  [
                    { args: ['j4WfB3TD4tFgrJpCmUi8P3wPp3EocyC5At9ZM2YUpmKGJ1FWM'] },
                    { commission: 0.05 * 10 ** 9, blocked: false },
                  ],
                ],
              },
            },
          },
          derive: {
            balances: {
              all: {
                freeBalance: 1000,
                reservedBalance: 1000,
                availableBalance: 1000,
                lockedBalance: 1000,
                lockedBreakdown: [],
                vestingLocked: 1000,
                isVesting: false,
                vestedBalance: joy(1666_66),
                vestedClaimable: joy(1666_66),
                vesting: [],
                vestingTotal: joy(1666_66),
                additional: [],
                namedReserves: [[]],
              },
            },
          },

          tx: {
            members: {
              updateProfile: {
                event: 'MembershipBought',
                data: [NEW_MEMBER_DATA.id],
                onSend: args.onUpdateProfile,
                failure: parameters.buyMembershipTxFailure,
              },
              updateAccounts: {
                event: 'MembershipBought',
                data: [NEW_MEMBER_DATA.id],
                onSend: args.onUpdateAccounts,
                failure: parameters.buyMembershipTxFailure,
              },
              addStakingAccountCandidate: {
                event: 'StakingAccountAdded',
                data: [NEW_MEMBER_DATA.id],
                onSend: args.onAddStakingAccount,
                failure: parameters.addStakingAccountTxFailure,
              },
              confirmStakingAccount: {
                event: 'StakingAccountConfirmed',
                data: [NEW_MEMBER_DATA.id],
                onSend: args.onConfirmStakingAccount,
                failure: parameters.confirmStakingAccountTxFailure,
              },
              removeStakingAccount: {
                event: 'StakingAccountRemoved',
                data: [NEW_MEMBER_DATA.id],
                onSend: args.onRemoveStakingAccount,
                failure: parameters.removeStakingAccountTxFailure,
              },
            },
            utility: {
              batch: {
                event: 'TxBatch',
                onSend: args.batchTx,
                failure: parameters.batchTxFailure,
              },
            },
          },
        },

        gql: {
          queries: [
            {
              query: GetMemberDocument,
              data: { membershipByUniqueInput: member('alice') },
            },
            {
              query: GetMembersCountDocument,
              data: { membershipsConnection: { totalCount: 3 } },
            },
            {
              query: GetMembersWithDetailsDocument,
              data: { memberships: [member('alice'), member('bob'), member('charlie'), member('dave')] },
            },
            {
              query: GetMemberActionDetailsDocument,
              data: {
                stakeSlashedEventsConnection: {
                  totalCount: 2,
                },
                terminatedLeaderEventsConnection: {
                  totalCount: 3,
                },
                terminatedWorkerEventsConnection: {
                  totalCount: 4,
                },
                memberInvitedEventsConnection: {
                  totalCount: 0,
                },
              },
            },
          ],
        },
      }
    },
  },
} satisfies Meta<Args>

type Story = StoryObj<FC<Args>>
export const Default: Story = {}

const fillMembershipForm = async (modal: Container) => {
  await selectFromDropdown(modal, modal.getByText('Root account', { selector: 'label' }), 'bob')
  await selectFromDropdown(modal, modal.getByText('Controller account', { selector: 'label' }), 'charlie')
  await userEvent.type(modal.getByLabelText('Member Name'), NEW_MEMBER_DATA.metadata.name)
  await userEvent.type(modal.getByLabelText('Membership handle'), NEW_MEMBER_DATA.handle)
  await userEvent.type(modal.getByLabelText('About member'), NEW_MEMBER_DATA.metadata.about)
  await userEvent.type(modal.getByLabelText('Member Avatar'), NEW_MEMBER_DATA.metadata.avatar.avatarUri)
}

export const UpdateMembershipHappy: Story = {
  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await waitFor(() => expect(screen.getByText('alice')))
    const editButton = document.getElementsByClassName('edit-button')[0]
    await userEvent.click(editButton)

    await step('Form', async () => {
      const saveButton = getButtonByText(modal, 'Save changes')
      expect(saveButton).toBeDisabled()
      await fillMembershipForm(modal)
      await waitFor(() => expect(saveButton).toBeEnabled())
      await userEvent.click(saveButton)
    })

    await step('Sign', async () => {
      expect(modal.getByText('Authorize transaction'))
      expect(modal.getByText('You intend to update your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'alice' }))

      await userEvent.click(getButtonByText(modal, 'Sign and update a member'))
    })

    await step('Confirm', async () => {
      expect(await modal.findByText('Success'))
      expect(modal.getByText('alice'))
      expect(args.batchTx).toHaveBeenCalledTimes(1)

      const viewProfileButton = getButtonByText(modal, 'View my profile')
      expect(viewProfileButton).toBeEnabled()
      userEvent.click(viewProfileButton)
      expect(modal.getByText('alice'))
    })
  },
}

export const UpdateMembershipFailure: Story = {
  parameters: { batchTxFailure: 'Some error message' },
  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await waitFor(() => expect(screen.getByText('alice')))
    const editButton = document.getElementsByClassName('edit-button')[0]
    await userEvent.click(editButton)

    await step('Form', async () => {
      const saveButton = getButtonByText(modal, 'Save changes')
      expect(saveButton).toBeDisabled()
      await fillMembershipForm(modal)
      await waitFor(() => expect(saveButton).toBeEnabled())
      await userEvent.click(saveButton)
    })

    await step('Sign', async () => {
      expect(modal.getByText('Authorize transaction'))
      await userEvent.click(getButtonByText(modal, 'Sign and update a member'))
    })

    await step('Confirm', async () => {
      expect(await modal.findByText('Failure'))
      expect(await modal.findByText('There was a problem updating membership.'))
    })
  },
}
