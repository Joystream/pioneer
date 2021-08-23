import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { useForumCategoryBreadcrumbs } from '@/forum/hooks/useForumCategoryBreadcrumbs'
import { seedForumCategory } from '@/mocks/data/seedForum'

import { mockCategories } from '../../_mocks/forum'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const renderUseForumBreadcrumbs = async (id: string) => {
  const { result, waitForNextUpdate } = renderHook(() => useForumCategoryBreadcrumbs(id), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })
  while (result.current.isLoading) {
    await waitForNextUpdate()
  }
  return result.current
}

describe('useForumBreadcrumbs', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(() => {
    mockCategories.map((category) => seedForumCategory(category, mockServer.server))
  })

  it('Category breadcrumbs', async () => {
    const { breadcrumbs } = await renderUseForumBreadcrumbs('5')
    expect(breadcrumbs?.length).toEqual(5)
    expect(breadcrumbs?.map((crumb) => crumb.id)).toEqual(['0', '1', '2', '3', '5'])
  })
})
