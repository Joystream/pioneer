import React, { useMemo, useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Pagination } from '@/common/components/Pagination'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { useMyThreads } from '@/forum/hooks/useMyThreads'

import { ForumForumTabs, ForumTabs } from './components/ForumTabs'

export const ForumMyThreads = () => {
  const [page, setPage] = useState(1)
  const { threads, pageCount, isLoading } = useMyThreads({ page, threadsPerPage: 5 })

  const displayThreads = () => {
    return (
      <RowGapBlock gap={24}>
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
        <ThreadList threads={threads} onSort={() => null} isLoading={isLoading} />
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
      </RowGapBlock>
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
