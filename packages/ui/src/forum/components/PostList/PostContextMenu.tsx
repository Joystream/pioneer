import React from 'react'

import { ContextMenu } from '@/common/components/ContextMenu'
import { useModal } from '@/common/hooks/useModal'
import { DeletePostModalCall } from '@/forum/modals/DeletePostModal'
import { ForumPost } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface Props {
  post: ForumPost
  onEdit: () => void
}

export const PostContextMenu = ({ post, onEdit }: Props) => {
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
          onClick: () => showModal<DeletePostModalCall>({ modal: 'DeletePost', data: { post } }),
        },
      ]}
    />
  ) : null
}
