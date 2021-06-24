import { ApiRx } from '@polkadot/api'
import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { ButtonPrimary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { Stepper } from '@/common/components/Stepper'
import {
  StepDescriptionColumn,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { getSteps } from '@/common/model/machines/getSteps'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { useConstants } from '@/proposals/hooks/useConstants'
import { Constants } from '@/proposals/modals/AddNewProposal/components/Constants'
import { ProposalTypeStep } from '@/proposals/modals/AddNewProposal/components/ProposalTypeStep'
import { WarningModal } from '@/proposals/modals/AddNewProposal/components/WarningModal'
import { AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal/index'
import { addNewProposalMachine } from '@/proposals/modals/AddNewProposal/machine'

export type NewProposalParams = Exclude<
  Parameters<ApiRx['tx']['proposalsCodex']['createProposal']>[0],
  string | Uint8Array
>

export const AddNewProposalModal = () => {
  const { api } = useApi()
  const { active: member } = useMyMemberships()
  const { hideModal, showModal } = useModal<AddNewProposalModalCall>()
  const [state, send, service] = useMachine(addNewProposalMachine)
  const constants = useConstants(state.context.proposalType)
  const [isValid, setValid] = useState<boolean>(false)

  const [txParams] = useState<NewProposalParams>({
    member_id: member?.id,
    title: '',
    description: '',
    staking_account_id: member?.controllerAccount,
  })

  const transaction = useMemo(() => {
    if (member && txParams && api) {
      return api.tx.proposalsCodex.createProposal(txParams, { Signal: '' })
    }
  }, [api, JSON.stringify(txParams)])
  const feeInfo = useTransactionFee(member?.controllerAccount, transaction)

  useEffect((): any => {
    if (!state.matches('requirementsVerification')) {
      return
    }

    if (!member) {
      return showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
    }

    if (feeInfo && feeInfo.canAfford) {
      return send('NEXT')
    }

    if (feeInfo && !feeInfo.canAfford) {
      return send('FAIL')
    }
  }, [state, member?.id, JSON.stringify(feeInfo)])

  useEffect((): any => {
    if (state.matches('proposalType') && state.context.proposalType) {
      return setValid(true)
    }

    setValid(false)
  }, [state, member?.id])

  if (!member || !feeInfo) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={member.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }

  if (state.matches('warning')) {
    return <WarningModal onNext={() => send('NEXT')} />
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem while creating proposal.</FailureModal>
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Creating new proposal" />
      <StepperModalBody>
        <StepperProposalWrapper>
          <Stepper steps={getSteps(service)} />
          <StepDescriptionColumn>
            <Constants constants={constants} />
          </StepDescriptionColumn>
          <StepperBody>
            {state.matches('proposalType') && (
              <ProposalTypeStep
                type={state.context.proposalType}
                setType={(proposalType) => send('SELECT', { proposalType })}
              />
            )}
          </StepperBody>
        </StepperProposalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isValid} onClick={() => send('NEXT')} size="medium">
          Next step
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

export const StepperProposalWrapper = styled(StepperModalWrapper)`
  grid-template-columns: 220px 336px 1fr;
`
