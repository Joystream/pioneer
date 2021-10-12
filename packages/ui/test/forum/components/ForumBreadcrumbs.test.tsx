import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { generatePath, Route, Router, Switch } from 'react-router-dom'

import { CategoryBreadcrumbs } from '@/forum/components/CategoryBreadcrumbs'
import { ThreadBreadcrumbs } from '@/forum/components/ThreadBreadcrumbs'
import { ForumRoutes } from '@/forum/constant'
import { seedMembers } from '@/mocks/data'
import { seedForumCategory, seedForumThread } from '@/mocks/data/seedForum'

import { mockCategories, mockThreads } from '../../_mocks/forum'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('Forum breadcrumbs', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    seedMembers(server.server, 2)
    mockCategories.map((category) => seedForumCategory(category, server.server))
    mockThreads.map((thread) => seedForumThread(thread, server.server))
  })

  describe('Category breadcrumbs', () => {
    it('Root category', async () => {
      renderComponent(generatePath(ForumRoutes.category, { id: '0' }))
      expect(await screen.findByText('Forum')).toBeDefined()
      expect(await screen.findByText('Category 0')).toBeDefined()
    })

    it('Nested category', async () => {
      renderComponent(generatePath(ForumRoutes.category, { id: '3' }))
      expect(await screen.findByText('Forum')).toBeDefined()
      expect(await screen.findByText('Category 0')).toBeDefined()
      expect(await screen.findByText('ab fugiat et quas est')).toBeDefined()
      expect(await screen.findByText('facilis debitis dolore repellat voluptates')).toBeDefined()
      expect(await screen.findByText('ratione maxime reiciendis hic quasi')).toBeDefined()
    })
  })

  describe('Thread breadcrumbs', () => {
    it('In root category', async () => {
      renderComponent(generatePath(ForumRoutes.thread, { id: '0' }))
      expect(await screen.findByText('Forum')).toBeDefined()
      expect(await screen.findByText('Category 0')).toBeDefined()
      expect(await screen.findByText('Test thread')).toBeDefined()
    })

    it('In nested category', async () => {
      renderComponent(generatePath(ForumRoutes.thread, { id: '1' }))
      expect(await screen.findByText('Forum')).toBeDefined()
      expect(await screen.findByText('Category 0')).toBeDefined()
      expect(await screen.findByText('ab fugiat et quas est')).toBeDefined()
      expect(await screen.findByText('facilis debitis dolore repellat voluptates')).toBeDefined()
      expect(await screen.findByText('Nested thread 1')).toBeDefined()
    })
  })

  function renderComponent(location: string) {
    const history = createMemoryHistory()
    history.push(location)
    render(
      <Router history={history}>
        <MockQueryNodeProviders>
          <Switch>
            <Route path={ForumRoutes.category} component={CategoryBreadcrumbs} />
            <Route path={ForumRoutes.thread} component={ThreadBreadcrumbs} />
          </Switch>
        </MockQueryNodeProviders>
      </Router>
    )
  }
})
