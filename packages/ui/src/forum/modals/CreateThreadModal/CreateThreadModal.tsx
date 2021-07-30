import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { SwitchMemberModalCall } from '../../../memberships/modals/SwitchMemberModal'

import { CreateThreadModalCall } from '.'
import { CreateThreadDetailsModal } from './CreateThreadDetailsModal'
import { CreateThreadSignModal } from './CreateThreadSignModal'
import { CreateThreadSuccessModal } from './CreateThreadSuccessModal'
import { createThreadMachine } from './machine'

export const CreateThreadModal = () => {
  const { active: member } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const { showModal, hideModal, modalData } = useModal<CreateThreadModalCall>()
  const [state, send] = useMachine(createThreadMachine)
  const { api } = useApi()

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (!member) {
        showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
      } else {
        const controllerAccount = accountOrNamed(allAccounts, member.controllerAccount, 'Controller Account')
        send({ type: 'PASS', memberId: member.id, categoryId: modalData.categoryId, controllerAccount })
      }
    }
  }, [state.value, member?.id])

  if (state.matches('generalDetails')) {
    return (
      <CreateThreadDetailsModal
        topic={state.context.topic ?? ''}
        description={state.context.description ?? ''}
        setTopic={(topic) => send({ type: 'SET_TOPIC', topic })}
        setDescription={(description) => send({ type: 'SET_DESCRIPTION', description })}
        onSubmit={() => send('NEXT')}
      />
    )
  }

  if (state.matches('transaction') && api) {
    const { memberId, categoryId, topic, description } = state.context
    const transaction = api.tx.forum.createThread(memberId, categoryId, topic, description, null)
    const service = state.children.transaction
    return (
      <CreateThreadSignModal
        transaction={transaction}
        service={service}
        controllerAccount={state.context.controllerAccount}
      />
    )
  }

  if (state.matches('success')) {
    return <CreateThreadSuccessModal newThreadId={state.context.newThreadId.toString()} />
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem with creating your forum thread.</FailureModal>
  }

  return null
}
