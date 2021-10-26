import { render, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { generatePath, Route, Switch } from 'react-router-dom'

import { PastCouncil } from '@/app/pages/Council/PastCouncils/PastCouncil'
import { NotFound } from '@/app/pages/NotFound'
import { ApiContext } from '@/common/providers/api/context'
import { CouncilRoutes } from '@/council/constants'
import { seedCouncilMember, seedElectedCouncil, seedEvent, seedMembers } from '@/mocks/data'

import { getCouncilor } from '../../_mocks/council'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi } from '../../_mocks/transactions'

describe('UI: Past Council page', () => {
  const mockServer = setupMockServer()
  const api = stubApi()
  let pageCouncilId = 1

  beforeEach(() => {
    pageCouncilId = 1
    seedMembers(mockServer.server, 2)
    seedElectedCouncil(
      {
        id: '1',
        electedAtBlock: 0,
        endedAtBlock: 10,
      },
      mockServer.server
    )
  })

  describe('Council found', () => {
    it('Renders', async () => {
      const { queryByText } = await renderComponent()

      expect(queryByText(/Council #1/i)).not.toBeNull()
      expect(queryByText(/^Past Council$/i)).not.toBeNull()
      expect(queryByText(/Council members/i)).not.toBeNull()
      expect(queryByText(/^Proposals$/i)).not.toBeNull()
      expect(queryByText(/Working Groups/i)).not.toBeNull()
    })

    describe('Stats', () => {
      beforeEach(async () => {
        seedCouncilMember(
          { ...getCouncilor({ electedInCouncilId: '1', memberId: '0' }), unpaidReward: 10, accumulatedReward: 15 },
          mockServer.server
        )
        seedCouncilMember(
          { ...getCouncilor({ electedInCouncilId: '1', memberId: '1' }), unpaidReward: 20, accumulatedReward: 40 },
          mockServer.server
        )
        seedEvent(
          {
            id: '0',
            inBlock: 5,
            createdAt: '2021-10-07T11:47:39.042Z',
            network: 'OLYMPIA',
            amount: 100,
          },
          'BudgetSpendingEvent',
          mockServer.server
        )
        seedEvent(
          {
            id: '1',
            inBlock: 6,
            createdAt: '2021-10-07T11:47:39.042Z',
            network: 'OLYMPIA',
            amount: 200,
          },
          'BudgetSpendingEvent',
          mockServer.server
        )
      })

      it('Total spent', async () => {
        const { getByText } = await renderComponent()

        expect(getByText(/^Total spent$/i).parentElement?.nextSibling?.textContent).toBe('300')
      })

      it('Total missed rewards', async () => {
        const { getByText } = await renderComponent()

        expect(getByText(/^Total missed rewards$/i).parentElement?.nextSibling?.textContent).toBe('-30')
      })

      it('Total paid rewards', async () => {
        const { getByText } = await renderComponent()

        expect(getByText(/^Total paid rewards$/i).parentElement?.nextSibling?.textContent).toBe('55')
      })

      it('Total spent on proposals', async () => {
        const { getByText } = await renderComponent()

        expect(getByText(/^Total spent on proposals$/i).parentElement?.nextSibling?.textContent).toBe('0')
      })
    })
  })

  it('Council not found', async () => {
    pageCouncilId = 2
    const { queryByText } = await renderComponent()

    expect(queryByText(/not found/i)).not.toBeNull()
  })

  async function renderComponent() {
    const rendered = await render(
      <MemoryRouter initialEntries={[generatePath(CouncilRoutes.pastCouncil, { id: pageCouncilId })]}>
        <ApiContext.Provider value={api}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <Switch>
                <Route path={CouncilRoutes.pastCouncil} component={PastCouncil} />
                <Route path="/404" component={NotFound} />
              </Switch>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ApiContext.Provider>
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => rendered.getByText('Loading...'))

    return rendered
  }
})
