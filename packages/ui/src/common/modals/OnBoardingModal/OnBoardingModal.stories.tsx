import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { AddressToBalanceMap } from '@/accounts/types'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { OnBoardingModal } from '@/common/modals/OnBoardingModal/OnBoardingModal'
import { ApiContext } from '@/common/providers/api/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'App/OnBoardingModal',
  component: OnBoardingModal,
} as Meta

const useApi = {
  isConnected: true,
  api: undefined,
  connectionState: 'connecting',
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
}

const useMyMemberships: MyMemberships = {
  active: undefined,
  members: [],
  setActive: (member) => (useMyMemberships.active = member),
  isLoading: false,
  hasMembers: false,
}

interface Props {
  extension: boolean
  account: boolean
  membership: boolean
}

const Template: Story<Props> = ({ extension, membership, account }: Props) => {
  const [state, setState] = useState<any>({
    useApi,
    useMyMemberships,
    useMyAccounts,
  })

  useEffect(() => {
    if (extension) {
      setState({
        useApi,
        useMyMemberships,
        useMyAccounts: { ...useMyAccounts, error: 'EXTENSION' },
      })
      return
    }

    if (account) {
      setState({
        useApi,
        useMyMemberships,
        useMyAccounts: { ...useMyAccounts },
      })
      return
    }

    if (membership) {
      setState({
        useApi,
        useMyMemberships,
        useMyAccounts: { ...useMyAccounts, hasAccounts: true },
      })
    }
  }, [membership, account, extension])

  return (
    <MemoryRouter>
      <MockApolloProvider members>
        <ApiContext.Provider value={state.useApi}>
          <AccountsContext.Provider value={state.useMyAccounts}>
            <MembershipContext.Provider value={state.useMyMemberships}>
              <BalancesContext.Provider value={useMyBalances}>
                <TemplateBlock>
                  <OnBoardingModal />
                </TemplateBlock>
              </BalancesContext.Provider>
            </MembershipContext.Provider>
          </AccountsContext.Provider>
        </ApiContext.Provider>
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = {
  extension: false,
  account: true,
  membership: false,
}
