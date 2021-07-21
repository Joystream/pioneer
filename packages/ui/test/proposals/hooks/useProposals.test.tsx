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
import { proposalDetails } from '@/proposals/model/proposalDetails'
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
      expect(result.current.proposals.length).toBeGreaterThan(0)
      result.current.proposals.forEach((proposal) => {
        expect(proposalActiveStatuses.includes(proposal.status)).toBeTruthy()
      })
    })

    it('Status: past', async () => {
      const result = await loadUseProposals({ status: 'past' })
      expect(result.current.proposals.length).toBeGreaterThan(0)
      result.current.proposals.forEach((proposal) => {
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
      expect(result.current.proposals.length).toBeGreaterThan(0)
      result.current.proposals.forEach((proposal) => {
        expect(proposalPastStatuses.includes(proposal.status)).toBeTruthy()
      })
    })

    describe('Separate', () => {
      it('Stage/Status', async () => {
        const allPast = await loadUseProposals({ status: 'past' })
        const { status } = allPast.current.proposals[0]
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            stage: status,
          },
        })
        expect(result.current.proposals.length).toBeGreaterThan(0)
        result.current.proposals.forEach((proposal) => {
          expect(proposal.status).toBe(status)
        })
      })

      it('Search', async () => {
        const allPast = await loadUseProposals({ status: 'past' })
        const title = allPast.current.proposals[0].title
        const search = title.substr(3, title.length - 8)
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            search,
          },
        })
        expect(result.current.proposals[0].title).toBe(title)
      })

      it('Type', async () => {
        const type = proposalDetails[Math.floor(Math.random() * proposalDetails.length)]
        const typeFilter = capitalizeFirstLetter(type)
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            type: typeFilter,
          },
        })
        expect(result.current.proposals.length).toBeGreaterThan(0)
        result.current.proposals.forEach((proposal) => {
          expect(proposal.type).toBe(type)
        })
      })

      it('Proposer', async () => {
        const allPast = await loadUseProposals({ status: 'past' })
        const member = allPast.current.proposals[0].proposer
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            proposer: member,
          },
        })
        expect(result.current.proposals.length).toBeGreaterThan(0)
        result.current.proposals.forEach((proposal) => {
          expect(proposal.proposer.id).toBe(member.id)
        })
      })
    })
  })

  const loadUseProposals = async (props: UseProposalsProps) => {
    const { result, waitForNextUpdate } = renderUseProposals(props)
    while (result.current.isLoading) {
      await waitForNextUpdate()
    }
    return result
  }
})
