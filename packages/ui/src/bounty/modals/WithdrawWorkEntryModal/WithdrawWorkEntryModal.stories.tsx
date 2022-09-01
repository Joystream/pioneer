import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { AddressToBalanceMap } from '@/accounts/types'
import { ApiContext } from '@/api/providers/context'
import { WithdrawWorkEntryModal } from '@/bounty/modals/WithdrawWorkEntryModal/WithdrawWorkEntryModal'
import { ModalContext } from '@/common/providers/modal/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import bounties from '@/mocks/data/raw/bounties.json'
import entries from '@/mocks/data/raw/bountyEntries.json'

import { alice, bob } from '../../../../test/_mocks/keyring'
import { getMember } from '../../../../test/_mocks/members'
import { stubApi, stubBountyConstants, stubTransaction } from '../../../../test/_mocks/transactions'
import { mockDefaultBalance } from '../../../../test/setup'

export default {
  title: 'Bounty/WithdrawWorkEntryModal',
  component: WithdrawWorkEntryModal,
} as Meta

const bounty = bounties[0]
const entry = { ...entries[1], worker: bob }

const modalData = {
  bounty,
  entry,
}

const accounts = {
  isLoading: false,
  allAccounts: [alice, bob],
  hasAccounts: true,
}

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
stubTransaction(api, 'api.tx.bounty.withdrawWorkEntry', 888)

const Template: Story = () => {
  return (
    <ApiContext.Provider value={api}>
      <MembershipContext.Provider value={membership}>
        <AccountsContext.Provider value={accounts}>
          <BalancesContext.Provider value={balance}>
            <ModalContext.Provider
              value={{
                modalData,
                modal: 'foo',
                hideModal: () => undefined,
                showModal: () => undefined,
              }}
            >
              <WithdrawWorkEntryModal />
            </ModalContext.Provider>
          </BalancesContext.Provider>
        </AccountsContext.Provider>
      </MembershipContext.Provider>
    </ApiContext.Provider>
  )
}

export const Default = Template.bind({})
