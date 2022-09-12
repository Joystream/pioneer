import React from 'react'

import { useMachine } from '@/common/hooks/useMachine'

import { MemberWithDetails } from '../../types'

import { updateMembershipMachine } from './machine'
import { UpdateMembershipFormModal } from './UpdateMembershipFormModal'
import { UpdateMembershipSignModal } from './UpdateMembershipSignModal'
import { UpdateMembershipSuccessModal } from './UpdateMembershipSuccessModal'

interface MembershipModalProps {
  member: MemberWithDetails
  onClose: () => void
}

export const UpdateMembershipModal = ({ onClose, member }: MembershipModalProps) => {
  const [state, send] = useMachine(updateMembershipMachine)

  if (state.matches('prepare')) {
    return (
      <UpdateMembershipFormModal
        onClose={onClose}
        onSubmit={(params) => send('DONE', { form: params })}
        member={member}
      />
    )
  }

  if (state.matches('transaction')) {
    const transactionService = state.children.transaction

    return (
      <UpdateMembershipSignModal
        onClose={onClose}
        transactionParams={state.context.form}
        member={member}
        service={transactionService}
      />
    )
  }

  if (state.matches('success')) {
    return <UpdateMembershipSuccessModal onClose={onClose} member={member} />
  }

  return null
}
