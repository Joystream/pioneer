import React, { memo } from 'react'
import styled from 'styled-components'

import { BreadcrumbsItem, BreadcrumbsItemLink } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsItem'
import { BreadcrumbsListComponent } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsList'
import { Colors, Fonts } from '@/common/constants'
import { ForumRoutes } from '@/forum/constant'
import { useForumMultiQueryCategoryBreadCrumbs } from '@/forum/hooks/useForumMultiQueryCategoryBreadCrumbs'

interface ThreadItemBreadcrumbsProps {
  id: string
}
export const ThreadItemBreadcrumbs = memo(({ id }: ThreadItemBreadcrumbsProps) => {
  const { breadcrumbs } = useForumMultiQueryCategoryBreadCrumbs(id)

  return (
    <ThreadItemBreadcrumbsList>
      <BreadcrumbsItemLink to="/forum">Forum</BreadcrumbsItemLink>

      {breadcrumbs.map(({ id, title }) => (
        <BreadcrumbsItem key={id} url={`${ForumRoutes.category}/${id}`} isLink>
          {title}
        </BreadcrumbsItem>
      ))}
    </ThreadItemBreadcrumbsList>
  )
})

const ThreadItemBreadcrumbsList = styled(BreadcrumbsListComponent)`
  color: ${Colors.Black[500]};
  flex-wrap: wrap;

  ${BreadcrumbsItemLink} {
    &,
    &:visited {
      color: ${Colors.Black[400]};
      font-family: ${Fonts.Grotesk};
      &:last-child {
        color: ${Colors.Black[500]};
      }
    }
  }
`
