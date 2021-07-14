import React, { forwardRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonGhost, ButtonGhostStyles, ButtonsRow } from '@/common/components/buttons'
import { LinkButtonGhost, LinkButtonGhostStyles } from '@/common/components/buttons/LinkButtons'
import { ArrowReplyIcon, HeartIcon, LinkIcon, ReplyIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Badge, TextInlineSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { relativeTime } from '@/common/model/relativeTime'
import { ForumPost } from '@/common/types'
import { spacing } from '@/common/utils/styles'
import { MemberInfo } from '@/memberships/components'

import { BlockDate } from './BlockDate'

interface PostProps {
  post: ForumPost
  isSelected?: boolean
}

export const ForumComment = forwardRef<HTMLDivElement, PostProps>(({ post, isSelected }, ref) => {
  const { link, createdAtBlock, updatedAt, author, text, reaction, repliesTo } = post
  const edited = useMemo(() => updatedAt && <EditionTime>(edited {relativeTime(updatedAt)})</EditionTime>, [updatedAt])

  return (
    <ForumCommentStyles ref={ref} isSelected={isSelected}>
      <MemberInfo member={author} />
      <BlockDate block={createdAtBlock} />

      <MessageBody>
        {repliesTo && (
          <Reply>
            <ReplyBadge>
              <ArrowReplyIcon />{' '}
              <Badge>
                <Link to={repliesTo.link}>Reply to {repliesTo.author.handle}</Link>
              </Badge>
            </ReplyBadge>
            <MarkdownPreview markdown={repliesTo.text} size="s" isReply />
          </Reply>
        )}
        <MarkdownPreview markdown={text} append={edited} size="s" />
      </MessageBody>

      <ButtonsRow>
        {reaction && (
          <Button>
            <HeartIcon />
            {!!reaction.length && reaction.length}
          </Button>
        )}
      </ButtonsRow>

      <ButtonsRow>
        <LinkButton to={link} square>
          <LinkIcon />
        </LinkButton>
        <Button square>
          <ReplyIcon />
        </Button>
      </ButtonsRow>
    </ForumCommentStyles>
  )
})

const LinkButton = styled(LinkButtonGhost).attrs({ size: 'small' })``
const Button = styled(ButtonGhost).attrs({ size: 'small' })``

const MessageBody = styled.div`
  grid-column: span 2;
  margin-top: ${spacing(1)};
`

const Reply = styled.blockquote`
  background-color: ${Colors.Black[75]};
  font-style: italic;
  margin: 0 0 ${spacing(3 / 2)};
  padding: ${spacing(1)};
`

const ReplyBadge = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  margin-bottom: 10px;

  svg {
    height: 11px;
  }

  ${Badge} {
    background-color: ${Colors.Blue[100]};
    margin: 1px 0 0 3px;
    padding: 0 ${spacing(1)};
  }
  a {
    color: ${Colors.Blue[500]};
    text-transform: uppercase;
  }
`

const EditionTime = styled(TextInlineSmall).attrs({ lighter: true, italic: true })``

export const ForumCommentStyles = styled.div<Pick<PostProps, 'isSelected'>>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: ${spacing(2)};
  padding-bottom: ${spacing(1)};
  border-bottom: 1px solid ${Colors.Black[200]};

  & > :nth-child(3n - 1) {
    justify-self: end;
  }

  ${ButtonGhostStyles}, ${LinkButtonGhostStyles} {
    svg {
      width: 14px;
    }
  }

  // Animate selection:
  &,
  ${Reply} {
    animation: ${({ isSelected }) => (isSelected ? 'flashSelection' : 'none')} ${Transitions.duration} ease;
  }
  @keyframes flashSelection {
    50% {
      background-color: ${Colors.Orange[400]};
    }
  }
`
