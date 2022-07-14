import React, { memo } from 'react'
import styled from 'styled-components'

import { AnswerIcon } from '@/common/components/icons/AnswerIcon'
import { ArrowRightIcon } from '@/common/components/icons/ArrowRightIcon'
import { TextInlineMedium } from '@/common/components/typography'
import { useForumCategoryThreadCount } from '@/forum/hooks/useForumCategoryThreadCount'

import { CategoryItemFieldProps } from './CategoryListItem'

export const ThreadCount = memo(({ categoryId, isArchive, isCategory }: CategoryItemFieldProps) => {
  const { threadCount } = useForumCategoryThreadCount(categoryId, isArchive)
  return !isCategory ? (
    <TextInlineMedium bold value>
      {threadCount ?? '-'}
    </TextInlineMedium>
  ) : (
    <CategoryDetailIcons>
      <AnswerIcon />
      <ThreadCatCount>{threadCount}</ThreadCatCount>
      <ArrowRightIcon />
    </CategoryDetailIcons>
  )
})

export const CategoryDetailIcons = styled.div`
  display: flex;
  color: darkgrey;
`

export const ThreadCatCount = styled.div`
  min-width: 16px;
  height: 16px;
  padding: 0 5px;
  border-radius: 1000px;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: #3f38ff;
  background-color: #e7ebff;
  -webkit-text-stroke-width: 0;
  -webkit-text-stroke-color: transparent;
  align-items: center;
  margin-left: 8px;
  margin-right: 20px;
`
