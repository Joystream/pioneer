import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { ItemCount } from '@/common/components/ItemCount'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { Label } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useSort } from '@/common/hooks/useSort'
import { ForumCategoryList } from '@/forum/components/category'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadBrowser } from '@/forum/components/threads/ThreadBrowser'
import { ThreadFilters } from '@/forum/components/threads/ThreadFilters'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { THREADS_PER_PAGE } from '@/forum/constant'
import { useForumCategory } from '@/forum/hooks/useForumCategory'
import { useForumCategoryThreads } from '@/forum/hooks/useForumCategoryThreads'
import { useForumPopularThreads } from '@/forum/hooks/useForumPopularThreads'
import { MemberStack, moderatorsSummary } from '@/memberships/components/MemberStack'

import { ForumPageLayout } from './components/ForumPageLayout'

export const ForumCategory = () => {
  const [page, setPage] = useState<number>(1)
  const { id, type } = useParams<{ id: string; type?: 'archive' }>()
  const isArchive = type === 'archive'

  const { category } = useForumCategory(id)
  const { order, getSortProps } = useSort<ForumThreadOrderByInput>('updatedAt')
  const {
    isLoading: isLoadingThreads,
    threads,
    threadCount,
    refresh,
  } = useForumCategoryThreads(
    {
      categoryId: id,
      isArchive,
      order,
    },
    { perPage: THREADS_PER_PAGE, page }
  )

  const [popularThreadsCurrentPage, setPopularThreadsCurrentPage] = useState(1)
  const { threads: popularThreads, isLoading: popularThreadIsLoading } = useForumPopularThreads({
    page: popularThreadsCurrentPage,
    threadsPerPage: 3,
  })

  const { showModal } = useModal()

  if (!category) {
    return <Loading />
  }

  return (
    <ForumPageLayout
      isCategory
      lastBreadcrumb={category.title}
      header={
        <ForumPageHeader
          title={
            <PreviousPage>
              <PageTitle>{category.title}</PageTitle>
            </PreviousPage>
          }
          buttons={
            <TransactionButton
              style="primary"
              size="medium"
              onClick={() => showModal({ modal: 'CreateThreadModal', data: { categoryId: id } })}
            >
              <PlusIcon /> Add New Thread
            </TransactionButton>
          }
        >
          <ModeratorsContainer>
            Moderators: <MemberStack members={moderatorsSummary(category.moderators)} max={5} />
          </ModeratorsContainer>
        </ForumPageHeader>
      }
      main={
        <RowGapBlock gap={24}>
          <ThreadBrowser
            label="Popular Threads"
            threads={popularThreads}
            isLoading={popularThreadIsLoading}
            currentPage={popularThreadsCurrentPage}
            setCurrentPage={setPopularThreadsCurrentPage}
            emptyText="No Popular threads"
          />

          {!!category.subcategories.length && (
            <>
              {isArchive ? 'Archived categories' : 'Categories'}
              <ForumCategoryList categories={category.subcategories} isArchive={isArchive} />
            </>
          )}

          <ThreadFilters onApply={(filters) => refresh({ filters })} isArchive={isArchive}>
            <ItemCount count={threadCount} size="xs">
              {isArchive ? 'Archived Threads' : 'Threads'}
            </ItemCount>
          </ThreadFilters>

          <ThreadList
            threads={threads}
            getSortProps={getSortProps}
            isLoading={isLoadingThreads}
            isArchive={isArchive}
            page={page}
            pageCount={threadCount && Math.ceil(threadCount / THREADS_PER_PAGE)}
            setPage={setPage}
            type="list"
          />
        </RowGapBlock>
      }
    />
  )
}

const ModeratorsContainer = styled(Label)`
  align-items: center;
  flex-direction: column;
`
