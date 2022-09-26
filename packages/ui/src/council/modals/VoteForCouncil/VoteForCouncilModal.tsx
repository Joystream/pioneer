import React, { useEffect } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { useApi } from '@/api/hooks/useApi'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { isDefined } from '@/common/utils'
import { useCommitment } from '@/council/hooks/useCommitment'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

import { VoteForCouncilMachine, VoteForCouncilMachineState } from './machine'
import { VoteForCouncilModalCall } from './types'
import { VoteForCouncilFormModal } from './VoteForCouncilFormModal'
import { VoteForCouncilSuccessModal } from './VoteForCouncilSuccessModal'

export const VoteForCouncilModal = () => {
  const [state, send] = useMachine(VoteForCouncilMachine)
  const { showModal, hideModal, modalData } = useModal<VoteForCouncilModalCall>()
  const { commitment, isVoteStored } = useCommitment(state.context.account?.address ?? '', modalData.id)

  const { api } = useApi()

  const { active: activeMember } = useMyMemberships()

  const constants = useCouncilConstants()
  const minStake = constants?.election.minVoteStake
  const requiredStake = minStake ?? BN_ZERO

  const { hasRequiredStake } = useHasRequiredStake(requiredStake, 'Voting')

  const { feeInfo } = useTransactionFee(
    activeMember?.controllerAccount,
    () => api?.tx.referendum.vote('', requiredStake),
    [requiredStake]
  )

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
      if (feeInfo && isDefined(hasRequiredStake)) {
        const areFundsSufficient = feeInfo.canAfford && hasRequiredStake
        send(areFundsSufficient ? 'PASS' : 'FAIL')
      }
    }
  }, [state.value, activeMember?.id, hasRequiredStake, feeInfo?.canAfford])

  if (state.matches('success')) {
    return <VoteForCouncilSuccessModal onClose={hideModal} candidateId={modalData.id} />
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
        isFeeOriented: !feeInfo.canAfford,
      },
    })

    return null
  } else if (state.matches('stake')) {
    return <VoteForCouncilFormModal minStake={minStake} send={send} state={state as VoteForCouncilMachineState} />
  } else if (state.matches('transaction') && state.context.account && commitment && state.context.stake) {
    return (
      <SignTransactionModal
        buttonText="Sign and send"
        textContent={
          <TextMedium light>
            You intend to Vote and stake <TokenValue value={state.context.stake} />.
          </TextMedium>
        }
        transaction={api?.tx.referendum.vote(commitment, state.context.stake)}
        signer={state.context.account.address}
        onClose={hideModal}
        service={state.children.transaction}
        disabled={!isVoteStored}
      />
    )
  }

  return null
}
