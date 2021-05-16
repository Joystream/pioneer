import React, { useState } from 'react'

import { useApi } from '../../../common/hooks/useApi'
import { ModalState } from '../../../common/types'
import { getGroup } from '../../model/getGroup'
import { WorkerWithDetails } from '../../types'

import { LeaveRolePrepareModal } from './LeaveRolePrepareModal'
import { LeaveRoleSignModal } from './LeaveRoleSignModal'

interface Props {
  onClose: () => void
  worker: WorkerWithDetails
}

export const LeaveRoleModal = ({ onClose, worker }: Props) => {
  const { api } = useApi()
  const [rationale] = useState('')
  const [step, setStep] = useState<ModalState>('PREPARE')
  const transaction = getGroup(api, worker.group.name)?.leaveRole(worker.id, rationale)
  const onDone = (success: boolean) => setStep(success ? 'SUCCESS' : 'ERROR')

  if (step === 'PREPARE') {
    return <LeaveRolePrepareModal onClose={onClose} onContinue={() => setStep('AUTHORIZE')} />
  }

  if (step === 'AUTHORIZE' && transaction) {
    return <LeaveRoleSignModal onClose={onClose} transaction={transaction} worker={worker} onDone={onDone} />
  }
}
