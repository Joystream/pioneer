import React, { useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { useObservable } from '../../hooks/useObservable'
import { MembershipFormModal, Params } from './MembershipFormModal'
import { SignTransactionModal } from './SignTransactionModal'

interface MembershipModalProps {
  onClose: () => void
}

type ModalState = 'Create' | 'Authorize'

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [state, setState] = useState<ModalState>('Create')
  const [transactionParams, setParams] = useState<Params>()

  const onSubmit = (params: Params) => {
    setState('Authorize')
    setParams(params)
  }

  if (state === 'Create' || !transactionParams) {
    return <MembershipFormModal onClose={onClose} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  return (
    <SignTransactionModal onClose={onClose} membershipPrice={membershipPrice} transactionParams={transactionParams} />
  )
}
