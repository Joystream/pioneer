import { EventRecord } from '@polkadot/types/interfaces/system'
import React, { ReactNode, useEffect, useState } from 'react'
import { ActorRef, State, Subscription } from 'xstate'

import { TransactionContext as TxContext, TransactionEvent, TransactionStateValue } from '@/common/model/machines'

import { TransactionStatusContext } from './context'

interface Props {
  children: ReactNode
}

const PENDING_STATUS: TransactionStateValue[] = ['signWithExtension', 'signing', 'pending', 'finalizing', 'processing']

const getIsPendingStatus = (status: TransactionStateValue | null): boolean => {
  return !!status && PENDING_STATUS.includes(status)
}

export const TransactionStatusProvider = ({ children }: Props) => {
  const [transactionService, setService] = useState<ActorRef<TransactionEvent, State<TxContext>> | null>(null)
  const [status, setStatus] = useState<TransactionStateValue | null>(null)
  const [transactionEvents, setTransactionEvents] = useState<EventRecord[] | null>(null)

  useEffect(() => {
    let subscription: Subscription

    if (transactionService) {
      subscription = transactionService.subscribe((state) => {
        setStatus(state.value as TransactionStateValue)
        setTransactionEvents(state.context.events ?? null)
      })
    } else {
      setStatus(null)
    }

    return () => subscription?.unsubscribe()
  }, [transactionService])

  return (
    <TransactionStatusContext.Provider
      value={{
        isTransactionPending: getIsPendingStatus(status),
        transactionEvents,
        status,
        setStatus,
        setService,
      }}
    >
      {children}
    </TransactionStatusContext.Provider>
  )
}
