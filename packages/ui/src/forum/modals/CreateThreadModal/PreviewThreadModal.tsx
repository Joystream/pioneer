import React, { useMemo } from 'react'

import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import {
  ModalFooter,
  ModalHeader,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '@/common/components/Modal'
import { PostListItem } from '@/forum/components/PostList/PostListItem'
import { ForumPost } from '@/forum/types'
import { Member } from '@/memberships/types'

export interface PreviewThreadProps {
  onClose: () => void
  author: Member
  text: string
}

export const PreviewThreadModal = ({ onClose, author, text }: PreviewThreadProps) => {
  const post: ForumPost = useMemo(
    () => ({
      id: '',
      createdAt: new Date(Date.now()).toString(),
      author,
      text,
      status: 'PostStatusActive',
    }),
    []
  )

  return (
    <ScrolledModal onClose={onClose} modalSize="l" modalHeight="l">
      <ModalHeader onClick={onClose} title="Thread preview" />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <PostListItem post={post} type="forum" isPreview />
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          <ButtonGhost size="medium" onClick={onClose}>
            <Arrow direction="left" />
            Return
          </ButtonGhost>
        </ButtonsGroup>
      </ModalFooter>
    </ScrolledModal>
  )
}
