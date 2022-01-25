import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { AddressToBalanceMap } from '@/accounts/types'
import { SubmitJudgementModal } from '@/bounty/modals/SubmitJudgementModal/SubmitJudgementModal'
import { ModalContext } from '@/common/providers/modal/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import bounties from '@/mocks/data/raw/bounties.json'
import { getMember } from '@/mocks/helpers'

export default {
  title: 'Bounty/SubmitJudgementModal',
  component: SubmitJudgementModal,
} as Meta

const modalData = {
  bounty: {
    ...bounties[0],
    entries: [
      {
        worker: {
          id: '7',
        },
      },
    ],
  },
}

const useMyAccounts: UseAccounts = {
  isLoading: false,
  hasAccounts: false,
  allAccounts: [{ name: 'Alice Account', address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' }],
  error: undefined,
}

const useMyMemberships = {
  active: getMember('alice'),
  setActive: () => undefined,
  members: [],
  hasMembers: false,
  isLoading: true,
  helpers: {
    getMemberIdByBoundAccountAddress: () => undefined,
  },
}

const useMyBalances: AddressToBalanceMap = {
  [useMyAccounts.allAccounts[0].address]: {
    total: new BN(10000),
    locked: new BN(0),
    recoverable: new BN(0),
    transferable: new BN(0),
    locks: [],
  },
}

const Template: Story = () => {
  return (
    <MemoryRouter>
      <MockApolloProvider members>
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
              <MembershipContext.Provider value={useMyMemberships}>
                <SubmitJudgementModal />
              </MembershipContext.Provider>
            </BalancesContext.Provider>
          </AccountsContext.Provider>
        </ModalContext.Provider>
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
