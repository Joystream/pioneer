import { useMachine } from '@xstate/react'
import React from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { useModal } from '@/common/hooks/useModal'
import { UpdateMembershipModalCall } from '@/memberships/modals/UpdateMembershipModal/index'

import { updateMembershipMachine } from './machine'
import { UpdateMembershipFormModal } from './UpdateMembershipFormModal'
import { UpdateMembershipSignModal } from './UpdateMembershipSignModal'
import { UpdateMembershipSuccessModal } from './UpdateMembershipSuccessModal'

export const UpdateMembershipModal = () => {
  const {
    hideModal,
    modalData: { member },
  } = useModal<UpdateMembershipModalCall>()
  const [state, send] = useMachine(updateMembershipMachine)

  if (state.matches('prepare')) {
    return (
      <UpdateMembershipFormModal
        onClose={hideModal}
        onSubmit={(params) => send('DONE', { form: params })}
        member={member}
      />
    )
  }

  if (state.matches('transaction')) {
    const transactionService = state.children.transaction

    return (
      <UpdateMembershipSignModal
        onClose={hideModal}
        transactionParams={state.context.form}
        member={member}
        service={transactionService}
      />
    )
  }

  if (state.matches('success')) {
    return <UpdateMembershipSuccessModal onClose={hideModal} member={member} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem updating membership for {member.name}.
      </FailureModal>
    )
  }

  return null
}
