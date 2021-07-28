import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'

import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { SwitchMemberModalCall } from '../../../memberships/modals/SwitchMemberModal'

import { CreateThreadDetailsModal } from './CreateThreadDetailsModal'
import { createThreadMachine } from './machine'

export const CreateThreadModal = () => {
  const { active: member } = useMyMemberships()
  const { hideModal, showModal } = useModal()
  const [state, send] = useMachine(createThreadMachine)

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      !member ? showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' }) : send('NEXT')
    }
  }, [state.value, member?.id])

  if (state.matches('generalDetails')) {
    return (
      <CreateThreadDetailsModal
        context={state.context}
        setTopic={(topic) => send({ type: 'SET_TOPIC', topic })}
        setDescription={(description) => send({ type: 'SET_DESCRIPTION', description })}
        onSubmit={() => send('NEXT')}
      />
    )
  }

  if (state.matches('end')) {
    hideModal()
  }

  return null
}
