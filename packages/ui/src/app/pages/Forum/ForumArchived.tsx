import React from 'react'

import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ItemCount } from '@/common/components/ItemCount'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { ForumCategoryList } from '@/forum/components/category'
import { ThreadFilters } from '@/forum/components/threads/ThreadFilters'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { useForumCategories } from '@/forum/hooks/useForumCategories'
import { useForumCategoryThreads } from '@/forum/hooks/useForumCategoryThreads'

import { ForumTabs } from './components/ForumTabs'

export const ForumArchived = () => {
  const { isLoading: isLoadingCategories, forumCategories } = useForumCategories({ isArchived: true })
  const { isLoading: isLoadingThreads, threads, threadCount, refresh } = useForumCategoryThreads({ isArchived: true })

  return (
    <PageLayout
      header={
        <PageHeaderWrapper>
          <PageTitle>Forum</PageTitle>
          <ForumTabs />
        </PageHeaderWrapper>
      }
      main={
        <>
          <RowGapBlock gap={24}>
            <ItemCount count={forumCategories?.length}>Archived Categories</ItemCount>
            {isLoadingCategories ? (
              <Loading />
            ) : (
              forumCategories && forumCategories.length > 0 && <ForumCategoryList categories={forumCategories} />
            )}
          </RowGapBlock>

          <RowGapBlock gap={24}>
            <ThreadFilters onApply={(filters) => refresh({ filters })}>
              <ItemCount count={threadCount} size="xs">
                Threads
              </ItemCount>
            </ThreadFilters>

            <ThreadList threads={threads} onSort={(order) => refresh({ order })} isLoading={isLoadingThreads} />
          </RowGapBlock>
        </>
      }
    />
  )
}
