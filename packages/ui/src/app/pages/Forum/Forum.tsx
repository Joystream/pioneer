import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { ForumMain } from '@/forum/components/category'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { useForumCategories } from '@/forum/hooks/useForumCategories'
import { useLatestForumThreads } from '@/forum/hooks/useLatestForumThreads'

import { ForumTabs } from './components/ForumTabs'

export const Forum = () => {
  const { isLoading: isLoadingCategories, forumCategories } = useForumCategories({ isRoot: true })
  const isRefetched = useRefetchQueries({ interval: MILLISECONDS_PER_BLOCK, include: ['GetForumCategories'] })
  const { threads, isLoading: isLoadingThreads } = useLatestForumThreads(5)
  const isLoading = isLoadingCategories || isLoadingThreads

  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>Forum</PageTitle>}>
          <ForumTabs />
        </ForumPageHeader>
      }
      main={
        !isRefetched && isLoading ? (
          <Loading />
        ) : (
          <ForumMain latestThreads={threads} categories={forumCategories ?? []} />
        )
      }
    />
  )
}
