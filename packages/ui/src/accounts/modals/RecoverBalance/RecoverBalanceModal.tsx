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

  const isSuccess = state.matches('success')
  const isError = state.matches('error')

  if (!isSuccess && !isError) {
    return <RecoverBalanceSignModal onClose={onClose} service={service} />
  }

  if (isSuccess) {
    return <RecoverBalanceSuccessModal onClose={onClose} />
  }

  if (isError) {
    return <FailureModal onClose={onClose}>Failure</FailureModal>
  }

  return null
}
