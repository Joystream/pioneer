import React from 'react'
import { generatePath } from 'react-router'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextBig, TextExtraSmall, TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { relativeIfRecent } from '@/common/model/relativeIfRecent'
import { ForumRoutes } from '@/forum/constant'
import { ForumPostWithThread } from '@/forum/hooks/useLatestForumPosts'
import { MemberInfo } from '@/memberships/components'

interface PostCardProps {
  post: ForumPostWithThread
  className?: string
}

export const PostCard = ({ post, className }: PostCardProps) => {
  return (
    <Box to={generatePath(ForumRoutes.thread, { id: post.thread.id }) + `?post=${post.id}`} className={className}>
      <div>
        <MemberInfo size="s" hideGroup onlyTop member={post.author} />
        <div>
          <TextExtraSmall inter lighter>
            {relativeIfRecent(post.updatedAt ?? post.createdAt)}
          </TextExtraSmall>
          <BadgeStatus size="m">{post.thread.categoryTitle.toUpperCase()}</BadgeStatus>
        </div>
      </div>
      <TextBig bold value>
        {post.thread.title}
      </TextBig>
      <TextMedium light truncateLines={3}>
        {post.text}
      </TextMedium>
      <ColumnGapBlock justify="space-between" align="center" />
    </Box>
  )
}

const Box = styled(GhostRouterLink)`
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
