import React from 'react'
import styled from 'styled-components'

import { ReplyWithBackgorundIcon } from '@/common/components/icons'
import { Colors, Fonts } from '@/common/constants'
import { relativeTime } from '@/common/model/relativeTime'
import { useThreadOriginalPost } from '@/forum/hooks/useThreadOriginalPost'
import { ForumThread } from '@/forum/types'
import { Avatar } from '@/memberships/components'

interface ThreadListItemCardProps {
  thread: ForumThread
}

export const ThreadListItemCard = React.memo(({ thread }: ThreadListItemCardProps) => {
  const { originalPost } = useThreadOriginalPost(thread.id)
  return (
    <ThreadItemCardContainer>
      <ThreadItemCardHeader>
        <ThreadItemCardAvatar>
          <Avatar avatarUri={originalPost?.author.avatar} />
        </ThreadItemCardAvatar>

        <ThreadItemCardInfo>
          <ThreadItemCardTime>{relativeTime(thread.createdInBlock.timestamp)}</ThreadItemCardTime>
          {originalPost?.thread && <ThreadItemCardTag>{originalPost?.thread?.category.title}</ThreadItemCardTag>}
        </ThreadItemCardInfo>
      </ThreadItemCardHeader>
      <ThreadItemCardTitle>{thread.title}</ThreadItemCardTitle>
      <ThreadItemCardDescription>
        {originalPost?.text && originalPost?.text?.length > 144
          ? `${originalPost?.text.slice(0, 141)}...`
          : originalPost?.text}
      </ThreadItemCardDescription>
      <ThreadItemCardActivity>
        <ReplyWithBackgorundIcon /> <Counter>{thread.visiblePostsCount - 1}</Counter>
      </ThreadItemCardActivity>
    </ThreadItemCardContainer>
  )
})

const ThreadItemCardContainer = styled.div`
  border: 1px solid #e8edf6;
  border-radius: 2px;
  padding: 25px;
  grid-template-areas:
    'header'
    'title'
    'description'
    'activity';
  display: grid;
  grid-row-gap: 6px;
  cursor: pointer;
  &:hover {
    border-color: #d3daff;
  }
`

const ThreadItemCardHeader = styled.div`
  display: grid;
  grid-area: header;
  grid-template-areas: 'avatar info';
  margin-bottom: 10px;
`

const ThreadItemCardInfo = styled.div`
  grid-area: info;
  display: flex;
  align-items: center;
  justify-self: end;
`

const ThreadItemCardTime = styled.span`
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: ${Colors.Black[400]};
  font-family: ${Fonts.Inter};
`
const ThreadItemCardTag = styled.div`
  background: ${Colors.Blue[200]};
  border-radius: 24px;
  font-weight: 700;
  font-size: 10px;
  line-height: 16px;
  font-family: ${Fonts.Grotesk};
  padding-left: 8px;
  padding-right: 8px;
  margin-left: 6px;
  color: ${Colors.White};
  text-transform: uppercase;
`
const ThreadItemCardTitle = styled.h4`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  font-family: ${Fonts.Grotesk};
  color: ${Colors.Blue[500]};
  grid-area: title;
`
const ThreadItemCardDescription = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-family: ${Fonts.Inter};
  color: ${Colors.Black[500]};
  grid-area: description;
  height: 40px;
  overflow: hidden;
`

const ThreadItemCardAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  grid-area: avatar;
`

const ThreadItemCardActivity = styled.div`
  grid-area: activity;
  display: flex;
  align-items: center;
  margin-top: 11px;
  & > svg {
    overflow: visible;
    width: 15px;
    height: 14px;
    margin-top: -3px;
  }
`
const Counter = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 16px;
  font-family: ${Fonts.Grotesk};
  color: ${Colors.Blue[500]};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 4px;
  background: ${Colors.Blue[50]};
  border-radius: 20px;
  margin-left: 8px;
`
