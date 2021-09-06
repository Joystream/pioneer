import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { WatchlistThreadsBrowser } from '@/forum/components/threads/WatchlistThreadsBrowser'
import { FORUM_WATCHLIST } from '@/forum/constant'
import { seedMembers } from '@/mocks/data'
import { seedForumCategory, seedForumThread } from '@/mocks/data/seedForum'

import { mockCategories, mockThreads } from '../../_mocks/forum'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('UI: WatchlistThreadsBrowser', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(() => {
    seedMembers(server.server, 2)
    mockCategories.map((category) => seedForumCategory(category, server.server))
    mockThreads.map((thread) => seedForumThread(thread, server.server))
  })

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('Empty watchlist', async () => {
    renderComponent()
    expect(await screen.findByText(/You don't have any watchlisted threads/i)).toBeDefined()
  })

  it('Two watchlisted threads', async () => {
    window.localStorage.setItem(FORUM_WATCHLIST, JSON.stringify(['0', '1']))
    renderComponent()
    expect(await screen.findByText(/test thread/i)).toBeDefined()
    expect(await screen.findByText(/nested thread 1/i)).toBeDefined()
  })

  it('Pagination', async () => {
    window.localStorage.setItem(FORUM_WATCHLIST, JSON.stringify(['0', '1', '2']))
    renderComponent()
    expect(await screen.findByText(/test thread/i)).toBeDefined()
    expect(await screen.findByText(/nested thread 1/i)).toBeDefined()
    act(() => {
      fireEvent.click(screen.getByTitle('Browse next'))
    })
    expect(await screen.findByText(/nested thread 2/i)).toBeDefined()
  })

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <MockApolloProvider>
          <WatchlistThreadsBrowser />
        </MockApolloProvider>
      </MemoryRouter>
    )
})
