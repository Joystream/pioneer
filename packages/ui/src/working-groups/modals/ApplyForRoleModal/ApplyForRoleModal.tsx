import { ApplicationMetadata } from '@joystream/metadata-protobuf'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useStakingAccountStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { Account } from '@/accounts/types'
import { Api } from '@/api/types'
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
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { getDataFromEvent, metadataToBytes } from '@/common/model/JoystreamNode'
import { getSteps } from '@/common/model/machines/getSteps'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { BindStakingAccountModal } from '@/memberships/modals/BindStakingAccountModal/BindStakingAccountModal'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { OpeningFormPreview } from '@/working-groups/components/OpeningFormPreview'
import { useOpeningQuestions } from '@/working-groups/hooks/useOpeningQuestions'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { ApplicationStep } from '@/working-groups/modals/ApplyForRoleModal/ApplicationStep'
import { baseSchema, validationSchemaFromQuestions } from '@/working-groups/modals/ApplyForRoleModal/helpers'
import { StakeStep } from '@/working-groups/modals/ApplyForRoleModal/StakeStep'

import { groupToLockId } from '../../types'

import { ApplyForRoleSignModal } from './ApplyForRoleSignModal'
import { ApplyForRoleSuccessModal } from './ApplyForRoleSuccessModal'
import { applyForRoleMachine } from './machine'

export type OpeningParams = Exclude<
  Parameters<Api['tx']['membershipWorkingGroup']['applyOnOpening']>[0],
  string | Uint8Array
>

const transactionsSteps = [{ title: 'Bind account for staking' }, { title: 'Apply on opening' }]

export const ApplyForRoleModal = () => {
  const { api, connectionState } = useApi()
  const { active: activeMember } = useMyMemberships()
  const { hideModal, modalData, showModal } = useModal<ApplyForRoleModalCall>()
  const { questions } = useOpeningQuestions({ id: modalData.opening.id })
  const [state, send, service] = useMachine(applyForRoleMachine)
  const [stakingAccountMap, setStakingAccount] = useState<Account | undefined>(undefined)

  const opening = modalData.opening
  const requiredStake = opening.stake

  const { hasRequiredStake } = useHasRequiredStake(requiredStake.toNumber(), groupToLockId(opening.groupId))

  const schema = useMemo(() => {
    if (questions.length) {
      baseSchema.fields.form = validationSchemaFromQuestions(questions)
    }

    return baseSchema
  }, [questions.length])

  const balance = useBalance(stakingAccountMap?.address)
  const stakingStatus = useStakingAccountStatus(stakingAccountMap?.address, activeMember?.id)
  const form = useForm({
    resolver: useYupValidationResolver(schema, typeof state.value === 'string' ? state.value : undefined),
    mode: 'onChange',
    context: {
      minStake: opening.stake,
      balances: balance,
      stakeLock: groupToLockId(opening.groupId),
      requiredAmount: opening.stake,
      stakingStatus,
    },
  })
  const stakingAccount = form.watch('stake.account')

  useEffect(() => {
    form.setValue('stake.amount', opening.stake.toString())
  }, [])

  useEffect(() => {
    if (stakingAccount) {
      setStakingAccount(stakingAccount)
    }
  }, [stakingAccount?.address])

  useEffect(() => {
    form.trigger('stake.account')
  }, [stakingStatus])

  useEffect(() => {
    form.trigger([])
  }, [state.value])

  const transaction = useMemo(() => {
    const { stake } = form.getValues()
    if (activeMember && api) {
      return api.tx[opening.groupId].applyOnOpening({
        member_id: activeMember?.id,
        opening_id: opening.runtimeId,
        role_account_id: stake?.roleAccount?.address,
        reward_account_id: stake?.rewardAccount?.address,
        stake_parameters: {
          stake: opening.stake,
          staking_account_id: stake?.account?.address,
        },
      })
    }
  }, [activeMember?.id, connectionState, state.value])
  const feeInfo = useTransactionFee(activeMember?.controllerAccount, transaction)

  useEffect(() => {
    if (state.matches('form') && !questions.length) {
      send('NEXT')
    }

    if (!state.matches('requirementsVerification')) {
      return
    }
    
    if (!activeMember) {
      showModal<SwitchMemberModalCall>({
        modal: 'SwitchMember',
        data: {
          originalModalName: 'ApplyForRoleModal',
          originalModalData: modalData,
        },
      })
    }
    
    if (feeInfo) {
      const areFundsSufficient = feeInfo.canAfford && hasRequiredStake
      send(areFundsSufficient ? 'PASS' : 'FAIL')
    }
  }, [state.value, activeMember?.id, JSON.stringify(feeInfo), hasRequiredStake])

  useEffect(() => {
    if (state.matches('beforeTransaction')) {
      feeInfo?.canAfford ? send(stakingStatus === 'free' ? 'UNBOUND' : 'BOUND') : send('FAIL')
    }
  }, [state, stakingStatus])

  if (!activeMember || !feeInfo) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    showModal<MoveFundsModalCall>({
      modal: 'MoveFundsModal',
      data: {
        requiredStake,
        lock: 'Forum Worker',
      },
    })

    return null
  }

  const bindStakingAccountService = state.children.bindStakingAccount

  if (state.matches('bindStakingAccount') && api && bindStakingAccountService && stakingAccountMap) {
    const transaction = api.tx.members.addStakingAccountCandidate(activeMember.id)

    return (
      <BindStakingAccountModal
        onClose={hideModal}
        transaction={transaction}
        signer={stakingAccountMap.address}
        memberId={activeMember.id}
        service={bindStakingAccountService}
        steps={transactionsSteps}
      />
    )
  }

  const signer = activeMember?.controllerAccount
  const transactionService = state.children.transaction

  if (state.matches('transaction') && signer && api && transactionService) {
    const { stake, form: formFields } = form.getValues()

    const applyOnOpeningTransaction = api.tx[opening.groupId].applyOnOpening({
      member_id: activeMember?.id,
      opening_id: opening.runtimeId,
      role_account_id: stake.roleAccount.address,
      reward_account_id: stake.rewardAccount.address,
      description: metadataToBytes(ApplicationMetadata, { answers: Object.values(formFields ?? {}) as string[] }),
      stake_parameters: {
        stake: stake.amount,
        staking_account_id: stake.account?.address,
      },
    })

    let transaction: SubmittableExtrinsic<'rxjs'>

    if (stakingStatus === 'confirmed') {
      transaction = applyOnOpeningTransaction
    } else {
      transaction = api.tx.utility.batch([
        api.tx.members.confirmStakingAccount(activeMember?.id, stake.account.address),
        applyOnOpeningTransaction,
      ])
    }

    return (
      <ApplyForRoleSignModal
        onClose={hideModal}
        transaction={transaction}
        signer={signer}
        stake={new BN(stake.amount)}
        service={transactionService}
        steps={transactionsSteps}
      />
    )
  }

  if (state.matches('success')) {
    const { stake } = form.getValues()
    // The types of each working groups are the same, so either will work
    const applicationId = getDataFromEvent(state.context.transactionEvents, 'forumWorkingGroup', 'AppliedOnOpening', 1)

    return (
      <ApplyForRoleSuccessModal
        stake={new BN(stake.amount)}
        stakeAccount={stake.account}
        applicationId={new BN(applicationId ?? 0)}
        steps={getSteps(service)}
      />
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem with applying for an opening.
      </FailureModal>
    )
  }

  if (state.matches('canceled')) {
    return <FailureModal onClose={hideModal}>Transaction was canceled</FailureModal>
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Applying for role" />
      <StepperModalBody>
        <StepperModalWrapper>
          <Stepper steps={getSteps(service)} />
          <StepDescriptionColumn>
            <OpeningFormPreview opening={opening} />
          </StepDescriptionColumn>
          <StepperBody>
            <FormProvider {...form}>
              {state.matches('stake') && (
                <StakeStep
                  errorChecker={enhancedHasError(form.formState.errors, state.value as string)}
                  errorMessageGetter={enhancedGetErrorMessage(form.formState.errors, state.value as string)}
                  opening={opening}
                />
              )}
              {state.matches('form') && (
                <ApplicationStep
                  questions={questions}
                  errorChecker={enhancedHasError(form.formState.errors, state.value as string)}
                  errorMessageGetter={enhancedGetErrorMessage(form.formState.errors, state.value as string)}
                />
              )}
            </FormProvider>
          </StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonsGroup align="left">
          {state.matches('form') && (
            <ButtonGhost onClick={() => send('PREV')} size="medium">
              <Arrow direction="left" />
              Previous step
            </ButtonGhost>
          )}
        </ButtonsGroup>
        <ButtonsGroup align="right">
          <ButtonPrimary disabled={!form.formState.isValid} onClick={() => send('NEXT')} size="medium">
            Next step
            <Arrow direction="right" />
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}
