import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { PageTitle } from '@/common/components/page/PageTitle'
import { ForumCategoryList } from '@/forum/components/category'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { useForumCategories } from '@/forum/hooks/useForumCategories'

import { ForumForumTabs, ForumTabs } from './components/ForumTabs'

export const ForumCategories = () => {
  const { isLoading, forumCategories } = useForumCategories({ isRoot: true })

  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>Forum</PageTitle>}>
          <ForumTabs />
          <ForumForumTabs categoryCount={forumCategories?.length} />
        </ForumPageHeader>
      }
      main={isLoading ? <Loading /> : <ForumCategoryList categories={forumCategories ?? []} />}
    />
  )
}
