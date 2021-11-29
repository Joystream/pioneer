import { useActor } from '@xstate/react'
import React from 'react'
import { ActorRef, State } from 'xstate'

import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
import { TransactionContext, TransactionEvent } from '@/common/model/machines'

import { TransactionStatusNotification } from './TransactionStatusNotification'

export const TransactionStatus = () => {
  const { transactionService, statusShown, hideStatus } = useTransactionStatus()

  if (statusShown && transactionService) {
    return <TransactionStatusContent service={transactionService} onClose={hideStatus} />
  }

  return null
}

interface Props {
  service: ActorRef<TransactionEvent, State<TransactionContext>>,
  onClose: () => void
}

const TransactionStatusContent = ({ service, onClose }: Props) => {
  const [state] = useActor(service)

  if (state.matches('signWithExtension')) {
    return (
      <TransactionStatusNotification
        title="Waiting for the extension"
        message="Please, sign the transaction using external signer app."
        state="loading"
      />
    )
  }

  if (state.matches('canceled')) {
    return (
      <TransactionStatusNotification
        title="Transaction canceled"
        message="Something went wrong with your extension."
        state="failure"
        onClose={onClose}
      />
    )
  }

  if (state.matches('pending')) {
    return (
      <TransactionStatusNotification
        title="Pending transaction"
        message="We are waiting for your trasaction to be mined. Please wait."
        state="pending"
        stepNumber={1}
      />
    )
  }

  if (state.matches('finalizing')) {
    return (
      <TransactionStatusNotification
        title="Finalizing transaction"
        message="The transaction has been included in a block."
        state="pending"
        stepNumber={2}
      />
    )
  }

  if (state.matches('processing')) {
    return (
      <TransactionStatusNotification
        title="Processing transaction"
        message="Waiting for the query node to process the block."
        state="pending"
        stepNumber={3}
      />
    )
  }

  if (state.matches('success')) {
    return (
      <TransactionStatusNotification
        title="Transaction succeeded"
        message="The entire process was a success."
        state="successful"
        stepNumber={4}
        onClose={onClose}
      />
    )
  }

  if (state.matches('error')) {
    return (
      <TransactionStatusNotification
        title="Transaction failed"
        message="Something went wrong with your transaction."
        state="failure"
        onClose={onClose}
      />
    )
  }

  return null
}
