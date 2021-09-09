import React, { useState } from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { PreviewPostModal } from '@/forum/modals/PreviewPostModal/PreviewPostModal'
import { Member } from '@/memberships/types'

interface Props {
  author: Member
  postText: string
}
export const PreviewPostButton = ({ author, postText }: Props) => {
  const [previewVisible, setPreviewVisible] = useState(false)

  return (
    <>
      <ButtonGhost size="medium" onClick={() => setPreviewVisible(true)}>
        Display preview
      </ButtonGhost>
      {previewVisible && (
        <PreviewPostModal author={author} text={postText} onClose={() => setPreviewVisible(false)} type="post" />
      )}
    </>
  )
}
