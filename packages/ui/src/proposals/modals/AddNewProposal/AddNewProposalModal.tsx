import BN from 'bn.js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FieldError, FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useStakingAccountStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { Account } from '@/accounts/types'
import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { Checkbox } from '@/common/components/forms'
import { Modal, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import {
  StepDescriptionColumn,
  Stepper,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { isLastStepActive } from '@/common/modals/utils'
import { createType } from '@/common/model/createType'
// import { createType } from '@joystream/types'
import { getMaxBlock } from '@/common/model/getMaxBlock'
import { getSteps } from '@/common/model/machines/getSteps'
import { useYupValidationResolver } from '@/common/utils/validation'
import { machineStateConverter } from '@/council/modals/AnnounceCandidacy/helpers'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { BindStakingAccountModal } from '@/memberships/modals/BindStakingAccountModal/BindStakingAccountModal'
import { IStakingAccountSchema } from '@/memberships/model/validation'
import { useMinimumValidatorCount } from '@/proposals/hooks/useMinimumValidatorCount'
import { useProposalConstants } from '@/proposals/hooks/useProposalConstants'
import { ExecutionRequirementsWarning } from '@/proposals/modals/AddNewProposal/components/ExecutionRequirementsWarning'
import { ProposalConstantsWrapper } from '@/proposals/modals/AddNewProposal/components/ProposalConstantsWrapper'
import { ProposalDetailsStep } from '@/proposals/modals/AddNewProposal/components/ProposalDetailsStep'
import { ProposalTypeStep } from '@/proposals/modals/AddNewProposal/components/ProposalTypeStep'
import { SpecificParametersStep } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { StakingAccountStep } from '@/proposals/modals/AddNewProposal/components/StakingAccountStep'
import { SuccessModal } from '@/proposals/modals/AddNewProposal/components/SuccessModal'
import { TriggerAndDiscussionStep } from '@/proposals/modals/AddNewProposal/components/TriggerAndDiscussionStep'
import { WarningModal } from '@/proposals/modals/AddNewProposal/components/WarningModal'
import { getSpecificParameters } from '@/proposals/modals/AddNewProposal/getSpecificParameters'
import { AddNewProposalForm, defaultProposalValues, schemaFactory } from '@/proposals/modals/AddNewProposal/helpers'
import { AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal/index'
import { addNewProposalMachine, AddNewProposalMachineState } from '@/proposals/modals/AddNewProposal/machine'
import { ProposalType } from '@/proposals/types'
import { GroupIdName } from '@/working-groups/types'

export type BaseProposalParams = Exclude<
  Parameters<Api['tx']['proposalsCodex']['createProposal']>[0],
  string | Uint8Array
>

const minimalSteps = [{ title: 'Bind account for staking' }, { title: 'Create proposal' }]

export const AddNewProposalModal = () => {
  const { api, connectionState } = useApi()
  const { active: activeMember } = useMyMemberships()
  const minimumValidatorCount = useMinimumValidatorCount()
  const maximumReferralCut = api?.consts.members.referralCutMaximumPercent
  const currentBlock = useCurrentBlockNumber()
  const { hideModal, showModal } = useModal<AddNewProposalModalCall>()
  const [state, send, service] = useMachine(addNewProposalMachine)
  const [isHidingCaution] = useLocalStorage<boolean>('proposalCaution')
  const [formMap, setFormMap] = useState<Partial<[Account, ProposalType, GroupIdName, boolean]>>([])
  const workingGroupConsts = api?.consts[formMap[2] as GroupIdName]

  const [warningAccepted, setWarningAccepted] = useState<boolean>(true)
  const [isExecutionError, setIsExecutionError] = useState<boolean>(false)

  const constants = useProposalConstants(formMap[1])
  const { hasRequiredStake } = useHasRequiredStake(constants?.requiredStake || BN_ZERO, 'Proposals')
  const balance = useBalance(formMap[0]?.address)
  const stakingStatus = useStakingAccountStatus(formMap[0]?.address, activeMember?.id, [state.matches('transaction')])
  const schema = useMemo(() => schemaFactory(api), [!api])

  const form = useForm<AddNewProposalForm>({
    resolver: useYupValidationResolver<AddNewProposalForm>(schema, machineStateConverter(state.value)),
    mode: 'onChange',
    context: {
      minimumValidatorCount,
      maximumReferralCut,
      leaderOpeningStake: workingGroupConsts?.leaderOpeningStake,
      minUnstakingPeriodLimit: workingGroupConsts?.minUnstakingPeriodLimit,
      stakeLock: 'Proposals',
      balances: balance,
      stakingStatus,
      requiredAmount: constants?.requiredStake,
      maxTriggerBlock: getMaxBlock(currentBlock),
      minTriggerBlock: currentBlock
        ? currentBlock.addn(constants?.votingPeriod ?? 0).addn(constants?.gracePeriod ?? 0)
        : BN_ZERO,
    } as IStakingAccountSchema,
    defaultValues: defaultProposalValues,
  })

  const mapDependencies = form.watch([
    'stakingAccount.stakingAccount',
    'proposalType.type',
    'groupId',
    'triggerAndDiscussion.isDiscussionClosed',
  ])

  useEffect(() => {
    setFormMap(mapDependencies)
    if (state.matches('proposalType')) {
      send('SET_TYPE', { proposalType: mapDependencies[1] })
    }

    if (state.matches('generalParameters.triggerAndDiscussion')) {
      send('SET_DISCUSSION_MODE', { mode: mapDependencies[3] ? 'closed' : 'open' })
    }
  }, [JSON.stringify(mapDependencies)])

  useEffect(() => {
    form.trigger('stakingAccount.stakingAccount')
  }, [stakingStatus])

  useEffect(() => {
    form.trigger([])
  }, [machineStateConverter(state.value)])

  useEffect(() => {
    setIsExecutionError(
      Object.values((form.formState.errors as any)[machineStateConverter(state.value)] ?? {}).some(
        (value) => (value as FieldError).type === 'execution'
      )
    )
  }, [JSON.stringify(form.formState.errors), machineStateConverter(state.value)])

  const transactionsSteps = useMemo(
    () =>
      state.context.discussionMode === 'closed' ? [...minimalSteps, { title: 'Set discussion mode' }] : minimalSteps,
    [state.context.discussionMode]
  )

  const transaction = useMemo(() => {
    if (activeMember && api) {
      const { proposalDetails, triggerAndDiscussion, stakingAccount, ...specifics } =
        form.getValues() as AddNewProposalForm

      const txBaseParams: BaseProposalParams = {
        memberId: activeMember?.id,
        title: proposalDetails?.title,
        description: proposalDetails?.rationale,
        ...(stakingAccount.stakingAccount ? { stakingAccountId: stakingAccount.stakingAccount.address } : {}),
        ...(triggerAndDiscussion.triggerBlock ? { exactExecutionBlock: triggerAndDiscussion.triggerBlock } : {}),
      }

      const txSpecificParameters = getSpecificParameters(api, specifics)

      if (stakingStatus === 'confirmed') {
        return api.tx.proposalsCodex.createProposal(txBaseParams, txSpecificParameters)
      }

      return api.tx.utility.batch([
        api.tx.members.confirmStakingAccount(activeMember.id, stakingAccount.stakingAccount?.address ?? ''),
        api.tx.proposalsCodex.createProposal(txBaseParams, txSpecificParameters),
      ])
    }
  }, [
    state.value,
    connectionState,
    stakingStatus,
    form.formState.isValidating,
    JSON.stringify(form.getValues()?.[machineStateConverter(state.value) as keyof AddNewProposalForm]),
  ])

  const { feeInfo } = useTransactionFee(activeMember?.controllerAccount, () => transaction, [transaction])

  useEffect((): any => {
    if (state.matches('requirementsVerification')) {
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

    if (state.matches('warning') && isHidingCaution) {
      send('NEXT')
    }
  }, [state, activeMember?.id, JSON.stringify(feeInfo)])

  useEffect(() => {
    if (state.matches('beforeTransaction')) {
      feeInfo?.canAfford ? send(stakingStatus === 'free' ? 'REQUIRES_STAKING_CANDIDATE' : 'BOUND') : send('FAIL')
    }
  }, [state, stakingStatus, feeInfo])

  useEffect(() => setWarningAccepted(!isExecutionError), [isExecutionError])

  const goToPrevious = useCallback(() => {
    send('BACK')
    setIsExecutionError(false)
  }, [send])

  const shouldDisableNext = useMemo(() => {
    if (isExecutionError) {
      const hasOtherError = Object.values(
        (form.formState.errors as any)[machineStateConverter(state.value)] ?? {}
      ).some((value) => (value as FieldError).type !== 'execution')

      if (!form.formState.isDirty) {
        return true
      }

      if (!hasOtherError) {
        return !warningAccepted
      }

      return !form.formState.isValid
    }

    return !form.formState.isValid
  }, [
    form.formState.isValid,
    form.formState.isDirty,
    isExecutionError,
    warningAccepted,
    JSON.stringify(form.getValues()),
    JSON.stringify(form.formState.errors),
  ])

  if (!api || !activeMember || !feeInfo || state.matches('requirementsVerification')) {
    return null
  }

  if (state.matches('requirementsFailed') || state.matches('requiredStakeFailed')) {
    showModal<MoveFundsModalCall>({
      modal: 'MoveFundsModal',
      data: {
        requiredStake: constants?.requiredStake ?? BN_ZERO,
        lock: 'Proposals',
        isFeeOriented: state.matches('requirementsFailed') && !feeInfo.canAfford,
      },
    })

    return null
  }

  if (state.matches('warning')) {
    return isHidingCaution ? null : <WarningModal onNext={() => send('NEXT')} />
  }

  if (state.matches('bindStakingAccount')) {
    const transaction = api.tx.members.addStakingAccountCandidate(activeMember.id)

    return (
      <BindStakingAccountModal
        onClose={hideModal}
        transaction={transaction}
        signer={formMap[0]?.address ?? ''}
        service={state.children.bindStakingAccount}
        memberId={activeMember.id}
        steps={transactionsSteps}
      />
    )
  }

  if (state.matches('transaction')) {
    return (
      <SignTransactionModal
        buttonText="Sign transaction and Create"
        transaction={transaction}
        signer={activeMember.controllerAccount}
        service={state.children.transaction}
        useMultiTransaction={{ steps: transactionsSteps, active: 1 }}
        additionalTransactionInfo={[
          {
            title: 'Stake:',
            value: constants?.requiredStake as BN,
          },
        ]}
      >
        <TextMedium>You intend to create a proposal.</TextMedium>
        <TextMedium>
          Also you intend to stake <TokenValue value={constants?.requiredStake as BN} />.
        </TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('discussionTransaction')) {
    const { triggerAndDiscussion } = form.getValues() as AddNewProposalForm
    const threadMode = createType('PalletProposalsDiscussionThreadModeBTreeSet', {
      closed: triggerAndDiscussion.discussionWhitelist?.map((member) =>
        createType('MemberId', Number.parseInt(member.id))
      ),
    })

    const transaction = api.tx.proposalsDiscussion.changeThreadMode(
      activeMember.id,
      state.context.discussionId,
      threadMode
    )

    return (
      <SignTransactionModal
        buttonText="Sign transaction and change mode"
        transaction={transaction}
        signer={activeMember.controllerAccount}
        service={state.children.discussionTransaction}
        useMultiTransaction={{ steps: transactionsSteps, active: 2 }}
      >
        <TextMedium>You intend to change the proposal discussion thread mode.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('success')) {
    const { proposalDetails, proposalType } = form.getValues() as AddNewProposalForm
    return (
      <SuccessModal
        onClose={hideModal}
        proposalId={state.context.proposalId}
        proposalType={proposalType.type as ProposalType}
        proposalTitle={proposalDetails.title as string}
      />
    )
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
            <ProposalConstantsWrapper constants={constants} />
          </StepDescriptionColumn>
          <StyledStepperBody>
            <FormProvider {...form}>
              {state.matches('proposalType') && <ProposalTypeStep />}
              {state.matches('generalParameters.stakingAccount') && (
                <StakingAccountStep requiredStake={constants?.requiredStake as BN} />
              )}
              {state.matches('generalParameters.proposalDetails') && <ProposalDetailsStep proposer={activeMember} />}
              {state.matches('generalParameters.triggerAndDiscussion') && <TriggerAndDiscussionStep />}
              {state.matches('specificParameters') && (
                <SpecificParametersStep matches={state.matches as AddNewProposalMachineState['matches']} />
              )}
              {isExecutionError && <ExecutionRequirementsWarning />}
            </FormProvider>
          </StyledStepperBody>
        </StepperProposalWrapper>
      </StepperModalBody>
      <ModalTransactionFooter
        transactionFee={isLastStepActive(getSteps(service)) ? feeInfo.transactionFee : undefined}
        prev={{ disabled: state.matches('proposalType'), onClick: goToPrevious }}
        next={{
          disabled: shouldDisableNext,
          label: isLastStepActive(getSteps(service)) ? 'Create proposal' : 'Next step',
          onClick: () => send('NEXT'),
        }}
      >
        {isExecutionError && (
          <Checkbox isRequired onChange={setWarningAccepted} id="execution-requirement">
            I understand the implications of overriding the execution constraints validation.
          </Checkbox>
        )}
      </ModalTransactionFooter>
    </Modal>
  )
}

export const StepperProposalWrapper = styled(StepperModalWrapper)`
  grid-template-columns: 220px 336px 1fr;
`

const StyledStepperBody = styled(StepperBody)`
  flex-direction: column;
  row-gap: 20px;
`
