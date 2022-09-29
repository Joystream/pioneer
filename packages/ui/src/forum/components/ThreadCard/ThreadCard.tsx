import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CountBadge } from '@/common/components/CountBadge'
import { ReplyIcon } from '@/common/components/icons'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextExtraSmall, TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { relativeIfRecent } from '@/common/model/relativeIfRecent'
import { ForumThread } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'
import { useMember } from '@/memberships/hooks/useMembership'

interface ThreadCardProps {
  thread: ForumThread
  className?: string
}

export const ThreadCard = ({ thread, className }: ThreadCardProps) => {
  const { member: author } = useMember(thread.authorId)

  if (!author) return null

  return (
    <Box className={className}>
      <div>
        <MemberInfo size="s" hideGroup onlyTop member={author} />
        <div>
          <TextExtraSmall inter lighter>
            {relativeIfRecent(thread.createdInBlock.timestamp)}
          </TextExtraSmall>
          <ColumnGapBlock gap={4}>
            {thread.tags.map((tag) => (
              <BadgeStatus size="m">{tag.title.toUpperCase()}</BadgeStatus>
            ))}
          </ColumnGapBlock>
        </div>
      </div>
      <TextBig bold value>
        {thread.title}
      </TextBig>
      <TextMedium light truncateLines={3}>
        {thread.initialPostText}
      </TextMedium>
      <ColumnGapBlock gap={8}>
        <ReplyIcon />
        <CountBadge count={thread.visiblePostsCount} />
      </ColumnGapBlock>
    </Box>
  )
}

const Box = styled.div`
  display: grid;
  row-gap: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  padding: 24px;

  > *:nth-child(3) {
    margin-top: -14px;
  }

  > *:first-child {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    > * {
      flex: 1;
    }

    > *:last-child {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 5px;
      flex: 2;
    }
  }

  > *:last-child {
    svg {
      color: ${Colors.Black[400]};
      :hover {
        color: ${Colors.LogoPurple};
        cursor: pointer;
      }
    }
  }
`
