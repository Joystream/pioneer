import React, { memo } from 'react'

import { TextInlineMedium } from '@/common/components/typography'
import { useForumCategoryThreadCount } from '@/forum/hooks/useForumCategoryThreadCount'

import { CategoryItemFieldProps } from './CategoryListItem'

export const ThreadCount = memo(({ categoryId }: CategoryItemFieldProps) => {
  const { threadCount } = useForumCategoryThreadCount(categoryId)
  return (
    <TextInlineMedium bold value>
      {threadCount ?? '-'}
    </TextInlineMedium>
  )
})
