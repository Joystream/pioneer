import React, { useMemo, useState } from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { ModalState } from '@/common/types'
import { useWorker } from '@/working-groups/hooks/useWorker'

import { getGroup } from '../../model/getGroup'

import { LeaveRolePrepareModal } from './LeaveRolePrepareModal'
import { LeaveRoleSignModal } from './LeaveRoleSignModal'
import { LeaveRoleSuccessModal } from './LeaveRoleSuccessModal'
import { LeaveRoleModalCall } from './types'

export const LeaveRoleModal = () => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<LeaveRoleModalCall>()
  const { worker } = useWorker(modalData.workerId)
  const [rationale, setRationale] = useState('')
  const [step, setStep] = useState<ModalState>('PREPARE')
  const transaction = useMemo(
    () => worker && api && getGroup(api, worker?.group?.name)?.leaveRole(worker.runtimeId, rationale),
    [worker?.id, api]
  )
  const onDone = (success: boolean) => setStep(success ? 'SUCCESS' : 'ERROR')
  const onContinue = (newRationale: string) => {
    setRationale(newRationale)
    setStep('AUTHORIZE')
  }

  if (!worker) {
    return null
  }

  if (step === 'PREPARE') {
    return <LeaveRolePrepareModal onClose={hideModal} onContinue={onContinue} openingId={worker.openingId} />
  }

  if (step === 'AUTHORIZE' && transaction) {
    return <LeaveRoleSignModal onClose={hideModal} transaction={transaction} worker={worker} onDone={onDone} />
  }

  if (step === 'SUCCESS') {
    return <LeaveRoleSuccessModal onClose={hideModal} />
  }

  return <FailureModal onClose={hideModal}>There was a problem leaving the role.</FailureModal>
}
