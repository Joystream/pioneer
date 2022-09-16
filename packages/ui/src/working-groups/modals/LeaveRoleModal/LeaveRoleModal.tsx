import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useWorker } from '@/working-groups/hooks/useWorker'

import { getGroup } from '../../model/getGroup'

import { LeaveRolePrepareModal } from './LeaveRolePrepareModal'
import { LeaveRoleSignModal } from './LeaveRoleSignModal'
import { leaveRoleMachine } from './machine'
import { LeaveRoleModalCall } from './types'

export const LeaveRoleModal = () => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<LeaveRoleModalCall>()
  const { worker } = useWorker(modalData.workerId)
  const [state, send] = useMachine(leaveRoleMachine)

  if (!worker || !api) {
    return null
  }

  if (state.matches('prepare')) {
    return (
      <LeaveRolePrepareModal
        onClose={hideModal}
        onContinue={(newRationale: string) => send('DONE', { rationale: newRationale })}
        openingId={worker.openingId}
      />
    )
  }

  if (state.matches('transaction')) {
    const transaction = getGroup(api, worker.group.id).leaveRole(worker.runtimeId, state.context.rationale)

    return (
      <LeaveRoleSignModal
        onClose={hideModal}
        transaction={transaction}
        worker={worker}
        service={state.children.transaction}
      />
    )
  }

  return null
}
