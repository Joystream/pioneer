import React from 'react'
import styled from 'styled-components'

import { TableListItem } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineExtraSmall, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { spacing } from '@/common/utils/styles'
import { CategoriesColLayout, ForumRoutes } from '@/forum/constant'
import { ForumCategory, ForumPost, ForumThread } from '@/forum/types'
import { MemberStack, MemberSumary } from '@/memberships/components/MemberStack'

import { PostInfo } from './PostInfo'
import { ThreadInfo } from './ThreadInfo'

export interface CategoryListItemProps {
  category: ForumCategory & { threadCount: number }
  latestPost?: ForumPost
  topThread?: ForumThread & { postCount: number }
  moderators?: MemberSumary[]
}
export const CategoryListItem = ({ category, latestPost, topThread, moderators }: CategoryListItemProps) => (
  <CategoryListItemStyles
    as={GhostRouterLink}
    $colLayout={CategoriesColLayout}
    to={`${ForumRoutes.category}/${category.id}`}
  >
    <Category>
      <h5>{category.title}</h5>
      <TextMedium light>{category.description}</TextMedium>
      <TextInlineExtraSmall lighter>
        Subcategories: {category.subcategories.map(({ title }) => title).join(', ')}
      </TextInlineExtraSmall>
    </Category>

    <TextInlineMedium bold value>
      {category.threadCount}
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

const CategoryListItemStyles = styled(TableListItem)`
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
  }
`
