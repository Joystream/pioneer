import React from 'react'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { CategoriesColLayout } from '@/forum/constant'

import { CategoryListItem, CategoryListItemProps } from './CategoryListItem'

export interface ForumCategoryListProps {
  categories: CategoryListItemProps[]
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
      {categories.map(({ category, latestPost, topThread }) => (
        <CategoryListItem key={category.id} category={category} latestPost={latestPost} topThread={topThread} />
      ))}
    </List>
  </ForumCategoryListStyles>
)

const ForumCategoryListStyles = styled(RowGapBlock)``
