import React, { useMemo } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonGhostStyles, ButtonsRow } from '@/common/components/buttons'
import { LinkButtonGhost, LinkButtonGhostStyles } from '@/common/components/buttons/LinkButtons'
import { HeartIcon, LinkIcon, ReplyIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { TextInlineSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { relativeTime } from '@/common/model/relativeTime'
import { ForumPost } from '@/common/types'
import { spacing } from '@/common/utils/styles'
import { MemberInfo } from '@/memberships/components'

import { BlockDate } from './BlockDate'

interface PostProps {
  post: ForumPost
}

export const ForumComment = ({ post }: PostProps) => {
  const { id, link, createdAtBlock, updatedAt, author, text, reaction } = post
  const edited = useMemo(() => updatedAt && <EditionTime>(edited {relativeTime(updatedAt)})</EditionTime>, [updatedAt])

  return (
    <Container id={`post-${id}`}>
      <MemberInfo member={author} />
      <BlockDate block={createdAtBlock} />

      <MessageBody>
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
    </Container>
  )
}

const Container = styled.div`
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
`

const LinkButton = styled(LinkButtonGhost).attrs({ size: 'small' })``
const Button = styled(ButtonGhost).attrs({ size: 'small' })``

const MessageBody = styled.div`
  grid-column: span 2;
  margin-top: ${spacing(1)};
`

const EditionTime = styled(TextInlineSmall).attrs({ lighter: true, italic: true })``
