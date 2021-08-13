import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { CountBadge } from '@/common/components/CountBadge'
import { Arrow } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'

import { ThreadItem, ThreadItemWrapper, ThreadItemContentProps } from './ThreadItem'
import { ThreadItemsPlaceholder } from './ThreadItemsPlaceholder'
import { ThreadsLayoutSpacing } from './ThreadsLayout'

export interface ThreadBrowserProps {
  label: string
}

export const ThreadBrowser = ({ label }: ThreadBrowserProps) => {
  const items: ThreadItemContentProps[] = ThreadItemsPlaceholder
  const [currentItemsGroup, setCurrentItemsGroup] = useState(0)
  const currentItems: ThreadItemContentProps[][] = []

  const currentItemsGroupSize = 2
  for (let i = 0; i < Math.ceil(items.length / currentItemsGroupSize); i++) {
    currentItems.push(items.slice(i * currentItemsGroupSize, i * currentItemsGroupSize + currentItemsGroupSize))
  }

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    let timeOutId: any
    if (isLoading) {
      timeOutId = setTimeout(() => setLoading(false), 500) as any
    }
    return () => clearTimeout(timeOutId)
  }, [isLoading])

  const onPrevClick = () => {
    setLoading(true)
    setCurrentItemsGroup(currentItemsGroup - 1)
  }
  const onNextClick = () => {
    setLoading(true)
    setCurrentItemsGroup(currentItemsGroup + 1)
  }

  return (
    <ThreadBrowserStyles>
      <ThreadBrowserHeader align="center" gap={16}>
        <Label>
          {label} {items.length > 0 && <CountBadge count={items.length} />}
        </Label>
        <ButtonsGroup>
          <ButtonGhost size="small" square onClick={onPrevClick} disabled={currentItemsGroup - 1 < 0}>
            <Arrow direction="left" />
          </ButtonGhost>
          <ButtonGhost size="small" square onClick={onNextClick} disabled={currentItemsGroup + 1 > items.length}>
            <Arrow direction="right" />
          </ButtonGhost>
        </ButtonsGroup>
      </ThreadBrowserHeader>
      <ThreadBrowserItems>
        {isLoading || !currentItems[currentItemsGroup] ? (
          <Loading />
        ) : (
          currentItems[currentItemsGroup].map((item) => (
            <ThreadItem {...item} halfSize={currentItems[currentItemsGroup].length > 1} />
          ))
        )}
      </ThreadBrowserItems>
    </ThreadBrowserStyles>
  )
}

const ThreadBrowserStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - (${ThreadsLayoutSpacing} / 2));
  flex-shrink: 0;
  flex-grow: 1;
  max-width: 100%;
  max-height: 472px;
  padding: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  overflow: hidden;
  transition: ${Transitions.all};

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[100]};
    ${ThreadItemWrapper} {
      &:before {
        background-color: ${Colors.Blue[100]};
      }
    }
  }
`

const ThreadBrowserHeader = styled(ColumnGapBlock)`
  justify-content: space-between;
  width: 100%;
`

const ThreadBrowserItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
`
