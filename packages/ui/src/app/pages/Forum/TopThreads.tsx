import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { PageTitle } from '@/common/components/page/PageTitle'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { useTopForumThreads } from '@/forum/hooks/useTopForumThreads'

import { ForumForumTabs, ForumTabs } from './components/ForumTabs'

export const TopThreads = () => {
  const { threads, isLoading } = useTopForumThreads(5)

  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>Top threads</PageTitle>}>
          <ForumTabs />
          <ForumForumTabs />
        </ForumPageHeader>
      }
      main={
        isLoading ? (
          <Loading />
        ) : (
          <ThreadList
            threads={threads}
            getSortProps={() => ({ isActive: false, onSort: () => undefined, isDescending: false })}
          />
        )
      }
    />
  )
}
