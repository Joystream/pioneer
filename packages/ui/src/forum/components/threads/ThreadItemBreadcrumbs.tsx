import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import {
  BreadcrumbsItem,
  BreadcrumbsItemComponent,
  BreadcrumbsItemLink,
  BreadcrumbsItemText,
} from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsItem'
import { BreadcrumbsListComponent } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsList'
import { Colors, Fonts } from '@/common/constants'
import { debounce, isDefined, last } from '@/common/utils'
import { ForumRoutes } from '@/forum/constant'
import { useForumMultiQueryCategoryBreadCrumbs } from '@/forum/hooks/useForumMultiQueryCategoryBreadCrumbs'

const MIN_BREADCRUMB_WIDTH = 75
const MAX_BREADCRUMB_WIDTH = 150

interface ThreadItemBreadcrumbsProps {
  id: string
  nonInteractive?: boolean
}
export const ThreadItemBreadcrumbs = memo(({ id, nonInteractive }: ThreadItemBreadcrumbsProps) => {
  const { isLoading, breadcrumbs } = useForumMultiQueryCategoryBreadCrumbs(id)

  const allItems = useMemo(
    () =>
      breadcrumbs.map(({ id, title }) => (
        <BreadcrumbsItem key={id} url={`${ForumRoutes.category}/${id}`} isLink={!nonInteractive}>
          {title}
        </BreadcrumbsItem>
      )),
    [isLoading, nonInteractive]
  )

  const containerRef = useRef<HTMLUListElement>(null)
  const [isShortened, shorten] = useState(false)
  const [keptItemOnEachSide, setKeptItemOnEachSide] = useState<number | undefined>()

  const items = useMemo(
    () =>
      isShortened && isDefined(keptItemOnEachSide)
        ? [
            ...allItems.slice(0, keptItemOnEachSide),
            ellipsisItem,
            ...allItems.slice(allItems.length - 1 - keptItemOnEachSide),
          ]
        : allItems,
    [allItems, keptItemOnEachSide, isShortened]
  )

  useEffect(() => {
    if (isLoading || breadcrumbs.length <= 1) return

    const shortenBreadcrumbs = debounce(() => {
      if (!containerRef.current) return

      const containerBox = containerRef.current.getBoundingClientRect()
      const children = Array.from(containerRef.current.children)
      const lastBox = last(children).getBoundingClientRect()
      const shouldShorten = containerBox.right < lastBox.right

      shorten(shouldShorten)
      if (!shouldShorten) return

      const lastChildWidth = Math.min(lastBox.width, MAX_BREADCRUMB_WIDTH)
      const firstChildWidth = Math.min(children[0].getBoundingClientRect().width, MAX_BREADCRUMB_WIDTH)
      const middleChildrenWidth = children
        .slice(1, -1)
        .map((element) => Math.min(element.getBoundingClientRect().width, MIN_BREADCRUMB_WIDTH))
        .reduce((a, b) => a + b)
      const childrenWidth = firstChildWidth + middleChildrenWidth + lastChildWidth

      const widthDifference = containerBox.width - childrenWidth

      if (widthDifference >= 0) {
        setKeptItemOnEachSide(undefined)
      } else {
        const totalExtraChildren = Math.ceil(-widthDifference / MIN_BREADCRUMB_WIDTH)
        setKeptItemOnEachSide(Math.floor((children.length - 2 - totalExtraChildren) / 2))
      }
    }, 1000)

    shortenBreadcrumbs()

    window.addEventListener('resize', shortenBreadcrumbs)
    return () => window.removeEventListener('resize', shortenBreadcrumbs)
  }, [isLoading])

  return (
    <ThreadItemBreadcrumbsList ref={containerRef} $isShortened={isShortened}>
      <li>
        {nonInteractive ? (
          <BreadcrumbsItemText>Forum</BreadcrumbsItemText>
        ) : (
          <BreadcrumbsItemLink to={ForumRoutes.forum}>Forum</BreadcrumbsItemLink>
        )}
      </li>

      {items}
    </ThreadItemBreadcrumbsList>
  )
})

const BreadcrumbsEllipsis = styled(BreadcrumbsItemComponent)`
  color: ${Colors.Black[400]};
`
const ellipsisItem = <BreadcrumbsEllipsis key={'ellipsis'}>...</BreadcrumbsEllipsis>

const ThreadItemBreadcrumbsList = styled(BreadcrumbsListComponent)<{ $isShortened: boolean }>`
  & > li {
    & + li {
      max-width: ${MAX_BREADCRUMB_WIDTH + 'px'};
      min-width: ${MIN_BREADCRUMB_WIDTH + 'px'};
    }

    &${BreadcrumbsEllipsis} {
      min-width: unset;
    }

    &:first-child,
    &:last-child {
      flex-shrink: 0;
      max-width: ${({ $isShortened }) => ($isShortened ? MAX_BREADCRUMB_WIDTH + 'px' : 'min-content')};
    }
  }

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
