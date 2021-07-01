import React, { useState } from 'react'
import { Event, EventData } from 'xstate/lib/types'

import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import {
  Stepper,
  StepDescriptionColumn,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'
import { useModal } from '@/common/hooks/useModal'
import { Step } from '@/common/model/machines/getSteps'
import { WorkingGroupOpening } from '@/working-groups/types'

import { OpeningFormPreview } from '../../components/OpeningFormPreview'
import { useOpeningQuestions } from '../../hooks/useOpeningQuestions'

import { ApplicationStep } from './ApplicationStep'
import { ApplyForRoleEvent } from './machine'

interface Props {
  opening: WorkingGroupOpening
  send: (event: Event<ApplyForRoleEvent>, payload?: EventData | undefined) => void
  steps: Step[]
}

export const ApplyForRoleApplicationStep = ({ opening, send, steps }: Props) => {
  const { hideModal } = useModal()
  const { questions } = useOpeningQuestions({ id: opening.id })
  const [isValid, setValid] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const onApplicationStepChange = (isValid: boolean, answers: Record<number, string>) => {
    setValid(isValid)
    setAnswers(answers)
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Applying for role" />
      <StepperModalBody>
        <StepperModalWrapper>
          <Stepper steps={steps} />
          <StepDescriptionColumn>
            <OpeningFormPreview opening={opening} />
          </StepDescriptionColumn>
          <StepperBody>
            <ApplicationStep questions={questions} onChange={onApplicationStepChange} />
          </StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isValid} onClick={() => send('VALID', { answers })} size="medium">
          Next step
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
