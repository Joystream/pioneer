import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'

import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { SwitchMemberModalCall } from '../../../memberships/modals/SwitchMemberModal'

import { CreateThreadModalCall } from '.'
import { CreateThreadDetailsModal } from './CreateThreadDetailsModal'
import { CreateThreadTransactionModal } from './CreateThreadTransactionModal'
import { createThreadMachine } from './machine'

export const CreateThreadModal = () => {
  const { active: member } = useMyMemberships()
  const { hideModal, showModal, modalData } = useModal<CreateThreadModalCall>()
  const [state, send] = useMachine(createThreadMachine)
  const { api } = useApi()

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (!member) {
        showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
      } else {
        send({ type: 'PASS', memberId: member.id, categoryId: modalData.categoryId })
      }
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

  if (state.matches('transaction') && api) {
    const { memberId, categoryId, topic, description } = state.context
    const transaction = api.tx.forum.createThread(memberId, categoryId, topic, description, null)
    return <CreateThreadTransactionModal transaction={transaction} />
  }

  return null
}
