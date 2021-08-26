import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { PinIcon } from '@/common/components/icons/PinIcon'
import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Colors, Overflow } from '@/common/constants'
import { ForumRoutes, ThreadsColLayout } from '@/forum/constant'
import { useThreadPollVoteCount } from '@/forum/hooks/useThreadPollVoteCount'
import { ForumThread } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'
import { useMember } from '@/memberships/hooks/useMembership'

import { LatestActivity } from './LatestActivity'
import { ThreadTags } from './ThreadTags'

interface ThreadListItemProps {
  thread: ForumThread
  isArchive?: boolean
}
export const ThreadListItem = ({ thread, isArchive }: ThreadListItemProps) => {
  const { voteCount } = useThreadPollVoteCount(thread.id)
  const { member: author } = useMember(thread.authorId)

  const { createdInBlock, status } = thread
  const block = isArchive ? status?.threadDeletedEvent : createdInBlock

  return (
    <ThreadListItemStyles as={GhostRouterLink} to={`${ForumRoutes.thread}/${thread.id}`}>
      {thread.isSticky && <PinIcon />}

      <Thread>
        <TextBig bold>{thread.title}</TextBig>
        {thread.tags.length > 0 && <ThreadTags tags={thread.tags} />}
      </Thread>

      <TextMedium bold>{thread.visiblePostsCount - 1}</TextMedium>

      <TextMedium bold>{voteCount}</TextMedium>

      <LatestActivity threadId={thread.id} />

      {author ? <MemberInfo member={author} size="s" memberSize="s" showGroup={false} /> : <Loading />}

      {block && <BlockTime block={block} layout="column" />}
    </ThreadListItemStyles>
  )
}

const ThreadListItemStyles = styled(TableListItem).attrs({ $colLayout: ThreadsColLayout })`
  height: 80px;
  padding: 12px 24px;
  position: relative;

  ${TableListItemAsLinkHover};

  & > svg {
    color: ${Colors.Black[400]};
    position: absolute;
    left: 2px;
    top: 2px;
  }
`

const Thread = styled.div`
  display: grid;
  gap: 8px;

  ${TextBig} {
    ${Overflow.FullDots};
  }
`
