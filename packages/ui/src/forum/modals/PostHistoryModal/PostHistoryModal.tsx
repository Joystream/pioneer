import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { Modal, ModalHeader } from '@/common/components/Modal'
import { Stepper, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'
import { useModal } from '@/common/hooks/useModal'
import { formatDateString } from '@/common/model/formatters'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { useForumPostEdits } from '@/forum/hooks/useForumPostEdits'

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
          steps={edits.map((edit, index) => ({ title: formatDateString(edit.newText), type: getStepType(index) }))}
        />
      </>
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="All edited versions" />
      <StepperModalBody>
        <StepperModalWrapper>{displayEdits()}</StepperModalWrapper>
      </StepperModalBody>
    </Modal>
  )
})
