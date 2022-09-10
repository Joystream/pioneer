import React from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { RepliesIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineExtraSmall, TextMedium } from '@/common/components/typography'
import { Colors, Overflow, Transitions, BorderRad } from '@/common/constants'
import { relativeTime } from '@/common/model/relativeTime'
import { ForumRoutes } from '@/forum/constant'
import { useThreadOriginalPost } from '@/forum/hooks/useThreadOriginalPost'
import { ForumThread } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

interface ThreadBadgeProps {
  badge?: string
}

export interface ThreadItemContentProps {
  thread: ForumThread
  badges?: ThreadBadgeProps[]
  halfSize?: boolean
  empty?: boolean
}

export const ThreadItem = ({ thread, empty }: ThreadItemContentProps) => {
  const { originalPost, isLoading } = useThreadOriginalPost(thread.id)
  const repliesCount = thread.visiblePostsCount - 1
  const content = originalPost?.text
  const threadAddress = `${ForumRoutes.popularThread}/${thread.id}`

  if (isLoading) {
    return (
      <StyledThreadItem>
        <Loading />
      </StyledThreadItem>
    )
  }
  return (
    <StyledThreadItem as={GhostRouterLink} to={threadAddress}>
      <ThreadItemHeader align="center">
        {originalPost && <MemberInfo member={originalPost.author} size="s" memberSize="s" hideGroup />}
        <ThreadItemTime lighter>{relativeTime(thread.createdInBlock.timestamp)}</ThreadItemTime>
      </ThreadItemHeader>
      <ThreadItemTitle empty={empty}>{thread.title}</ThreadItemTitle>
      {content && (
        <ThreadItemText light value>
          {content}
        </ThreadItemText>
      )}
      <Replies>
        <RepliesIcon />
        <CountBadge count={repliesCount} />
      </Replies>
    </StyledThreadItem>
  )
}

const Replies = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

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

const StyledThreadItem = styled.a`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  transition: ${Transitions.all};
  padding: 24px;
  &:hover,
  &:focus,
  &:focus-within {
    ${ThreadItemTitle} {
      color: ${Colors.Blue[500]};
    }
  }

  & + & {
    margin-top: -1px;
  }
`
