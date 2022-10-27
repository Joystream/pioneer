import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { PageTitle } from '@/common/components/page/PageTitle'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { useLatestForumThreads } from '@/forum/hooks/useLatestForumThreads'

import { ForumTabs } from './components/ForumTabs'

export const LatestThreads = () => {
  const { threads, isLoading } = useLatestForumThreads(5)

  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>Latest threads</PageTitle>}>
          <ForumTabs />
        </ForumPageHeader>
      }
      main={
        isLoading ? (
          <Loading />
        ) : (
          <ThreadList
            type="list"
            threads={threads}
            getSortProps={() => ({ isActive: false, onSort: () => undefined, isDescending: false })}
          />
        )
      }
    />
  )
}
