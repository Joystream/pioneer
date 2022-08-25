import React from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { RepliesIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { Colors, Fonts, Overflow, Transitions, BorderRad } from '@/common/constants'
import { relativeTime } from '@/common/model/relativeTime'
import { ForumRoutes } from '@/forum/constant'
import { useThreadOriginalPost } from '@/forum/hooks/useThreadOriginalPost'
import { ForumThread } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

import { ThreadItemContentProps, ThreadItemHeader, ThreadItemTime, ThreadItemTitle, ThreadItemText } from './ThreadItem'

interface PopularThreadProps {
  thread: ForumThread
  empty?: boolean
}

export const PopularThread = ({ thread, empty }: PopularThreadProps) => {
  const { originalPost, isLoading } = useThreadOriginalPost(thread.id)
  const repliesCount = thread.visiblePostsCount - 1
  const content = originalPost?.text
  const threadAddress = `${ForumRoutes.popularThread}/${thread.id}`

  if (isLoading) {
    return (
      <StyledPopularThread>
        <Loading />
      </StyledPopularThread>
    )
  }
  return (
    <StyledPopularThread as={GhostRouterLink} to={threadAddress}>
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
    </StyledPopularThread>
  )
}

const StyledPopularThread = styled.a`
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

const Replies = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
