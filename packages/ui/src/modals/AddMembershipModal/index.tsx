import React, { useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { useObservable } from '../../hooks/useObservable'
import { MembershipFormModal } from './MembershipFormModal'
import { SignTransactionModal } from './SignTransactionModal'

interface MembershipModalProps {
  onClose: () => void
}

type ModalState = 'Create' | 'Authorize'

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [state, setState] = useState<ModalState>('Create')

  const onSubmit = () => {
    setState('Authorize')
  }

  if (state === 'Create') {
    return <MembershipFormModal onClose={onClose} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  return <SignTransactionModal onClose={onClose} membershipPrice={membershipPrice} />
}
