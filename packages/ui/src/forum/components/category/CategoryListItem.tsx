import React from 'react'
import styled from 'styled-components'

import { TableListItem } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineExtraSmall, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { Colors, Overflow, Transitions } from '@/common/constants'
import { spacing } from '@/common/utils/styles'
import { CategoriesColLayout, ForumRoutes } from '@/forum/constant'
import { useForumCategoryDetails } from '@/forum/hooks/useForumCategoryDetails'
import { ForumCategory } from '@/forum/types'
import { MemberStack } from '@/memberships/components/MemberStack'

import { PostInfo } from './PostInfo'
import { ThreadInfo } from './ThreadInfo'

export interface CategoryListItemProps {
  category: ForumCategory
}

export const CategoryListItem = ({ category }: CategoryListItemProps) => {
  const { subcategories, threadCount, latestPost, topThread } = useForumCategoryDetails(category.id)

  return (
    <CategoryListItemStyles as={GhostRouterLink} to={`${ForumRoutes.category}/${category.id}`}>
      <Category>
        <h5>{category.title}</h5>
        <TextMedium light>{category.description}</TextMedium>
        {subcategories && subcategories.length > 0 && (
          <TextInlineExtraSmall lighter>
            Subcategories: {subcategories.map(({ title }) => title).join(', ')}
          </TextInlineExtraSmall>
        )}
      </Category>

      <TextInlineMedium bold value>
        {threadCount ?? '-'}
      </TextInlineMedium>

      {latestPost ? <PostInfo post={latestPost} /> : <Loading />}

      {topThread ? <ThreadInfo thread={topThread} /> : <Loading />}

      <MemberStack
        members={category.moderators.map(({ id, handle, avatar }) => ({
          handle,
          avatar,
          description: `Worker ID: ${id}`,
        }))}
        max={5}
      />
    </CategoryListItemStyles>
  )
}

const CategoryListItemStyles = styled(TableListItem).attrs({ $colLayout: CategoriesColLayout })`
  align-items: start;
  height: 128px;
  padding: 14px ${spacing(3)};
  transition: ${Transitions.all};

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[100]};
  }

  & > * {
    margin-top: ${spacing(1)};
  }
`

const Category = styled.div`
  margin: 0;
  ${TextMedium} {
    color: ${Colors.Black[500]};
    margin: ${spacing(5 / 4)} 0 ${spacing(5 / 8)};
    ${Overflow.DotsTwoLine};
  }
  ${TextInlineExtraSmall} {
    ${Overflow.FullDots};
  }
`
