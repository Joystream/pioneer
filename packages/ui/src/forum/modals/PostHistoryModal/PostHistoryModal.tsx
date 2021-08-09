import React, { useState } from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Modal, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Stepper, StepperBody, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'
import { useModal } from '@/common/hooks/useModal'
import { formatDateString } from '@/common/model/formatters'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { useForumPostEdits } from '@/forum/hooks/useForumPostEdits'
import { PostEdit } from '@/forum/types'

type PostHistoryModalCall = ModalWithDataCall<'PostHistoryModal', { postId: string }>

export const PostHistoryModal = React.memo(() => {
  const {
    hideModal,
    modalData: { postId },
  } = useModal<PostHistoryModalCall>()
  const { isLoading, edits } = useForumPostEdits(postId)
  const [activeEdit, setActiveEdit] = useState(0)

  const getStepType = (index: number) => {
    if (index === activeEdit) {
      return 'active'
    }

    return index > activeEdit ? 'next' : 'past'
  }

  const displayEdits = () => {
    if (isLoading) {
      return <Loading text="Loading versions..." />
    }

    return (
      <>
        <Stepper
          steps={
            edits?.map((edit, index) => ({ title: formatDateString(edit.createdAt), type: getStepType(index) })) ?? []
          }
        />
        <StepperBody>
          <RowGapBlock gap={24}>
            {edits?.map((edit) => (
              <HistoryPost edit={edit} />
            ))}
          </RowGapBlock>
        </StepperBody>
      </>
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="All edited versions" />
      <StepperModalBody>
        <HistoryModalWrapper>{displayEdits()}</HistoryModalWrapper>
      </StepperModalBody>
    </Modal>
  )
})

interface HistoryPostProps {
  edit: PostEdit
}

const HistoryPost = ({ edit }: HistoryPostProps) => {
  return <MarkdownPreview markdown={edit.newText} />
}

const HistoryModalWrapper = styled(StepperModalWrapper)`
  grid-template-columns: 300px 1fr;
`
