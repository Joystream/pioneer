import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/api/providers/context'
import { createType } from '@/common/model/createType'
import {
  seedWorkingGroups,
  seedMembers,
  seedOpening,
  seedOpeningStatuses,
  seedApplication,
  seedWorker,
  mockWorkingGroups,
} from '@/mocks/data'
import { WorkingGroupsOverview } from '@/overview/components/WorkingGroupsOverview/WorkingGroupsOverview'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { APPLICATION_DATA, OPENING_DATA, WORKER_DATA } from '../../_mocks/server/seeds'
import { stubApi, stubConst } from '../../_mocks/transactions'
import { loaderSelector } from '../../setup'

const formatAmount = (text?: string | null) => (text ? text?.replace(/,/g, '') : 'No value')

describe('UI: Working groups overview', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })
  const api = stubApi()

  describe('General info', () => {
    beforeAll(() => {
      seedMembers(server.server)
      seedWorkingGroups(server.server)
      seedOpeningStatuses(server.server)
      seedOpening(OPENING_DATA, server.server)
      seedApplication(APPLICATION_DATA, server.server)
      seedWorker(WORKER_DATA, server.server)
      seedWorker(
        {
          ...WORKER_DATA,
          id: 'forumWorkingGroup-2',
        },
        server.server
      )
    })

    beforeEach(async () => {
      stubConst(api, 'forumWorkingGroup.maxWorkerNumberLimit', createType('u32', 10))
      renderComponent()
      await waitForElementToBeRemoved(() => loaderSelector(true), { timeout: 300 })
    })

    it('Displays number of working groups', async () => {
      const mocksGroupsCount = mockWorkingGroups.length
      expect((await screen.findByText('workingGroups.workingGroups')).previousSibling?.textContent).toBe(
        mocksGroupsCount.toString()
      )
    })

    it('Displays number of workers', async () => {
      expect((await screen.findByText('workingGroups.workers')).previousSibling?.textContent).toBe('2')
    })

    it('Displays total budget', async () => {
      const mocksTotalBudget = mockWorkingGroups.reduce((prev, current) => prev + current.budget, 0)
      const totalBudget = (await screen.findByText('workingGroups.totalBudget')).previousSibling?.firstChild
        ?.textContent
      expect(formatAmount(totalBudget)).toBe(mocksTotalBudget.toString())
    })
  })

  describe('Displays openings tiles', () => {
    beforeAll(async () => {
      seedMembers(server.server)
      seedWorkingGroups(server.server)
      seedOpeningStatuses(server.server)
      seedOpening(OPENING_DATA, server.server)
      seedApplication(APPLICATION_DATA, server.server)
    })

    beforeEach(() => {
      stubConst(api, 'forumWorkingGroup.maxWorkerNumberLimit', createType('u32', 10))
      renderComponent()
    })

    it('Displays openings number', async () => {
      await waitForElementToBeRemoved(() => loaderSelector(true), { timeout: 300 })
      expect((await screen.findByText('workingGroups.openings')).lastChild?.textContent).toBe('1')
    })

    it('Displays opening title', async () => {
      expect(await screen.findByText(OPENING_DATA.metadata.title)).toBeDefined()
    })

    it('Displays period of reward', async () => {
      const mockRewardPerBlock = OPENING_DATA.rewardPerBlock
      expect(await screen.findByText(`workingGroups.rewardPerBlock ${mockRewardPerBlock}`)).toBeDefined()
    })

    it('Displays reward', async () => {
      const mockRewardPerBlock = OPENING_DATA.rewardPerBlock
      const mockReward = mockWorkingGroups?.find((group) => group.id === OPENING_DATA.groupId)?.budget
      const reward = (await screen.findByText(`workingGroups.rewardPerBlock ${mockRewardPerBlock}`)).previousSibling
        ?.textContent
      expect(formatAmount(reward)).toBe(mockReward?.toString())
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
