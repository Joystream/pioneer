import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useStakingAccountStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { Arrow, WatchIcon } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { StepDescriptionColumn, Stepper, StepperBody, StepperModalBody } from '@/common/components/StepperModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { isLastStepActive } from '@/common/modals/utils'
import { getSteps } from '@/common/model/machines/getSteps'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { AnnounceCandidacyConstantsWrapper } from '@/council/modals/AnnounceCandidacy/components/AnnounceCandidacyConstantsWrapper'
import { CandidacyProfilePreview } from '@/council/modals/AnnounceCandidacy/components/CandidacyProfilePreview'
import { CandidacyThumbnailPreview } from '@/council/modals/AnnounceCandidacy/components/CandidacyThumbnailPreview'
import { RewardAccountStep } from '@/council/modals/AnnounceCandidacy/components/RewardAccountStep'
import { StakingStep } from '@/council/modals/AnnounceCandidacy/components/StakingStep'
import { SummaryAndBannerStep } from '@/council/modals/AnnounceCandidacy/components/SummaryAndBannerStep'
import { TitleAndBulletPointsStep } from '@/council/modals/AnnounceCandidacy/components/TitleAndBulletPointsStep'
import { AnnounceCandidacyContext, announceCandidacyMachine } from '@/council/modals/AnnounceCandidacy/machine'
import { CandidateWithDetails } from '@/council/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { Member } from '@/memberships/types'
import { StepperProposalWrapper } from '@/proposals/modals/AddNewProposal'

const getCandidateForPreview = (context: Required<AnnounceCandidacyContext>, member: Member): CandidateWithDetails => ({
  id: '0',
  stakingAccount: context.stakingAccount.address,
  rewardAccount: context.rewardAccount.address,
  stake: context.stakingAmount,
  title: context.title,
  summary: context.summary,
  description: context.bulletPoints,
  member,
  cycleId: 0,
  cycleFinished: false,
})

export const AnnounceCandidacyModal = () => {
  const { api, connectionState } = useApi()
  const { active: activeMember } = useMyMemberships()
  const { hideModal, showModal } = useModal()
  const [state, send, service] = useMachine(announceCandidacyMachine)
  const [isValidNext, setValidNext] = useState<boolean>(false)
  const [showProfilePreview, setShowProfilePreview] = useState<boolean>(false)
  const [showThumbnailPreview, setShowThumbnailPreview] = useState<boolean>(false)

  const constants = useCouncilConstants()
  const { hasRequiredStake, accountsWithTransferableBalance, accountsWithCompatibleLocks } = useHasRequiredStake(
    constants?.election.minStake.toNumber() || 0,
    'Council Candidate'
  )
  const stakingStatus = useStakingAccountStatus(state.context.stakingAccount?.address, activeMember?.id)

  const transaction = useMemo(() => {
    if (activeMember && api) {
      if (stakingStatus === 'confirmed') {
        return api.tx.council.announceCandidacy(activeMember.id, '', '', 0)
      }

      return api.tx.utility.batch([
        api.tx.members.confirmStakingAccount(activeMember.id, state?.context?.stakingAccount?.address ?? ''),
        api.tx.council.announceCandidacy(activeMember.id, '', '', 0),
      ])
    }
  }, [JSON.stringify(state.context), connectionState, stakingStatus])

  const feeInfo = useTransactionFee(activeMember?.controllerAccount, transaction)

  useEffect((): any => {
    if (state.matches('requirementsVerification')) {
      if (!activeMember) {
        return showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
      }

      if (feeInfo) {
        return send(feeInfo.canAfford ? 'NEXT' : 'FAIL')
      }
    }

    if (state.matches('requiredStakeVerification')) {
      return send(hasRequiredStake ? 'NEXT' : 'FAIL')
    }
  }, [state, activeMember?.id, JSON.stringify(feeInfo), hasRequiredStake])

  useEffect((): any => {
    if (state.matches('staking') && state.context.stakingAccount && state.context.stakingAmount) {
      setValidNext(true)
    } else if (state.matches('rewardAccount') && state.context.rewardAccount) {
      setValidNext(true)
    } else if (
      state.matches('candidateProfile.titleAndBulletPoints') &&
      state.context.title &&
      state.context.bulletPoints.length
    ) {
      setValidNext(true)
    } else if (state.matches('candidateProfile.summaryAndBanner') && state.context.summary) {
      setValidNext(true)
    } else {
      setValidNext(false)
    }
  }, [state, activeMember?.id, stakingStatus])

  if (!api || !activeMember || !transaction || !feeInfo) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    return (
      <InsufficientFundsModal
        onClose={hideModal}
        address={activeMember.controllerAccount}
        amount={feeInfo.transactionFee}
      />
    )
  }

  if (state.matches('requiredStakeFailed')) {
    showModal<MoveFundsModalCall>({
      modal: 'MoveFundsModal',
      data: {
        accountsWithCompatibleLocks,
        accountsWithTransferableBalance,
        requiredStake: (constants?.election.minStake as BN).toNumber(),
      },
    })

    return null
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
            {state.matches('staking') && (
              <StakingStep
                candidacyMember={activeMember}
                minStake={constants?.election.minStake as BN}
                stake={state.context.stakingAmount}
                setStake={(amount) => send('SET_AMOUNT', { amount })}
                account={state.context.stakingAccount}
                setAccount={(account) => send('SET_ACCOUNT', { account })}
              />
            )}
            {state.matches('rewardAccount') && (
              <RewardAccountStep
                account={state.context.rewardAccount}
                setAccount={(account) => send('SET_ACCOUNT', { account })}
              />
            )}
            {state.matches('candidateProfile.titleAndBulletPoints') && (
              <TitleAndBulletPointsStep
                title={state.context.title}
                setTitle={(title) => send('SET_TITLE', { title })}
                bulletPoints={state.context.bulletPoints}
                setBulletPoints={(bulletPoints) => send('SET_BULLET_POINTS', { bulletPoints })}
              />
            )}
            {state.matches('candidateProfile.summaryAndBanner') && (
              <SummaryAndBannerStep
                summary={state.context.summary}
                setSummary={(summary) => send('SET_SUMMARY', { summary })}
                banner={state.context.banner}
                setBanner={(banner) => send('SET_BANNER', { banner })}
              />
            )}
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
          {isLastStepActive(getSteps(service)) && (
            <>
              <ButtonGhost disabled={!isValidNext} onClick={() => setShowThumbnailPreview(true)} size="medium">
                <WatchIcon /> Preview thumbnail
              </ButtonGhost>
              <ButtonGhost disabled={!isValidNext} onClick={() => setShowProfilePreview(true)} size="medium">
                <WatchIcon /> Preview profile
              </ButtonGhost>
            </>
          )}
          <ButtonPrimary disabled={!isValidNext} onClick={() => send('NEXT')} size="medium">
            {isLastStepActive(getSteps(service)) ? 'Announce candidacy' : 'Next step'}
            <Arrow direction="right" />
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
      {isLastStepActive(getSteps(service)) && showProfilePreview && (
        <CandidacyProfilePreview
          candidate={getCandidateForPreview(state.context as Required<AnnounceCandidacyContext>, activeMember)}
          closeModal={() => setShowProfilePreview(false)}
        />
      )}
      {isLastStepActive(getSteps(service)) && showThumbnailPreview && (
        <CandidacyThumbnailPreview
          candidate={getCandidateForPreview(state.context as Required<AnnounceCandidacyContext>, activeMember)}
          closeModal={() => setShowThumbnailPreview(false)}
        />
      )}
    </Modal>
  )
}
