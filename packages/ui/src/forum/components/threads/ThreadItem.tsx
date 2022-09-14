import React from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { RepliesIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineExtraSmall, TextMedium } from '@/common/components/typography'
import { Overflow, Transitions } from '@/common/constants'
import { relativeTime } from '@/common/model/relativeTime'
import { CardItem } from '@/forum/components/CardItem'
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
      <CardItem>
        <Loading />
      </CardItem>
    )
  }
  return (
    <CardItem as={GhostRouterLink} to={threadAddress}>
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
    </CardItem>
  )
}

const Replies = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const EmptyThreadItem = ({ text }: { text: string }) => (
  <CardItem>
    <ThreadItemHeader align="center">
      <ThreadItemTitle empty>{text}</ThreadItemTitle>
    </ThreadItemHeader>
  </CardItem>
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
  max-height: 100%;
  ${Overflow.DotsNLines(4)}
`
