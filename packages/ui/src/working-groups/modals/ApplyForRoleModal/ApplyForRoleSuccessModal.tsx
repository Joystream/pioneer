import React from 'react'
import { Link } from 'react-router-dom'

import { ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { Stepper } from '@/common/components/Stepper'
import {
  StepDescriptionColumn,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'
import { useModal } from '@/common/hooks/useModal'

import { OpeningFormPreview } from '../../components/OpeningFormPreview'

import { ApplyForRoleModalCall } from '.'
import { steps } from './model'

export const ApplyForRoleSuccessModal = () => {
  const { hideModal, modalData } = useModal<ApplyForRoleModalCall>()

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Applying for role" />
      <StepperModalBody>
        <StepperModalWrapper>
          <Stepper steps={steps} active={2} />
          <StepDescriptionColumn>
            <OpeningFormPreview opening={modalData.opening} />
          </StepDescriptionColumn>
          <StepperBody>...</StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <Link to={'/working-groups/my-applications'}>
          <ButtonGhost size="medium">
            Go to my applications
            <Arrow direction="right" />
          </ButtonGhost>
        </Link>
      </ModalFooter>
    </Modal>
  )
}
