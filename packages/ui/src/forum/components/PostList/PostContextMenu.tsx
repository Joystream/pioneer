import React from 'react'

import { ContextMenu } from '@/common/components/ContextMenu'
import { useModal } from '@/common/hooks/useModal'
import { PostListItemType } from '@/forum/components/PostList/PostListItem'
import { DeletePostModalCall } from '@/forum/modals/PostActionModal/DeletePostModal'
import { ForumPost } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface Props {
  post: ForumPost
  onEdit: () => void
  type: PostListItemType
}

export const PostContextMenu = ({ post, onEdit, type }: Props) => {
  const { showModal } = useModal()
  const { active } = useMyMemberships()
  const isOwn = active?.id === post.author.id
  return isOwn ? (
    <ContextMenu
      size="small"
      items={[
        { text: 'Edit post', onClick: onEdit },
        {
          text: 'Delete post',
          onClick: () => showModal<DeletePostModalCall>({ modal: 'DeletePost', data: { post, type } }),
        },
      ]}
    />
  ) : null
}
