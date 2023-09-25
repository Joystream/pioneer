import React, { useEffect, useCallback } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { FailureModal } from '@/common/components/FailureModal'
import { ResultText } from '@/common/components/Modal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { error as logError } from '@/common/logger'
import { useNotificationSettings } from '@/memberships/hooks/useNotificationSettings'
import { EmailSubscriptionModalCall } from '@/memberships/modals/EmailSubscriptionModal/index'
import { getBackendAuthSignature } from '@/memberships/model/backendAuth'
import { useRegisterBackendMemberMutation } from '@/memberships/queries/__generated__/backend.generated'

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

  const { setMemberSettings, backendClient } = useNotificationSettings()
  const [sendRegisterbackendMemberMutation] = useRegisterBackendMemberMutation({
    client: backendClient,
  })

  const generateBackendAuthSignature = useCallback(async () => {
    if (!wallet) return
    try {
      const { signature, timestamp } = await getBackendAuthSignature(member, wallet)
      send('SIGNED', { signature, timestamp })
    } catch (error) {
      logError('Error generating signature', error)
      send('ERROR')
    }
  }, [wallet, member])

  const registerEmail = useCallback(async () => {
    const { email, timestamp, signature } = state.context
    if (!email || !timestamp || !signature) {
      send('ERROR')
      logError('Email, timestamp or signature is missing in context')
      return
    }
    try {
      const result = await sendRegisterbackendMemberMutation({
        variables: {
          id: parseInt(member.id),
          name: member.name || member.handle,
          email,
          signature,
          timestamp: timestamp.toString(),
        },
      })
      setMemberSettings(member.id, { accessToken: result?.data?.signup ?? undefined })
      send('SUCCESS')
    } catch (error) {
      logError('Error registering email', error)
      send('ERROR')
    }
  }, [state, sendRegisterbackendMemberMutation, member])

  useEffect(() => {
    if (state.matches('signature')) {
      generateBackendAuthSignature()
    }
  }, [state, generateBackendAuthSignature])

  useEffect(() => {
    if (state.matches('register')) {
      registerEmail()
    }
  }, [state, registerEmail])

  if (state.matches('prepare')) {
    return (
      <EmailSubscriptionFormModal
        onClose={() => {
          setMemberSettings(member.id, { hasBeenAskedForEmail: true })
          hideModal()
        }}
        onSubmit={(params: EmailSubscriptionForm) => {
          send('DONE', { email: params.email })
        }}
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

  if (state.matches('signature')) {
    return <WaitModal onClose={hideModal} title="Pending registration" description="Waiting for your signature..." />
  }

  if (state.matches('register')) {
    return <WaitModal onClose={hideModal} title="Registering your email" description="Please wait..." />
  }

  if (state.matches('success')) {
    return (
      <SuccessModal
        onClose={hideModal}
        text="The confirmation link was sent to your email address. Open the email and follow instructions to finalize the email registration."
      />
    )
  }

  return null
}
