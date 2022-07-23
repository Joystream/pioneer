import React, { useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ForumThreadOrderByInput } from '@/common/api/queries'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Pagination } from '@/common/components/Pagination'
import { useSort } from '@/common/hooks/useSort'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadListCards } from '@/forum/components/threads/ThreadListCards'
import { useMyThreads } from '@/forum/hooks/useMyThreads'
import { useThreadsUserCount } from '@/forum/hooks/useThreadsUserCount'

import { ForumForumTabs, ForumTabs } from './components/ForumTabs'

export const ForumMyThreads = () => {
  const [page, setPage] = useState(1)
  const { order } = useSort<ForumThreadOrderByInput>('updatedAt')
  const { threads, pageCount, isLoading } = useMyThreads({ page: 1, threadsPerPage: 500, order })
  const { myThreadsCount } = useThreadsUserCount()

  const displayThreads = () => {
    return (
      <RowGapBlock gap={24}>
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
        <ThreadListCards threads={threads} isLoading={isLoading} />
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
      </RowGapBlock>
    )
  }
  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>My threads</PageTitle>}>
          <ForumTabs />
          <ForumForumTabs myThreadsCount={myThreadsCount} />
        </ForumPageHeader>
      }
      main={displayThreads()}
    />
  )
}
