import { useMachine } from '@xstate/react'
import React from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { useRefetch } from '@/common/hooks/useRefetch'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { Member } from '../../types'

import { updateMembershipMachine } from './machine'
import { UpdateMembershipFormModal } from './UpdateMembershipFormModal'
import { UpdateMembershipSignModal } from './UpdateMembershipSignModal'
import { UpdateMembershipSuccessModal } from './UpdateMembershipSuccessModal'

interface MembershipModalProps {
  member: Member
  onClose: () => void
}

export const UpdateMembershipModal = ({ onClose, member }: MembershipModalProps) => {
  const [state, send] = useMachine(updateMembershipMachine)

  const { refetch: refetchMemberships } = useMyMemberships()
  useRefetch({ type: 'set', payload: refetchMemberships })
  useRefetch({ type: 'do', payload: state.matches('success') })

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

  if (state.matches('error')) {
    return (
      <FailureModal onClose={onClose} events={state.context.transactionEvents}>
        There was a problem updating membership for {member.name}.
      </FailureModal>
    )
  }

  return null
}
