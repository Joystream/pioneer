import React from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { ForumRoutes } from '@/forum/constant'

interface Props {
  newThreadId: string
}

export const CreateThreadSuccessModal = ({ newThreadId }: Props) => {
  const { hideModal } = useModal()
  const history = useHistory()
  const goToThread = () => {
    history.push(generatePath(ForumRoutes.thread, { id: newThreadId }))
    hideModal()
  }

  return (
    <Modal onClose={hideModal} modalSize="m">
      <ModalHeader onClick={hideModal} title="Success!" />
      <ModalBody>
        <TextMedium>You have successfully created a thread.</TextMedium>
      </ModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          <ButtonGhost size="medium" onClick={goToThread}>
            See my Thread
          </ButtonGhost>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}
