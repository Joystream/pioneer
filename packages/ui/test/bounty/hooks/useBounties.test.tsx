import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { bountyPeriods } from '@/bounty/helpers'
import { useBounties, UseBountiesProps } from '@/bounty/hooks/useBounties'
import { asPeriod } from '@/bounty/types/casts'
import { seedBounties, seedMember } from '@/mocks/data'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { MEMBER_ALICE_DATA } from '../../_mocks/server/seeds'

const renderUseBounties = (props: UseBountiesProps) =>
  renderHook(() => useBounties(props), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })

describe('useBounties', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(() => {
    seedMember(MEMBER_ALICE_DATA, mockServer.server)
    seedBounties(mockServer.server)
  })

  describe('Status: active | past', () => {
    it('Status: active', async () => {
      const result = await loadUseBounties({
        order: { orderKey: 'createdAt', isDescending: true },
        status: 'active',
      })
      expect(result.bounties.length).toBeGreaterThan(0)
      result.bounties.forEach((bounty) => {
        expect(bountyPeriods.includes(asPeriod(bounty.stage))).toBeTruthy()
      })
    })

    it('Status: past', async () => {
      const result = await loadUseBounties({
        order: { orderKey: 'createdAt', isDescending: true },
        status: 'past',
      })
      expect(result.bounties.length).toBeGreaterThan(0)
      result.bounties.forEach((bounty) => {
        expect(bounty.stage === 'terminate').toBeTruthy()
      })
    })
  })

  const loadUseBounties = async (props: UseBountiesProps) => {
    const { result, waitForNextUpdate } = renderUseBounties(props)
    while (result.current.isLoading) {
      await waitForNextUpdate()
    }
    return result.current
  }
})
