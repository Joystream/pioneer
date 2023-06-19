import { ApplicationMetadata } from '@joystream/metadata-protobuf'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { BN_ZERO } from '@polkadot/util'
import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useStakingAccountStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFundsModal'
import { Account } from '@/accounts/types'
import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { Modal, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import {
  StepDescriptionColumn,
  Stepper,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '@/common/components/StepperModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { getDataFromEvent, metadataToBytes } from '@/common/model/JoystreamNode'
import { getSteps } from '@/common/model/machines/getSteps'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { BindStakingAccountModal } from '@/memberships/modals/BindStakingAccountModal/BindStakingAccountModal'
import { OpeningFormPreview } from '@/working-groups/components/OpeningFormPreview'
import { useOpeningQuestions } from '@/working-groups/hooks/useOpeningQuestions'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { ApplicationStep } from '@/working-groups/modals/ApplyForRoleModal/ApplicationStep'
import { baseSchema, validationSchemaFromQuestions } from '@/working-groups/modals/ApplyForRoleModal/helpers'
import { StakeStep } from '@/working-groups/modals/ApplyForRoleModal/StakeStep'

import { groupToLockId } from '../../types'

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
  const { hasRequiredStake } = useHasRequiredStake(requiredStake, groupToLockId(opening.groupId))

  const schema = useMemo(() => {
    if (questions.length) {
      baseSchema.fields.form = validationSchemaFromQuestions(questions)
    }

    return baseSchema
  }, [questions.length])

  const balance = useBalance(stakingAccountMap?.address)
  const stakingStatus = useStakingAccountStatus(stakingAccountMap?.address, activeMember?.id, [
    state.matches('transaction'),
  ])

  const boundingLock = api?.consts.members.candidateStake ?? BN_ZERO
  // TODO add transaction fees here
  const extraFees = (stakingStatus === 'free' && boundingLock) || BN_ZERO

  const form = useForm({
    resolver: useYupValidationResolver(schema, typeof state.value === 'string' ? state.value : undefined),
    mode: 'onChange',
    context: {
      minStake: opening.stake,
      balances: balance,
      extraFees,
      stakeLock: groupToLockId(opening.groupId),
      requiredAmount: opening.stake,
      stakingStatus,
    },
  })
  const stakingAccount = form.watch('stake.account')

  useEffect(() => {
    form.setValue('stake.amount', opening.stake)
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
        memberId: activeMember?.id,
        openingId: opening.runtimeId,
        roleAccountId: stake?.roleAccount?.address,
        rewardAccountId: stake?.rewardAccount?.address,
        stakeParameters: {
          stake: opening.stake,
          stakingAccountId: stake?.account?.address,
        },
      })
    }
  }, [activeMember?.id, connectionState, state.value])
  const { feeInfo } = useTransactionFee(activeMember?.controllerAccount, () => transaction)

  useEffect(() => {
    if (state.matches('form') && !questions.length) {
      send('NEXT')
    }

    if (!state.matches('requirementsVerification')) {
      return
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
        isFeeOriented: !feeInfo.canAfford,
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
    const { stake, form: answers } = form.getValues()

    const applyOnOpeningTransaction = api.tx[opening.groupId].applyOnOpening({
      memberId: activeMember?.id,
      openingId: opening.runtimeId,
      roleAccountId: stake.roleAccount.address,
      rewardAccountId: stake.rewardAccount.address,
      description: metadataToBytes(ApplicationMetadata, { answers }),
      stakeParameters: {
        stake: stake.amount,
        stakingAccountId: stake.account?.address,
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
      <SignTransactionModal
        buttonText="Sign transaction and Stake"
        transaction={transaction}
        signer={signer}
        service={transactionService}
        additionalTransactionInfo={[
          {
            title: 'Stake:',
            value: new BN(stake.amount),
          },
        ]}
      >
        <TextMedium>You intend to apply for a role.</TextMedium>
        <TextMedium>
          You intend to stake <TokenValue value={new BN(stake.amount)} />.
        </TextMedium>
      </SignTransactionModal>
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
      <ModalTransactionFooter
        prev={{ disabled: !state.matches('form'), onClick: () => send('PREV') }}
        next={{ disabled: !form.formState.isValid, onClick: () => send('NEXT') }}
      />
    </Modal>
  )
}
