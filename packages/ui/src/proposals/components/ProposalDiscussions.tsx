import { ApolloQueryResult } from '@apollo/client'
import { ForumPostMetadata } from '@joystream/metadata-protobuf'
import { createType } from '@joystream/types'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { generatePath } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Badge, TextBig } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { AnyKeys } from '@/common/types'
import { getUrl } from '@/common/utils/getUrl'
import { ForumPostStyles, PostListItem } from '@/forum/components/PostList/PostListItem'
import { NewThreadPost } from '@/forum/components/Thread/NewThreadPost'
import { ForumPost } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { ProposalDiscussionThread } from '@/proposals/types'

interface Props {
  thread: ProposalDiscussionThread
  proposalId: string
  refetch?: () => Promise<ApolloQueryResult<unknown>>
}

export const ProposalDiscussions = ({ thread, proposalId, refetch }: Props) => {
  const query = useRouteQuery()
  const { api } = useApi()
  const { active, members } = useMyMemberships()

  const initialPost = query.get('post')
  const isAbleToPost =
    thread.mode === 'open' ||
    (thread.mode === 'closed' && active && (thread.whitelistIds?.includes(active.id) || active.isCouncilMember))
  const isInWhitelist = thread.mode === 'closed' && members.find((member) => thread.whitelistIds?.includes(member.id))
  const hasCouncilMembership = thread.mode === 'closed' && members.find((member) => member.isCouncilMember)
  const [replyTo, setReplyTo] = useState<ForumPost | undefined>()

  const newPostRef = useRef<HTMLDivElement>(null)
  const postsRefs: AnyKeys = {}
  const getInsertRef = (postId: string) => (ref: RefObject<HTMLDivElement>) => (postsRefs[postId] = ref)

  useEffect(() => {
    replyTo && newPostRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'end' })
  }, [replyTo])

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
        metadataToBytes(ForumPostMetadata, { text: postText, repliesTo: replyTo ? Number(replyTo.id) : undefined }),
        isEditable
      )
    }
  }

  const getPostForm = () => {
    if (isAbleToPost) {
      return (
        <NewThreadPost
          ref={newPostRef}
          replyTo={replyTo}
          getTransaction={getTransaction}
          removeReply={() => setReplyTo(undefined)}
          replyToLink={`${generatePath(ProposalsRoutes.preview, { id: proposalId })}?post=${replyTo?.id}`}
          refetch={refetch}
        />
      )
    }

    if (hasCouncilMembership) {
      return <TextBig>Please select your council membership to post in this thread.</TextBig>
    }

    if (isInWhitelist) {
      return <TextBig>Please select a whitelisted membership to post in this thread.</TextBig>
    }

    return (
      <TextBig>
        The discussion of this proposal is closed; only members whitelisted by the proposer can comment on it.
      </TextBig>
    )
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
            replyToPost={() => setReplyTo(post)}
            type="proposal"
            isDiscussion
            link={getUrl({ route: ProposalsRoutes.preview, params: { id: proposalId }, query: { post: post.id } })}
            repliesToLink={`${generatePath(ProposalsRoutes.preview, { id: proposalId })}?post=${post.repliesTo?.id}`}
          />
        )
      })}
      <PostMessageForm>{getPostForm()}</PostMessageForm>
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
      width: 100%;
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
