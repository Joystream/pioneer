import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { generatePath } from 'react-router'
import styled from 'styled-components'

import {
  BreadcrumbsItem,
  BreadcrumbsItemComponent,
  BreadcrumbsItemLink,
  BreadcrumbsItemText,
} from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsItem'
import { BreadcrumbsListComponent } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsList'
import { Colors, Fonts } from '@/common/constants'
import { clamp, debounce, isDefined, last } from '@/common/utils'
import { ForumRoutes } from '@/forum/constant'
import { useForumMultiQueryCategoryBreadCrumbs } from '@/forum/hooks/useForumMultiQueryCategoryBreadCrumbs'

const MIN_BREADCRUMB_WIDTH = 75
const MAX_BREADCRUMB_WIDTH = 150
const ELLIPSIS_WIDTH = 37

interface ThreadItemBreadcrumbsProps {
  id: string
  nonInteractive?: boolean
}
export const ThreadItemBreadcrumbs = memo(({ id, nonInteractive }: ThreadItemBreadcrumbsProps) => {
  const { isLoading, breadcrumbs } = useForumMultiQueryCategoryBreadCrumbs(id)

  const allItems = useMemo(
    () =>
      breadcrumbs.map(({ id, title }) => (
        <BreadcrumbsItem key={id} url={generatePath(ForumRoutes.category, { id })} isLink={!nonInteractive}>
          {title}
        </BreadcrumbsItem>
      )),
    [breadcrumbs, nonInteractive]
  )

  const containerRef = useRef<HTMLUListElement>(null)
  const [isShortened, shorten] = useState(false)
  const [keptItemOnEachSide, setKeptItemOnEachSide] = useState<number | undefined>()

  const items = useMemo(
    () =>
      isDefined(keptItemOnEachSide)
        ? [
            ...allItems.slice(0, keptItemOnEachSide),
            ellipsisItem,
            ...allItems.slice(allItems.length - 1 - keptItemOnEachSide),
          ]
        : allItems,
    [allItems, keptItemOnEachSide]
  )

  const [lastChildWidth, firstChildWidth] = useMemo(() => {
    if (isLoading || !containerRef.current) return []

    const { children } = containerRef.current
    return [children[0], last(children)].map((child) => child.getBoundingClientRect().width)
  }, [isLoading, containerRef.current])

  useEffect(() => {
    if (!lastChildWidth || !firstChildWidth) return

    const shortenBreadcrumbs = debounce(() => {
      if (!containerRef.current) return

      const containerBox = containerRef.current.getBoundingClientRect()

      const totalRemovable = breadcrumbs.length - 1
      const fullWidth = firstChildWidth + lastChildWidth + totalRemovable * MIN_BREADCRUMB_WIDTH
      const widthDifference = containerBox.width - fullWidth
      const totalExtra = clamp(0, Math.ceil(-widthDifference / MIN_BREADCRUMB_WIDTH), totalRemovable)
      const toKeepOnEachSide = totalExtra ? Math.floor((totalRemovable - totalExtra) / 2) : undefined

      setKeptItemOnEachSide(toKeepOnEachSide)

      const gainedWidth = toKeepOnEachSide ? totalRemovable - toKeepOnEachSide * 2 - ELLIPSIS_WIDTH : 0
      const remainingWidth = fullWidth - gainedWidth

      shorten(remainingWidth > containerBox.width)
    }, 1000)

    shortenBreadcrumbs()

    window.addEventListener('resize', shortenBreadcrumbs)
    return () => window.removeEventListener('resize', shortenBreadcrumbs)
  }, [lastChildWidth, firstChildWidth])

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
      flex-shrink: ${({ $isShortened }) => Number($isShortened)};
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
