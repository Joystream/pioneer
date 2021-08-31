import React, { useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Pagination } from '@/common/components/Pagination'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { useForumMyThreads } from '@/forum/hooks/useForumMyThreads'

import { ForumForumTabs, ForumTabs } from './components/ForumTabs'

export const ForumMyThreads = () => {
  const [page, setPage] = useState(1)
  const { threads, pageCount, isLoading } = useForumMyThreads({ page, threadsPerPage: 5 })

  const displayThreads = () => {
    return (
      <>
        {!isLoading && !!pageCount && pageCount > 1 && (
          <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
        )}
        <ThreadList threads={threads} onSort={() => null} isLoading={isLoading} />
        {!isLoading && !!pageCount && pageCount > 1 && (
          <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
        )}
      </>
    )
  }
  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>My threads</PageTitle>}>
          <ForumTabs />
          <ForumForumTabs />
        </ForumPageHeader>
      }
      main={displayThreads()}
    />
  )
}
