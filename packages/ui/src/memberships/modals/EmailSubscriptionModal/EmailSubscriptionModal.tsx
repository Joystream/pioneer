import React, { useEffect } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
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
  const {
    hideModal,
    modalData: { member },
  } = useModal<EmailSubscriptionModalCall>()

  const { wallet } = useMyAccounts()
  const [state, send] = useMachine(EmailSubscriptionMachine)
  
  const signEmail = async () => {
      const timestamp = Date.now()
      const signature = await wallet?.signer.signPayload({
        address: member.controllerAccount,
        data: `${member.id}:${timestamp}`
      })
      console.log(signature)
      return signature
  }

  useEffect(() => {
    if (state.matches('signature')) {
      signEmail()
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
