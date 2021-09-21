import { useMachine } from '@xstate/react'
import React from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useWorker } from '@/working-groups/hooks/useWorker'

import { getGroup } from '../../model/getGroup'
import { GroupName } from '../../types'

import { LeaveRolePrepareModal } from './LeaveRolePrepareModal'
import { LeaveRoleSignModal } from './LeaveRoleSignModal'
import { LeaveRoleSuccessModal } from './LeaveRoleSuccessModal'
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
    const transaction = getGroup(api, worker.group.name as GroupName).leaveRole(
      worker.runtimeId,
      state.context.rationale
    )

    return (
      <LeaveRoleSignModal
        onClose={hideModal}
        transaction={transaction}
        worker={worker}
        service={state.children.transaction}
      />
    )
  }

  if (state.matches('success')) {
    return <LeaveRoleSuccessModal onClose={hideModal} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem leaving the role.
      </FailureModal>
    )
  }

  return null
}
