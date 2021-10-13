import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

import { VoteForCouncilMachine } from './machine'
import { VoteForCouncilModalCall } from './types'
import { VoteForCouncilFormModal } from './VoteForCouncilFormModal'
import { VoteForCouncilSignModal } from './VoteForCouncilSignModal'

export const VoteForCouncilModal = () => {
  const [state, send] = useMachine(VoteForCouncilMachine)
  const { showModal, hideModal } = useModal<VoteForCouncilModalCall>()

  const { api } = useApi()

  const { active: activeMember } = useMyMemberships()

  const constants = useCouncilConstants()
  const minStake = constants?.election.minStake
  const requiredStake = minStake?.toNumber() ?? 0

  const { hasRequiredStake, accountsWithTransferableBalance, accountsWithCompatibleLocks } = useHasRequiredStake(
    requiredStake,
    'Voting'
  )

  const transaction = useMemo(() => api?.tx.referendum.vote('', requiredStake), [requiredStake])
  const feeInfo = useTransactionFee(activeMember?.controllerAccount, transaction)

  useEffect(() => {
    if (state.matches('requirementsVerification'))
      if (!activeMember) {
        showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
      } else if (!hasRequiredStake) {
        const data = { accountsWithCompatibleLocks, accountsWithTransferableBalance, requiredStake }
        showModal<MoveFundsModalCall>({ modal: 'MoveFundsModal', data })
      } else if (feeInfo) {
        send(feeInfo.canAfford ? 'PASS' : 'FAIL')
      }
  }, [state.value, activeMember?.id, hasRequiredStake, feeInfo?.canAfford])

  if (!activeMember || !feeInfo || !minStake) {
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
  } else if (state.matches('stake')) {
    return <VoteForCouncilFormModal minStake={minStake} send={send} />
  } else if (state.matches('transaction')) {
    return <VoteForCouncilSignModal stake={state.context.stake} service={state.children.transaction} />
  }

  return null
}
