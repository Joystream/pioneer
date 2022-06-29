import { CouncilCandidacyNoteMetadata } from '@joystream/metadata-protobuf'
import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { useStakingAccountStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { Account } from '@/accounts/types'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { StepDescriptionColumn, Stepper, StepperBody, StepperModalBody } from '@/common/components/StepperModal'
import { BN_ZERO } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { isLastStepActive } from '@/common/modals/utils'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { getSteps } from '@/common/model/machines/getSteps'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { AnnounceCandidacyConstantsWrapper } from '@/council/modals/AnnounceCandidacy/components/AnnounceCandidacyConstantsWrapper'
import { PreviewButtons } from '@/council/modals/AnnounceCandidacy/components/PreviewButtons'
import { RewardAccountStep } from '@/council/modals/AnnounceCandidacy/components/RewardAccountStep'
import { StakeStep } from '@/council/modals/AnnounceCandidacy/components/StakeStep'
import { SuccessModal } from '@/council/modals/AnnounceCandidacy/components/Success'
import { SummaryAndBannerStep } from '@/council/modals/AnnounceCandidacy/components/SummaryAndBannerStep'
import { TitleAndBulletPointsStep } from '@/council/modals/AnnounceCandidacy/components/TitleAndBulletPointsStep'
import { AnnounceCandidacyTransaction } from '@/council/modals/AnnounceCandidacy/components/transactions/AnnounceCandidacyTransaction'
import { CandidacyNoteTransaction } from '@/council/modals/AnnounceCandidacy/components/transactions/CandidacyNoteTransaction'
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
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { IStakingAccountSchema } from '@/memberships/model/validation'
import { Member } from '@/memberships/types'
import { StepperProposalWrapper } from '@/proposals/modals/AddNewProposal'

const getCandidateForPreview = (context: AnnounceCandidacyFrom, member: Member): ElectionCandidateWithDetails => ({
  id: '0',
  stakingAccount: context.staking.account?.address ?? '',
  rewardAccount: context.rewardAccount.rewardAccount?.address ?? '',
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
})

const transactionSteps = [
  { title: 'Bind account for staking' },
  { title: 'Announce candidacy' },
  { title: 'Set candidacy note' },
]

interface Conditions extends IStakingAccountSchema {
  minStake: BN
  controllerAccountBalance: BN
}

export const AnnounceCandidacyModal = () => {
  const { api, connectionState } = useApi()
  const boundingLock = api?.consts.members.candidateStake ?? BN_ZERO
  const { active: activeMember } = useMyMemberships()
  const balances = useMyBalances()
  const { hideModal, showModal } = useModal()
  const [state, send, service] = useMachine(announceCandidacyMachine)
  const constants = useCouncilConstants()
  // TODO: minCandidacyStake should be BN after https://github.com/Joystream/pioneer/pull/3265 is merged
  const { hasRequiredStake } = useHasRequiredStake(
    constants?.election.minCandidacyStake.toNumber() || 0,
    'Council Candidate'
  )
  const [stakingAccountMap, setStakingAccount] = useState<Account | undefined>(undefined)
  const stakingStatus = useStakingAccountStatus(stakingAccountMap?.address, activeMember?.id)
  const balance = useBalance(stakingAccountMap?.address)

  const form = useForm({
    resolver: useYupValidationResolver<AnnounceCandidacyFrom>(baseSchema, machineStateConverter(state.value)),
    context: {
      stakingStatus,
      requiredAmount: stakingStatus === 'free' ? boundingLock : BN_ZERO,
      stakeLock: 'Council Candidate',
      balances: balance,
      minStake: constants?.election.minCandidacyStake as BN,
      controllerAccountBalance: balances[activeMember?.controllerAccount ?? '']?.transferable,
    } as Conditions,
    mode: 'onChange',
    defaultValues: getAnnounceCandidacyFormInitialState(constants?.election.minCandidacyStake ?? BN_ZERO),
  })
  const stakingAccount = form.watch('staking.account')

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

  const confirmStakingAccountTransaction = useMemo(() => {
    const formValues = form.getValues() as AnnounceCandidacyFrom
    if (activeMember && api) {
      return api.tx.members.confirmStakingAccount(activeMember.id, formValues.staking.account?.address ?? '')
    }
  }, [JSON.stringify(state.context), connectionState, activeMember?.id])

  const announceCandidacyTransaction = useMemo(() => {
    const formValues = form.getValues() as AnnounceCandidacyFrom
    if (activeMember && api && confirmStakingAccountTransaction) {
      const tx = api.tx.council.announceCandidacy(
        activeMember.id,
        formValues.staking.account?.address ?? '',
        formValues.rewardAccount.rewardAccount?.address ?? '',
        formValues.staking.amount?.toNumber() ?? 0
      )

      if (stakingStatus === 'confirmed') {
        return tx
      }

      return api.tx.utility.batch([confirmStakingAccountTransaction, tx])
    }
  }, [connectionState, activeMember?.id, stakingStatus, confirmStakingAccountTransaction])

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

  const feeTransaction = useMemo(() => {
    if (api && candidacyNoteTransaction && announceCandidacyTransaction) {
      return api.tx.utility.batch([announceCandidacyTransaction, candidacyNoteTransaction])
    }
  }, [connectionState, candidacyNoteTransaction, announceCandidacyTransaction])

  const feeInfo = useTransactionFee(activeMember?.controllerAccount, feeTransaction)

  useEffect((): any => {
    if (state.matches('requirementsVerification')) {
      if (!activeMember) {
        return showModal<SwitchMemberModalCall>({
          modal: 'SwitchMember',
          data: {
            originalModalName: 'AnnounceCandidateModal',
          },
        })
      }

      if (feeInfo) {
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
  }, [state, activeMember?.id, JSON.stringify(feeInfo), hasRequiredStake, stakingStatus])

  if (!api || !activeMember || !feeTransaction || !feeInfo) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    showModal<MoveFundsModalCall>({
      modal: 'MoveFundsModal',
      data: {
        requiredStake: constants?.election.minCandidacyStake as BN,
        lock: 'Council Candidate',
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
    return (
      <AnnounceCandidacyTransaction
        onClose={hideModal}
        transaction={announceCandidacyTransaction}
        signer={activeMember.controllerAccount}
        stake={form.watch('staking.amount') ?? BN_ZERO}
        service={state.children.announceCandidacyTransaction}
        steps={transactionSteps}
      />
    )
  }

  if (state.matches('candidacyNoteTransaction')) {
    return (
      <CandidacyNoteTransaction
        onClose={hideModal}
        transaction={candidacyNoteTransaction}
        signer={activeMember.controllerAccount}
        service={state.children.candidacyNoteTransaction}
        steps={transactionSteps}
      />
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} memberId={activeMember.id} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem while announcing candidacy.
      </FailureModal>
    )
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
              {state.matches('rewardAccount') && <RewardAccountStep />}
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
          {state.matches('candidateProfile.summaryAndBanner') && (
            <PreviewButtons
              candidate={getCandidateForPreview(form.getValues() as AnnounceCandidacyFrom, activeMember)}
              disabled={!form.formState.isValid}
            />
          )}
          <ButtonPrimary disabled={!form.formState.isValid} onClick={() => send('NEXT')} size="medium">
            {isLastStepActive(getSteps(service)) ? 'Announce candidacy' : 'Next step'}
            <Arrow direction="right" />
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}
