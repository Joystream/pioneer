import React, { useState } from 'react'
import { Event, EventData } from 'xstate/lib/types'

import { ButtonPrimary } from '@/common/components/buttons'
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
import { WorkingGroupOpening } from '@/working-groups/types'

import { Step } from '../../../common/model/machines/getSteps'
import { OpeningFormPreview } from '../../components/OpeningFormPreview'

import { ApplyForRoleEvent } from './machine'
import { StakeStep, StakeStepForm } from './StakeStep'

interface Props {
  opening: WorkingGroupOpening
  send: (event: Event<ApplyForRoleEvent>, payload?: EventData | undefined) => void
  steps: Step[]
}

export const ApplyForRoleStakeStep = ({ opening, send, steps }: Props) => {
  const { hideModal } = useModal()
  const [isValid, setValid] = useState(false)
  const [stake, setStake] = useState<StakeStepForm | null>(null)

  const onStakeStepChange = (isValid: boolean, fields: StakeStepForm) => {
    setValid(isValid)
    setStake(fields)
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
            <StakeStep opening={opening} onChange={onStakeStepChange} />
          </StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isValid} onClick={() => send('VALID', { stake })} size="medium">
          Next step
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
