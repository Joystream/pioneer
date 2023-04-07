import React from 'react'
import { generatePath } from 'react-router'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CountBadge } from '@/common/components/CountBadge'
import { ReplyIcon } from '@/common/components/icons'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextBig, TextExtraSmall, TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { relativeIfRecent } from '@/common/model/relativeIfRecent'
import { WatchlistButton } from '@/forum/components/Thread/WatchlistButton'
import { ForumRoutes } from '@/forum/constant'
import { ForumThread } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

interface ThreadCardProps {
  thread: ForumThread
  className?: string
  watchlistButton?: boolean
}

export const ThreadCard = ({ thread, className, watchlistButton }: ThreadCardProps) => {
  const replies = thread.visiblePostsCount - 1
  return (
    <Box
      to={generatePath(ForumRoutes.thread, { id: thread.id })}
      className={className}
      isArchived={thread.status.__typename === 'ThreadStatusRemoved'}
    >
      <div>
        <MemberInfo size="s" hideGroup onlyTop member={thread.author} />
        <div>
          <TextExtraSmall inter lighter>
            {relativeIfRecent(thread.status.threadDeletedEvent?.timestamp ?? thread.createdInBlock.timestamp)}
          </TextExtraSmall>
          <BadgeStatus size="m">{thread.categoryTitle.toUpperCase()}</BadgeStatus>
        </div>
      </div>
      <TextBig bold value>
        {thread.title}
      </TextBig>
      <TextMedium light truncateLines={3}>
        {thread.initialPostText}
      </TextMedium>
      <ColumnGapBlock justify="space-between" align="center">
        {replies > 0 && (
          <ColumnGapBlock gap={8}>
            <ReplyIcon />
            <CountBadge count={replies} />
          </ColumnGapBlock>
        )}
        {watchlistButton && <WatchlistButton threadId={thread.id} />}
      </ColumnGapBlock>
    </Box>
  )
}

const Box = styled(GhostRouterLink)<{ isArchived: boolean }>`
  ${({ isArchived }) => (isArchived ? `background-color: ${Colors.Black[50]}` : '')};
  display: grid;
  row-gap: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  padding: 24px;
  cursor: pointer;

  :hover {
    border: 1px solid ${Colors.Blue[100]};
  }

  > *:nth-child(3) {
    margin-top: -14px;
  }

  > *:first-child {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;

    > * {
      flex: 1;
    }

    > *:last-child {
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      justify-content: end;
      gap: 5px;
    }
  }

  > *:last-child {
    width: auto;
    svg {
      color: ${Colors.Black[400]};
    }
  }

  ${TextMedium} {
    max-height: 55px;
  }
`
