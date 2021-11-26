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
import { OnBoardingProvider } from '@/common/providers/onboarding/provider'
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
  [useMyAccounts.allAccounts[1].address]: {
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
  helpers: {
    getMemberIdByBoundAccountAddress: () => undefined,
  },
}

interface Props {
  extension?: boolean
  account?: boolean
  accountPick?: boolean
}

const Template: Story<Props> = ({ extension = false, account = false, accountPick = false }: Props) => {
  const [state, setState] = useState<any>({
    useApi,
    useMyMemberships,
    useMyAccounts,
  })

  useEffect(() => {
    window.localStorage.removeItem('free-tokens')

    if (extension) {
      setState({
        useApi,
        useMyMemberships,
        useMyAccounts: { ...useMyAccounts, error: 'EXTENSION' },
      })
    }

    if (account) {
      setState({
        useApi,
        useMyMemberships,
        useMyAccounts: { ...useMyAccounts },
      })
    }

    if (accountPick) {
      setState({
        useApi,
        useMyMemberships,
        useMyAccounts: { ...useMyAccounts, hasAccounts: true },
      })
    }
  }, [account, extension, accountPick])

  return (
    <MemoryRouter>
      <MockApolloProvider members>
        <ApiContext.Provider value={state.useApi}>
          <AccountsContext.Provider value={state.useMyAccounts}>
            <MembershipContext.Provider value={state.useMyMemberships}>
              <BalancesContext.Provider value={useMyBalances}>
                <OnBoardingProvider>
                  <TemplateBlock>
                    <OnBoardingModal />
                  </TemplateBlock>
                </OnBoardingProvider>
              </BalancesContext.Provider>
            </MembershipContext.Provider>
          </AccountsContext.Provider>
        </ApiContext.Provider>
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Plugin = Template.bind({})
Plugin.args = {
  extension: true,
}

export const Account_1 = Template.bind({})
Account_1.args = {
  account: true,
}

export const Account_2 = Template.bind({})
Account_2.args = {
  accountPick: true,
}
