import React, { useState } from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { PreviewPostModal } from '@/forum/modals/PreviewPostModal/PreviewPostModal'
import { ForumPost } from '@/forum/types'
import { Member } from '@/memberships/types'

interface Props {
  author: Member
  postText: string
  replyTo?: ForumPost
}

export const PreviewPostButton = ({ author, postText, replyTo }: Props) => {
  const [previewVisible, setPreviewVisible] = useState(false)

  return (
    <>
      <ButtonGhost size="medium" onClick={() => setPreviewVisible(true)}>
        Display preview
      </ButtonGhost>
      {previewVisible && (
        <PreviewPostModal
          author={author}
          text={postText}
          replyTo={replyTo}
          onClose={() => setPreviewVisible(false)}
          type="post"
        />
      )}
    </>
  )
}
