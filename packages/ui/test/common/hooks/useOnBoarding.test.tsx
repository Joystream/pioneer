import { cryptoWaitReady } from '@polkadot/util-crypto'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { ApiContext } from '@/common/providers/api/context'
import { UseApi } from '@/common/providers/api/provider'
import { OnBoardingProvider } from '@/common/providers/onboarding/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

let mockUseLocalStorage: [string | undefined, () => void] = [undefined, jest.fn()]

jest.mock('@/common/hooks/useLocalStorage', () => ({
  useLocalStorage: () => mockUseLocalStorage,
}))

describe('useOnBoarding', () => {
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

  describe('Membership', () => {
    it('Loading', async () => {
      const { membership } = await renderUseOnBoarding()
      expect(membership.isLoading).toEqual(true)
    })

    describe('Loaded', () => {
      beforeEach(() => {
        useMyAccounts.isLoading = false
        useMyMemberships.isLoading = false
        useMyAccounts.error = undefined
        useApi.isConnected = true
      })

      it('Install plugin', async () => {
        useMyAccounts.error = 'EXTENSION'

        const { membership } = await renderUseOnBoarding()

        expect(membership.isLoading).toEqual(false)
        expect(membership.status).toEqual('installPlugin')
      })

      it('Add account', async () => {
        const { membership } = await renderUseOnBoarding()

        expect(membership.isLoading).toEqual(false)
        expect(membership.status).toEqual('addAccount')
      })

      it('Get tokens', async () => {
        useMyAccounts.hasAccounts = true
        mockUseLocalStorage = ['address', jest.fn()]
        const { membership } = await renderUseOnBoarding()

        expect(membership.isLoading).toEqual(false)
        expect(membership.status).toEqual('getFreeTokens')
      })

      it('Create membership', async () => {
        useMyAccounts.hasAccounts = true
        mockUseLocalStorage = ['redeemed', jest.fn()]
        const { membership } = await renderUseOnBoarding()

        expect(membership.isLoading).toEqual(false)
        expect(membership.status).toEqual('createMembership')
      })

      it('Finished', async () => {
        useMyAccounts.hasAccounts = true
        useMyMemberships.hasMembers = true
        mockUseLocalStorage = ['redeemed', jest.fn()]
        const { membership } = await renderUseOnBoarding()

        expect(membership.isLoading).toEqual(false)
        expect(membership.status).toEqual('finished')
      })
    })
  })

  const renderUseOnBoarding = async () => {
    const { result } = renderHook(() => useOnBoarding(), {
      wrapper: ({ children }) => (
        <MockApolloProvider>
          <ApiContext.Provider value={useApi}>
            <AccountsContext.Provider value={useMyAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <OnBoardingProvider>{children}</OnBoardingProvider>
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </ApiContext.Provider>
        </MockApolloProvider>
      ),
    })

    return result.current
  }
})
