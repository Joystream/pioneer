import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { WorkingGroup } from '@/app/pages/WorkingGroups/WorkingGroup'
import { seedMember } from '@/mocks/data'
import { seedUpcomingOpening } from '@/mocks/data/seedUpcomingOpening'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'

import { seedOpening, seedOpeningStatuses } from '../../../src/mocks/data/seedOpenings'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { MEMBER_ALICE_DATA, OPENING_DATA, UPCOMING_OPENING } from '../../_mocks/server/seeds'

describe('WorkingGroup', () => {
  const mockServer = setupMockServer()

  beforeAll(cryptoWaitReady)

  beforeEach(() => {
    seedMember(MEMBER_ALICE_DATA, mockServer.server)
    seedWorkingGroups(mockServer.server)
    seedOpeningStatuses(mockServer.server)
  })

  it('Renders page', async () => {
    renderPage()

    expect(await screen.findByRole('heading', { name: /forum/i })).toBeDefined()
  })

  it('Loads working group by url param', async () => {
    renderPage()

    await waitForElementToBeRemoved(() => screen.getAllByText('Loading...')[0], {})
    expect(await screen.findByText(/current budget/i)).toBeDefined()
  })

  it('Loads working group by url param with a hyphen', async () => {
    renderPage('/working-groups/content-directory')

    await waitForElementToBeRemoved(() => screen.getAllByText('Loading...')[0], {})

    expect(await screen.findByText(/current budget/i)).toBeDefined()
  })

  it('Openings tab', async () => {
    seedOpening(OPENING_DATA, mockServer.server)
    seedUpcomingOpening(UPCOMING_OPENING, mockServer.server)

    renderPage()
    await waitForElementToBeRemoved(() => screen.getAllByText('Loading...')[0], {})

    expect(await screen.findAllByRole('heading', { name: /^forum Working Group regular$/i })).toHaveLength(2)
    expect(await screen.findAllByRole('heading', { name: /^forum Working Group$/i })).toHaveLength(2)
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
