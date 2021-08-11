import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { TableListItem } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Colors, Overflow, Transitions } from '@/common/constants'
import { spacing } from '@/common/utils/styles'
import { ThreadsColLayout, ForumRoutes } from '@/forum/constant'
import { useThreadPollVoteCount } from '@/forum/hooks/useThreadPollVoteCount'
import { ForumThread } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'
import { useMember } from '@/memberships/hooks/useMembership'

import { LatestActivity } from './LatestActivity'
import { ThreadTags } from './ThreadTags'

interface ThreadListItemProps {
  thread: ForumThread
}
export const ThreadListItem = ({ thread }: ThreadListItemProps) => {
  const { voteCount } = useThreadPollVoteCount(thread.id)
  const { member: author } = useMember(thread.authorId)

  return (
    <ThreadListItemStyles as={GhostRouterLink} to={`${ForumRoutes.thread}/${thread.categoryId}/${thread.id}`}>
      <Thread>
        <TextBig bold>{thread.title}</TextBig>
        {thread.tags.length > 0 && <ThreadTags tags={thread.tags} />}
      </Thread>

      <TextMedium bold>{thread.visiblePostsCount - 1}</TextMedium>

      <TextMedium bold>{voteCount}</TextMedium>

      <LatestActivity threadId={thread.id} />

      {author ? <MemberInfo member={author} size="s" memberSize="s" showGroup={false} /> : <Loading />}

      <BlockTime block={thread.createdInBlock} layout="column" />
    </ThreadListItemStyles>
  )
}

const ThreadListItemStyles = styled(TableListItem).attrs({ $colLayout: ThreadsColLayout })`
  height: 98px;
  padding: 14px ${spacing(3)};
  transition: ${Transitions.all};

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[100]};
  }
`

const Thread = styled.div`
  display: grid;
  gap: ${spacing(1)};

  ${TextBig} {
    ${Overflow.FullDots};
  }
`
