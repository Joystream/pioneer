import { mockUniqueQuery } from '@test/_helpers/mockUniqueQuery'
import { mockCategories } from '@test/_mocks/forum'

import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ThreadItemBreadcrumbs } from '@/forum/components/threads/ThreadItemBreadcrumbs'

jest.mock('@/forum/queries', () => ({
  useGetForumCategoryBreadcrumbQuery: mockUniqueQuery('forumCategoryByUniqueInput', mockCategories),
}))

describe('ThreadItemBreadcrumbs', () => {
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
        <ThreadItemBreadcrumbs id={id} />
      </MemoryRouter>
    )
  }
})
