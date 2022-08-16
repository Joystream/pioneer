import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { AddressToBalanceMap } from '@/accounts/types'
import { BountyCancelModal } from '@/bounty/modals/CancelBountyModal/BountyCancelModal'
import { ModalContext } from '@/common/providers/modal/context'
import bounties from '@/mocks/data/raw/bounties.json'
import members from '@/mocks/data/raw/members.json'

import { mockDefaultBalance } from '../../../../test/setup'

export default {
  title: 'Bounty/BountyCancelModal',
  component: BountyCancelModal,
} as Meta

const modalData = {
  creator: members[0],
  bounty: bounties[0],
}

const useMyAccounts: UseAccounts = {
  isLoading: false,
  hasAccounts: false,
  allAccounts: [
    { name: 'Alice Account', address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' },
    { name: 'Bob Account', address: '5DWS57CtERHpNehXCPcNoHGKutQYGrwvaEF5zXb26Fz9rcQp' },
  ],
  error: undefined,
}

const useMyBalances: AddressToBalanceMap = {
  [useMyAccounts.allAccounts[0].address]: {
    ...mockDefaultBalance,
    total: new BN(10000),
  },
  [useMyAccounts.allAccounts[1].address]: {
    ...mockDefaultBalance,
    total: new BN(10000),
    transferable: new BN(2001),
  },
}

const Template: Story = () => {
  return (
    <ModalContext.Provider
      value={{
        hideModal: () => undefined,
        modal: 'bar',
        showModal: () => undefined,
        modalData,
      }}
    >
      <AccountsContext.Provider value={useMyAccounts}>
        <BalancesContext.Provider value={useMyBalances}>
          <BountyCancelModal />
        </BalancesContext.Provider>
      </AccountsContext.Provider>
    </ModalContext.Provider>
  )
}

export const Default = Template.bind({})
