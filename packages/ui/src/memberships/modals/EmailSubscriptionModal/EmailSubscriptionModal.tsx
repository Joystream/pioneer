import React, { useEffect, useCallback } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { SuccessModal } from '@/common/components/SuccessModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { error as logError } from '@/common/logger'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useNotificationSettings } from '@/memberships/hooks/useNotificationSettings'
import { EmailSubscriptionModalCall } from '@/memberships/modals/EmailSubscriptionModal/index'
import { getBackendAuthSignature } from '@/memberships/model/backendAuth'
import { useRegisterBackendMemberMutation } from '@/memberships/queries/__generated__/backend.generated'

import { BackendErrorModal } from '../BackendErrorModal'

import { EmailSubscriptionFormModal } from './EmaiSubscriptionFormModal'
import { EmailSubscriptionMachine } from './machine'
import { EmailSubscriptionForm } from './types'

export const EmailSubscriptionModal = () => {
  const {
    hideModal,
    modalData: { onSubscribe },
  } = useModal<EmailSubscriptionModalCall>()

  const { active: member } = useMyMemberships()
  const { wallet } = useMyAccounts()
  const [state, send] = useMachine(EmailSubscriptionMachine)

  const { activeMemberExistBackendData, setMemberSettings, backendClient } = useNotificationSettings()
  const [sendRegisterbackendMemberMutation] = useRegisterBackendMemberMutation({
    client: backendClient,
  })

  const generateBackendAuthSignature = useCallback(async () => {
    if (!wallet || !member) return
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
    if (!email || !timestamp || !signature || !member) {
      send('ERROR')
      logError('Email, timestamp, signature or member is missing in context')
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
      onSubscribe?.()
      send('SUCCESS')
    } catch (error) {
      logError('Error registering email', error)
      send('ERROR')
    }
  }, [state, sendRegisterbackendMemberMutation, member])

  useEffect(() => {
    if (state.matches('prepare') && activeMemberExistBackendData?.memberExist) {
      hideModal()
    }
  }, [state, activeMemberExistBackendData])

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

  if (!member) {
    return null
  }

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
    return <BackendErrorModal onClose={hideModal} />
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
