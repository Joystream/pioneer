import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { StepDescriptionColumn, Stepper, StepperBody, StepperModalBody } from '@/common/components/StepperModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { getSteps } from '@/common/model/machines/getSteps'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { AnnounceCandidateConstantsWrapper } from '@/council/modals/AnnounceCandidate/components/AnnounceCandidateConstantsWrapper'
import { AnnounceCandidateModalCall } from '@/council/modals/AnnounceCandidate/index'
import { announceCandidateMachine } from '@/council/modals/AnnounceCandidate/machine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { StepperProposalWrapper, isLastStepActive } from '@/proposals/modals/AddNewProposal'

export const AnnounceCandidateModal = () => {
  const { api, connectionState } = useApi()
  const { active: activeMember } = useMyMemberships()
  const { hideModal, showModal } = useModal<AnnounceCandidateModalCall>()
  const [state, send, service] = useMachine(announceCandidateMachine)
  const [isValidNext, setValidNext] = useState<boolean>(false)

  const constants = useCouncilConstants()
  const { hasRequiredStake, transferableAccounts, accountsWithLockedFounds } = useHasRequiredStake(
    constants?.election.minStake.toNumber() || 0
  )

  useEffect((): any => {
    if (state.matches('requirementsVerification')) {
      if (!activeMember) {
        return showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
      }

      return send('NEXT')
    }

    if (state.matches('requiredStakeVerification')) {
      return send(hasRequiredStake ? 'NEXT' : 'FAIL')
    }
  }, [state, activeMember?.id])

  if (!api || !activeMember || !service.state) {
    return null
  }

  if (state.matches('requiredStakeFailed')) {
    showModal<MoveFundsModalCall>({
      modal: 'MoveFundsModal',
      data: {
        lockedFoundsAccounts: accountsWithLockedFounds,
        accounts: transferableAccounts,
        requiredStake: (constants?.election.minStake as BN).toNumber(),
      },
    })

    return null
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Announce candidate" />
      <StepperModalBody>
        <StepperProposalWrapper>
          <Stepper steps={getSteps(service)} />
          <StepDescriptionColumn>
            <AnnounceCandidateConstantsWrapper constants={constants} />
          </StepDescriptionColumn>
          <StepperBody />
        </StepperProposalWrapper>
      </StepperModalBody>
      <ModalFooter twoColumns>
        <ButtonsGroup align="left">
          {!state.matches('staking') && (
            <ButtonGhost onClick={() => send('BACK')} size="medium">
              <Arrow direction="left" />
              Previous step
            </ButtonGhost>
          )}
        </ButtonsGroup>
        <ButtonsGroup align="right">
          <ButtonPrimary disabled={!isValidNext} onClick={() => send('NEXT')} size="medium">
            {isLastStepActive(getSteps(service)) ? 'Announce candidate' : 'Next step'}
            <Arrow direction="right" />
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}
