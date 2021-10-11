import { useMachine } from '@xstate/react'
import React, { useCallback } from 'react'

import { useModal } from '@/common/hooks/useModal'
import { WithdrawSignModal } from '@/council/modals/WithdrawCandidacyModal/WithdrawSignModal'
import { WithdrawWarningModal } from '@/council/modals/WithdrawCandidacyModal/WithdrawWarningModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { machine } from './machine'

export const WithdrawCandidacyModal = () => {
  const { active } = useMyMemberships()
  const { hideModal } = useModal()
  const [state, send] = useMachine(machine)
  const onNext = useCallback(() => send('NEXT'), [send])

  if (state.matches('warning')) {
    return <WithdrawWarningModal onNext={onNext} onClose={hideModal} />
  }

  if (state.matches('transaction') && active) {
    return <WithdrawSignModal onClose={hideModal} service={state.children.transaction} member={active} />
  }

  if (state.matches('success')) {
    return <div>Success</div>
  }

  return null
}
