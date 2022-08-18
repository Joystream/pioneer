import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { AddressToBalanceMap } from '@/accounts/types'
import { ApiContext } from '@/api/providers/context'
import { Bounty, Contributor, WorkEntry } from '@/bounty/types/Bounty'
import { ModalContext } from '@/common/providers/modal/context'
import { MembershipContext } from '@/memberships/providers/membership/context'

import { alice, bob } from '../../../../test/_mocks/keyring'
import { getMember } from '../../../../test/_mocks/members'
import { stubApi, stubBountyConstants, stubTransaction } from '../../../../test/_mocks/transactions'
import { mockDefaultBalance } from '../../../../test/setup'

import { WithdrawStakeModal } from '.'

export default {
  title: 'Bounty/WithdrawStakeModal',
  component: WithdrawStakeModal,
} as Meta

const accounts = {
  isLoading: false,
  allAccounts: [alice, bob],
  hasAccounts: true,
}

const contributor: Contributor = {
  actor: getMember('alice'),
  amount: new BN(10000),
  hasWithdrawn: false,
}

const bounty: Bounty = {
  id: 'bounty 1',
  entries: [
    {
      worker: getMember('alice'),
      stake: new BN(20000),
    } as WorkEntry,
  ],
  contributors: [contributor],
} as Bounty

const balance: AddressToBalanceMap = {
  [accounts.allAccounts[0].address]: {
    ...mockDefaultBalance,
    total: new BN(10000),
  },
  [accounts.allAccounts[1].address]: {
    ...mockDefaultBalance,
    total: new BN(10000),
    transferable: new BN(2001),
  },
}

const membership = {
  isLoading: false,
  active: getMember('alice'),
  hasMembers: true,
  setActive: () => null,
  members: [],
  helpers: {
    getMemberIdByBoundAccountAddress: () => undefined,
  },
}

const api = stubApi()
stubBountyConstants(api)
stubTransaction(api, 'api.tx.bounty.withdrawFunding', 888)

const Template: Story = (args) => {
  return (
    <ApiContext.Provider value={api}>
      <MembershipContext.Provider value={membership}>
        <AccountsContext.Provider value={accounts}>
          <BalancesContext.Provider value={balance}>
            <ModalContext.Provider
              value={{
                modalData: {
                  bounty,
                },
                modal: 'foo',
                hideModal: () => undefined,
                showModal: () => undefined,
              }}
            >
              <WithdrawStakeModal {...args} />
            </ModalContext.Provider>
          </BalancesContext.Provider>
        </AccountsContext.Provider>
      </MembershipContext.Provider>
    </ApiContext.Provider>
  )
}

export const Default = Template.bind({})
Default.args = {}
