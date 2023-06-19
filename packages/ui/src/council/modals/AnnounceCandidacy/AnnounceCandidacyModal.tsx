import { CouncilCandidacyNoteMetadata } from '@joystream/metadata-protobuf'
import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useStakingAccountStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFundsModal'
import { Account } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { Modal, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { StepDescriptionColumn, Stepper, StepperBody, StepperModalBody } from '@/common/components/StepperModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { isLastStepActive } from '@/common/modals/utils'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { getSteps } from '@/common/model/machines/getSteps'
import { isDefined } from '@/common/utils'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { AnnounceCandidacyConstantsWrapper } from '@/council/modals/AnnounceCandidacy/components/AnnounceCandidacyConstantsWrapper'
import { PreviewButtons } from '@/council/modals/AnnounceCandidacy/components/PreviewButtons'
import { RewardAccountStep } from '@/council/modals/AnnounceCandidacy/components/RewardAccountStep'
import { StakeStep } from '@/council/modals/AnnounceCandidacy/components/StakeStep'
import { SuccessModal } from '@/council/modals/AnnounceCandidacy/components/Success'
import { SummaryAndBannerStep } from '@/council/modals/AnnounceCandidacy/components/SummaryAndBannerStep'
import { TitleAndBulletPointsStep } from '@/council/modals/AnnounceCandidacy/components/TitleAndBulletPointsStep'
import {
  AnnounceCandidacyFrom,
  baseSchema,
  getAnnounceCandidacyFormInitialState,
  getBulletPoints,
  machineStateConverter,
} from '@/council/modals/AnnounceCandidacy/helpers'
import { announceCandidacyMachine } from '@/council/modals/AnnounceCandidacy/machine'
import { CandidacyStatus, ElectionCandidateWithDetails } from '@/council/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { BindStakingAccountModal } from '@/memberships/modals/BindStakingAccountModal/BindStakingAccountModal'
import { IStakingAccountSchema } from '@/memberships/model/validation'
import { Member } from '@/memberships/types'
import { StepperProposalWrapper } from '@/proposals/modals/AddNewProposal'

const getCandidateForPreview = (context: AnnounceCandidacyFrom, member: Member): ElectionCandidateWithDetails => ({
  id: '0',
  stakingAccount: context.staking.account?.address ?? '',
  rewardAccount: context.reward.account?.address ?? '',
  stake: context.staking.amount ?? BN_ZERO,
  info: {
    title: context.titleAndBulletPoints.title ?? '',
    summary: context.summaryAndBanner.summary ?? '',
    bulletPoints: getBulletPoints(context),
    bannerUri: context.summaryAndBanner.banner ?? '',
  },
  member,
  cycleId: 0,
  cycleFinished: false,
  status: CandidacyStatus.Active,
  totalStake: BN_ZERO,
  votesNumber: 0,
})

const transactionSteps = [
  { title: 'Bind account for staking' },
  { title: 'Announce candidacy' },
  { title: 'Set candidacy note' },
]

interface Conditions extends IStakingAccountSchema {
  extraFees: BN
  minStake: BN
}

export const AnnounceCandidacyModal = () => {
  const { api, connectionState } = useApi()
  const boundingLock = api?.consts.members.candidateStake ?? BN_ZERO
  const { active: activeMember } = useMyMemberships()
  const { hideModal, showModal } = useModal()
  const [state, send, service] = useMachine(announceCandidacyMachine)
  const constants = useCouncilConstants()
  const { hasRequiredStake } = useHasRequiredStake(
    constants?.election.minCandidacyStake || BN_ZERO,
    'Council Candidate'
  )
  const [stakingAccountMap, setStakingAccount] = useState<Account | undefined>(undefined)
  const stakingStatus = useStakingAccountStatus(stakingAccountMap?.address, activeMember?.id, [
    state.matches('announceCandidacyTransaction'),
  ])
  const balance = useBalance(stakingAccountMap?.address)

  // TODO add transaction fees here
  const extraFees = (stakingStatus === 'free' && boundingLock) || BN_ZERO

  const form = useForm({
    resolver: useYupValidationResolver<AnnounceCandidacyFrom>(baseSchema, machineStateConverter(state.value)),
    context: {
      stakingStatus,
      requiredAmount: extraFees.add(constants?.election.minCandidacyStake ?? BN_ZERO),
      stakeLock: 'Council Candidate',
      balances: balance,
      extraFees,
      minStake: constants?.election.minCandidacyStake as BN,
    } as Conditions,
    mode: 'onChange',
    defaultValues: getAnnounceCandidacyFormInitialState(constants?.election.minCandidacyStake ?? BN_ZERO),
  })
  const [stakingAccount, rewardAccount, stakingAmount] = form.watch([
    'staking.account',
    'reward.account',
    'staking.amount',
  ])

  useEffect(() => {
    setStakingAccount(stakingAccount)
  }, [stakingAccount])

  useEffect(() => {
    form.trigger(machineStateConverter(state.value) as keyof AnnounceCandidacyFrom)
  }, [machineStateConverter(state.value)])

  useEffect(() => {
    if (state.matches('staking')) {
      form.trigger('staking.amount')
      form.trigger('staking.account')
    }
  }, [Boolean(constants?.election.minCandidacyStake), stakingStatus, Boolean(balance)])

  const addStakingAccountCandidateTransaction = useMemo(() => {
    if (activeMember && api) {
      return api.tx.members.addStakingAccountCandidate(activeMember.id)
    }
  }, [connectionState, activeMember?.id])

  const announceCandidacyTransaction = useMemo(() => {
    if (activeMember && api && stakingStatus) {
      const tx = api.tx.council.announceCandidacy(
        activeMember.id,
        stakingAccount?.address ?? '',
        rewardAccount?.address ?? '',
        stakingAmount ?? BN_ZERO
      )

      if (stakingStatus === 'confirmed') {
        return tx
      }

      const confirmStakingAccountTransaction = api.tx.members.confirmStakingAccount(
        activeMember.id,
        stakingAccount?.address ?? ''
      )

      return api.tx.utility.batch([confirmStakingAccountTransaction, tx])
    }
  }, [
    connectionState,
    activeMember?.id,
    stakingAccount?.address,
    rewardAccount?.address,
    String(stakingAmount),
    stakingStatus,
  ])

  useTransactionFee(activeMember?.controllerAccount, () => announceCandidacyTransaction, [announceCandidacyTransaction])

  const candidacyNoteTransaction = useMemo(() => {
    const formValues = form.getValues() as AnnounceCandidacyFrom

    if (activeMember && api) {
      return api.tx.council.setCandidacyNote(
        activeMember.id,
        metadataToBytes(CouncilCandidacyNoteMetadata, {
          header: formValues.titleAndBulletPoints.title,
          bulletPoints: getBulletPoints(formValues),
          bannerImageUri: formValues.summaryAndBanner.banner,
          description: formValues.summaryAndBanner.summary,
        })
      )
    }
  }, [JSON.stringify(state.context), connectionState, activeMember?.id])

  const { transaction, feeInfo } = useTransactionFee(
    activeMember?.controllerAccount,
    () => {
      if (api && candidacyNoteTransaction && announceCandidacyTransaction) {
        return api.tx.utility.batch([announceCandidacyTransaction, candidacyNoteTransaction])
      }
    },
    [connectionState, candidacyNoteTransaction, announceCandidacyTransaction]
  )

  useEffect((): any => {
    if (state.matches('requirementsVerification')) {
      if (feeInfo && isDefined(hasRequiredStake)) {
        const areFundsSufficient = feeInfo.canAfford && hasRequiredStake
        send(areFundsSufficient ? 'NEXT' : 'FAIL')
      }
    }

    if (state.matches('beforeTransaction')) {
      // stakingStatus === "unknown"
      // wrong account
      //
      // stakingStatus === "free" -> OK
      // 1. add Staking Account  | BOB
      // 2a. confirm staking     | ALICE
      // 2b. announce candidacy  | ALICE
      //
      // stakingStatus === "candidate"
      // 2a. confirm staking
      // 2b. announce candacy
      //
      // stakingStatus === "confirmed"
      // 2b. announce candacy
      //
      // stakingStatus === "other"
      // wrong account
      return feeInfo?.canAfford ? send(stakingStatus === 'free' ? 'REQUIRES_STAKING_CANDIDATE' : 'BOUND') : send('FAIL')
    }
  }, [state, activeMember?.id, feeInfo?.canAfford, hasRequiredStake, stakingStatus])

  if (!api || !activeMember || !transaction || !feeInfo) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    showModal<MoveFundsModalCall>({
      modal: 'MoveFundsModal',
      data: {
        requiredStake: constants?.election.minCandidacyStake ?? BN_ZERO,
        lock: 'Council Candidate',
        isFeeOriented: !feeInfo.canAfford,
      },
    })

    return null
  }

  if (state.matches('bindStakingAccountTransaction')) {
    return (
      <BindStakingAccountModal
        onClose={hideModal}
        transaction={addStakingAccountCandidateTransaction}
        signer={stakingAccount?.address ?? ''}
        service={state.children.bindStakingAccountTransaction}
        memberId={activeMember.id}
        steps={transactionSteps}
      />
    )
  }

  if (state.matches('announceCandidacyTransaction')) {
    const tooltipText =
      'Signing this transaction will result in the specified amount of JOY tokens staked for the chosen purpose, resulting in a rivalrous lock applied to this amount until the stake gets recovered.'
    return (
      <SignTransactionModal
        additionalTransactionInfo={[
          { title: 'Add Stake', value: form.watch('staking.amount') ?? BN_ZERO, tooltipText },
        ]}
        buttonText="Sign transaction and Announce"
        transaction={announceCandidacyTransaction}
        signer={activeMember.controllerAccount}
        service={state.children.announceCandidacyTransaction}
        useMultiTransaction={{ steps: transactionSteps, active: 1 }}
        skipQueryNode
      >
        <TextMedium>You intend to announce candidacy.</TextMedium>
        <TextMedium>
          Also you intend to stake <TokenValue value={form.watch('staking.amount') ?? BN_ZERO} />.
        </TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('candidacyNoteTransaction')) {
    return (
      <SignTransactionModal
        buttonText="Sign transaction and Set"
        transaction={candidacyNoteTransaction}
        signer={activeMember.controllerAccount}
        service={state.children.candidacyNoteTransaction}
        useMultiTransaction={{ steps: transactionSteps, active: 2 }}
      >
        <TextMedium>You intend to set candidacy note.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} memberId={activeMember.id} />
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Announce candidacy" />
      <StepperModalBody>
        <StepperProposalWrapper>
          <Stepper steps={getSteps(service)} />
          <StepDescriptionColumn>
            <AnnounceCandidacyConstantsWrapper constants={constants} />
          </StepDescriptionColumn>
          <StepperBody>
            <FormProvider {...form}>
              {state.matches('staking') && (
                <StakeStep
                  candidacyMember={activeMember}
                  minStake={constants?.election.minCandidacyStake as BN}
                  errorChecker={enhancedHasError(form.formState.errors, machineStateConverter(state.value))}
                  errorMessageGetter={enhancedGetErrorMessage(
                    form.formState.errors,
                    machineStateConverter(state.value)
                  )}
                />
              )}
              {state.matches('reward') && <RewardAccountStep />}
              {state.matches('candidateProfile.titleAndBulletPoints') && (
                <TitleAndBulletPointsStep
                  errorChecker={enhancedHasError(form.formState.errors, machineStateConverter(state.value))}
                  errorMessageGetter={enhancedGetErrorMessage(
                    form.formState.errors,
                    machineStateConverter(state.value)
                  )}
                />
              )}
              {state.matches('candidateProfile.summaryAndBanner') && <SummaryAndBannerStep />}
            </FormProvider>
          </StepperBody>
        </StepperProposalWrapper>
      </StepperModalBody>
      <ModalTransactionFooter
        next={{
          disabled: !form.formState.isValid,
          label: isLastStepActive(getSteps(service)) ? 'Announce candidacy' : 'Next step',
          onClick: () => send('NEXT'),
        }}
        prev={state.matches('staking') ? { onClick: () => send('BACK') } : undefined}
        extraButtons={
          state.matches('candidateProfile.summaryAndBanner') && (
            <PreviewButtons
              candidate={getCandidateForPreview(form.getValues() as AnnounceCandidacyFrom, activeMember)}
              disabled={!form.formState.isValid}
            />
          )
        }
      />
    </Modal>
  )
}
