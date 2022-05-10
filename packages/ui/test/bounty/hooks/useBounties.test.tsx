import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { BountyEmptyFilter } from '@/bounty/components/BountiesFilters'
import { useBounties, UseBountiesProps } from '@/bounty/hooks/useBounties'
import { asPeriod } from '@/bounty/types/casts'
import { seedMembers } from '@/mocks/data'

import { seedSafeBounties } from '../../_mocks/bounty/helpers'
import { getMember } from '../../_mocks/members'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const renderUseBounties = (props: UseBountiesProps) =>
  renderHook(() => useBounties(props), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })

describe('useBounties', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })
  const alice = getMember('alice')
  const bob = getMember('bob')
  const mockTitles = ['search title', 'title search']

  beforeAll(() => {
    seedMembers(mockServer.server, 2)
    seedSafeBounties(mockServer.server, [
      { title: mockTitles[0], stage: 'Funding' },
      { title: mockTitles[1], stage: 'WorkSubmission' },
      { stage: 'Judgment' },
      { stage: 'Expired' },
      { isTerminated: true },
    ])
  })

  describe('Status: active | past', () => {
    it('Status: active', async () => {
      const result = await loadUseBounties({
        order: { orderKey: 'createdAt', isDescending: true },
        status: 'active',
      })
      expect(result.bounties.length).toBeGreaterThan(0)
      result.bounties.forEach((bounty) => {
        expect(bounty.isTerminated).toBeFalsy()
      })
    })

    it('Status: past', async () => {
      const result = await loadUseBounties({
        order: { orderKey: 'createdAt', isDescending: true },
        status: 'past',
      })
      expect(result.bounties.length).toBeGreaterThan(0)
      result.bounties.forEach((bounty) => {
        expect(bounty.isTerminated).toBeTruthy()
      })
    })
  })

  describe('With filters', () => {
    it('Empty filters', async () => {
      const result = await loadUseBounties({
        order: { orderKey: 'createdAt', isDescending: true },
        filters: {
          ...BountyEmptyFilter,
        },
        status: 'active',
      })
      expect(result.bounties.length).toBeGreaterThan(0)
      result.bounties.forEach((bounty) => {
        expect(bounty.isTerminated).toBeFalsy()
      })
    })

    describe('Separate', () => {
      it('Period/stage', async () => {
        const result = await loadUseBounties({
          order: { orderKey: 'createdAt', isDescending: true },
          filters: {
            ...BountyEmptyFilter,
            period: 'Funding',
          },
          status: 'active',
        })
        expect(result.bounties.length).toBe(1)
        result.bounties.forEach((bounty) => {
          expect(bounty.stage).toBe('funding')
          expect('0').toEqual(bounty.id)
        })
      })

      it('Search', async () => {
        const result = await loadUseBounties({
          order: { orderKey: 'createdAt', isDescending: true },
          filters: {
            ...BountyEmptyFilter,
            search: 'search',
          },
          status: 'active',
        })
        expect(result.bounties.length).toBe(2)
        result.bounties.forEach((bounty) => {
          expect(mockTitles).toContain(bounty.title)
        })
      })

      it('Creator', async () => {
        const result = await loadUseBounties({
          order: { orderKey: 'createdAt', isDescending: true },
          filters: {
            ...BountyEmptyFilter,
            creator: alice,
          },
          status: 'active',
        })
        expect(result.bounties.length).toBe(2)
        result.bounties.forEach((bounty) => {
          expect(bounty.creator?.id).toBe(alice.id)
        })
      })

      it('Oracle', async () => {
        const result = await loadUseBounties({
          order: { orderKey: 'createdAt', isDescending: true },
          filters: {
            ...BountyEmptyFilter,
            oracle: bob,
          },
          status: 'active',
        })
        expect(result.bounties.length).toBe(2)
        result.bounties.forEach((bounty) => {
          expect(bounty.oracle?.id).toBe(bob.id)
        })
      })
    })

    it('Multiple (set intersection)', async () => {
      const result = await loadUseBounties({
        order: { orderKey: 'createdAt', isDescending: true },
        filters: {
          ...BountyEmptyFilter,
          period: 'Working',
          creator: alice,
          oracle: bob,
        },
        status: 'active',
      })
      expect(result.bounties.length).toBe(1)
      result.bounties.forEach((bounty) => {
        expect(asPeriod(bounty.stage)).toBe('working')
        expect(bounty.creator?.id).toBe(alice.id)
        expect(bounty.oracle?.id).toBe(bob.id)
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
