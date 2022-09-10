import React from 'react'
import styled from 'styled-components'

import { ButtonGhost } from '@/common/components/buttons/Buttons'
import { Arrow } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { isDefined } from '@/common/utils'
import { ForumThread } from '@/forum/types'

import { ThreadItem, EmptyThreadItem } from './ThreadItem'

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
  isLoading,
  emptyText,
  pageCount,
  currentPage,
  setCurrentPage,
}: ThreadBrowserProps) => {
  const onPrevClick = () => setCurrentPage(currentPage - 1)
  const onNextClick = () => setCurrentPage(currentPage + 1)

  return (
    <>
      {label}
      <StyledList>
        {threads?.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
        {isLoading && <Loading />}
        {!isLoading && !threads?.length && <EmptyThreadItem text={emptyText} />}
        <PrevButton size="small" square onClick={onPrevClick} disabled={currentPage <= 1} title="Browse previous">
          <Arrow direction="left" />
        </PrevButton>
        <NextButton
          size="small"
          square
          onClick={onNextClick}
          disabled={isDefined(pageCount) ? currentPage >= pageCount : !isDefined(threads)}
          title="Browse next"
        >
          <Arrow direction="right" />
        </NextButton>
      </StyledList>
    </>
  )
}

const StyledList = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
`

const PrevButton = styled(ButtonGhost)`
  position: absolute;
  top: 50%;
  left: 20px;
`

const NextButton = styled(ButtonGhost)`
  position: absolute;
  top: 50%;
  right: 20px;
`
