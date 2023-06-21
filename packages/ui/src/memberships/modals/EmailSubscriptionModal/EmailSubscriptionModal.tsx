import React, { useEffect } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { FailureModal } from '@/common/components/FailureModal'
import { ResultText } from '@/common/components/Modal'
import { WaitModal } from '@/common/components/WaitModal'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { EmailSubscriptionModalCall } from '@/memberships/modals/EmailSubscriptionModal/index'

import { EmailSubscriptionFormModal } from './EmaiSubscriptionFormModal'
import { EmailSubscriptionMachine } from './machine'
import { EmailSubscriptionForm } from './types'

export const EmailSubscriptionModal = () => {
  const { api } = useApi()
  const {
    hideModal,
    modalData: { member },
  } = useModal<EmailSubscriptionModalCall>()

  const [state, send] = useMachine(EmailSubscriptionMachine)

  useEffect(() => {
    if (state.matches('signature')) {
      // const timestamp = new Date()
      // api?.sign(member.controllerAccount, `${member.id}:${timestamp}`)
    }
  }, [state])

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
