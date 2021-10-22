import { render, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { generatePath, Route, Switch } from 'react-router-dom'

import { PastCouncil } from '@/app/pages/Council/PastCouncils/PastCouncil'
import { NotFound } from '@/app/pages/NotFound'
import { ApiContext } from '@/common/providers/api/context'
import { CouncilRoutes } from '@/council/constants'
import { seedElectedCouncil } from '@/mocks/data'

import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi } from '../../_mocks/transactions'

describe('UI: Past Council page', () => {
  const mockServer = setupMockServer()
  const api = stubApi()
  let pageCouncilId = 1

  beforeEach(() => {
    pageCouncilId = 1
    seedElectedCouncil(
      {
        id: '1',
        electedAtBlock: 0,
        endedAtBlock: 10,
      },
      mockServer.server
    )
  })

  it('Renders', async () => {
    const { queryByText } = await renderComponent()

    expect(queryByText(/Council #1/i)).not.toBeNull()
    expect(queryByText(/^Past Council$/i)).not.toBeNull()
    expect(queryByText(/Council members/i)).not.toBeNull()
    expect(queryByText(/Proposals/i)).not.toBeNull()
    expect(queryByText(/Working Groups/i)).not.toBeNull()
  })

  it('No such council', async () => {
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
