import React, { useMemo, useState } from 'react'

import { FailureModal } from '@/common/components/FailureModal'

import { useApi } from '../../../common/hooks/useApi'
import { ModalState } from '../../../common/types'
import { getGroup } from '../../model/getGroup'
import { WorkingGroupApplication } from '../../types/WorkingGroupApplication'

import { WithdrawApplicationSignModal } from './WithdrawApplicationSignModal'
import { WithdrawApplicationSuccessModal } from './WithdrawApplicationSuccessModal'

interface Props {
  onClose: () => void
  application: WorkingGroupApplication
}

export const WithdrawApplicationModal = ({ onClose, application }: Props) => {
  const { api } = useApi()
  const [step, setStep] = useState<ModalState>('AUTHORIZE')
  const transaction = useMemo(() => getGroup(api, application.opening.groupName)?.withdrawApplication(application.id), [
    api,
  ])
  const onDone = (success: boolean) => setStep(success ? 'SUCCESS' : 'ERROR')

  if (step === 'AUTHORIZE') {
    return (
      <WithdrawApplicationSignModal
        onClose={onClose}
        onDone={onDone}
        application={application}
        transaction={transaction}
      />
    )
  }

  if (step === 'SUCCESS') {
    return <WithdrawApplicationSuccessModal onClose={onClose} />
  }

  return <FailureModal onClose={onClose}>There was a problem with withdrawing the application.</FailureModal>
}
