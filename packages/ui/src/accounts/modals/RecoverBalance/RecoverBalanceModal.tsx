import { useMachine } from '@xstate/react'
import React from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { transactionMachine } from '@/common/model/machines'

import { RecoverBalanceSignModal } from './RecoverBalanceSignModal'
import { RecoverBalanceSuccessModal } from './RecoverBalanceSuccessModal'

interface Props {
  onClose: () => void
}

export const RecoverBalanceModal = ({ onClose }: Props) => {
  const [state, , service] = useMachine(transactionMachine)

  if (state.matches('prepare')) {
    return <RecoverBalanceSignModal onClose={onClose} service={service} />
  }

  if (state.matches('success')) {
    return <RecoverBalanceSuccessModal onClose={onClose} />
  }

  if (state.matches('error')) {
    return <FailureModal onClose={onClose}>Failure</FailureModal>
  }

  return null
}
