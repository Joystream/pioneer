import { ApiPromise, WsProvider } from '@polkadot/api'
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
  const provider = new WsProvider(process.env.REACT_APP_TESTNET_NODE_SOCKET)
  const api = new ApiPromise({ provider })
  const {
    hideModal,
    modalData: { member },
  } = useModal<EmailSubscriptionModalCall>()

  const { wallet } = useMyAccounts()

  const [state, send] = useMachine(EmailSubscriptionMachine)

  const signEmail = async () => {
    if (state.context.email) {
      await api.setSigner(wallet?.signer)
      await api.sign(member.controllerAccount, {
        data: state.context.email,
      })
    }
  }

  useEffect(() => {
    if (state.matches('signature')) {
      signEmail()
      // const timestamp = new Date()
      // const signature = api?.sign(member.controllerAccount, `${member.id}:${timestamp}`)
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
