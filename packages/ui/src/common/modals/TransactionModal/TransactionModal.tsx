import { useActor } from '@xstate/react'
import React, { ReactNode, useEffect } from 'react'
import { ActorRef } from 'xstate'

import { MultiTransactionModalHeader } from '@/common/modals/TransactionModal/MultiTransactionModalHeader'

import { Modal, ModalHeader } from '../../components/Modal'

import { MultiTransactionConfig } from './types'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'

export interface TransactionModalProps {
  children: ReactNode
  onClose: () => void
  service: ActorRef<any>
  title?: string
  useMultiTransaction?: MultiTransactionConfig
}

export const TransactionModal = ({ onClose, children, service, title, useMultiTransaction }: TransactionModalProps) => {
  const [state] = useActor(service)
  const { showStatus } = useTransactionStatus()
  useEffect(() => {
    if (state.matches('signWithExtension')) {
      showStatus(service)
    }
  }, [state.value])

  if (state.matches('prepare')) {
    return (
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        {useMultiTransaction ? (
          <MultiTransactionModalHeader
            onClick={onClose}
            active={useMultiTransaction.active}
            transactionSteps={useMultiTransaction.steps}
          />
        ) : (
          <ModalHeader onClick={onClose} title={title ?? 'Authorize transaction'} />
        )}
        {children}
      </Modal>
    )
  }

  return null
}
