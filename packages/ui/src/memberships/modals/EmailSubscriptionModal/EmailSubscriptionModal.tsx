import { gql } from '@apollo/client'
import React, { useEffect } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { FailureModal } from '@/common/components/FailureModal'
import { ResultText } from '@/common/components/Modal'
import { WaitModal } from '@/common/components/WaitModal'
import { useBackend } from '@/common/hooks/useBackend'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { EmailSubscriptionModalCall } from '@/memberships/modals/EmailSubscriptionModal/index'

import { EmailSubscriptionFormModal } from './EmaiSubscriptionFormModal'
import { EmailSubscriptionMachine } from './machine'
import { EmailSubscriptionForm } from './types'

const SIGNUP_MUTATION = gql`
  mutation signup($memberId: Int!, $name: String!, $email: String!, $signature: String!, $timestamp: BigInt!) {
    signup(memberId: $memberId, name: $name, email: $email, signature: $signature, timestamp: $timestamp)
  }
`

export const EmailSubscriptionModal = () => {
  const {
    hideModal,
    modalData: { member },
  } = useModal<EmailSubscriptionModalCall>()
  const [, setMembersEmail] = useLocalStorage<Record<string, string>>('membersEmail')
  const { wallet } = useMyAccounts()
  const [state, send] = useMachine(EmailSubscriptionMachine)
  const {
    data,
    error,
    send: mutate,
  } = useBackend({
    mutation: SIGNUP_MUTATION,
  })

  const signEmail = async () => {
    const timestamp = Date.now()
    try {
      const signature = await wallet?.signer.signPayload({
        address: member.controllerAccount,
        data: `${member.id}:${timestamp}`,
      })
      if (signature) {
        send('SIGNED', { signature: signature.signature, timestamp })
      }
    } catch (error) {
      send('CANCEL')
    }
  }

  const signUp = async () => {
    if (state.event.type === 'SIGNED') {
      await mutate({
        memberId: parseFloat(member.id),
        name: member.name,
        email: state.context.email,
        signature: state.event.signature,
        timestamp: state.event.timestamp,
      })
    }
  }


  useEffect(() => {
    if (state.matches('signature')) {
      signEmail()
    }
    if (state.matches('transaction')) {
      signUp()
    }
  }, [state])

  useEffect(() => {
    if (data) {
      send('SUCCESS')
      setMembersEmail((emails) => ({ ...emails, [member.id]: state.context.email || '' }))
      hideModal()
    }
    if (error) {
      send('ERROR')
    }
  }, [data, error])

  if (state.matches('prepare')) {
    return (
      <EmailSubscriptionFormModal
        onClose={hideModal}
        onSubmit={(params: EmailSubscriptionForm) => {
          send('DONE', { email: params.email })
        }}
        member={member}
      />
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal}>
        There was a problem registering your email.
        <ResultText>We could not register your email at the moment! Please, try again later!</ResultText>
      </FailureModal>
    )
  }

  return <WaitModal onClose={hideModal} title="Pending transaction" description="Registering email address..." />
}
