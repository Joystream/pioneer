import { useMachine } from '@xstate/react'
import React from 'react'

import { FundingDetailsStep } from '@/bounty/modals/AddBountyModal/components/FundingDetailsStep'
import { GeneralParametersStep } from '@/bounty/modals/AddBountyModal/components/GeneralParametersStep'
import { addBountyMachine, AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { Modal, ModalHeader } from '@/common/components/Modal'
import { Stepper, StepperBody, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'
import { useModal } from '@/common/hooks/useModal'
import { getSteps } from '@/common/model/machines/getSteps'

export const AddBountyModal = () => {
  const { hideModal } = useModal()
  const [state, send, service] = useMachine(addBountyMachine)

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader title="Creating New Bounty" onClick={hideModal} />
      <StepperModalBody>
        <StepperModalWrapper>
          <Stepper steps={getSteps(service)} />
          <StepperBody>
            {state.matches(AddBountyStates.generalParameters) && <GeneralParametersStep />}

            {state.matches(AddBountyStates.fundingPeriodDetails) && <FundingDetailsStep />}
          </StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
    </Modal>
  )
}
