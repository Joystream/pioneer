import React, { useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ForumThreadOrderByInput } from '@/common/api/queries'
import { ItemCount } from '@/common/components/ItemCount'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { TextMedium } from '@/common/components/typography'
import { useSort } from '@/common/hooks/useSort'
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
  } = useForumCategoryThreads({ isArchive: false, order }, { perPage: THREADS_PER_PAGE, page })

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
            {isLoadingCategories ? (
              <Loading />
            ) : (
              forumCategories &&
              forumCategories.length > 0 && (
                <RowGapBlock gap={10}>
                  <TextMedium value lighter>
                    Archived Categories
                  </TextMedium>
                  <CategoriesListWrapper>
                    {forumCategories.map((category) => (
                      <CategoryCard archivedStyles category={category} />
                    ))}
                  </CategoriesListWrapper>
                </RowGapBlock>
              )
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
              isLoading={isLoadingThreads}
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
