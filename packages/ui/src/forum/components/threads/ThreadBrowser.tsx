import React from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { CountBadge } from '@/common/components/CountBadge'
import { Arrow } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'
import { ForumThread } from '@/forum/types'

import { ThreadItem, ThreadItemWrapper, EmptyThreadItem } from './ThreadItem'
import { ThreadsLayoutSpacing } from './ThreadsLayout'

export interface ThreadBrowserProps {
  label: string
  threads?: ForumThread[]
  pageCount?: number
  totalCount?: number
  isLoading: boolean
  currentPage: number
  setCurrentPage: React.Dispatch<number>
  emptyText: string
}

export const ThreadBrowser = ({
  label,
  threads,
  pageCount,
  totalCount,
  isLoading,
  currentPage,
  setCurrentPage,
  emptyText,
}: ThreadBrowserProps) => {
  const onPrevClick = () => setCurrentPage(currentPage - 1)
  const onNextClick = () => setCurrentPage(currentPage + 1)

  return (
    <ThreadBrowserStyles>
      <ThreadBrowserHeader align="center" gap={16}>
        <Label>
          {label} {!!totalCount && <CountBadge count={totalCount} />}
        </Label>
        <ButtonsGroup>
          <ButtonGhost size="small" square onClick={onPrevClick} disabled={currentPage <= 1}>
            <Arrow direction="left" />
          </ButtonGhost>
          <ButtonGhost size="small" square onClick={onNextClick} disabled={currentPage >= (pageCount ?? 1)}>
            <Arrow direction="right" />
          </ButtonGhost>
        </ButtonsGroup>
      </ThreadBrowserHeader>
      <ThreadBrowserItems>
        {isLoading ? (
          <Loading />
        ) : (
          threads?.map((thread) => <ThreadItem key={thread.id} thread={thread} halfSize={threads.length > 1} />)
        )}
        {!isLoading && !totalCount && <EmptyThreadItem text={emptyText} />}
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
