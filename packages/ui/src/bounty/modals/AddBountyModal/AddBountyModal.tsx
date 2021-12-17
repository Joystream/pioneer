import { useMachine } from '@xstate/react'
import React, { useEffect, useState } from 'react'

import { FundingDetailsStep } from '@/bounty/modals/AddBountyModal/components/FundingDetailsStep'
import { GeneralParametersStep } from '@/bounty/modals/AddBountyModal/components/GeneralParametersStep'
import { addBountyMachine, AddBountyModalMachineState, AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { Stepper, StepperBody, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'
import { useModal } from '@/common/hooks/useModal'
import { getSteps } from '@/common/model/machines/getSteps'
import { Member } from '@/memberships/types'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { isLastStepActive } from '@/common/modals/utils'
import { isNextStepValid } from '@/bounty/modals/AddBountyModal/helpers'
import styled from 'styled-components'

export const AddBountyModal = () => {
  const { hideModal } = useModal()
  const [state, send, service] = useMachine(addBountyMachine)
  const [isValidNext, setValidNext] = useState(false)
  console.log(service, ' comp serv')
  console.log(service.state, ' xd comp state')
  useEffect(() => {
    setValidNext(isNextStepValid(state as AddBountyModalMachineState))
  }, [state])

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader title="Creating New Bounty" onClick={hideModal} />
      <StepperModalBody>
        <AddBountyModalWrapper>
          <Stepper steps={getSteps(service)} />
          <StepperBody>
            {state.matches(AddBountyStates.generalParameters) && (
              <GeneralParametersStep
                title={state.context.title}
                setTitle={(title: string) => send('SET_BOUNTY_TITLE', { title })}
                description={state.context.description}
                setDescription={(description: string) => send('SET_BOUNTY_DESCRIPTION', { description })}
                setCreator={(creator: Member) => send('SET_CREATOR', { creator })}
                coverPhotoLink={state.context.coverPhotoLink}
                setCoverPhoto={(photoLink: string) => send('SET_COVER_PHOTO', { photoLink })}
              />
            )}

            {state.matches(AddBountyStates.fundingPeriodDetails) && <FundingDetailsStep />}
            {state.matches(AddBountyStates.workingPeriodDetails) && <FundingDetailsStep />}
            {state.matches(AddBountyStates.judgingPeriodDetails) && <FundingDetailsStep />}
            {state.matches(AddBountyStates.forumThreadDetails) && <FundingDetailsStep />}
          </StepperBody>
        </AddBountyModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          <ButtonPrimary disabled={!isValidNext} onClick={() => send('NEXT')} size="medium">
            {isLastStepActive(getSteps(service)) ? 'Create bounty' : 'Next step'}
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}

const AddBountyModalWrapper = styled(StepperModalWrapper)`
  grid-template-columns: 184px 1fr;
`
