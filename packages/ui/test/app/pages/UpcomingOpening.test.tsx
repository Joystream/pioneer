import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router } from 'react-router-dom'

import { UpcomingOpening } from '@/app/pages/WorkingGroups/UpcomingOpening'
import { seedMember } from '@/mocks/data'
import { seedOpeningStatuses } from '@/mocks/data/seedOpenings'
import { seedUpcomingOpening } from '@/mocks/data/seedUpcomingOpening'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { MEMBER_ALICE_DATA, UPCOMING_OPENING } from '../../_mocks/server/seeds'
import { loaderSelector } from '../../setup'

describe('UpcomingWorkingGroupOpenings', () => {
  const mockServer = setupMockServer()

  beforeAll(cryptoWaitReady)

  beforeEach(() => {
    seedMember(MEMBER_ALICE_DATA, mockServer.server)
    seedWorkingGroups(mockServer.server)
    seedOpeningStatuses(mockServer.server)
    seedUpcomingOpening(UPCOMING_OPENING, mockServer.server)
  })

  it('Loading', async () => {
    renderPage()

    expect(await loaderSelector()).toBeDefined()
  })

  it('Opening loaded', async () => {
    renderPage()

    await waitForElementToBeRemoved(() => loaderSelector())

    expect(await screen.findByRole('heading', { name: UPCOMING_OPENING.metadata.title })).toBeDefined()
  })

  function renderPage() {
    const history = createMemoryHistory()
    history.push('/upcoming-opening/forumWorkingGroup-1')

    render(
      <Router history={history}>
        <MockQueryNodeProviders>
          <Route path="/upcoming-opening/:id">
            <UpcomingOpening />
          </Route>
        </MockQueryNodeProviders>
      </Router>
    )
  }
})
