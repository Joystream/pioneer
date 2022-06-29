import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

import { VoteForCouncilMachine, VoteForCouncilMachineState } from './machine'
import { VoteForCouncilModalCall } from './types'
import { VoteForCouncilFormModal } from './VoteForCouncilFormModal'
import { VoteForCouncilSignModal } from './VoteForCouncilSignModal'
import { VoteForCouncilSuccessModal } from './VoteForCouncilSuccessModal'

export const VoteForCouncilModal = () => {
  const [state, send] = useMachine(VoteForCouncilMachine)
  const { showModal, hideModal, modalData } = useModal<VoteForCouncilModalCall>()

  const { api } = useApi()

  const { active: activeMember } = useMyMemberships()

  const constants = useCouncilConstants()
  const minStake = constants?.election.minVoteStake
  // TODO: Delete conversion to BN after https://github.com/Joystream/pioneer/pull/3265 is merged
  const requiredStake = minStake as BN

  const { hasRequiredStake } = useHasRequiredStake(requiredStake?.toNumber(), 'Voting')

  const transaction = useMemo(() => api?.tx.referendum.vote('', requiredStake), [requiredStake])
  const feeInfo = useTransactionFee(activeMember?.controllerAccount, transaction)

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (!activeMember) {
        showModal<SwitchMemberModalCall>({
          modal: 'SwitchMember',
          data: {
            originalModalName: 'VoteForCouncil',
            originalModalData: modalData,
          },
        })
      }
      if (feeInfo) {
        const areFundsSufficient = feeInfo.canAfford && hasRequiredStake
        send(areFundsSufficient ? 'PASS' : 'FAIL')
      }
    }
  }, [state.value, activeMember?.id, hasRequiredStake, feeInfo?.canAfford])

  if (state.matches('success')) {
    return <VoteForCouncilSuccessModal onClose={hideModal} candidateId={modalData.id} />
  } else if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem casting your vote.
      </FailureModal>
    )
  }

  if (!activeMember || !feeInfo || !minStake) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    showModal<MoveFundsModalCall>({
      modal: 'MoveFundsModal',
      data: {
        requiredStake,
        lock: 'Voting',
      },
    })

    return null
  } else if (state.matches('stake')) {
    return <VoteForCouncilFormModal minStake={minStake} send={send} state={state as VoteForCouncilMachineState} />
  } else if (state.matches('transaction')) {
    return <VoteForCouncilSignModal state={state as VoteForCouncilMachineState} service={state.children.transaction} />
  }

  return null
}
