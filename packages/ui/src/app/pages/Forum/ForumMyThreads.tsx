import React, { useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ForumThreadOrderByInput } from '@/common/api/queries'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useSort } from '@/common/hooks/useSort'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { useMyThreads } from '@/forum/hooks/useMyThreads'

import { ForumTabs } from './components/ForumTabs'

export const ForumMyThreads = () => {
  const [page, setPage] = useState(1)
  const { order, getSortProps } = useSort<ForumThreadOrderByInput>('updatedAt')
  const { threads, pageCount, isLoading } = useMyThreads({ page, threadsPerPage: 15, order })

  const displayThreads = () => {
    return (
      <ThreadList
        threads={threads}
        isLoading={isLoading}
        getSortProps={getSortProps}
        type="card"
        pageCount={pageCount}
        setPage={setPage}
        page={page}
      />
    )
  }
  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>My threads</PageTitle>}>
          <ForumTabs />
        </ForumPageHeader>
      }
      main={displayThreads()}
    />
  )
}
