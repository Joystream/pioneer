import React from 'react'
import styled from 'styled-components'

import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium } from '@/common/components/typography'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { CategoryCard } from '@/forum/components/CategoryCard/CategoryCard'
import { ThreadCard } from '@/forum/components/ThreadCard/ThreadCard'
import { ThreadCardSkeleton } from '@/forum/components/ThreadCard/ThreadCardSkeleton'
import { useForumCategories } from '@/forum/hooks/useForumCategories'
import { useLatestForumThreads } from '@/forum/hooks/useLatestForumThreads'

export const ForumMain = () => {
  const { isLoading: isLoadingCategories, forumCategories } = useForumCategories({ isRoot: true })
  const isRefetched = useRefetchQueries({ interval: MILLISECONDS_PER_BLOCK, include: ['GetForumCategories'] })
  const { threads, isLoading: isLoadingThreads } = useLatestForumThreads(10)
  const isLoading = isLoadingCategories || isLoadingThreads

  if (isLoading && !isRefetched) {
    return <Loading />
  }

  if (!forumCategories?.length && !threads.length) {
    return <EmptyPagePlaceholder title="There aren't any forum categories yet" copy="" button={null} />
  }

  return (
    <RowGapBlock gap={20}>
      {!isLoadingThreads ? (
        <HorizontalScroller
          title="Latest threads"
          items={
            threads.length ? (
              threads.map((thread) => <StyledThreadCard thread={thread} />)
            ) : (
              <TextBig>There are not latest threads</TextBig>
            )
          }
        />
      ) : (
        <HorizontalScroller title="Latest threads" items={<ThreadCardSkeleton count={10} />} />
      )}

      {forumCategories?.length ? (
        <RowGapBlock gap={10}>
          <TextMedium value lighter>
            Categories
          </TextMedium>
          <CategoriesListWrapper>
            {forumCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </CategoriesListWrapper>
        </RowGapBlock>
      ) : (
        <Loading />
      )}
    </RowGapBlock>
  )
}
export const CategoriesListWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(540px, 1fr));
`

const StyledThreadCard = styled(ThreadCard)`
  min-width: 330px;
`
