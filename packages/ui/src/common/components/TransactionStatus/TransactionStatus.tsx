import React, { useEffect, useState } from 'react'

import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
import { TransactionState } from '@/common/model/machines'

import { TransactionStatusNotification } from './TransactionStatusNotification'

export const TransactionStatus = () => {
  const {status} = useTransactionStatus()
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    if (!status) {
      setVisible(false)
    }

    if (status === 'signWithExtension') {
      setVisible(true)
    }
  }, [status])

  if (isVisible && status) {
    return <TransactionStatusContent status={status} onClose={() => setVisible(false)} />
  }

  return null
}

interface Props {
  status: TransactionState['value'],
  onClose: () => void
}

const TransactionStatusContent = ({status, onClose}: Props) => {
  if (status === 'signWithExtension') {
    return (
      <TransactionStatusNotification
        title="Waiting for the extension"
        message="Please, sign the transaction using external signer app."
        state="loading"
      />
    )
  }

  if (status === 'canceled') {
    return (
      <TransactionStatusNotification
        title="Transaction canceled"
        message="Something went wrong with your extension."
        state="failure"
        onClose={onClose}
      />
    )
  }

  if (status === 'pending') {
    return (
      <TransactionStatusNotification
        title="Pending transaction"
        message="We are waiting for your transaction to be mined. Please wait."
        state="pending"
        stepNumber={1}
      />
    )
  }

  if (status === 'finalizing') {
    return (
      <TransactionStatusNotification
        title="Finalizing transaction"
        message="The transaction has been included in a block."
        state="pending"
        stepNumber={2}
      />
    )
  }

  if (status === 'processing') {
    return (
      <TransactionStatusNotification
        title="Processing transaction"
        message="Waiting for the query node to process the block."
        state="pending"
        stepNumber={3}
      />
    )
  }

  if (status === 'success') {
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

  if (status === 'error') {
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
