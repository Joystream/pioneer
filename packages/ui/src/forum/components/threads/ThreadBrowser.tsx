import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { CountBadge } from '@/common/components/CountBadge'
import { Arrow } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'
import { useMyThreads } from '@/forum/hooks/useMyThreads'

import { ThreadItem, ThreadItemWrapper, ThreadItemContentProps } from './ThreadItem'
import { ThreadsLayoutSpacing } from './ThreadsLayout'

export interface ThreadBrowserProps {
  label: string
  noItems?: boolean
}

export const ThreadBrowser = ({ label, noItems }: ThreadBrowserProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const threadsPerPage = 2
  const { threads, pageCount, totalCount, isLoading } = useMyThreads({ page: currentPage, threadsPerPage })

  const onPrevClick = () => {
    setCurrentPage(currentPage - 1)
  }
  const onNextClick = () => {
    setCurrentPage(currentPage + 1)
  }

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
          threads?.map((thread) => (
            <ThreadItem title={thread.title} date={thread.createdInBlock.timestamp} halfSize={threads.length > 1} id={thread.id} />
          ))
        )}
        {!isLoading && !totalCount && <ThreadItem title={"You haven't created any threads yet"} empty id={'aaaa'}/>}
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
