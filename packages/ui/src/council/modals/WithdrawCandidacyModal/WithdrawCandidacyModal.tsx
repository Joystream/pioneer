import { useMachine } from '@xstate/react'
import React, { useCallback } from 'react'

import { useModal } from '@/common/hooks/useModal'
import { WithdrawWarningModal } from '@/council/modals/WithdrawCandidacyModal/WithdrawWarningModal'

import { machine } from './machine'

export const WithdrawCandidacyModal = () => {
  const { hideModal } = useModal()
  const [state, send] = useMachine(machine)
  const onNext = useCallback(() => send('NEXT'), [send])

  if (state.matches('warning')) {
    return <WithdrawWarningModal onNext={onNext} onClose={hideModal} />
  }

  if (state.matches('transaction')) {
    return <div>You intend to withdraw your candidacy</div>
  }

  return null
}
