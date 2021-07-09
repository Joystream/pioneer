import React, { useMemo } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonsRow } from '@/common/components/buttons'
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
  const { createdAtBlock, updatedAt, author, text, reaction } = post
  const edited = useMemo(() => updatedAt && <EditionTime>(edited {relativeTime(updatedAt)})</EditionTime>, [updatedAt])

  return (
    <Container>
      <MemberInfo member={author} />
      <BlockDate block={createdAtBlock} />

      <MessageBody>
        <MarkdownPreview markdown={text} append={edited} />
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
        <Button square>
          <LinkIcon />
        </Button>
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
`

const Button = styled(ButtonGhost).attrs({ size: 'small' })`
  svg {
    width: 14px;
  }
`

const MessageBody = styled.div`
  grid-column: span 2;
  margin-top: ${spacing(1)};
`

const EditionTime = styled(TextInlineSmall).attrs({ lighter: true, italic: true })``
