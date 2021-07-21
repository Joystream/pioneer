import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { capitalizeFirstLetter } from '@/common/helpers'
import {
  seedApplications,
  seedMembers,
  seedOpenings,
  seedProposals,
  seedWorkers,
  seedWorkingGroups,
} from '@/mocks/data'
import { ProposalEmptyFilter } from '@/proposals/components/ProposalFilters'
import { useProposals, UseProposalsProps } from '@/proposals/hooks/useProposals'
import { proposalActiveStatuses, proposalPastStatuses } from '@/proposals/model/proposalStatus'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const renderUseProposals = (props: UseProposalsProps) =>
  renderHook(() => useProposals(props), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })

describe('useProposals', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(() => {
    seedMembers(mockServer.server)
    seedWorkingGroups(mockServer.server)
    seedOpenings(mockServer.server)
    seedApplications(mockServer.server)
    seedWorkers(mockServer.server)
    seedProposals(mockServer.server)
  })

  describe('Status: active | past', () => {
    it('Status: active', async () => {
      const result = await loadUseProposals({ status: 'active' })
      expect(result.proposals.length).toBeGreaterThan(0)
      result.proposals.forEach((proposal) => {
        expect(proposalActiveStatuses.includes(proposal.status)).toBeTruthy()
      })
    })

    it('Status: past', async () => {
      const result = await loadUseProposals({ status: 'past' })
      expect(result.proposals.length).toBeGreaterThan(0)
      result.proposals.forEach((proposal) => {
        expect(proposalPastStatuses.includes(proposal.status)).toBeTruthy()
      })
    })
  })

  describe('With filters', () => {
    it('Empty filters', async () => {
      const result = await loadUseProposals({
        status: 'past',
        filters: {
          ...ProposalEmptyFilter,
        },
      })
      expect(result.proposals.length).toBeGreaterThan(0)
      result.proposals.forEach((proposal) => {
        expect(proposalPastStatuses.includes(proposal.status)).toBeTruthy()
      })
    })

    describe('Separate', () => {
      it('Stage/Status', async () => {
        const allPast = await loadUseProposals({ status: 'past' })
        const { status } = allPast.proposals[0]
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            stage: status,
          },
        })
        expect(result.proposals.length).toBeGreaterThan(0)
        result.proposals.forEach((proposal) => {
          expect(proposal.status).toBe(status)
        })
      })

      it('Search', async () => {
        const allPast = await loadUseProposals({ status: 'past' })
        const title = allPast.proposals[0].title
        const search = title.substr(3, title.length - 8)
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            search,
          },
        })
        expect(result.proposals[0].title).toBe(title)
      })

      it('Type', async () => {
        const allPast = await loadUseProposals({ status: 'past' })
        const type = allPast.proposals[0].type
        const typeFilter = capitalizeFirstLetter(type)
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            type: typeFilter,
          },
        })
        expect(result.proposals.length).toBeGreaterThan(0)
        result.proposals.forEach((proposal) => {
          expect(proposal.type).toBe(type)
        })
      })

      it('Proposer', async () => {
        const allPast = await loadUseProposals({ status: 'past' })
        const member = allPast.proposals[0].proposer
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            proposer: member,
          },
        })
        expect(result.proposals.length).toBeGreaterThan(0)
        result.proposals.forEach((proposal) => {
          expect(proposal.proposer.id).toBe(member.id)
        })
      })
    })

    it('Multiple filters (set intersection)', async () => {
      const { proposals: allPast } = await loadUseProposals({ status: 'past' })
      const proposal = allPast[0]
      const { proposals: byProposer } = await loadUseProposals({
        status: 'past',
        filters: {
          ...ProposalEmptyFilter,
          proposer: proposal.proposer,
        },
      })
      const { proposals: byStatus } = await loadUseProposals({
        status: 'past',
        filters: {
          ...ProposalEmptyFilter,
          stage: proposal.status,
        },
      })
      const { proposals: byProposerAndStatus } = await loadUseProposals({
        status: 'past',
        filters: {
          ...ProposalEmptyFilter,
          proposer: proposal.proposer,
          stage: proposal.status,
        },
      })

      expect(byProposerAndStatus.length).toBeGreaterThan(0)
      expect(byStatus.length + byProposer.length).toBeGreaterThanOrEqual(byProposerAndStatus.length)
      const byProposerIntersectByStatus = byProposer.filter((p) => byStatus.find((s) => s.id == p.id))
      expect(byProposerIntersectByStatus).toEqual(byProposerAndStatus)
    })
  })

  const loadUseProposals = async (props: UseProposalsProps) => {
    const { result, waitForNextUpdate } = renderUseProposals(props)
    while (result.current.isLoading) {
      await waitForNextUpdate()
    }
    return result.current
  }
})
