import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { ForumCategoryList } from '@/forum/components/category'
import { useForumCategories } from '@/forum/hooks/useForumCategories'

import { ForumForumTabs, ForumTabs } from './components/ForumTabs'

export const ForumCategories = () => {
  const { isLoading, forumCategories } = useForumCategories()

  return (
    <PageLayout
      header={
        <PageHeader>
          <PageTitle>Forum</PageTitle>
          <ForumTabs />
          <ForumForumTabs />
        </PageHeader>
      }
      main={isLoading ? <Loading /> : <ForumCategoryList categories={forumCategories} />}
    />
  )
}
