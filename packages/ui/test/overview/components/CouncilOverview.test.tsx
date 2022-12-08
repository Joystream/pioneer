import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/api/providers/context'
import {
  RawCouncilElectionMock,
  seedCouncilCandidate,
  seedCouncilElection,
  seedCouncilMember,
  seedElectedCouncils,
  seedMember,
} from '@/mocks/data'
import { CouncilOverview } from '@/overview/components/CouncilOverview/CouncilOverview'

import { CANDIDATE_DATA, mockCouncilors, mockCouncils, mockMembers } from '../../_mocks/council'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi, stubCouncilAndReferendum, stubCouncilConstants } from '../../_mocks/transactions'
import { loaderSelector } from '../../setup'

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
    beforeEach(async () => {
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
      await waitForElementToBeRemoved(() => loaderSelector(), { timeout: 3000 })

      // idlePeriodDuration is set to 100 which eqauls to ~600 seconds
      expect(screen.queryByText('council.nextElectionIn')?.previousSibling?.textContent).toEqual('10 min')
    })

    it('Displays council members', async () => {
      expect(await screen.findByText('Council member A')).toBeDefined()
    })
  })

  describe('Stage: Election Announcing Period', () => {
    beforeEach(async () => {
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
      await waitForElementToBeRemoved(() => loaderSelector(), { timeout: 300 })
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
    beforeEach(async () => {
      stubCouncilAndReferendum(api, 'Election', 'Revealing')
      seedCouncilElection(
        {
          id: '0',
          isFinished: false,
          cycleId: 0,
        } as RawCouncilElectionMock,
        server.server
      )
      seedCouncilCandidate({ ...CANDIDATE_DATA, votePower: '1200' }, server.server)
      renderComponent()
    })

    it('Displays proper stage', () => {
      expect(screen.queryByText('council.stage.revealing')).not.toBeNull()
    })

    it('Displays council size', () => {
      // councilSize is set to 2 in stubCouncilConstants
      expect(screen.queryByText(2)).not.toBeNull()
    })

    it('Displays time to Next Election', async () => {
      await waitForElementToBeRemoved(() => loaderSelector(), { timeout: 300 })
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
