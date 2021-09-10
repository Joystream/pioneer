import React, { memo } from 'react'
import styled from 'styled-components'

import {
  BreadcrumbsItem,
  BreadcrumbsItemLink,
  BreadcrumbsItemText,
} from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsItem'
import { BreadcrumbsListComponent } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsList'
import { Colors, Fonts } from '@/common/constants'
import { ForumRoutes } from '@/forum/constant'
import { useForumMultiQueryCategoryBreadCrumbs } from '@/forum/hooks/useForumMultiQueryCategoryBreadCrumbs'

interface ThreadItemBreadcrumbsProps {
  id: string
  nonInteractive?: boolean
}
export const ThreadItemBreadcrumbs = memo(({ id, nonInteractive }: ThreadItemBreadcrumbsProps) => {
  const { breadcrumbs } = useForumMultiQueryCategoryBreadCrumbs(id)

  return (
    <ThreadItemBreadcrumbsList>
      {nonInteractive ? (
        <BreadcrumbsItemText>Forum</BreadcrumbsItemText>
      ) : (
        <BreadcrumbsItemLink to={ForumRoutes.forum}>Forum</BreadcrumbsItemLink>
      )}

      {breadcrumbs.map(({ id, title }) => (
        <BreadcrumbsItem key={id} url={`${ForumRoutes.category}/${id}`} isLink={!nonInteractive}>
          {title}
        </BreadcrumbsItem>
      ))}
    </ThreadItemBreadcrumbsList>
  )
})

const ThreadItemBreadcrumbsList = styled(BreadcrumbsListComponent)`
  color: ${Colors.Black[500]};

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
