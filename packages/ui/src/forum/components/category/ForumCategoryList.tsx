import React from 'react'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { CategoriesColLayout } from '@/forum/constant'
import { ForumCategory } from '@/forum/types'

import { CategoryListItem } from './CategoryListItem'

export interface ForumCategoryListProps {
  categories: ForumCategory[]
  isArchive?: boolean
}

export const ForumCategoryList = ({ categories, isArchive }: ForumCategoryListProps) => (
  <ForumCategoryListStyles gap={4}>
    <ListHeaders $colLayout={CategoriesColLayout}>
      <ListHeader>Category</ListHeader>
      <ListHeader>Total threads</ListHeader>
      <ListHeader>Last Post</ListHeader>
      <ListHeader>Popular Thread</ListHeader>
      <ListHeader>Moderators</ListHeader>
    </ListHeaders>
    <List as="div" isArchive={isArchive}>
      {categories.map((category, index) => (
        <CategoryListItem key={index} category={category} isArchive={isArchive} />
      ))}
    </List>
  </ForumCategoryListStyles>
)

const ForumCategoryListStyles = styled(RowGapBlock)`
  ${ListHeaders} {
    padding: 0px 24px;
  }
`
