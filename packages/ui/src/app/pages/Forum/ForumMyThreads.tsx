import React, { useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ForumThreadOrderByInput } from '@/common/api/queries'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Pagination } from '@/common/components/Pagination'
import { useSort } from '@/common/hooks/useSort'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { useMyThreads } from '@/forum/hooks/useMyThreads'

import { ForumForumTabs, ForumTabs } from './components/ForumTabs'

export const ForumMyThreads = () => {
  const [page, setPage] = useState(1)
  const { order, getSortProps } = useSort<ForumThreadOrderByInput>('updatedAt')
  const { threads, pageCount, isLoading } = useMyThreads({ page, threadsPerPage: 5, order })

  const displayThreads = () => {
    return (
      <RowGapBlock gap={24}>
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
        <ThreadList threads={threads} isLoading={isLoading} getSortProps={getSortProps} />
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
