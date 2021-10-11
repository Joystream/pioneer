import { useMachine } from '@xstate/react'
import React from 'react'

import { WithdrawWarningModal } from '@/council/modals/WithdrawCandidacyModal/WithdrawWarningModal'

import { machine } from './machine'

export const WithdrawCandidacyModal = () => {
  const [state] = useMachine(machine)

  if (state.matches('warning')) {
    return <WithdrawWarningModal />
  }

  return null
}
