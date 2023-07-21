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

  if (state.matches('error') || state.matches('canceled')) {
    return (
      <FailureModal onClose={hideModal}>
        {state.matches('canceled') ? (
          <ResultText>Transaction was canceled.</ResultText>
        ) : (
          <>
            There was a problem registering your email.
            <ResultText>We could not register your email at the moment! Please, try again later!</ResultText>
          </>
        )}
      </FailureModal>
    )
  }

  return <WaitModal onClose={hideModal} title="Pending transaction" description="Registering email address..." />
}
