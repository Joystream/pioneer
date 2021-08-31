import React from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { AnswerIcon } from '@/common/components/icons/AnswerIcon'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineExtraSmall, TextMedium } from '@/common/components/typography'
import { Colors, Overflow, Transitions } from '@/common/constants'

import { ThreadTags } from './ThreadTags'

interface ThreadBadgeProps {
  badge?: string
}

interface ThreadAnswerProps {
  answer?: string
}

export interface ThreadItemContentProps {
  title: string
  id: string
  date?: string
  content?: string
  badges?: ThreadBadgeProps[]
  answers?: ThreadAnswerProps[]
  halfSize?: boolean
  empty?: boolean
}

export const ThreadItem = ({ title, date, content, badges, answers, halfSize, empty }: ThreadItemContentProps) => {
  return (
    <ThreadItemWrapper halfSize={halfSize}>
      <ThreadItemHeader align="center">
        <ThreadItemTitle empty={empty}>{title}</ThreadItemTitle>
        {date && <ThreadItemTime lighter>{date}</ThreadItemTime>}
      </ThreadItemHeader>
      {content && (
        <ThreadItemText light value>
          {content}
        </ThreadItemText>
      )}
      {(badges || answers) && (
        <ThreadItemFooter>
          {badges && (
            <ThreadTags
              tags={badges.flatMap(({ badge }, index) => ({
                id: String(index),
                title: badge as string,
                threads: [],
                visibleThreadsCount: 0,
              }))}
            />
          )}
          {answers && (
            <Label>
              <StyledAnswerIcon /> Answers <CountBadge count={answers.length} />
            </Label>
          )}
        </ThreadItemFooter>
      )}
    </ThreadItemWrapper>
  )
}

const ThreadItemHeader = styled(ColumnGapBlock)`
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`

const ThreadItemTitle = styled.h5<{ empty?: boolean }>`
  font-weight: ${({ empty }) => (empty ? '400' : '700')};
  ${Overflow.FullDots};
`

const ThreadItemTime = styled(TextInlineExtraSmall)`
  ${Overflow.FullDots};
`

const ThreadItemText = styled(TextMedium)`
  display: -webkit-box;
  max-height: 100%;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ThreadItemFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 100%;
  overflow: hidden;
`

const StyledAnswerIcon = styled(AnswerIcon)`
  color: ${Colors.Black[300]};
`

export const ThreadItemWrapper = styled.div<{ halfSize?: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: fit-content;
  max-height: ${({ halfSize }) => (halfSize ? '50%' : '100%')};
  padding: 16px 0;
  overflow: hidden;

  & + & {
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background-color: ${Colors.Black[100]};
      transition: ${Transitions.all};
    }
  }

  ${ThreadItemText} {
    -webkit-line-clamp: ${({ halfSize }) => (halfSize ? '3' : '14')};
  }
`
