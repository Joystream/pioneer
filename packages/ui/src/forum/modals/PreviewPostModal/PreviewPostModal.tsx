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
import { capitalizeFirstLetter } from '@/common/helpers'
import { PostListItem } from '@/forum/components/PostList/PostListItem'
import { ForumPost } from '@/forum/types'
import { Member } from '@/memberships/types'

export interface PreviewPostModalProps {
  onClose: () => void
  author: Member
  text: string
  replyTo?: ForumPost
  type?: 'thread' | 'post'
}

export const PreviewPostModal = ({ onClose, author, replyTo, text, type = 'thread' }: PreviewPostModalProps) => {
  const post: ForumPost = useMemo(
    () => ({
      id: '',
      createdAt: new Date(Date.now()).toString(),
      author,
      text,
      repliesTo: replyTo,
      status: 'PostStatusActive',
    }),
    []
  )

  return (
    <ScrolledModal onClose={onClose} modalSize="l" modalHeight="l">
      <ModalHeader onClick={onClose} title={`${capitalizeFirstLetter(type)} Preview`} />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <PostListItem post={post} replyToPost={() => true} type="forum" isPreview />
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
