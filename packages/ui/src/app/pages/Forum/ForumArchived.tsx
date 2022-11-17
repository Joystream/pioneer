import React, { Children, useState } from 'react'
import styled from 'styled-components'

import { PageLayout } from '@/app/components/PageLayout'
import { ForumThreadOrderByInput } from '@/common/api/queries'
import { ItemCount } from '@/common/components/ItemCount'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { useSort } from '@/common/hooks/useSort'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { CategoriesListWrapper } from '@/forum/components/category'
import { CategoryCard } from '@/forum/components/CategoryCard/CategoryCard'
import { ForumPageHeader } from '@/forum/components/ForumPageHeader'
import { ThreadFilters } from '@/forum/components/threads/ThreadFilters'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { THREADS_PER_PAGE } from '@/forum/constant'
import { useArchivedForumCategories } from '@/forum/hooks/useArchivedForumCategories'
import { useForumCategoryThreads } from '@/forum/hooks/useForumCategoryThreads'

import { ForumTabs } from './components/ForumTabs'

export const ForumArchived = () => {
  const [page, setPage] = useState<number>(1)
  const { order, getSortProps } = useSort<ForumThreadOrderByInput>('updatedAt')
  const { isLoading: isLoadingCategories, forumCategories } = useArchivedForumCategories()
  const {
    isLoading: isLoadingThreads,
    threads,
    threadCount,
    refresh,
  } = useForumCategoryThreads({ isArchive: true, order }, { perPage: THREADS_PER_PAGE, page })
  const isRefetched = useRefetchQueries({
    interval: MILLISECONDS_PER_BLOCK,
    include: ['GetForumThreads', 'GetForumThreadsCount', 'GetArchivedForumCategories'],
  })

  return (
    <PageLayout
      header={
        <ForumPageHeader title={<PageTitle>Forum</PageTitle>}>
          <ForumTabs />
        </ForumPageHeader>
      }
      main={
        <>
          <RowGapBlock gap={24}>
            <StyledItemCount count={forumCategories?.length ?? 0} size="xs">
              Archived Categories
            </StyledItemCount>
            {isLoadingCategories && !isRefetched ? (
              <Loading />
            ) : forumCategories && forumCategories.length > 0 ? (
              <RowGapBlock gap={10}>
                <CategoriesListWrapper>
                  {Children.toArray(
                    forumCategories.map((category) => <CategoryCard archivedStyles category={category} />)
                  )}
                </CategoriesListWrapper>
              </RowGapBlock>
            ) : (
              <NotFoundText>No categories found</NotFoundText>
            )}
          </RowGapBlock>

          <RowGapBlock gap={24}>
            <ThreadFilters onApply={(filters) => refresh({ filters })} isArchive>
              <ItemCount count={threadCount} size="xs">
                Threads
              </ItemCount>
            </ThreadFilters>

            <ThreadList
              threads={threads}
              getSortProps={getSortProps}
              isLoading={isLoadingThreads && !isRefetched}
              isArchive
              page={page}
              pageCount={threadCount && Math.ceil(threadCount / THREADS_PER_PAGE)}
              setPage={setPage}
              type="list"
            />
          </RowGapBlock>
        </>
      }
    />
  )
}

export const StyledItemCount = styled(ItemCount)`
  padding: 0 16px;
`
