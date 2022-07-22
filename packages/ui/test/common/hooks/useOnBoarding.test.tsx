import { cryptoWaitReady } from '@polkadot/util-crypto'
import { renderHook } from '@testing-library/react-hooks'
import { BaseDotsamaWallet } from 'injectweb3-connect'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/api/providers/context'
import { UseApi } from '@/api/providers/provider'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { OnBoardingProvider } from '@/common/providers/onboarding/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

import { getAccount } from '../../../dev/node-mocks/data/addresses'
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
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
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
      const { isLoading } = await renderUseOnBoarding()
      expect(isLoading).toEqual(true)
    })

    describe('Loaded', () => {
      beforeEach(() => {
        useMyAccounts.isLoading = false
        useMyMemberships.isLoading = false
        useMyAccounts.error = undefined
        useApi.isConnected = true
        useMyAccounts.wallet = new BaseDotsamaWallet({ title: 'ExtraWallet' })
      })

      it('Install plugin', async () => {
        useMyAccounts.error = 'NO_EXTENSION'
        useMyAccounts.wallet = undefined

        const { isLoading, status } = await renderUseOnBoarding()

        expect(isLoading).toEqual(false)
        expect(status).toEqual('installPlugin')
      })

      it('Add account', async () => {
        const { isLoading, status } = await renderUseOnBoarding()

        expect(isLoading).toEqual(false)
        expect(status).toEqual('addAccount')
      })

      it('Create membership', async () => {
        useMyAccounts.hasAccounts = true
        useMyAccounts.allAccounts = [{ name: 'Account', address: getAccount('alice') }]
        mockUseLocalStorage = [getAccount('alice'), jest.fn()]

        const { isLoading, status } = await renderUseOnBoarding()

        expect(isLoading).toEqual(false)
        expect(status).toEqual('createMembership')
      })

      it('Finished', async () => {
        useMyAccounts.hasAccounts = true
        useMyMemberships.hasMembers = true
        mockUseLocalStorage = ['redeemed', jest.fn()]
        const { isLoading, status } = await renderUseOnBoarding()

        expect(isLoading).toEqual(false)
        expect(status).toEqual('finished')
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
