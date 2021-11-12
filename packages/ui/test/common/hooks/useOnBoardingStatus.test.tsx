import { cryptoWaitReady } from '@polkadot/util-crypto'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { useOnBoardingStatus } from '@/common/hooks/useOnBoardingStatus'
import { ApiContext } from '@/common/providers/api/context'
import { UseApi } from '@/common/providers/api/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

let mockUseLocalStorage: [string | undefined, any] = [undefined, jest.fn()]

jest.mock('@/common/hooks/useLocalStorage', () => ({
  useLocalStorage: () => mockUseLocalStorage,
}))

describe('useOnBoardingStatus', () => {
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

  it('Loading', async () => {
    const result = await renderUseOnBoardingStatus()
    expect(result.isLoading).toEqual(true)
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

      const result = await renderUseOnBoardingStatus()

      expect(result.isLoading).toEqual(false)
      expect(result.status).toEqual('installPlugin')
    })

    it('Add account', async () => {
      const result = await renderUseOnBoardingStatus()

      expect(result.isLoading).toEqual(false)
      expect(result.status).toEqual('addAccount')
    })

    it('Get tokens', async () => {
      useMyAccounts.hasAccounts = true
      mockUseLocalStorage = ['address', jest.fn()]
      const result = await renderUseOnBoardingStatus()

      expect(result.isLoading).toEqual(false)
      expect(result.status).toEqual('getFreeTokens')
    })

    it('Create membership', async () => {
      useMyAccounts.hasAccounts = true
      mockUseLocalStorage = ['redeemed', jest.fn()]
      const result = await renderUseOnBoardingStatus()

      expect(result.isLoading).toEqual(false)
      expect(result.status).toEqual('createMembership')
    })

    it('Finished', async () => {
      useMyAccounts.hasAccounts = true
      useMyMemberships.hasMembers = true
      const result = await renderUseOnBoardingStatus()

      expect(result.isLoading).toEqual(false)
      expect(result.status).toEqual('finished')
    })
  })

  const renderUseOnBoardingStatus = async () => {
    const { result } = renderHook(() => useOnBoardingStatus(), {
      wrapper: ({ children }) => (
        <MockApolloProvider>
          <ApiContext.Provider value={useApi}>
            <AccountsContext.Provider value={useMyAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>{children}</MembershipContext.Provider>
            </AccountsContext.Provider>
          </ApiContext.Provider>
        </MockApolloProvider>
      ),
    })

    return result.current
  }
})
