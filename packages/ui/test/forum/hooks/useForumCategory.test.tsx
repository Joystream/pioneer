import { renderHook } from '@testing-library/react-hooks'
import React from 'react'

import { useForumCategory } from '@/forum/hooks/useForumCategory'
import { seedForumCategory } from '@/mocks/data/seedForum'

import { mockCategories } from '../../_mocks/forum'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const renderUseForumCategory = async (id: string) => {
  const { result, waitForNextUpdate } = renderHook(() => useForumCategory(id), {
    wrapper: ({ children }) => <MockQueryNodeProviders>{children}</MockQueryNodeProviders>,
  })
  while (result.current.isLoading) {
    await waitForNextUpdate()
  }
  return result.current
}

describe('useForumCategory', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(() => {
    mockCategories.map((category) => seedForumCategory(category, mockServer.server))
  })

  it('Basic details', async () => {
    const { forumCategory } = await renderUseForumCategory('0')
    expect(forumCategory?.title).toBe('Category 0')
    expect(forumCategory?.description).toBe('Root category')
    expect(forumCategory?.id).toBe('0')
    expect(forumCategory?.parentCategories).toEqual([])
  })

  describe('Parent categories', () => {
    it('Query depth exceeds parents depth', async () => {
      const { forumCategory } = await renderUseForumCategory('1')
      expect(forumCategory?.parentCategories.length).toEqual(1)
      expect(forumCategory?.parentCategories[0].id).toEqual('0')
    })

    it('Parents depth exceeds query depth', async () => {
      const { forumCategory } = await renderUseForumCategory('4')
      expect(forumCategory?.parentCategories.length).toEqual(3)
    })
  })

  it('Subcategories list', async () => {
    const { forumCategory } = await renderUseForumCategory('3')
    expect(forumCategory?.subcategories.length).toEqual(2)
    expect(forumCategory?.subcategories.map((category) => category.id)).toEqual(['4', '5'])
  })
})
