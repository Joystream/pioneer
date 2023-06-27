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

export const LoggedIn: Story = {}

export const NoWallet: Story = {
  args: { hasWallet: false, hasAccounts: false, hasFunds: false, hasMemberships: false, isLoggedIn: false },
}

export const NoAccount: Story = {
  args: { hasAccounts: false, hasFunds: false, hasMemberships: false, isLoggedIn: false },
}

export const NoFund: Story = {
  args: { hasFunds: false, hasMemberships: false, isLoggedIn: false },
}

export const NoMembership: Story = {
  args: { hasMemberships: false, isLoggedIn: false },
}

export const UnreachableRPCNode: Story = { args: { isRPCNodeConnected: false } }
