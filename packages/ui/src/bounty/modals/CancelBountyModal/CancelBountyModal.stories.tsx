import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { AddressToBalanceMap } from '@/accounts/types'
import { CancelBountyModal } from '@/bounty/modals/CancelBountyModal/CancelBountyModal'
import { ModalContext } from '@/common/providers/modal/context'
import bounties from '@/mocks/data/raw/bounties.json'
import members from '@/mocks/data/raw/members.json'

export default {
  title: 'Bounty/CancelBounty',
  component: CancelBountyModal,
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
    total: new BN(10000),
    locked: new BN(0),
    recoverable: new BN(0),
    transferable: new BN(0),
    locks: [],
  },
  [useMyAccounts.allAccounts[1].address]: {
    total: new BN(10000),
    locked: new BN(0),
    recoverable: new BN(0),
    transferable: new BN(2001),
    locks: [],
  },
}

const Template: Story = () => {
  return (
    <MemoryRouter>
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
            <CancelBountyModal />
          </BalancesContext.Provider>
        </AccountsContext.Provider>
      </ModalContext.Provider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
