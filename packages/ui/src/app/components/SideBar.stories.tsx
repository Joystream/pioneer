import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { Membership, member } from '@/mocks/data/members'
import { joy } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { SideBar } from './SideBar'

type Args = {
  isLoggedIn: boolean
  hasMemberships: boolean
  hasFunds: boolean
  hasAccounts: boolean
  hasWallet: boolean
  isRPCNodeConnected: boolean
  onBuyMembership: CallableFunction
  onTransfer: CallableFunction
}

type Story = StoryObj<FC<Args>>

const alice = member('alice')
const bob = member('bob')
const charlie = member('charlie')

export default {
  title: 'App/SideBar',
  component: SideBar,

  argTypes: {
    onBuyMembership: { action: 'BuyMembership' },
    onTransfer: { action: 'BalanceTransfer' },
  },

  args: {
    isLoggedIn: true,
    hasMemberships: true,
    hasAccounts: true,
    hasFunds: true,
    hasWallet: true,
    isRPCNodeConnected: true,
  },

  parameters: {
    mocks: ({ args }: StoryContext<Args>): MocksParameters => {
      const account = (member: Membership) => ({
        balances: args.hasFunds ? 100 : 0,
        ...(args.hasMemberships ? { member } : { account: { name: member.handle, address: member.controllerAccount } }),
      })

      return {
        accounts: {
          active: args.isLoggedIn ? 'alice' : undefined,
          list: args.hasMemberships || args.hasAccounts ? [account(alice), account(bob), account(charlie)] : [],
          hasWallet: args.hasWallet,
        },

        chain: !args.isRPCNodeConnected
          ? undefined
          : {
              query: {
                members: { membershipPrice: joy(5) },
                council: { stage: { stage: { isIdle: true }, changedAt: 123 } },
                referendum: { stage: {} },
              },

              tx: {
                balances: { transfer: { event: 'Balances.Transfer', onSend: args.onTransfer } },
                members: {
                  buyMembership: { event: 'MembershipBought', onSend: args.onBuyMembership },
                },
              },
            },
      }
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}

export const UnreachableRPCNode: Story = { args: { isRPCNodeConnected: false } }

// ----------------------------------------------------------------------------
// Test Switch membership modal
// ----------------------------------------------------------------------------

export const SwitchMembership: Story = {
  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await step('Switch active membership to bob', async () => {
      expect(screen.queryByText('bob')).toBeNull()
      await userEvent.click(screen.getByText('alice'))

      await userEvent.click(modal.getByText('bob'))
      expect(screen.queryByText('alice')).toBeNull()
      expect(screen.getByText('bob'))
    })

    await step('Sign out', async () => {
      await userEvent.click(screen.getByText('bob'))
      await userEvent.click(modal.getByText('Sign Out'))
      expect(modal.getByText('Sign out of bob ?'))
      await userEvent.click(getButtonByText(modal, 'Sign Out'))

      expect(getButtonByText(screen, 'Select membership'))
    })
  },
}

// ----------------------------------------------------------------------------
// Test On Boarding flow
// ----------------------------------------------------------------------------

const expectActiveStepToBe = (modal: Container, text: string) =>
  expect(modal.getByText(text, { selector: 'h6' }).parentElement?.previousElementSibling).toHaveStyle(
    `background-color: ${Colors.Blue[500]}`
  )

export const ConnectWallet: Story = {
  args: { hasWallet: false, hasAccounts: false, hasFunds: false, hasMemberships: false, isLoggedIn: false },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    await userEvent.click(getButtonByText(screen, 'Connect Wallet'))

    const modal = withinModal(canvasElement)
    expectActiveStepToBe(modal, 'Connect wallet')
    expect(modal.getByText('Select Wallet'))
    const pluginButton = getButtonByText(modal, 'Install extension')
    expect(pluginButton).toBeDisabled()
    await userEvent.click(modal.getByText('Polkadot.js'))
    expect(pluginButton).toBeEnabled()
  },
}

export const NoAccount: Story = {
  args: { hasAccounts: false, hasFunds: false, hasMemberships: false, isLoggedIn: false },

  play: async ({ canvasElement }) => {
    const screen = within(canvasElement)
    await userEvent.click(getButtonByText(screen, 'Join Now'))

    const modal = withinModal(canvasElement)
    expectActiveStepToBe(modal, 'Connect account')
    expect(modal.getByText('Connect account', { selector: '[class^=ModalBody] *' }))
    expect(getButtonByText(modal, 'Return to wallet selection')).toBeEnabled()
    expect(getButtonByText(modal, 'Connect Account')).toBeDisabled()
    expect(modal.queryByText('alice')).toBeNull()
  },
}

export const FaucetMembership: Story = {
  args: { hasFunds: false, hasMemberships: false, isLoggedIn: false },

  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)
    const modal = withinModal(canvasElement)

    await userEvent.click(getButtonByText(screen, 'Join Now'))

    await step('Connect account', async () => {
      expectActiveStepToBe(modal, 'Connect account')
      expect(modal.getByText('Connect account', { selector: '[class^=ModalBody] *' }))

      expect(getButtonByText(modal, 'Return to wallet selection')).toBeEnabled()

      const connectAccountButton = getButtonByText(modal, 'Connect Account')
      expect(connectAccountButton).toBeDisabled()
      await userEvent.click(modal.getByText('alice'))
      expect(connectAccountButton).toBeEnabled()
      await userEvent.click(connectAccountButton)
    })

    await step('Create free membership', async () => {
      await waitFor(() => expectActiveStepToBe(modal, 'Create free membership'))
      expect(modal.getByText('Please fill in all the details below.'))

      // Check that the CAPTCHA blocks the next step
      await userEvent.type(modal.getByLabelText('Member Name'), 'Alice')
      await userEvent.type(modal.getByLabelText('Membership handle'), 'alice')
      await userEvent.type(modal.getByLabelText('About member'), 'Lorem ipsum...')
      const avatar = 'https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Alice'
      await userEvent.type(modal.getByLabelText('Member Avatar'), avatar)
      await userEvent.click(modal.getByLabelText(/^I agree to the/))
      expect(getButtonByText(modal, 'Create a Membership')).toBeDisabled()
    })
  },
}
