import React, { useEffect } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { useApi } from '@/api/hooks/useApi'
import { TextInlineMedium, TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { createType } from '@/common/model/createType'

import { RevealVoteModalCall } from '.'
import { RevealVoteMachine } from './machine'
import { PickVoteModal } from './PickVoteModal'
import { RevealVoteSuccessModal } from './RevealVoteSuccessModal'

export const RevealVoteModal = () => {
  const [state, send] = useMachine(RevealVoteMachine)
  const { hideModal, modalData } = useModal<RevealVoteModalCall>()
  const { votes } = modalData

  const { api } = useApi()

  const vote = state.context.vote

  const { transaction, feeInfo } = useTransactionFee(
    vote?.accountId,
    () => vote && api?.tx.referendum.revealVote(vote.salt, createType('MemberId', parseInt(vote.optionId))),
    [vote?.salt, vote?.optionId]
  )

  useEffect(() => {
    if (state.matches('voteChoice') && votes.length === 1) {
      send('PICKED', { vote: votes[0] })
    }
  }, [state.value])

  useEffect(() => {
    if (state.matches('requirementsVerification'))
      if (feeInfo) {
        send(feeInfo.canAfford ? 'PASS' : 'FAIL')
      }
  }, [state.value, feeInfo?.canAfford])

  if (state.matches('voteChoice') && votes.length > 1) {
    return <PickVoteModal votes={votes} send={send} />
  }
  if (state.matches('success')) {
    return <RevealVoteSuccessModal />
  }

  if (!feeInfo || !transaction || !vote) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    return <InsufficientFundsModal onClose={hideModal} address={vote.accountId} amount={feeInfo.transactionFee} />
  }
  if (state.matches('transaction')) {
    return (
      <SignTransactionModal
        buttonText="Sign and reveal"
        transaction={transaction}
        signer={vote.accountId}
        service={state.children.transaction}
      >
        <TextMedium light>
          You intend to reveal your vote for <TextInlineMedium bold>{modalData.voteForHandle}</TextInlineMedium>.
        </TextMedium>
      </SignTransactionModal>
    )
  }

  return null
}
