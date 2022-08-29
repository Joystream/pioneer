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
}

export const ForumCategoryList = ({ categories, isArchive = false }: ForumCategoryListProps) => (
  <StyledList>
    {categories.map((category, index) => (
      <CategoryListItem key={index} category={category} isArchive={isArchive} />
    ))}
  </StyledList>
)

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`
