import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { AddressToBalanceMap } from '@/accounts/types'
import { SubmitWorkModal } from '@/bounty/modals/SubmitWorkModal/SubmitWorkModal'
import { Bounty } from '@/bounty/types/Bounty'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { getMember } from '../../../../test/_mocks/members'
import { stubApi, stubBountyConstants, stubTransaction } from '../../../../test/_mocks/transactions'

export default {
  title: 'Bounty/SubmitWorkModal',
  component: SubmitWorkModal,
} as Meta

const bounty: Bounty = {
  id: 'bounty 1',
  fundingType: {
    maxAmount: new BN(20000),
    minAmount: new BN(15000),
    maxPeriod: 1000,
  },
  totalFunding: new BN(10000),
} as Bounty

const accounts = {
  isLoading: false,
  allAccounts: [
    { name: 'Alice Account', address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' },
    { name: 'Bob Account', address: '5DWS57CtERHpNehXCPcNoHGKutQYGrwvaEF5zXb26Fz9rcQp' },
  ],
  hasAccounts: true,
}

const balance: AddressToBalanceMap = {
  [accounts.allAccounts[0].address]: {
    total: new BN(10000),
    locked: new BN(0),
    recoverable: new BN(0),
    transferable: new BN(0),
    locks: [],
  },
  [accounts.allAccounts[1].address]: {
    total: new BN(10000),
    locked: new BN(0),
    recoverable: new BN(0),
    transferable: new BN(2001),
    locks: [],
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
stubTransaction(api, 'api.tx.bounty.submitWork', 2000)

const Template: Story = (args) => {
  return (
    <MockApolloProvider members>
      <MemoryRouter>
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
                  <SubmitWorkModal {...args} />
                </ModalContext.Provider>
              </BalancesContext.Provider>
            </AccountsContext.Provider>
          </MembershipContext.Provider>
        </ApiContext.Provider>
      </MemoryRouter>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}
