import React from 'react'

import { ButtonPrimary } from '../../../common/components/buttons'
import { Modal, ModalFooter, ModalHeader } from '../../../common/components/Modal'
import { Stepper } from '../../../common/components/Stepper'
import {
  StepDescriptionColumn,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '../../../common/components/StepperModal'
import { useModal } from '../../../common/hooks/useModal'
import { OpeningFormPreview } from '../../components/OpeningFormPreview'

import { ApplyForRoleModalCall } from '.'

const steps = [{ title: 'Stake' }, { title: 'Form' }, { title: 'Submit application' }]

export const ApplyForRoleModal = () => {
  const {
    hideModal,
    modalData: { opening },
  } = useModal<ApplyForRoleModalCall>()

  return (
    <Modal onClose={hideModal} modalSize="l">
      <ModalHeader onClick={hideModal} title="Apply for role" />
      <StepperModalBody>
        <StepperModalWrapper>
          <Stepper steps={steps} active={0} />
          <StepDescriptionColumn>
            <OpeningFormPreview opening={opening} />
          </StepDescriptionColumn>
          <StepperBody>Form</StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonPrimary>Next step</ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
