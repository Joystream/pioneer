import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { ForumCategoryList } from '@/forum/components/category'
import { useForumCategories } from '@/forum/hooks/useForumCategories'

export const ForumCategories = () => {
  const { isLoading, forumCategories } = useForumCategories()

  return (
    <PageLayout
      header={<h2>Categories</h2>}
      main={isLoading ? <Loading /> : <ForumCategoryList categories={forumCategories} />}
    />
  )
}
