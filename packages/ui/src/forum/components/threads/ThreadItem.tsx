import React from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { AnswerIcon } from '@/common/components/icons/AnswerIcon'
import { Loading } from '@/common/components/Loading'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { Label, TextInlineExtraSmall, TextMedium } from '@/common/components/typography'
import { Colors, Overflow, Transitions } from '@/common/constants'
import { relativeTime } from '@/common/model/relativeTime'
import { ForumRoutes } from '@/forum/constant'
import { useThreadOriginalPost } from '@/forum/hooks/useThreadOriginalPost'
import { ForumThread } from '@/forum/types'

import { ThreadItemBreadcrumbs } from './ThreadItemBreadcrumbs'
import { ThreadTags } from './ThreadTags'

interface ThreadBadgeProps {
  badge?: string
}

export interface ThreadItemContentProps {
  thread: ForumThread
  badges?: ThreadBadgeProps[]
  halfSize?: boolean
  empty?: boolean
}

export const ThreadItem = ({ thread, badges, halfSize, empty }: ThreadItemContentProps) => {
  const { originalPost, isLoading } = useThreadOriginalPost(thread.id)
  const repliesCount = thread.visiblePostsCount - 1
  const content = originalPost?.text
  const threadAddress = ForumRoutes.thread.replace(/:id/, thread.id)

  if (isLoading) {
    return (
      <ThreadItemWrapper>
        <Loading />
      </ThreadItemWrapper>
    )
  }
  return (
    <ThreadItemWrapper $halfSize={halfSize} as={GhostRouterLink} to={threadAddress}>
      <ThreadItemHeader align="center">
        <ThreadItemTitle empty={empty}>{thread.title}</ThreadItemTitle>
        <ThreadItemTime lighter>{relativeTime(thread.createdInBlock.timestamp)}</ThreadItemTime>
      </ThreadItemHeader>

      <ThreadItemBreadcrumbs id={thread.categoryId} nonInteractive />

      {content && (
        <ThreadItemText light value>
          {content}
        </ThreadItemText>
      )}
      {(badges || !!repliesCount) && (
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
          {!!repliesCount && (
            <Label>
              <StyledAnswerIcon /> Replies <CountBadge count={repliesCount} />
            </Label>
          )}
        </ThreadItemFooter>
      )}
    </ThreadItemWrapper>
  )
}

export const EmptyThreadItem = ({ text }: { text: string }) => (
  <ThreadItemWrapper>
    <ThreadItemHeader align="center">
      <ThreadItemTitle empty>{text}</ThreadItemTitle>
    </ThreadItemHeader>
  </ThreadItemWrapper>
)

const ThreadItemHeader = styled(ColumnGapBlock)`
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`

const ThreadItemTitle = styled.h5<{ empty?: boolean }>`
  font-weight: ${({ empty }) => (empty ? '400' : '700')};
  ${Overflow.FullDots};
  transition: ${Transitions.all};
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

export const ThreadItemWrapper = styled.a<{ $halfSize?: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: fit-content;
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
    -webkit-line-clamp: ${({ $halfSize }) => ($halfSize ? '3' : '14')};
  }

  &:hover,
  &:focus,
  &:focus-within {
    ${ThreadItemTitle} {
      color: ${Colors.Blue[500]};
    }
  }
`
