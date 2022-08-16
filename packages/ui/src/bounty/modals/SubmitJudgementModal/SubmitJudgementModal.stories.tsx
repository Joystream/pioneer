import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { AddressToBalanceMap } from '@/accounts/types'
import { ApiContext } from '@/api/providers/context'
import { SubmitJudgementModal } from '@/bounty/modals/SubmitJudgementModal/SubmitJudgementModal'
import { ModalContext } from '@/common/providers/modal/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import bounties from '@/mocks/data/raw/bounties.json'
import { getMember } from '@/mocks/helpers'

import { MockKeyringProvider, MockQueryNodeProviders } from '../../../../test/_mocks/providers'
import { stubApi, stubBountyConstants, stubTransaction } from '../../../../test/_mocks/transactions'
import { mockDefaultBalance } from '../../../../test/setup'

export default {
  title: 'Bounty/SubmitJudgementModal',
  component: SubmitJudgementModal,
} as Meta

const modalData = {
  bounty: {
    ...bounties[0],
    totalFunding: new BN(15999),
    entries: [
      {
        worker: {
          id: '7',
        },
      },
      {
        worker: {
          id: '8',
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
    ...mockDefaultBalance,
    total: new BN(10000),
    transferable: new BN(10000),
  },
}

const api = stubApi()
stubBountyConstants(api)
stubTransaction(api, 'api.tx.bounty.submitOracleJudgment', 888)

const Template: Story = () => {
  return (
    <MockQueryNodeProviders>
      <MockKeyringProvider>
        <ApiContext.Provider value={api}>
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
        </ApiContext.Provider>
      </MockKeyringProvider>
    </MockQueryNodeProviders>
  )
}

export const Default = Template.bind({})
