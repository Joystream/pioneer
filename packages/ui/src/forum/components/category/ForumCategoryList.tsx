import React from 'react'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { categoriesColLayout } from '@/forum/constant'
import { ForumCategory } from '@/forum/types'

import { CategoryListItem } from './CategoryListItem'

export interface ForumCategoryListProps {
  categories: ForumCategory[]
  isArchive?: boolean
  isCategory?: boolean
}

export const ForumCategoryList = ({ categories, isArchive = false, isCategory }: ForumCategoryListProps) => (
  <ForumCategoryListStyles gap={4}>
    {!isCategory && (
      <ListHeaders $colLayout={categoriesColLayout(isArchive)}>
        <ListHeader>Category</ListHeader>
        <ListHeader>Total threads</ListHeader>
        <ListHeader>Last Post</ListHeader>
        {isArchive ? (
          <ListHeader>Archived</ListHeader>
        ) : (
          <>
            <ListHeader>Popular Thread</ListHeader>
            <ListHeader>Moderators</ListHeader>
          </>
        )}
      </ListHeaders>
    )}
    <List as="div" isArchive={isArchive} isCategory={isCategory}>
      {categories.map((category, index) => (
        <CategoryListItem key={index} category={category} isArchive={isArchive} isCategory={isCategory} />
      ))}
    </List>
  </ForumCategoryListStyles>
)

const ForumCategoryListStyles = styled(RowGapBlock)`
  ${ListHeaders} {
    padding: 0px 24px;
  }
`
