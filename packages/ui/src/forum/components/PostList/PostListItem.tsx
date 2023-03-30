import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { BlockTime, BlockTimeWrapper } from '@/common/components/BlockTime'
import {
  ButtonGhost,
  ButtonInnerWrapper,
  ButtonLink,
  ButtonsGroup,
  CopyButtonTemplate,
} from '@/common/components/buttons'
import { ArrowReplyIcon, LinkIcon, ReplyIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Badge } from '@/common/components/typography'
import { BorderRad, Colors, Fonts, Shadows } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { relativeIfRecent } from '@/common/model/relativeIfRecent'
import { PostHistoryModalCall } from '@/forum/modals/PostHistoryModal'
import { PostReplyModalCall } from '@/forum/modals/PostReplyModal'
import { ForumPost } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

import { ModeratedPostWrapper } from './ModeratedPost'
import { PostContextMenu } from './PostContextMenu'
import { PostEditor } from './PostEditor'

export type PostListItemType = 'forum' | 'proposal'

interface PostListItemProps {
  isFirstItem: boolean
  post: ForumPost
  isSelected?: boolean
  isPreview?: boolean
  isThreadActive?: boolean
  insertRef?: (ref: RefObject<HTMLDivElement>) => void
  type: PostListItemType
  link?: string
  isDiscussion?: boolean
  repliesToLink: string
}

export const PostListItem = ({
  isFirstItem,
  post,
  isSelected,
  isPreview,
  isThreadActive,
  insertRef,
  type,
  link,
  isDiscussion,
  repliesToLink,
}: PostListItemProps) => {
  const { active } = useMyMemberships()
  const { createdAtBlock, lastEditedAt, author, text, repliesTo } = post
  const [postLastEditedAt, setPostLastEditedAt] = useState<string | undefined>(lastEditedAt)
  const { showModal } = useModal()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    !!ref.current && insertRef && insertRef(ref)
  }, [ref.current])

  useEffect(() => {
    if (ref.current && isSelected) {
      ref.current.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    }
  }, [isSelected])

  const [editing, setEditing] = useState(false)
  const editionTime = useMemo(() => {
    if (!postLastEditedAt) {
      return null
    }

    return (
      <EditionTime
        onClick={() =>
          showModal<PostHistoryModalCall>({ modal: 'PostHistory', data: { postId: post.id, author: author } })
        }
      >
        (edited {relativeIfRecent(postLastEditedAt)})
      </EditionTime>
    )
  }, [postLastEditedAt])

  const onSuccessfulEdit = useCallback(() => {
    setEditing(false)
    setPostLastEditedAt(new Date().toISOString())
  }, [])

  const onReply = (): void => {
    if (!active) showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
    showModal<PostReplyModalCall>({
      modal: 'PostReplyModal',
      data: {
        replyTo: post,
        module: type === 'forum' ? type : 'proposalsDiscussion',
      },
    })
  }

  return (
    <ForumPostBlock ref={ref} isSelected={isSelected} isDiscussion={isDiscussion}>
      <ForumPostStyles>
        <ForumPostRow>
          <ForumPostAuthor>{author && <MemberInfo member={author} />}</ForumPostAuthor>
          {createdAtBlock && <BlockTime block={createdAtBlock} layout="reverse" position="end" />}
        </ForumPostRow>
        <MessageBody>
          <ModeratedPostWrapper post={post}>
            {repliesTo && (
              <Reply>
                <ReplyBadge>
                  <div>
                    <ArrowReplyIcon />{' '}
                    <Badge>
                      <Link to={repliesToLink}>Replies to {repliesTo?.author?.handle}</Link>
                    </Badge>
                  </div>
                </ReplyBadge>
                <MarkdownPreview markdown={repliesTo.text} size="s" isReply />
              </Reply>
            )}
            {editing ? (
              <PostEditor
                post={post}
                onCancel={() => setEditing(false)}
                type={type}
                onSuccessfulEdit={onSuccessfulEdit}
              />
            ) : (
              <MarkdownPreview markdown={text} append={editionTime} size="m" />
            )}
          </ModeratedPostWrapper>
        </MessageBody>
        <ForumPostRow>
          {!editing && (
            <ButtonsGroup>
              <CopyButtonTemplate
                textToCopy={link}
                square
                size="small"
                disabled={isPreview}
                icon={<LinkIcon />}
                title="Copy link"
              />
              {isThreadActive && (
                <>
                  <ButtonGhost square disabled={isPreview} size="small" title="Reply" onClick={onReply}>
                    <ReplyIcon />
                  </ButtonGhost>
                  <PostContextMenu
                    isFirstItem={isFirstItem}
                    post={{ ...post, text }}
                    onEdit={() => setEditing(true)}
                    type={type}
                  />
                </>
              )}
            </ButtonsGroup>
          )}
        </ForumPostRow>
      </ForumPostStyles>
    </ForumPostBlock>
  )
}

const MessageBody = styled.div`
  grid-column: span 2;
  margin-top: 8px;
`

export const Reply = styled.blockquote`
  background-color: ${Colors.Black[75]};
  font-style: italic;
  margin: 0 0 12px;
  padding: 8px;

  & .markdown-preview p,
  & p {
    font-size: 12px;
  }
`

export const ReplyBadge = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  margin-bottom: 10px;
  justify-content: space-between;

  svg {
    height: 11px;
  }

  ${Badge} {
    background-color: ${Colors.Blue[100]};
    margin: 1px 0 0 3px;
    padding: 0 8px;
  }

  a {
    color: ${Colors.Blue[500]};
    text-transform: uppercase;
  }
`

const EditionTime = styled(ButtonLink).attrs({ size: 'small', borderless: true })`
  display: inline-flex;
  padding-right: 1px;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  font-style: italic;
  font-family: ${Fonts.Inter};
  color: ${Colors.Black[400]};

  ${ButtonInnerWrapper} {
    transform: translateY(0);
  }
`

export const ForumPostStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;
`

export const ForumPostBlock = styled.div<Pick<PostListItemProps, 'isSelected' | 'isDiscussion'>>`
  ${({ isDiscussion }) =>
    !isDiscussion &&
    css`
      border-radius: ${BorderRad.m};
      background-color: ${Colors.White};
      box-shadow: ${Shadows.light};
      padding: 24px;
    `};
  scroll-margin: 48px;
  // Animate selection:
  &,
  ${Reply} {
    animation: ${({ isSelected }) => (isSelected ? 'flashSelection' : 'none')} 1.5s ease-in-out;
  }

  @keyframes flashSelection {
    25%,
    75% {
      background-color: ${Colors.Blue[100]};
    }
  }
`

export const ForumPostAuthor = styled.div``

export const ForumPostRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  ${ForumPostAuthor}, ${ButtonsGroup}, ${BlockTimeWrapper} {
    flex: 50%;
  }

  ${ForumPostAuthor}, ${ButtonsGroup}:first-of-type {
    justify-content: flex-start;
  }

  ${BlockTimeWrapper}, ${ButtonsGroup}:last-of-type {
    justify-content: flex-end;
  }
`
