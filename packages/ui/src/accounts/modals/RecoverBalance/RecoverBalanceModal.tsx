import { useMachine } from '@xstate/react'
import React from 'react'

import { recoverBalanceMachine } from '@/accounts/modals/RecoverBalance/machine'
import { FailureModal } from '@/common/components/FailureModal'
import { TextMedium } from '@/common/components/typography'

import { RecoverBalanceSignModal } from './RecoverBalanceSignModal'
import { RecoverBalanceSuccessModal } from './RecoverBalanceSuccessModal'

interface Props {
  onClose: () => void
}

export const RecoverBalanceModal = ({ onClose }: Props) => {
  const [state] = useMachine(recoverBalanceMachine)

  if (state.matches('transaction')) {
    const transactionService = state.children.transaction

    return <RecoverBalanceSignModal onClose={onClose} service={transactionService} />
  }

  if (state.matches('success')) {
    return <RecoverBalanceSuccessModal onClose={onClose} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={onClose} events={state.context.transactionEvents}>
        <TextMedium>There was a problem with recovering balances.</TextMedium>
      </FailureModal>
    )
  }

  return null
}
