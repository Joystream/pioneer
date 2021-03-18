import React, { useState } from 'react'
import { Member, ModalState } from '../../common/types'
import { AddMembershipFailureModal } from '../AddMembershipModal/AddMembershipFailureModal'
import { InviteFormModal } from './InviteFormModal'

interface MembershipModalProps {
  onClose: () => void
}

export function InviteMemberModal({ onClose }: MembershipModalProps) {
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [transactionParams, setParams] = useState<Member>()
  const onSubmit = (params: Member) => {
    setStep('AUTHORIZE')
    setParams(params)
  }
  if (step == 'PREPARE' || !transactionParams) {
    return <InviteFormModal onClose={onClose} onSubmit={onSubmit} />
  }
  return <AddMembershipFailureModal onClose={onClose} member={transactionParams} />
}
