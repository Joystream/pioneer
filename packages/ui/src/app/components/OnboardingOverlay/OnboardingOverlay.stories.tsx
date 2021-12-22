import { Meta, Story } from '@storybook/react'
import React, { useEffect, useState } from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { OnBoardingOverlay } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { ApiContext } from '@/common/providers/api/context'
import { OnBoardingProvider } from '@/common/providers/onboarding/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'App/OnboardingOverlay',
  component: OnBoardingOverlay,
} as Meta

const useApi = {
  isConnected: true,
  api: undefined,
  connectionState: 'connecting',
}

const useMyAccounts: UseAccounts = {
  isLoading: false,
  hasAccounts: false,
  allAccounts: [],
  error: undefined,
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
    <MockApolloProvider>
      <ApiContext.Provider value={state.useApi}>
        <AccountsContext.Provider value={state.useMyAccounts}>
          <MembershipContext.Provider value={state.useMyMemberships}>
            <OnBoardingProvider>
              <TemplateBlock>
                <OnBoardingOverlay />
              </TemplateBlock>
            </OnBoardingProvider>
          </MembershipContext.Provider>
        </AccountsContext.Provider>
      </ApiContext.Provider>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  extension: true,
  account: false,
  membership: false,
}
