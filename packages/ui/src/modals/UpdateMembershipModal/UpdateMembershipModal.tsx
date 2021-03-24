import React, { useState } from 'react'
import { BaseMember } from '../../common/types'
import { useAccounts } from '../../hooks/useAccounts'
import { SignUpdateMembershipModal } from './SignUpdateMembershipModal'
import { WithNullableValues, UpdateMemberForm } from './types'
import { UpdateMembershipFailureModal } from './UpdateMembershipFailureModal'
import { UpdateMembershipFormModal } from './UpdateMembershipFormModal'
import { UpdateMembershipSuccessModal } from './UpdateMembershipSuccessModal'

interface MembershipModalProps {
  member: BaseMember
  onClose: () => void
}

type ModalState = 'PREPARE' | 'AUTHORIZE' | 'SUCCESS' | 'ERROR'

export const UpdateMembershipModal = ({ onClose, member }: MembershipModalProps) => {
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [transactionParams, setParams] = useState<WithNullableValues<UpdateMemberForm>>()
  const { allAccounts } = useAccounts()
  const signer = allAccounts.find((account) => member.controllerAccount === account.address)

  const onSubmit = (params: WithNullableValues<UpdateMemberForm>) => {
    setStep('AUTHORIZE')
    setParams(params)
  }

  const onDone = (result: boolean) => setStep(result ? 'SUCCESS' : 'ERROR')

  if (step === 'PREPARE' || !transactionParams || !signer) {
    return <UpdateMembershipFormModal onClose={onClose} onSubmit={onSubmit} member={member} />
  }

  if (step === 'AUTHORIZE') {
    return (
      <SignUpdateMembershipModal
        onClose={onClose}
        transactionParams={transactionParams}
        member={member}
        signer={signer}
        onDone={onDone}
      />
    )
  }

  if (step === 'SUCCESS') {
    return <UpdateMembershipSuccessModal onClose={onClose} member={member} />
  }

  return <UpdateMembershipFailureModal onClose={onClose} member={member} />
}
