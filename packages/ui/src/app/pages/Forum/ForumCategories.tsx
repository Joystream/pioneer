import React from 'react'

import { PageLayout, PageHeaderWrapper } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { PageTitle } from '@/common/components/page/PageTitle'
import { ForumCategoryList } from '@/forum/components/category'
import { useForumCategories } from '@/forum/hooks/useForumCategories'

import { ForumForumTabs, ForumTabs } from './components/ForumTabs'

export const ForumCategories = () => {
  const { isLoading, forumCategories, totalCount } = useForumCategories()

  return (
    <PageLayout
      header={
        <PageHeaderWrapper>
          <PageTitle>Forum</PageTitle>
          <ForumTabs />
          <ForumForumTabs categoryCount={totalCount} />
        </PageHeaderWrapper>
      }
      main={isLoading ? <Loading /> : <ForumCategoryList categories={forumCategories} />}
    />
  )
}
