import React from 'react'
import styled from 'styled-components'

import { TableListItem } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineExtraSmall, TextMedium } from '@/common/components/typography'
import { Colors, Overflow, Transitions } from '@/common/constants'
import { CategoriesColLayout, ForumRoutes } from '@/forum/constant'
import { ForumCategory } from '@/forum/types'
import { MemberStack, moderatorsSumary } from '@/memberships/components/MemberStack'

import { LatestPost } from './LatestPost'
import { PopularThread } from './PopularThread'
import { ThreadCount } from './ThreadCount'
export interface CategoryListItemProps {
  category: ForumCategory
}
export const CategoryListItem = ({ category }: CategoryListItemProps) => (
  <CategoryListItemStyles as={GhostRouterLink} to={`${ForumRoutes.category}/${category.id}`}>
    <Category>
      <h5>{category.title}</h5>
      <TextMedium light>{category.description}</TextMedium>
      <TextInlineExtraSmall lighter>
        Subcategories: {category.subcategories.map(({ title }) => title).join(', ')}
      </TextInlineExtraSmall>
    </Category>

    <ThreadCount categoryId={category.id} />

    <LatestPost categoryId={category.id} />

    <PopularThread categoryId={category.id} />

    <MemberStack members={moderatorsSumary(category.moderators)} max={5} />
  </CategoryListItemStyles>
)

export interface CategoryItemFieldProps {
  categoryId: string
}

const CategoryListItemStyles = styled(TableListItem).attrs({ $colLayout: CategoriesColLayout })`
  align-items: start;
  height: 128px;
  padding: 14px 24px;
  transition: ${Transitions.all};

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[100]};
  }

  & > * {
    margin-top: 8px;
  }
`

const Category = styled.div`
  margin: 0;
  ${TextMedium} {
    color: ${Colors.Black[500]};
    margin: 12px 0 4px;
    ${Overflow.DotsTwoLine};
  }
  ${TextInlineExtraSmall} {
    ${Overflow.FullDots};
  }
`
