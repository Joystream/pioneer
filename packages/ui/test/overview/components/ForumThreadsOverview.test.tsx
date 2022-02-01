import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { seedWorkingGroups, seedMembers } from '@/mocks/data'
import { RawForumThreadMock, seedForumCategory, seedForumThread } from '@/mocks/data/seedForum'
import { ForumThreadsOverview } from '@/overview/components/ForumOverview/ForumThreadsOverview'

import { mockCategories } from '../../_mocks/forum'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const mockThreads: RawForumThreadMock[] = [
  {
    id: '0',
    categoryId: '0',
    isSticky: false,
    title: 'Test thread 0',
    authorId: '0',
    createdInEvent: {
      inBlock: 4547,
      createdAt: '2022-01-01T15:23:33.989Z',
      network: 'OLYMPIA',
    },
    status: { __typename: 'ThreadStatusActive' },
    visiblePostsCount: 10,
  },
  {
    id: '1',
    categoryId: '0',
    isSticky: false,
    title: 'Test thread 1',
    authorId: '0',
    createdInEvent: {
      inBlock: 4547,
      createdAt: '2022-01-31T15:23:33.989Z',
      network: 'OLYMPIA',
    },
    status: { __typename: 'ThreadStatusActive' },
    visiblePostsCount: 11,
  },
]

describe('UI: Forum overview', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeEach(async () => {
    seedMembers(server.server)
    seedWorkingGroups(server.server)
    seedForumCategory(mockCategories[0], server.server)
    mockThreads.map((thread) => seedForumThread(thread, server.server))
    renderComponent()
  })

  it('Displays number of new threads', async () => {
    expect(await screen.findByText('2')).toBeDefined()
  })

  it('Displays latest threads titles', async () => {
    expect(await screen.findByText('Test thread 0')).toBeDefined()
    expect(await screen.findByText('Test thread 1')).toBeDefined()
  })

  it('Displays latest answers number', async () => {
    expect((await screen.findAllByText('forum.answers'))[0].nextSibling?.textContent).toBe('10')
    expect((await screen.findAllByText('forum.answers'))[1].nextSibling?.textContent).toBe('11')
  })

  function renderComponent() {
    return render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <ForumThreadsOverview />
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
