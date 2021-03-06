import { ApiRx } from '@polkadot/api'
import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import {
  StepDescriptionColumn,
  Stepper,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'
import { camelCaseToText } from '@/common/helpers'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { getSteps, Step } from '@/common/model/machines/getSteps'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { useConstants } from '@/proposals/hooks/useConstants'
import { Constants } from '@/proposals/modals/AddNewProposal/components/Constants'
import { ProposalDetailsStep } from '@/proposals/modals/AddNewProposal/components/ProposalDetailsStep'
import { ProposalTypeStep } from '@/proposals/modals/AddNewProposal/components/ProposalTypeStep'
import { SignTransactionModal } from '@/proposals/modals/AddNewProposal/components/SignTransactionModal'
import {
  isValidSpecificParameters,
  SpecificParametersStep,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { StakingAccountStep } from '@/proposals/modals/AddNewProposal/components/StakingAccountStep'
import { SuccessModal } from '@/proposals/modals/AddNewProposal/components/SuccessModal'
import { TriggerAndDiscussionStep } from '@/proposals/modals/AddNewProposal/components/TriggerAndDiscussionStep'
import { WarningModal } from '@/proposals/modals/AddNewProposal/components/WarningModal'
import { getSpecificParameters } from '@/proposals/modals/AddNewProposal/getSpecificParameters'
import { AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal/index'
import {
  AddNewProposalEvent,
  addNewProposalMachine,
  AddNewProposalMachineState,
  ProposalTrigger,
} from '@/proposals/modals/AddNewProposal/machine'
import { ProposalType, ProposalConstants } from '@/proposals/types'

export type BaseProposalParams = Exclude<
  Parameters<ApiRx['tx']['proposalsCodex']['createProposal']>[0],
  string | Uint8Array
>

const isLastStepActive = (steps: Step[]) => {
  return steps[steps.length - 1].type === 'active' || steps[steps.length - 1].type === 'past'
}

export const AddNewProposalModal = () => {
  const { api } = useApi()
  const { active: member } = useMyMemberships()
  const { hideModal, showModal } = useModal<AddNewProposalModalCall>()
  const [state, send, service] = useMachine(addNewProposalMachine)
  const constants = useConstants(state.context.type)
  const { hasRequiredStake, transferableAccounts, accountsWithLockedFounds } = useHasRequiredStake(
    constants?.requiredStake.toNumber() || 0
  )
  const [isValidNext, setValidNext] = useState<boolean>(false)

  const txBaseParams: BaseProposalParams = {
    member_id: member?.id,
    title: state.context.title,
    description: state.context.rationale,
    ...(state.context.stakingAccount ? { staking_account_id: state.context.stakingAccount.address } : {}),
    ...(state.context.triggerBlock ? { exact_execution_block: state.context.triggerBlock } : {}),
  }

  const transaction = useMemo(() => {
    if (member && api) {
      const txSpecificParameters = getSpecificParameters(api, state as AddNewProposalMachineState)

      return api.tx.proposalsCodex.createProposal(txBaseParams, txSpecificParameters)
    }
  }, [api, JSON.stringify(txBaseParams), JSON.stringify(state.context.specifics)])
  const feeInfo = useTransactionFee(member?.controllerAccount, transaction)

  useEffect((): any => {
    if (state.matches('requirementsVerification')) {
      if (!member) {
        return showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
      }

      if (feeInfo && feeInfo.canAfford) {
        return send('NEXT')
      }

      if (feeInfo && !feeInfo.canAfford) {
        return send('FAIL')
      }
    }

    if (state.matches('requiredStakeVerification')) {
      return send(hasRequiredStake ? 'NEXT' : 'FAIL')
    }
  }, [state, member?.id, JSON.stringify(feeInfo)])

  useEffect((): any => {
    if (state.matches('proposalType') && state.context.type) {
      return setValidNext(true)
    }

    if (state.matches('generalParameters.stakingAccount') && state.context.stakingAccount) {
      return setValidNext(true)
    }

    if (state.matches('generalParameters.proposalDetails') && state.context.title && state.context.rationale) {
      return setValidNext(true)
    }

    if (
      state.matches('generalParameters.triggerAndDiscussion') &&
      state.context.triggerBlock !== undefined &&
      state.context.discussionMode &&
      state.context.discussionWhitelist
    ) {
      return setValidNext(true)
    }

    if (state.matches('specificParameters')) {
      return setValidNext(isValidSpecificParameters(state as AddNewProposalMachineState))
    }

    return setValidNext(false)
  }, [state, member?.id])

  if (!api || !member || !transaction || !feeInfo) {
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

  if (state.matches('requiredStakeFailed')) {
    showModal<MoveFundsModalCall>({
      modal: 'MoveFundsModal',
      data: {
        lockedFoundsAccounts: accountsWithLockedFounds,
        accounts: transferableAccounts,
        requiredStake: (constants?.requiredStake as BN).toNumber(),
      },
    })

    return null
  }

  if (state.matches('transaction')) {
    return (
      <SignTransactionModal
        onClose={hideModal}
        transaction={transaction}
        signer={member.controllerAccount}
        stake={constants?.requiredStake as BN}
        service={state.children['transaction']}
      />
    )
  }

  if (state.matches('success')) {
    return (
      <SuccessModal
        onClose={hideModal}
        proposalType={state.context.type as ProposalType}
        proposalTitle={state.context.title as string}
      />
    )
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem while creating proposal.</FailureModal>
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader
        onClick={hideModal}
        title={'Creating new proposal' + (state.context.type ? ': ' + camelCaseToText(state.context.type) : '')}
      />
      <StepperModalBody>
        <StepperProposalWrapper>
          <Stepper steps={getSteps(service)} />
          <StepDescriptionColumn>
            <Constants constants={constants} />
          </StepDescriptionColumn>
          <StepperBody>
            {state.matches('proposalType') && (
              <ProposalTypeStep
                type={state.context.type}
                setType={(proposalType) => send('SET_TYPE', { proposalType })}
              />
            )}
            {state.matches('generalParameters.stakingAccount') && (
              <StakingAccountStep
                requiredStake={constants?.requiredStake as BN}
                account={state.context.stakingAccount}
                setAccount={(account) => send('SET_ACCOUNT', { account })}
              />
            )}
            {state.matches('generalParameters.proposalDetails') && (
              <ProposalDetailsStep
                proposer={member}
                title={state.context.title}
                rationale={state.context.rationale}
                setTitle={(title) => send('SET_TITLE', { title })}
                setRationale={(rationale) => send('SET_RATIONALE', { rationale })}
              />
            )}
            {state.matches('generalParameters.triggerAndDiscussion') && (
              <TriggerAndDiscussionStep
                params={{ constants: constants as ProposalConstants, ...state.context }}
                setTriggerBlock={(triggerBlock?: ProposalTrigger) => send('SET_TRIGGER_BLOCK', { triggerBlock })}
                setDiscussionMode={(mode) => send('SET_DISCUSSION_MODE', { mode })}
                setDiscussionWhitelist={(whitelist) => send('SET_DISCUSSION_WHITELIST', { whitelist })}
              />
            )}
            {state.matches('specificParameters') && (
              <SpecificParametersStep
                state={state as AddNewProposalMachineState}
                send={(event: AddNewProposalEvent['type'], payload: any) => send(event, payload)}
              />
            )}
          </StepperBody>
        </StepperProposalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          <ButtonGhost disabled={state.matches('proposalType')} onClick={() => send('BACK')} size="medium">
            <Arrow direction="left" />
            Previous step
          </ButtonGhost>
          <ButtonPrimary disabled={!isValidNext} onClick={() => send('NEXT')} size="medium">
            {isLastStepActive(getSteps(service)) ? 'Create proposal' : 'Next step'}
            <Arrow direction="right" />
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}

export const StepperProposalWrapper = styled(StepperModalWrapper)`
  grid-template-columns: 220px 336px 1fr;
`
