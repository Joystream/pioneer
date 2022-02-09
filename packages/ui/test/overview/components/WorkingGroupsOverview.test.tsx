import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import {
  seedWorkingGroups,
  seedMembers,
  seedOpenings,
  seedWorkers,
  seedApplications,
  seedOpening,
  seedOpeningStatuses,
  seedApplication,
} from '@/mocks/data'
import { WorkingGroupsOverview } from '@/overview/components/WorkingGroupsOverview/WorkingGroupsOverview'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { APPLICATION_DATA, OPENING_DATA } from '../../_mocks/server/seeds'
import { stubApi, stubConst } from '../../_mocks/transactions'
import { createType } from '@joystream/types'
import { ApiContext } from '@/common/providers/api/context'

describe('UI: Working groups overview', () => {
  const server = setupMockServer()
  const api = stubApi()

  describe('General info', () => {
    beforeEach(async () => {
      seedMembers(server.server)
      seedWorkingGroups(server.server)
      seedOpeningStatuses(server.server)
      seedOpenings(server.server)
      seedApplications(server.server)
      seedWorkers(server.server)
      renderComponent()
    })

    it('Displays number of working groups', async () => {
      expect((await screen.findByText('workingGroups.workingGroups')).previousSibling?.textContent).toBe('4')
    })

    it('Displays number of workers', async () => {
      expect((await screen.findByText('workingGroups.workers')).previousSibling?.textContent).toBe('28')
    })

    it('Displays total budget', async () => {
      expect((await screen.findByText('workingGroups.totalBudget')).previousSibling?.firstChild?.textContent).toBe(
        '14,097'
      )
    })
  })

  describe('Displays openings tiles', () => {
    beforeEach(async () => {
      seedMembers(server.server)
      seedWorkingGroups(server.server)
      seedOpeningStatuses(server.server)
      seedOpening(OPENING_DATA, server.server)
      seedApplication(APPLICATION_DATA, server.server)
      stubConst(api, 'forumWorkingGroup.maxWorkerNumberLimit', createType('u32', 10))
      renderComponent()
    })

    it('Displays openings number', async () => {
      expect((await screen.findByText('workingGroups.openings')).lastChild?.textContent).toBe('1')
    })

    it('Displays opening title', async () => {
      expect(await screen.findByText('forum Working Group regular')).toBeDefined()
    })

    it('Displays reward', async () => {
      expect((await screen.findByText('workingGroups.rewardPerBlock')).previousSibling?.textContent).toBe('2,536')
    })

    it('Displays applications number and max workers numbers', async () => {
      expect(await screen.findByText('1/10')).toBeDefined()
    })
  })

  function renderComponent() {
    return render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <ApiContext.Provider value={api}>
            <WorkingGroupsOverview />
          </ApiContext.Provider>
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
