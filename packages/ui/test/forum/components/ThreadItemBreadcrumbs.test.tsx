import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ThreadItemBreadcrumbs } from '@/forum/components/threads/ThreadItemBreadcrumbs'
import { seedForumCategory } from '@/mocks/data/seedForum'

import { mockCategories } from '../../_mocks/forum'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('ThreadItemBreadcrumbs', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(() => {
    mockCategories.map((category) => seedForumCategory(category, server.server))
  })

  it('Default', async () => {
    renderComponent('4')
    expect(await screen.findByText('Forum')).toBeDefined()
    expect(await screen.findByText(mockCategories[0].title)).toBeDefined()
    expect(await screen.findByText(mockCategories[1].title)).toBeDefined()
    expect(await screen.findByText(mockCategories[2].title)).toBeDefined()
    expect(await screen.findByText(mockCategories[3].title)).toBeDefined()
    expect(await screen.findByText(mockCategories[4].title)).toBeDefined()
  })

  function renderComponent(id: string) {
    render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <ThreadItemBreadcrumbs id={id} />
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
