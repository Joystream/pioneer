import React, { memo } from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { useForumCategoryThreadCount } from '@/forum/hooks/useForumCategoryThreadCount'

import { CategoryItemFieldProps } from './CategoryListItem'

export const ThreadCount = memo(({ categoryId, isArchive }: CategoryItemFieldProps) => {
  const { threadCount } = useForumCategoryThreadCount(categoryId, isArchive)
  return <CountBadge count={threadCount} />
})
