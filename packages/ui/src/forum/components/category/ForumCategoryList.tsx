import React from 'react'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { spacing } from '@/common/utils/styles'
import { CategoriesColLayout } from '@/forum/constant'
import { ForumCategory } from '@/forum/types'

import { CategoryListItem } from './CategoryListItem'

export interface ForumCategoryListProps {
  categories: ForumCategory[]
}

export const ForumCategoryList = ({ categories }: ForumCategoryListProps) => (
  <ForumCategoryListStyles gap={4}>
    <ListHeaders $colLayout={CategoriesColLayout}>
      <ListHeader>Category</ListHeader>
      <ListHeader>Total threads</ListHeader>
      <ListHeader>Last Post</ListHeader>
      <ListHeader>Popular Thread</ListHeader>
      <ListHeader>Moderators</ListHeader>
    </ListHeaders>
    <List as="div">
      {categories.map((category, index) => (
        <CategoryListItem key={index} category={category} />
      ))}
    </List>
  </ForumCategoryListStyles>
)

const ForumCategoryListStyles = styled(RowGapBlock)`
  ${ListHeaders} {
    padding: ${spacing(0, 3)};
  }
`
