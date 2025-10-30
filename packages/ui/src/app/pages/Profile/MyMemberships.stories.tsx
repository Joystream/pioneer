import { SubmittableExtrinsic } from '@polkadot/api/types'
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
import { validators } from '@/mocks/data/validators'
import { Container, getButtonByText, joy, selectFromDropdown, withinModal } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { MyMemberships } from './MyMemberships'

const alice = member('alice')
const bob = member('bob')
const charlie = member('charlie')
const dave = member('dave')
const eve = member('eve')

const NEW_MEMBER_DATA = {
  id: alice.id,
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
  },

  parameters: {
    totalBalance: 100,
    router: {
      href: '/profile/memberships',
    },
    mocks: ({ args, parameters }: StoryContext<Args>): MocksParameters => {
      const account = (member: Membership) => ({
        balances: parameters.totalBalance,
        ...{ member },
      })
      return {
        accounts: {
          active: 'alice',
          list: [account(alice), account(bob), account(charlie), account(dave), account(eve)],
          hasWallet: true,
        },
        chain: {
          query: {
            members: { membershipPrice: joy(20) },
            membershipWorkingGroup: { budget: joy(166666_66) },
            staking: {
              validators: {
                entries: Object.entries(validators).map(([address, { commission }]) => [
                  { args: [address] },
                  { commission, blocked: false },
                ]),
              },
              bonded: { multi: Object.keys(validators) },
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
                failure: parameters.updateProfileTxFailure,
              },
              updateAccounts: {
                event: 'MembershipBought',
                data: [NEW_MEMBER_DATA.id],
                onSend: args.onUpdateAccounts,
                failure: parameters.updateAccountsTxFailure,
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
                onSend: (signer: string, transactions: SubmittableExtrinsic<'rxjs'>[]) =>
                  transactions.forEach((transaction) => transaction.signAndSend(signer)),
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
              data: { memberships: [member('alice'), member('bob'), member('charlie'), member('dave'), member('eve')] },
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
      expect(saveButton).toBeEnabled()
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
      expect(args.onUpdateAccounts).toHaveBeenCalledTimes(1)
      expect(args.onUpdateProfile).toHaveBeenCalledTimes(1)

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

const addValidatorAccounts = async (modal: Container, accounts: string[]) => {
  const validatorAccountsContainer = document.getElementsByClassName('validator-accounts')[0]
  const addButton = modal.getByText('Add Validator Account')
  for (let i = 0; i < accounts.length; i++) {
    await userEvent.click(addButton)
  }
  const selectors = validatorAccountsContainer.querySelectorAll('input')
  for (let i = 0; i < accounts.length; i++) {
    await selectFromDropdown(modal, selectors[selectors.length - (accounts.length - i)], accounts[i])
  }
}

const removeValidatorAccounts = async (accounts: string[]) => {
  const validatorAccountsContainer = within(document.getElementsByClassName('validator-accounts')[0] as HTMLElement)
  const nthParentElement = (element: HTMLElement, n: number) => {
    let parent = element as HTMLElement | null
    for (let i = 0; i < n; i++) {
      parent = parent?.parentElement ?? null
    }
    return parent
  }
  for (const account of accounts) {
    const removeButton = nthParentElement(validatorAccountsContainer.getByText(account), 8)?.querySelector(
      '.remove-button'
    )
    if (!removeButton) throw `Not found the '${account}' account to removed.`
    await userEvent.click(removeButton)
  }
}

export const UpdateValidatorAccountsHappy: Story = {
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
      await removeValidatorAccounts(['bob', 'charlie'])
      await addValidatorAccounts(modal, ['dave', 'eve'])
      await waitFor(() => expect(saveButton).toBeEnabled())
      await userEvent.click(saveButton)
    })

    await step('Remove Validator Account: bob', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByText('You intend to remove the validator account from your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'bob' }))

      await userEvent.click(getButtonByText(modal, 'Sign and unbond'))
    })

    await step('Remove Validator Account: charlie', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByRole('heading', { name: 'charlie' }))

      await userEvent.click(getButtonByText(modal, 'Sign and unbond'))
    })

    await step('Add Validator Account: dave', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByText('You intend to to bond new validator account with your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'dave' }))

      await userEvent.click(getButtonByText(modal, 'Sign and bond'))
    })

    await step('Add Validator Account: eve', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByRole('heading', { name: 'eve' }))

      await userEvent.click(getButtonByText(modal, 'Sign and bond'))
    })

    await step('Confirm validator accounts', async () => {
      expect(await modal.findByText('You intend to confirm your validator account to be bound with your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'alice' }))

      await userEvent.click(getButtonByText(modal, 'Sign and confirm'))
    })

    await step('Update Membership', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByText('You intend to update your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'alice' }))

      await userEvent.click(getButtonByText(modal, 'Sign and update a member'))
    })

    await step('Confirm', async () => {
      expect(await modal.findByText('Success'))
      expect(modal.getByText('alice'))
      expect(args.onRemoveStakingAccount).toHaveBeenCalledTimes(2)
      expect(args.onRemoveStakingAccount).toBeCalledWith(bob.controllerAccount, alice.id)
      expect(args.onRemoveStakingAccount).toBeCalledWith(charlie.controllerAccount, alice.id)
      expect(args.onAddStakingAccount).toHaveBeenCalledTimes(2)
      expect(args.onAddStakingAccount).toHaveBeenCalledWith(dave.controllerAccount, alice.id)
      expect(args.onAddStakingAccount).toHaveBeenCalledWith(eve.controllerAccount, alice.id)
      expect(args.onConfirmStakingAccount).toHaveBeenCalledTimes(2)
      expect(args.onConfirmStakingAccount).toHaveBeenCalledWith(
        alice.controllerAccount,
        alice.id,
        dave.controllerAccount
      )
      expect(args.onConfirmStakingAccount).toHaveBeenCalledWith(
        alice.controllerAccount,
        alice.id,
        eve.controllerAccount
      )
    })
  },
}

export const UnbondValidatorAccountsHappy: Story = {
  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await waitFor(() => expect(screen.getByText('alice')))
    const editButton = document.getElementsByClassName('edit-button')[0]
    await userEvent.click(editButton)

    await step('Form', async () => {
      const saveButton = getButtonByText(modal, 'Save changes')
      expect(saveButton).toBeDisabled()
      await waitFor(() => removeValidatorAccounts(['bob', 'charlie']))
      const validatorCheckButton = modal.getAllByText('No')[0]
      await userEvent.click(validatorCheckButton)
      await waitFor(() => expect(saveButton).toBeEnabled())
      await userEvent.click(saveButton)
    })

    await step('Remove Validator Account: bob', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByText('You intend to remove the validator account from your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'bob' }))

      await userEvent.click(getButtonByText(modal, 'Sign and unbond'))
    })

    await step('Remove Validator Account: charlie', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByRole('heading', { name: 'charlie' }))

      await userEvent.click(getButtonByText(modal, 'Sign and unbond'))
    })

    await step('Confirm', async () => {
      expect(await modal.findByText('Success'))
      expect(modal.getByText('alice'))
      expect(args.onRemoveStakingAccount).toHaveBeenCalledTimes(2)
      expect(args.onRemoveStakingAccount).toBeCalledWith(bob.controllerAccount, alice.id)
      expect(args.onRemoveStakingAccount).toBeCalledWith(charlie.controllerAccount, alice.id)
    })
  },
}

export const UnbondValidatorAccountFailure: Story = {
  parameters: { removeStakingAccountTxFailure: 'Some error message' },
  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await waitFor(() => expect(screen.getByText('alice')))
    const editButton = document.getElementsByClassName('edit-button')[0]
    await userEvent.click(editButton)

    await step('Form', async () => {
      const saveButton = getButtonByText(modal, 'Save changes')
      expect(saveButton).toBeDisabled()
      await waitFor(() => removeValidatorAccounts(['bob']))
      await waitFor(() => expect(saveButton).toBeEnabled())
      await userEvent.click(saveButton)
    })

    await step('Remove Validator Account Failure', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByText('You intend to remove the validator account from your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'bob' }))

      await userEvent.click(getButtonByText(modal, 'Sign and unbond'))
      expect(await modal.findByText('Failure'))
      expect(await modal.findByText('There was a problem updating membership.'))
    })
  },
}

export const BondValidatorAccountsHappy: Story = {
  play: async ({ args, canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await waitFor(() => expect(screen.getByText('alice')))
    const editButton = document.getElementsByClassName('edit-button')[0]
    await userEvent.click(editButton)

    await step('Form', async () => {
      const saveButton = getButtonByText(modal, 'Save changes')
      expect(saveButton).toBeDisabled()
      await waitFor(() => addValidatorAccounts(modal, ['dave', 'eve']))
      await waitFor(() => expect(saveButton).toBeEnabled())
      await userEvent.click(saveButton)
    })

    await step('Add Validator Account: dave', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByText('You intend to to bond new validator account with your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'dave' }))

      await userEvent.click(getButtonByText(modal, 'Sign and bond'))
    })

    await step('Add Validator Account: eve', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByRole('heading', { name: 'eve' }))

      await userEvent.click(getButtonByText(modal, 'Sign and bond'))
    })

    await step('Confirm validator accounts', async () => {
      expect(await modal.findByText('You intend to confirm your validator account to be bound with your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'alice' }))

      await userEvent.click(getButtonByText(modal, 'Sign and confirm'))
    })

    await step('Confirm', async () => {
      expect(await modal.findByText('Success'))
      expect(modal.getByText('alice'))
      expect(args.onAddStakingAccount).toHaveBeenCalledTimes(2)
      expect(args.onAddStakingAccount).toHaveBeenCalledWith(dave.controllerAccount, alice.id)
      expect(args.onAddStakingAccount).toHaveBeenCalledWith(eve.controllerAccount, alice.id)
      expect(args.onConfirmStakingAccount).toHaveBeenCalledTimes(2)
      expect(args.onConfirmStakingAccount).toHaveBeenCalledWith(
        alice.controllerAccount,
        alice.id,
        dave.controllerAccount
      )
      expect(args.onConfirmStakingAccount).toHaveBeenCalledWith(
        alice.controllerAccount,
        alice.id,
        eve.controllerAccount
      )
    })
  },
}

export const BondValidatorAccountFailure: Story = {
  parameters: { addStakingAccountTxFailure: 'Some error message' },
  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await waitFor(() => expect(screen.getByText('alice')))
    const editButton = document.getElementsByClassName('edit-button')[0]
    await userEvent.click(editButton)

    await step('Form', async () => {
      const saveButton = getButtonByText(modal, 'Save changes')
      expect(saveButton).toBeDisabled()
      await waitFor(() => addValidatorAccounts(modal, ['dave']))
      await waitFor(() => expect(saveButton).toBeEnabled())
      await userEvent.click(saveButton)
    })

    await step('Add Validator Account: dave', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByText('You intend to to bond new validator account with your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'dave' }))

      await userEvent.click(getButtonByText(modal, 'Sign and bond'))
      expect(await modal.findByText('Failure'))
      expect(await modal.findByText('There was a problem updating membership.'))
    })
  },
}

export const UnbondValidatorAccountHappyConfirmFailure: Story = {
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
      await waitFor(() => addValidatorAccounts(modal, ['dave', 'eve']))
      await waitFor(() => expect(saveButton).toBeEnabled())
      await userEvent.click(saveButton)
    })

    await step('Add Validator Account: dave', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByText('You intend to to bond new validator account with your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'dave' }))

      await userEvent.click(getButtonByText(modal, 'Sign and bond'))
    })

    await step('Add Validator Account: eve', async () => {
      await waitFor(() => expect(modal.getByText('Authorize transaction')))
      expect(modal.getByRole('heading', { name: 'eve' }))

      await userEvent.click(getButtonByText(modal, 'Sign and bond'))
    })

    await step('Confirm validator accounts', async () => {
      expect(await modal.findByText('You intend to confirm your validator account to be bound with your membership.'))
      expect(modal.getByText('Transaction fee:')?.nextSibling?.textContent).toBe('5')
      expect(modal.getByRole('heading', { name: 'alice' }))

      await userEvent.click(getButtonByText(modal, 'Sign and confirm'))
      expect(await modal.findByText('Failure'))
      expect(await modal.findByText('There was a problem updating membership.'))
    })
  },
}
