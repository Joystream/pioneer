import React from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonsRow } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Colors } from '@/common/constants'
import { ForumPost } from '@/common/types'
import { spacing } from '@/common/utils/styles'
import { MemberInfo } from '@/memberships/components'

import { BlockDate } from './BlockDate'

interface PostProps {
  post: ForumPost
}

export const ForumComment = ({ post }: PostProps) => {
  return (
    <Container>
      <MemberInfo member={post.author} />
      <BlockDate block={post.createdAtBlock} />

      <MessageBody>
        <MarkdownPreview markdown={post.text} />
      </MessageBody>

      <ButtonsRow>
        {post.reaction && (
          <Button>
            <LinkIcon /> {!!post.reaction.length && post.reaction.length}
          </Button>
        )}
      </ButtonsRow>

      <ButtonsRow>
        <Button square>
          <LinkIcon />
        </Button>
        <Button square>
          <LinkIcon />
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

const Button = styled(ButtonGhost).attrs({ size: 'medium' })``

const MessageBody = styled.div`
  grid-column: span 2;
  margin-top: ${spacing(1)};
`
