import React from 'react'
import styled from 'styled-components'

import { TableListItem } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineExtraSmall, TextMedium } from '@/common/components/typography'
import { Colors, Overflow, Transitions } from '@/common/constants'
import { spacing } from '@/common/utils/styles'
import { CategoriesColLayout, ForumRoutes } from '@/forum/constant'
import { ForumCategory } from '@/forum/types'
import { MemberStack } from '@/memberships/components/MemberStack'

import { LatestPost } from './LatestPost'
import { PopularThread } from './PopularThread'
import { ThreadCount } from './ThreadCount'
export interface CategoryListItemProps {
  category: ForumCategory
}
export const CategoryListItem = ({ category }: CategoryListItemProps) => {
  const moderators = category.moderators.map(({ id, handle, avatar }) => ({
    handle,
    avatar,
    description: `Worker ID: ${id}`,
  }))

  return (
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

      <MemberStack members={moderators} max={5} />
    </CategoryListItemStyles>
  )
}

export interface CategoryItemFieldProps {
  categoryId: string
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
