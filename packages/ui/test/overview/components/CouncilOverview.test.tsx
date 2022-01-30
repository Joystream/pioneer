import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/common/providers/api/context'
import {
  seedCouncilMember,
  seedMember,
  seedElectedCouncils,
  seedCouncilElection,
  RawCouncilElectionMock,
  seedCouncilCandidate,
  seedCouncilVote,
} from '@/mocks/data'
import { CouncilOverview } from '@/overview/components/OverviewItem/CouncilOverview'

import { mockMembers, mockCouncils, mockCouncilors, CANDIDATE_DATA, VOTE_DATA } from '../../_mocks/council'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi, stubCouncilAndReferendum, stubCouncilConstants } from '../../_mocks/transactions'

describe('UI: Council overview', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })
  const api = stubApi()

  beforeEach(async () => {
    mockMembers.forEach((mockMember) => seedMember(mockMember, server.server))
    seedElectedCouncils(server.server, mockCouncils)
    mockCouncilors.forEach((mockCouncilor) => seedCouncilMember(mockCouncilor, server.server))
    stubCouncilConstants(api)
  })

  describe('Stage: Normal', () => {
    beforeEach(() => {
      stubCouncilAndReferendum(api, 'Idle', 'Inactive')
      renderComponent()
    })

    it('Displays proper stage', () => {
      expect(screen.queryByText('council.stage.normal')).not.toBeNull()
    })

    it('Displays council size', () => {
      // councilSize is set to 2 in stubCouncilConstants
      expect(screen.queryByText(2)).not.toBeNull()
    })

    it('Displays time to Next Election', async () => {
      // idlePeriodDuration is set to 100 which eqauls to ~600 seconds
      expect(screen.queryByText('council.nextElectionIn')?.previousSibling?.textContent).toEqual('10 min')
    })

    it('Displays council members', async () => {
      expect(await screen.findByText('Council member A')).toBeDefined()
    })
  })

  describe('Stage: Election Announcing Period', () => {
    beforeEach(() => {
      stubCouncilAndReferendum(api, 'Announcing', 'Inactive')
      seedCouncilElection(
        {
          id: '0',
          isFinished: false,
          cycleId: 0,
        } as RawCouncilElectionMock,
        server.server
      )
      seedCouncilCandidate(CANDIDATE_DATA, server.server)
      renderComponent()
    })

    it('Displays proper stage', () => {
      expect(screen.queryByText('council.stage.announcing')).not.toBeNull()
    })

    it('Displays council size', () => {
      // councilSize is set to 2 in stubCouncilConstants
      expect(screen.queryByText(2)).not.toBeNull()
    })

    it('Displays time to Next Election', () => {
      // idlePeriodDuration is set to 100 which eqauls to ~600 seconds
      expect(screen.queryByText('council.nextElectionIn')?.previousSibling?.textContent).toEqual('10 min')
    })

    it('Displays election round', async () => {
      expect(await screen.findByText('#0')).toBeDefined()
    })

    it('Displays candidates names', async () => {
      expect(await screen.findByText('Council member A')).toBeDefined()
    })

    it('Displays candidates titles', async () => {
      expect(await screen.findByText('Default title')).toBeDefined()
    })
  })

  describe('Stage: Election Revealing Period', () => {
    beforeEach(() => {
      stubCouncilAndReferendum(api, 'Election', 'Revealing')
      seedCouncilElection(
        {
          id: '0',
          isFinished: false,
          cycleId: 0,
        } as RawCouncilElectionMock,
        server.server
      )
      seedCouncilCandidate(CANDIDATE_DATA, server.server)
      renderComponent()
    })

    it('Displays proper stage', () => {
      expect(screen.queryByText('council.stage.revealing')).not.toBeNull()
    })

    it('Displays council size', () => {
      // councilSize is set to 2 in stubCouncilConstants
      expect(screen.queryByText(2)).not.toBeNull()
    })

    it('Displays time to Next Election', () => {
      // idlePeriodDuration is set to 100 which eqauls to ~600 seconds
      expect(screen.queryByText('council.nextElectionIn')?.previousSibling?.textContent).toEqual('10 min')
    })

    it('Displays election round', async () => {
      expect(await screen.findByText('#0')).toBeDefined()
    })

    it('Displays candidates names', async () => {
      expect(await screen.findByText('Council member A')).toBeDefined()
    })

    it('Displays candidates votes result as percent', async () => {
      seedCouncilVote({ ...VOTE_DATA, voteForId: '0' }, server.server)
      expect(await screen.findByText('83%')).toBeDefined()
    })
  })

  function renderComponent() {
    return render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <ApiContext.Provider value={api}>
            <CouncilOverview />
          </ApiContext.Provider>
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
