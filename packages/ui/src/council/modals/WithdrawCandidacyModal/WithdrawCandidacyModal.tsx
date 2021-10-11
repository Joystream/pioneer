import { useMachine } from '@xstate/react'
import React from 'react'

import { machine } from './machine'

export const WithdrawCandidacyModal = () => {
  const [state] = useMachine(machine)

  if (state.matches('warning')) {
    return <div>Please remember that this action is irreversible</div>
  }

  return null
}
