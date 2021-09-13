import { ForumPostMetadata } from '@joystream/metadata-protobuf'
import { createType } from '@joystream/types'
import React, { RefObject, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Badge } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useLocation } from '@/common/hooks/useLocation'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { AnyKeys } from '@/common/types'
import { ForumPostStyles, PostListItem } from '@/forum/components/PostList/PostListItem'
import { NewThreadPost } from '@/forum/components/Thread/NewThreadPost'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { ProposalDiscussionThread } from '@/proposals/types'

interface Props {
  thread: ProposalDiscussionThread
  proposalId: string
}

export const ProposalDiscussions = ({ thread, proposalId }: Props) => {
  const { origin } = useLocation()
  const query = useRouteQuery()
  const initialPost = query.get('post')
  const { api } = useApi()
  const { active } = useMyMemberships()

  const postsRefs: AnyKeys = {}
  const getInsertRef = (postId: string) => (ref: RefObject<HTMLDivElement>) => (postsRefs[postId] = ref)

  useEffect(() => {
    if (initialPost && postsRefs[initialPost]) {
      postsRefs[initialPost].current?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    }
  }, [postsRefs, initialPost])

  const getTransaction = (postText: string, isEditable: boolean) => {
    if (api && active && thread) {
      return api.tx.proposalsDiscussion.addPost(
        createType('MemberId', Number.parseInt(active.id)),
        thread.id,
        metadataToBytes(ForumPostMetadata, { text: postText }),
        isEditable
      )
    }
  }

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
            type="proposal"
            link={`${origin}${ProposalsRoutes.preview}/${proposalId}?post=${post.id}`}
          />
        )
      })}
      <PostMessageForm>
        <NewThreadPost getTransaction={getTransaction} />
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
