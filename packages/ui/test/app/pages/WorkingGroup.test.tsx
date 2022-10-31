import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { WorkingGroup } from '@/app/pages/WorkingGroups/WorkingGroup'
import { seedMember, seedOpening, seedOpeningStatuses } from '@/mocks/data'
import { seedUpcomingOpening } from '@/mocks/data/seedUpcomingOpening'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { MEMBER_ALICE_DATA, OPENING_DATA, UPCOMING_OPENING } from '../../_mocks/server/seeds'
import { loaderSelector } from '../../setup'

describe('WorkingGroup', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()

    seedMember(MEMBER_ALICE_DATA, mockServer.server)
    seedWorkingGroups(mockServer.server)
    seedOpeningStatuses(mockServer.server)
    seedOpening(OPENING_DATA, mockServer.server)
    seedUpcomingOpening(UPCOMING_OPENING, mockServer.server)
  })

  it('Loads working group by url param', async () => {
    renderPage()

    await waitForElementToBeRemoved(() => loaderSelector(true), {})

    expect(await screen.findByText(/forum/i, { selector: 'h2' })).toBeDefined()
    expect(await screen.findByText(/current budget/i)).toBeDefined()
  })

  it('Loads working group by url param with a hyphen', async () => {
    renderPage('/working-groups/content')
    await waitForElementToBeRemoved(() => loaderSelector(true), {})

    expect(await screen.findByText(/current budget/i)).toBeDefined()
  })

  it('Openings tab', async () => {
    renderPage()
    await waitForElementToBeRemoved(() => loaderSelector(true), {})

    expect(await screen.findAllByText(OPENING_DATA.metadata.title)).toHaveLength(2)
    expect(await screen.findAllByText(UPCOMING_OPENING.metadata.title)).toHaveLength(2)
  })

  function renderPage(path = '/working-groups/forum') {
    const history = createMemoryHistory()
    history.push(path)
    render(
      <Router history={history}>
        <MockQueryNodeProviders>
          <Switch>
            <Route path="/working-groups/:name" component={WorkingGroup} />
          </Switch>
        </MockQueryNodeProviders>
      </Router>
    )
  }
})
