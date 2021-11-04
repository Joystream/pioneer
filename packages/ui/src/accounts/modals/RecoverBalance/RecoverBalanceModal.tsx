import { useMachine } from '@xstate/react'
import React from 'react'

import { recoverBalanceMachine } from '@/accounts/modals/RecoverBalance/machine'
import { FailureModal } from '@/common/components/FailureModal'
import { TextMedium } from '@/common/components/typography'
import {useModal} from '@/common/hooks/useModal';

import { RecoverBalanceSignModal } from './RecoverBalanceSignModal'
import { RecoverBalanceSuccessModal } from './RecoverBalanceSuccessModal'


export const RecoverBalanceModal = () => {
  const [state] = useMachine(recoverBalanceMachine)
  const { hideModal } = useModal()

  if (state.matches('transaction')) {
    const transactionService = state.children.transaction

    return <RecoverBalanceSignModal onClose={hideModal} service={transactionService} />
  }

  if (state.matches('success')) {
    return <RecoverBalanceSuccessModal onClose={hideModal} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        <TextMedium>There was a problem with recovering balances.</TextMedium>
      </FailureModal>
    )
  }

  return null
}
