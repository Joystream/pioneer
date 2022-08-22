import React from 'react'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { categoriesColLayout } from '@/forum/constant'
import { ForumCategory } from '@/forum/types'

import { ForumCategoryListProps } from './ForumCategoryList'
import { SubCategoryListItem } from './SubCategoryListItem'

export const SubForumCategoryList = ({ categories, isArchive = false }: ForumCategoryListProps) => (
  <StyledList>
    {categories.map((category, index) => (
      <SubCategoryListItem key={index} category={category} isArchive={isArchive} />
    ))}
  </StyledList>
)

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`
