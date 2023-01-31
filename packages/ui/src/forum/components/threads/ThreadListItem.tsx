import React from 'react'
import { generatePath } from 'react-router'
import styled, { css } from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { PinIcon } from '@/common/components/icons/PinIcon'
import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { Tooltip } from '@/common/components/Tooltip'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Colors, Overflow } from '@/common/constants'
import { ForumRoutes, ThreadsColLayout } from '@/forum/constant'
import { ForumThread } from '@/forum/types'
import { MemberInfo, MemberInfoWrap } from '@/memberships/components'

import { LatestActivity, LatestActivityRowGapBlock } from './LatestActivity'
import { ThreadTags } from './ThreadTags'

interface ThreadListItemProps {
  thread: ForumThread
  isArchive?: boolean
}
export const ThreadListItem = ({ thread, isArchive }: ThreadListItemProps) => {
  const { createdInBlock, status } = thread
  const block = isArchive ? status?.threadDeletedEvent : createdInBlock

  return (
    <ThreadListItemStyles
      as={GhostRouterLink}
      to={generatePath(ForumRoutes.thread, { id: thread.id })}
      $isSticky={thread.isSticky}
    >
      {thread.isSticky && <ThreadPinIcon />}

      <Tooltip tooltipText={thread.title}>
        <Thread>
          <TextBig bold>{thread.title}</TextBig>
          {thread.tags.length > 0 && <ThreadTags tags={thread.tags} />}
        </Thread>
      </Tooltip>

      <TextMedium bold>{thread.visiblePostsCount > 0 ? thread.visiblePostsCount - 1 : 0}</TextMedium>

      <LatestActivity threadId={thread.id} />

      <MemberInfo member={thread.author} size="s" memberSize="s" hideGroup />

      {block && <BlockTime block={block} layout="column" />}
    </ThreadListItemStyles>
  )
}

const ThreadPinIcon = styled(PinIcon)`
  color: ${Colors.Black[400]};
  position: absolute;
  left: 2px;
  top: 2px;
`

const ThreadListItemStyles = styled(TableListItem).attrs({ $colLayout: ThreadsColLayout })<{ $isSticky?: boolean }>`
  height: 80px;
  padding: 12px 24px;
  position: relative;

  ${({ $isSticky }) =>
    $isSticky &&
    css`
      border: 1px solid ${Colors.Black[300]};
      z-index: 1;
    `}

  ${TableListItemAsLinkHover};

  & > ${TextMedium} {
    line-height: 28px;
  }
  & > ${TextMedium}, & > ${LatestActivityRowGapBlock}, & > ${MemberInfoWrap} {
    align-self: start;
  }
`

const Thread = styled.div`
  display: grid;
  gap: 8px;

  ${TextBig} {
    ${Overflow.FullDots};
  }
`
