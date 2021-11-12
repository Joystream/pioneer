import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { OnBoardingOverlay } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { Colors } from '@/common/constants'
import { ApiContext } from '@/common/providers/api/context'
import { UseApi } from '@/common/providers/api/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

import { MockApolloProvider } from '../../../_mocks/providers'
import { setupMockServer } from '../../../_mocks/server'

describe('OnBoardingOverlay', () => {
  const server = setupMockServer()

  const useMyAccounts: UseAccounts = {
    isLoading: true,
    hasAccounts: false,
    allAccounts: [],
  }
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: true,
    hasMembers: false,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  const useApi = {
    isConnected: false,
    api: undefined,
    connectionState: 'connecting',
  } as UseApi

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(server.server)
  })

  it('Loading', async () => {
    const { queryByText } = await renderComponent()

    expect(queryByText('Join now')).toBeNull()
  })

  describe('Loaded', () => {
    beforeEach(() => {
      useMyAccounts.isLoading = false
      useMyMemberships.isLoading = false
      useMyAccounts.error = undefined
      useApi.isConnected = true
    })

    it('Expands', async () => {
      const { getByText } = await renderComponent()

      getByText(/^Show how$/i).click()

      expect(getByText('What are the benefits?')).toBeDefined()
      expect(getByText('How to become a member?')).toBeDefined()
    })

    it('Install plugin', async () => {
      useMyAccounts.error = 'EXTENSION'

      const { getByText } = await renderComponent()
      const pluginCircle = getByText('Add Polkadot plugin')?.parentElement?.previousElementSibling

      expect(pluginCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Add account', async () => {
      const { getByText } = await renderComponent()
      const accountCircle = getByText('Create or select a Polkadot account')?.parentElement?.previousElementSibling
      const pluginCircle = getByText('Add Polkadot plugin')?.parentElement?.previousElementSibling

      expect(pluginCircle).toHaveStyle(`background-color: ${Colors.Black[500]}`)
      expect(accountCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Create membership', async () => {
      useMyAccounts.hasAccounts = true

      const { getByText } = await renderComponent()

      const accountCircle = getByText('Create or select a Polkadot account')?.parentElement?.previousElementSibling
      const membershipCircle = getByText('Create membership')?.parentElement?.previousElementSibling

      expect(accountCircle).toHaveStyle(`background-color: ${Colors.Black[500]}`)
      expect(membershipCircle).toHaveStyle(`background-color: ${Colors.Blue[500]}`)
    })

    it('Finished', async () => {
      useMyAccounts.hasAccounts = true
      useMyMemberships.hasMembers = true
      const { queryByText } = await renderComponent()

      expect(queryByText('Join now')).toBeNull()
    })
  })

  const renderComponent = async () => {
    return render(
      <MockApolloProvider>
        <ApiContext.Provider value={useApi}>
          <AccountsContext.Provider value={useMyAccounts}>
            <MembershipContext.Provider value={useMyMemberships}>
              <OnBoardingOverlay />
            </MembershipContext.Provider>
          </AccountsContext.Provider>
        </ApiContext.Provider>
      </MockApolloProvider>
    )
  }
})
