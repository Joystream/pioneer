import React, { useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ContextMenu } from '@/common/components/ContextMenu'
import { useModal } from '@/common/hooks/useModal'
import { createType } from '@/common/model/createType'
import { PostListItemType } from '@/forum/components/PostList/PostListItem'
import { useForumPostParents } from '@/forum/hooks/useForumPostParents'
import { DeletePostModalCall } from '@/forum/modals/PostActionModal/DeletePostModal'
import { postsToDeleteMap } from '@/forum/model/postsToDeleteMap'
import { ForumPost } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useProposalPostParents } from '@/proposals/hooks/useProposalPostParents'

interface Props {
  isFirstItem: boolean
  post: ForumPost
  onEdit: () => void
  type: PostListItemType
}

export const PostContextMenu = ({ isFirstItem, post, onEdit, type }: Props) => {
  const { api, connectionState } = useApi()
  const { showModal } = useModal()
  const { active } = useMyMemberships()

  const isOwn = active?.id === post.author.id

  const forumPostData = useForumPostParents(isOwn && type === 'forum' ? post.id : '')
  const proposalPostData = useProposalPostParents(isOwn && type === 'proposal' ? post.id : '')

  const deletePostTransaction = useMemo(() => {
    if (api && connectionState === 'connected') {
      if (type === 'forum' && forumPostData.categoryId && forumPostData.threadId) {
        const postId = createType('PostId', Number(post.id))
        const deleteMap = postsToDeleteMap(postId, forumPostData.threadId, forumPostData.categoryId)
        return api.tx.forum.deletePosts(createType('ForumUserId', Number.parseInt(post.author.id)), deleteMap, '')
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

  const getContextMenuItems = () => {
    const editPostAction = { text: 'Edit post', onClick: onEdit }
    const deletePostAction = {
      text: 'Delete post',
      onClick: () =>
        showModal<DeletePostModalCall>({ modal: 'DeletePost', data: { post, transaction: deletePostTransaction } }),
    }
    if (isFirstItem) {
      return [editPostAction]
    }
    return [editPostAction, deletePostAction]
  }

  const isActive = post.status === 'PostStatusActive'
  return isOwn && isActive ? <ContextMenu title="Post actions" size="small" items={getContextMenuItems()} /> : null
}
