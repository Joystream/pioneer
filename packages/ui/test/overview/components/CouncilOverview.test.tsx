import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/common/providers/api/context'
import { seedElectedCouncil, seedCouncilMember, seedMember, seedCouncilElections, seedElectedCouncils, RawCouncilCandidateMock, seedCouncilCandidate } from '@/mocks/data'

import { mockMembers, mockCouncils, mockCouncilors } from '../../_mocks/council'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { CouncilOverview } from '@/overview/components/OverviewItem/CouncilOverview'
import { stubApi, stubCouncilAndReferendum, stubCouncilConstants } from '../../_mocks/transactions'
import { getMember } from '@/mocks/helpers'


describe('UI: Council overview', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })
  const api = stubApi()

  beforeEach(async () => {
    mockMembers.forEach((mockMember) => seedMember(mockMember, server.server))
    mockCouncils.forEach((mockCouncil) => seedElectedCouncil(mockCouncil, server.server))
    mockCouncilors.forEach((mockCouncilor) => seedCouncilMember(mockCouncilor, server.server))
    stubCouncilConstants(api)
  })

  describe('Stage: Normal', () => {
    beforeEach(() => {
      stubCouncilAndReferendum(api, 'Idle', 'Inactive')
      seedElectedCouncils(server.server, [{}, { endedAtBlock: null }])
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
      seedCouncilElections(server.server, [{}, { isFinished: false }])
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
      expect(await screen.findByText('#1')).toBeDefined()
    })

    it('Displays candidates', async () => {
      expect(await screen.findByText('Council member A')).toBeDefined()
    })
  })

  describe('Stage: Election Revealing Period', () => {
    beforeEach(() => {
      stubCouncilAndReferendum(api, 'Election', 'Revealing')
      seedCouncilElections(server.server, [{}, { isFinished: false }])
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
      expect(await screen.findByText('#1')).toBeDefined()
    })

    it('Displays candidates', async () => {
      expect(await screen.findByText('Council member A')).toBeDefined()
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
