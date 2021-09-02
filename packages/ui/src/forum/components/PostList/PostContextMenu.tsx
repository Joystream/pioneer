import { createType } from '@joystream/types'
import React, { useMemo } from 'react'

import { ContextMenu } from '@/common/components/ContextMenu'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { PostListItemType } from '@/forum/components/PostList/PostListItem'
import { useForumPostParents } from '@/forum/hooks/useForumPostParents'
import { DeletePostModalCall } from '@/forum/modals/PostActionModal/DeletePostModal'
import { ForumPost } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useProposalPostParents } from '@/proposals/hooks/useProposalPostParents'

interface Props {
  post: ForumPost
  onEdit: () => void
  type: PostListItemType
}

export const PostContextMenu = ({ post, onEdit, type }: Props) => {
  const { api, connectionState } = useApi()
  const { showModal } = useModal()
  const { active } = useMyMemberships()

  const isOwn = active?.id === post.author.id

  const forumPostData = useForumPostParents(isOwn && type === 'forum' ? post.id : '')
  const proposalPostData = useProposalPostParents(isOwn && type === 'proposal' ? post.id : '')

  const deletePostTransaction = useMemo(() => {
    if (api && connectionState === 'connected') {
      if (type === 'forum' && forumPostData.categoryId && forumPostData.threadId) {
        return api.tx.forum.deletePosts(
          createType('ForumUserId', Number.parseInt(post.author.id)),
          [[forumPostData.categoryId, forumPostData.threadId, post.id, true]],
          ''
        )
      }
      if (type === 'proposal' && proposalPostData.threadId) {
        return api.tx.proposalsDiscussion.deletePost(
          createType('MemberId', Number.parseInt(post.author.id)),
          post.id,
          proposalPostData.threadId,
          true
        )
      }
    }
  }, [api, connectionState, JSON.stringify(forumPostData), JSON.stringify(proposalPostData), type])

  return isOwn ? (
    <ContextMenu
      size="small"
      items={[
        { text: 'Edit post', onClick: onEdit },
        {
          text: 'Delete post',
          onClick: () =>
            showModal<DeletePostModalCall>({ modal: 'DeletePost', data: { post, transaction: deletePostTransaction } }),
        },
      ]}
    />
  ) : null
}
