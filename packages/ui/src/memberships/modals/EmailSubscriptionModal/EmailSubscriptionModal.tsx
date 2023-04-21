import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { EmailSubscriptionModalCall } from '@/memberships/modals/EmailSubscriptionModal/index'

import { EmailSubscriptionFormModal } from './EmaiSubscriptionFormModal'
import { EmailSubscriptionMachine } from './machine'
import { EmailSubscriptionForm } from './types'
import { createBatch } from './utils'

export const EmailSubscriptionModal = () => {
  const { api } = useApi()
  const {
    hideModal,
    modalData: { member },
  } = useModal<EmailSubscriptionModalCall>()
  const [state, send] = useMachine(EmailSubscriptionMachine)

  if (state.matches('prepare')) {
    return (
      <EmailSubscriptionFormModal
        onClose={hideModal}
        onSubmit={(params: EmailSubscriptionForm) => send('DONE', { form: params })}
        member={member}
      />
    )
  }

  if (state.matches('transaction')) {
    return (
      <SignTransactionModal
        buttonText="Sign and subscribe"
        transaction={createBatch(state.context.form, api)}
        signer={member.controllerAccount}
        service={state.children.transaction}
      >
        <TextMedium>You subscribed to emal.</TextMedium>
      </SignTransactionModal>
    )
  }

  return null
}
