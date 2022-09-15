import React, { useEffect } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { isDefined } from '@/common/utils'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

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
  const requiredStake = minStake ?? BN_ZERO

  const { hasRequiredStake } = useHasRequiredStake(requiredStake, 'Voting')

  const { feeInfo } = useTransactionFee(
    state.context.account?.address,
    () => api?.tx.referendum.vote('', requiredStake),
    [requiredStake]
  )

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (feeInfo && isDefined(hasRequiredStake)) {
        const areFundsSufficient = feeInfo.canAfford && hasRequiredStake
        send(areFundsSufficient ? 'PASS' : 'FAIL')
      }
    }
  }, [state.value, activeMember?.id, hasRequiredStake, feeInfo?.canAfford])

  if (state.matches('success')) {
    return <VoteForCouncilSuccessModal onClose={hideModal} candidateId={modalData.id} />
  }

  if (!feeInfo || !minStake) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    showModal<MoveFundsModalCall>({
      modal: 'MoveFundsModal',
      data: {
        requiredStake,
        lock: 'Voting',
        isFeeOriented: !feeInfo.canAfford,
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
