import React from 'react'

import { ButtonPrimary } from '../../../common/components/buttons'
import { Modal, ModalFooter, ModalHeader } from '../../../common/components/Modal'
import { StepperModalBody } from '../../../common/components/StepperModal'
import { useModal } from '../../../common/hooks/useModal'

import { ApplyForRoleModalCall } from '.'

export const ApplyForRoleModal = () => {
  const { hideModal } = useModal<ApplyForRoleModalCall>()

  return (
    <Modal onClose={hideModal} modalSize="l">
      <ModalHeader onClick={hideModal} title="Apply for role" />
      <StepperModalBody>Apply!</StepperModalBody>
      <ModalFooter>
        <ButtonPrimary>Next step</ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
