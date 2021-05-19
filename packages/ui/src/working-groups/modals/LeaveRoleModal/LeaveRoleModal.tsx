import React, { useState } from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { ModalState } from '@/common/types'

import { getGroup } from '../../model/getGroup'
import { Worker } from '../../types'

import { LeaveRolePrepareModal } from './LeaveRolePrepareModal'
import { LeaveRoleSignModal } from './LeaveRoleSignModal'
import { LeaveRoleSuccessModal } from './LeaveRoleSuccessModal'

interface Props {
  onClose: () => void
  worker: Worker
}

export const LeaveRoleModal = ({ onClose, worker }: Props) => {
  const { api } = useApi()
  const [rationale, setRationale] = useState('')
  const [step, setStep] = useState<ModalState>('PREPARE')
  const transaction = getGroup(api, worker.group.name)?.leaveRole(worker.id, rationale)
  const onDone = (success: boolean) => setStep(success ? 'SUCCESS' : 'ERROR')
  const onContinue = (newRationale: string) => {
    setRationale(newRationale)
    setStep('AUTHORIZE')
  }

  if (step === 'PREPARE') {
    return <LeaveRolePrepareModal onClose={onClose} onContinue={onContinue} unstakingPeriod={20} />
  }

  if (step === 'AUTHORIZE' && transaction) {
    return <LeaveRoleSignModal onClose={onClose} transaction={transaction} worker={worker} onDone={onDone} />
  }

  if (step === 'SUCCESS') {
    return <LeaveRoleSuccessModal onClose={onClose} />
  }

  return <FailureModal onClose={onClose}>There was a problem leaving the role.</FailureModal>
}
