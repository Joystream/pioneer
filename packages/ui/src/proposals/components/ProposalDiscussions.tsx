import React, { RefObject, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent } from '@/common/components/forms'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Badge } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'
import { AnyKeys } from '@/common/types'
import { ForumPostStyles, PostListItem } from '@/forum/components/PostList/PostListItem'
import { ProposalDiscussionThread } from '@/proposals/types'

interface Props {
  thread: ProposalDiscussionThread
  selected?: string
}

export const ProposalDiscussions = ({ thread }: Props) => {
  const query = useRouteQuery()
  const initialPost = query.get('post')

  const postsRefs: AnyKeys = {}
  const getInsertRef = (postId: string) => (ref: RefObject<HTMLDivElement>) => (postsRefs[postId] = ref)

  useEffect(() => {
    if (initialPost && postsRefs[initialPost]) {
      postsRefs[initialPost].current?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    }
  }, [postsRefs, initialPost])

  return (
    <ProposalDiscussionsStyles mode={thread.mode}>
      <DiscussionsHeader>
        <h4>Discussion</h4>
        <Badge>
          {`${thread.mode} `}
          <Tooltip tooltipText="Dolore magna anim eu nisi qui.">
            <TooltipDefault />
          </Tooltip>
        </Badge>
      </DiscussionsHeader>
      {thread.discussionPosts.map((post, index) => {
        return (
          <PostListItem
            key={index}
            insertRef={getInsertRef(post.id)}
            isSelected={post.id === initialPost}
            isThreadActive={true}
            post={post}
          />
        )
      })}
      <PostMessageForm>
        <InputComponent inputSize="auto">
          <CKEditor />
        </InputComponent>
      </PostMessageForm>
    </ProposalDiscussionsStyles>
  )
}

const DiscussionsHeader = styled.header`
  display: inline-flex;
  align-items: center;
  padding-bottom: 8px;

  ${Badge} {
    display: inline-flex;
    column-gap: 4px;
    height: fit-content;
    margin-left: 8px;
    padding: 4px 8px;
    text-transform: uppercase;
  }
`

export const PostMessageForm = styled.div`
  margin-top: 20px;
`

const ProposalDiscussionsStyles = styled.div<Pick<ProposalDiscussionThread, 'mode'>>`
  margin-top: 8px;

  ${ForumPostStyles} {
    margin-top: 24px;
    border-bottom: 1px solid ${Colors.Black[200]};
    padding-bottom: 8px;

    & > :nth-child(3n - 1) {
      justify-self: end;
    }
  }

  ${DiscussionsHeader} ${Badge} {
    ${({ mode }) =>
      mode === 'open'
        ? css`
            background-color: ${Colors.Green[50]};
            color: ${Colors.Green[500]};
          `
        : css`
            background-color: ${Colors.Black[75]};
            color: ${Colors.Black[500]};
          `}
  }
`
