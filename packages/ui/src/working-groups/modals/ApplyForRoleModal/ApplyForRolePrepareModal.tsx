import React, { useCallback, useState } from 'react'

import { ButtonPrimary } from '../../../common/components/buttons'
import { Arrow } from '../../../common/components/icons'
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
import { useOpeningQuestions } from '../../hooks/useOpeningQuestions'

import { ApplyForRoleModalCall } from '.'
import { ApplicationStep } from './ApplicationStep'
import { StakeStep } from './StakeStep'

const steps = [{ title: 'Stake' }, { title: 'Form' }, { title: 'Submit application' }]

interface Props {
  onSubmit: () => void
}

export const ApplyForRolePrepareModal = ({ onSubmit }: Props) => {
  const {
    hideModal,
    modalData: { opening },
  } = useModal<ApplyForRoleModalCall>()
  const [step, setStep] = useState(0)
  const { questions } = useOpeningQuestions({ id: opening.id })
  const [isValid, setIsValid] = useState(false)

  const nextStep = useCallback(() => {
    if (step >= 1) {
      onSubmit()
    } else {
      setStep((step) => step + 1)
    }
  }, [step])

  const onStakeStepChange = (isValid: boolean) => setIsValid(isValid)
  const onApplicationStepChange = (isValid: boolean, answers: string[]) => console.log(answers[1])

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Applying for role" />
      <StepperModalBody>
        <StepperModalWrapper>
          <Stepper steps={steps} active={step} />
          <StepDescriptionColumn>
            <OpeningFormPreview opening={opening} />
          </StepDescriptionColumn>
          <StepperBody>
            {step === 0 && <StakeStep onChange={onStakeStepChange} opening={opening} />}
            {step === 1 && <ApplicationStep questions={questions} onChange={onApplicationStepChange} />}
          </StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isValid} onClick={nextStep} size="medium">
          Next step
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
