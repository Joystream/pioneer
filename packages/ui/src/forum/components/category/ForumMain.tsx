import React from 'react'
import styled from 'styled-components'

import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { CategoryCard } from '@/forum/components/CategoryCard/CategoryCard'
import { ThreadCard } from '@/forum/components/ThreadCard/ThreadCard'
import { ForumCategory, ForumThread } from '@/forum/types'

export interface ForumCategoryListProps {
  categories: ForumCategory[]
  latestThreads: ForumThread[]
  isArchive?: boolean
}

export const ForumMain = ({ categories, latestThreads }: ForumCategoryListProps) => {
  if (!categories.length && !latestThreads.length) {
    return <EmptyPagePlaceholder title="There aren't any forum categories yet" copy="" button={null} />
  }

  return (
    <RowGapBlock gap={20}>
      {latestThreads.length && (
        <HorizontalScroller
          title="Latest threads"
          items={latestThreads.map((thread) => (
            <StyledThreadCard thread={thread} />
          ))}
        />
      )}

      {categories.length && (
        <RowGapBlock gap={10}>
          <TextMedium value lighter>
            Categories
          </TextMedium>
          <CategoriesListWrapper>
            {categories.map((category) => (
              <CategoryCard category={category} />
            ))}
          </CategoriesListWrapper>
        </RowGapBlock>
      )}
    </RowGapBlock>
  )
}
const CategoriesListWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(540px, 1fr));
`

const StyledThreadCard = styled(ThreadCard)`
  min-width: 330px;
`
