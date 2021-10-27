import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'

import { RevealVoteModalCall } from '.'
import { RevealVoteMachine } from './machine'

export const RevealVoteModal = () => {
  const [state, send] = useMachine(RevealVoteMachine)
  const { hideModal, modalData } = useModal<RevealVoteModalCall>()

  const { api } = useApi()

  const { vote } = modalData

  const transaction = useMemo(() => api?.tx.referendum.revealVote(vote.salt, vote.optionId ), [vote.salt, vote.optionId])
  const feeInfo = useTransactionFee(vote.accountId, transaction)

  useEffect(() => {
    if (state.matches('requirementsVerification'))
      if (feeInfo) {
        send(feeInfo.canAfford ? 'PASS' : 'FAIL')
      }
  }, [state.value, feeInfo?.canAfford])

  if (state.matches('success')) {
    // return <RevealVoteSuccessModal />
  } else if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem casting your vote.
      </FailureModal>
    )
  }

  if (!feeInfo) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    return (
      <InsufficientFundsModal
        onClose={hideModal}
        address={vote.accountId}
        amount={feeInfo.transactionFee}
      />
    )
  } else if (state.matches('transaction')) {
    // return <RevealVoteSignModal />
  }

  return null
}
