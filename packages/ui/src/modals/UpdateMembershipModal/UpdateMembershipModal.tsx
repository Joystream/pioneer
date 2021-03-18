import React, { useState } from 'react'
import { Member } from '../../common/types'
import { SignUpdateMembershipModal } from './SignUpdateMembershipModal'
import { UpdateMembershipFailureModal } from './UpdateMembershipFailureModal'
import { UpdateMemberForm, UpdateMembershipFormModal } from './UpdateMembershipFormModal'
import { UpdateMembershipSuccessModal } from './UpdateMembershipSuccessModal'

interface MembershipModalProps {
  member: Member
  onClose: () => void
}

type ModalState = 'PREPARE' | 'AUTHORIZE' | 'SUCCESS' | 'ERROR'

export const UpdateMembershipModal = ({ onClose, member }: MembershipModalProps) => {
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [transactionParams, setParams] = useState<UpdateMemberForm>()

  const onSubmit = (params: UpdateMemberForm) => {
    setStep('AUTHORIZE')
    setParams(params)
  }

  const onDone = (result: boolean) => setStep(result ? 'SUCCESS' : 'ERROR')

  if (step === 'PREPARE' || !transactionParams) {
    return <UpdateMembershipFormModal onClose={onClose} onSubmit={onSubmit} member={member} />
  }

  if (step === 'AUTHORIZE') {
    return (
      <SignUpdateMembershipModal
        onClose={onClose}
        transactionParams={transactionParams}
        member={member}
        onDone={onDone}
      />
    )
  }

  if (step === 'SUCCESS') {
    return <UpdateMembershipSuccessModal onClose={onClose} member={member} />
  }

  return <UpdateMembershipFailureModal onClose={onClose} member={member} />
}
