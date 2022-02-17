import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { seedMember, seedProposal } from '@/mocks/data'
import { ProposalEmptyFilter } from '@/proposals/components/ProposalFilters'
import { useProposals, UseProposalsProps } from '@/proposals/hooks/useProposals'
import { proposalActiveStatuses, proposalPastStatuses } from '@/proposals/model/proposalStatus'

import { getMember } from '../../_mocks/members'
import { testProposals } from '../../_mocks/proposals'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { MEMBER_ALICE_DATA } from '../../_mocks/server/seeds'

const renderUseProposals = (props: UseProposalsProps) =>
  renderHook(() => useProposals(props), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })

describe('useProposals', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })
  const bob = getMember('bob')

  beforeAll(() => {
    seedMember(MEMBER_ALICE_DATA, mockServer.server)
    seedMember({ ...MEMBER_ALICE_DATA, ...bob }, mockServer.server)
    testProposals.map((proposal) => seedProposal(proposal, mockServer.server))
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
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            stage: 'executed',
          },
        })
        expect(result.proposals.length).toBe(2)
        result.proposals.forEach((proposal) => {
          expect(proposal.status).toBe('executed')
          expect(['1', '2']).toContain(proposal.id)
        })
      })

      it('Search', async () => {
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            search: 'Similar Name',
          },
        })
        expect(result.proposals.length).toBe(2)
        result.proposals.forEach((proposal) => {
          expect(['Very Similar Name Proposal', 'Quite Similar Named Proposal']).toContain(proposal.title)
        })
      })

      it('Type', async () => {
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            type: 'runtimeUpgrade',
          },
        })
        expect(result.proposals.length).toBe(4)
        result.proposals.forEach((proposal) => {
          expect(proposal.type).toBe('runtimeUpgrade')
          expect(['2', '3', '4', '5']).toContain(proposal.id)
        })
      })

      it('Proposer', async () => {
        const result = await loadUseProposals({
          status: 'past',
          filters: {
            ...ProposalEmptyFilter,
            proposer: bob,
          },
        })
        expect(result.proposals.length).toBe(4)
        result.proposals.forEach((proposal) => {
          expect(proposal.proposer.id).toBe(bob.id)
          expect(['1', '3', '4', '5']).toContain(proposal.id)
        })
      })

      describe('Lifetime', () => {
        it('Start', async () => {
          const start = new Date('2021-07-06T01:00:00')
          const result = await loadUseProposals({
            status: 'past',
            filters: {
              ...ProposalEmptyFilter,
              lifetime: {
                start,
              },
            },
          })
          expect(result.proposals.length).toBe(5)
          result.proposals.forEach((proposal) => {
            expect(proposal.endedAt).toBeDefined()
            proposal.endedAt && expect(new Date(proposal.endedAt).getTime()).toBeGreaterThanOrEqual(start.getTime())
          })
        })
        it('End', async () => {
          const end = new Date('2021-07-06T01:00:00')
          const result = await loadUseProposals({
            status: 'past',
            filters: {
              ...ProposalEmptyFilter,
              lifetime: {
                end,
              },
            },
          })
          expect(result.proposals.length).toBe(3)
          result.proposals.forEach((proposal) => {
            expect(new Date(proposal.createdAt).getTime()).toBeLessThanOrEqual(end.getTime())
          })
        })
      })
    })

    it('Multiple filters (set intersection)', async () => {
      const { proposals: byProposer } = await loadUseProposals({
        status: 'past',
        filters: {
          ...ProposalEmptyFilter,
          proposer: bob,
        },
      })
      const { proposals: byStatus } = await loadUseProposals({
        status: 'past',
        filters: {
          ...ProposalEmptyFilter,
          stage: 'executed',
        },
      })
      const { proposals: byProposerAndStatus } = await loadUseProposals({
        status: 'past',
        filters: {
          ...ProposalEmptyFilter,
          proposer: bob,
          stage: 'executed',
        },
      })

      expect(byProposer.length).toBe(4)
      expect(byStatus.length).toBe(2)
      expect(byProposerAndStatus.length).toBe(1)

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
